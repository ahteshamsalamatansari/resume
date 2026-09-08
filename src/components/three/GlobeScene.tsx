'use client';

import { useMemo, useRef, useEffect, useState, MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Finale globe: a dotted Earth that assembles itself from scattered
 * particles as the user scrolls in (uProgress 0→1), then lights up
 * with great-circle connection arcs and traveling pulses.
 *
 * Land and colour both come from a real NASA Blue Marble map
 * (public/textures/earth-map.png — RGB is the true surface colour, alpha is
 * the land mask). This replaced eight hand-written continent polygons that
 * were missing Britain, Japan, New Zealand, the Caribbean and most of
 * South-East Asia, and a shader that coloured every dot by lerping two
 * brand greens. Each dot now carries the actual colour of the ground beneath
 * it, graded REALISM of the way back toward the site palette so the finale
 * still belongs to the rest of the page.
 */

const RADIUS = 2.1;

/** 1 = raw satellite colour, 0 = the original all-emerald globe. */
const REALISM = 0.78;

/** Blue Marble is dark at this scale; lift it so dots read on #0A0A0A. */
const GAIN = 1.45;
const LIFT = 0.04;

/**
 * Brightening alone washes the map out — scaling RGB moves every channel
 * toward white, so the Sahara and the boreal forest end up the same grey.
 * Pushing each dot away from its own luma restores the distinction.
 */
const SATURATION = 1.85;

const TEXTURE_URL = '/textures/earth-map.png';

/* ---------- Brand palette the satellite colour is graded toward ---------- */
const BRAND_A = new THREE.Color('#2FA084');
const BRAND_B = new THREE.Color('#6FCF97');

function latLngToVec3(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* ---------- Connection hubs (from India outward) ---------- */
const HUBS: [number, number][] = [
  [19.07, 72.87], // Mumbai — origin
  [37.77, -122.42], // San Francisco
  [40.71, -74.0], // New York
  [51.5, -0.12], // London
  [52.52, 13.4], // Berlin
  [25.2, 55.27], // Dubai
  [1.35, 103.82], // Singapore
  [35.68, 139.69], // Tokyo
  [-33.87, 151.21], // Sydney
];

/* ---------- Earth map sampling ---------- */

type EarthMap = { data: Uint8ClampedArray; w: number; h: number };

/** Loads the equirectangular map once and reads its pixels into memory. */
function loadEarthMap(): Promise<EarthMap> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Same-origin asset, so the canvas is never tainted by this read.
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        reject(new Error('2d context unavailable'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      resolve({ data, w: canvas.width, h: canvas.height });
    };
    img.onerror = () => reject(new Error(`failed to load ${TEXTURE_URL}`));
    img.src = TEXTURE_URL;
  });
}

/** Nearest-pixel sample at a geographic coordinate. */
function sample(map: EarthMap, lat: number, lng: number) {
  const x = Math.min(
    map.w - 1,
    Math.max(0, Math.round(((lng + 180) / 360) * (map.w - 1)))
  );
  const y = Math.min(
    map.h - 1,
    Math.max(0, Math.round(((90 - lat) / 180) * (map.h - 1)))
  );
  const i = (y * map.w + x) * 4;
  return {
    r: map.data[i] / 255,
    g: map.data[i + 1] / 255,
    b: map.data[i + 2] / 255,
    land: map.data[i + 3] > 127,
  };
}

/** Builds the dot cloud from the sampled map. */
function buildGeometry(map: EarthMap) {
  const targets: number[] = [];
  const scatters: number[] = [];
  const offsets: number[] = [];
  const shades: number[] = [];
  const colors: number[] = [];

  const tmp = new THREE.Color();
  const brand = new THREE.Color();

  const latStep = 1.8;
  for (let lat = -85; lat <= 85; lat += latStep) {
    const circumference = Math.cos((lat * Math.PI) / 180);
    const lngStep = latStep / Math.max(circumference, 0.15);
    for (let lng = -180; lng < 180; lng += lngStep) {
      const px = sample(map, lat, lng);
      if (!px.land) continue;

      const p = latLngToVec3(lat, lng, RADIUS);
      targets.push(p.x, p.y, p.z);

      // scatter: same direction, blasted far out with jitter
      const dir = p.clone().normalize();
      const jitter = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      const s = dir.multiplyScalar(RADIUS + 4 + Math.random() * 9).add(jitter);
      scatters.push(s.x, s.y, s.z);

      offsets.push(Math.random());

      const shade = Math.random();
      shades.push(shade);

      // True surface colour: brighten, re-saturate, then grade toward palette.
      let r = Math.min(1, px.r * GAIN + LIFT);
      let g = Math.min(1, px.g * GAIN + LIFT);
      let b = Math.min(1, px.b * GAIN + LIFT);

      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      r = THREE.MathUtils.clamp(luma + (r - luma) * SATURATION, 0, 1);
      g = THREE.MathUtils.clamp(luma + (g - luma) * SATURATION, 0, 1);
      b = THREE.MathUtils.clamp(luma + (b - luma) * SATURATION, 0, 1);

      tmp.setRGB(r, g, b);
      brand.copy(BRAND_A).lerp(BRAND_B, shade);
      tmp.lerp(brand, 1 - REALISM);
      colors.push(tmp.r, tmp.g, tmp.b);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(targets), 3));
  geo.setAttribute('aScatter', new THREE.BufferAttribute(new Float32Array(scatters), 3));
  geo.setAttribute('aOffset', new THREE.BufferAttribute(new Float32Array(offsets), 1));
  geo.setAttribute('aShade', new THREE.BufferAttribute(new Float32Array(shades), 1));
  geo.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(colors), 3));
  return geo;
}

/* ---------- Shaders ---------- */
const globeVertex = /* glsl */ `
  attribute vec3 aScatter;
  attribute float aOffset;
  attribute float aShade;
  attribute vec3 aColor;
  uniform float uProgress;
  varying vec3 vColor;
  varying float vAssembled;

  void main() {
    float p = smoothstep(aOffset * 0.55, aOffset * 0.55 + 0.45, uProgress);
    vec3 pos = mix(aScatter, position, p);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (28.0 / -mv.z) * mix(0.7, 1.15, aShade);
    vColor = aColor;
    vAssembled = p;
  }
`;

const globeFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAssembled;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.15, d);
    gl_FragColor = vec4(vColor, alpha * mix(0.35, 0.95, vAssembled));
  }
`;

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vNormal;
  void main() {
    float rim = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
    gl_FragColor = vec4(vec3(0.184, 0.628, 0.529), rim * uOpacity);
  }
`;

/* ---------- Globe points ---------- */
function GlobeDots({
  geo,
  progressRef,
}: {
  geo: THREE.BufferGeometry;
  progressRef: MutableRefObject<number>;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({ uProgress: { value: 0 } }), []);

  useFrame((_, delta) => {
    if (mat.current) {
      mat.current.uniforms.uProgress.value = THREE.MathUtils.damp(
        mat.current.uniforms.uProgress.value,
        progressRef.current,
        3.5,
        delta
      );
    }
  });

  return (
    <points geometry={geo}>
      <shaderMaterial
        ref={mat}
        vertexShader={globeVertex}
        fragmentShader={globeFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- Arcs + traveling pulses ---------- */
function Arcs({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const pulses = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    const origin = HUBS[0];
    return HUBS.slice(1).map(([lat, lng], i) => {
      const start = latLngToVec3(origin[0], origin[1], RADIUS);
      const end = latLngToVec3(lat, lng, RADIUS);
      const dist = start.distanceTo(end);
      const mid = start
        .clone()
        .add(end)
        .normalize()
        .multiplyScalar(RADIUS * (1 + dist * 0.13));
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(72);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      geo.setDrawRange(0, 0);
      const mat = new THREE.LineBasicMaterial({
        color: '#6FCF97',
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);
      return { curve, geo, mat, line, delay: i * 0.06, speed: 0.35 + (i % 3) * 0.12 };
    });
  }, []);

  useEffect(
    () => () =>
      arcs.forEach((a) => {
        a.geo.dispose();
        a.mat.dispose();
      }),
    [arcs]
  );

  const pulseVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    // arcs draw in during the last 30% of assembly progress
    const reveal = THREE.MathUtils.clamp((progressRef.current - 0.7) / 0.3, 0, 1);
    arcs.forEach((arc, i) => {
      const local = THREE.MathUtils.clamp((reveal - arc.delay) / (1 - arc.delay), 0, 1);
      arc.geo.setDrawRange(0, Math.floor(local * 73));
      const pulse = pulses.current?.children[i] as THREE.Mesh | undefined;
      if (pulse) {
        const t = (state.clock.elapsedTime * arc.speed + i * 0.37) % 1;
        arc.curve.getPoint(t, pulseVec);
        pulse.position.copy(pulseVec);
        pulse.visible = local > 0.95;
        const s = 0.8 + Math.sin(state.clock.elapsedTime * 4 + i) * 0.25;
        pulse.scale.setScalar(s);
      }
    });
  });

  return (
    <group>
      {arcs.map((arc, i) => (
        <primitive key={i} object={arc.line} />
      ))}
      <group ref={pulses}>
        {arcs.map((_, i) => (
          <mesh key={i} visible={false}>
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshBasicMaterial color="#EEEEEE" transparent opacity={0.95} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ---------- Assembly ---------- */
function Globe({
  geo,
  progressRef,
}: {
  geo: THREE.BufferGeometry;
  progressRef: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const occluder = useRef<THREE.MeshBasicMaterial>(null);
  const atmosphere = useRef<THREE.ShaderMaterial>(null);

  const atmosphereUniforms = useMemo(() => ({ uOpacity: { value: 0 } }), []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.06;
      // subtle pointer tilt
      const tx = state.pointer.y * 0.18;
      const tz = state.pointer.x * 0.08;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.28 + tx, 2, delta);
      group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -0.1 + tz, 2, delta);
    }
    const p = progressRef.current;
    if (occluder.current) {
      occluder.current.opacity = THREE.MathUtils.damp(occluder.current.opacity, p * 0.92, 3, delta);
    }
    if (atmosphere.current) {
      atmosphere.current.uniforms.uOpacity.value = THREE.MathUtils.damp(
        atmosphere.current.uniforms.uOpacity.value,
        p,
        3,
        delta
      );
    }
  });

  return (
    <group ref={group} rotation={[0.28, 4.0, -0.1]}>
      {/* dark inner sphere occludes far-side dots once assembled */}
      <mesh scale={0.985}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <meshBasicMaterial ref={occluder} color="#0A1418" transparent opacity={0} />
      </mesh>
      <GlobeDots geo={geo} progressRef={progressRef} />
      <Arcs progressRef={progressRef} />
      {/* atmosphere rim */}
      <mesh scale={1.18}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <shaderMaterial
          ref={atmosphere}
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={atmosphereUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/** Pull the camera back on narrow viewports so the globe fits the frame. */
function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.position.z = aspect < 0.9 ? 8.6 : 6.2;
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

export default function GlobeScene({
  progressRef,
  active = true,
}: {
  progressRef: MutableRefObject<number>;
  active?: boolean;
}) {
  const [geo, setGeo] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    let cancelled = false;
    let built: THREE.BufferGeometry | null = null;

    loadEarthMap()
      .then((map) => {
        if (cancelled) return;
        built = buildGeometry(map);
        setGeo(built);
      })
      .catch(() => {
        // Texture unavailable — the finale keeps its copy and arcs, it just
        // does not draw the globe. Never block the contact section on this.
      });

    return () => {
      cancelled = true;
      built?.dispose();
    };
  }, []);

  // Nothing to draw until the map is sampled; the section fades the whole
  // canvas in on scroll anyway, so there is no visible pop.
  if (!geo) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden
    >
      <ResponsiveCamera />
      <Globe geo={geo} progressRef={progressRef} />
    </Canvas>
  );
}
