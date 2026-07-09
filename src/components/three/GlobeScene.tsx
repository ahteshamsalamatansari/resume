'use client';

import { useMemo, useRef, useEffect, MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Finale globe: a dotted Earth that assembles itself from scattered
 * particles as the user scrolls in (uProgress 0→1), then lights up
 * with great-circle connection arcs and traveling pulses.
 */

const RADIUS = 2.1;

/* ---------- Coarse continent outlines ([lng, lat] polygons) ---------- */
const CONTINENTS: number[][][] = [
  // North America
  [[-168, 66], [-140, 70], [-120, 72], [-95, 72], [-80, 70], [-60, 60], [-55, 48], [-65, 44], [-75, 38], [-80, 30], [-82, 26], [-90, 29], [-97, 26], [-97, 20], [-105, 20], [-110, 23], [-117, 33], [-124, 40], [-124, 48], [-130, 55], [-145, 60], [-155, 58], [-165, 60]],
  // Greenland
  [[-45, 60], [-25, 70], [-20, 80], [-35, 83], [-60, 82], [-70, 77], [-55, 70], [-52, 62]],
  // South America
  [[-78, 7], [-70, 10], [-62, 10], [-52, 5], [-45, -2], [-35, -8], [-38, -15], [-40, -22], [-48, -28], [-53, -34], [-58, -39], [-65, -42], [-71, -46], [-72, -52], [-68, -55], [-75, -48], [-75, -40], [-72, -30], [-70, -18], [-76, -14], [-81, -5], [-80, 2]],
  // Africa
  [[-17, 15], [-16, 22], [-10, 30], [-5, 35], [10, 37], [20, 32], [32, 31], [35, 28], [43, 11], [51, 11], [48, 2], [40, -10], [35, -20], [32, -29], [26, -34], [19, -34], [14, -26], [12, -16], [9, -5], [8, 4], [-5, 5], [-10, 6], [-14, 10]],
  // Europe
  [[-10, 36], [-9, 43], [-2, 48], [0, 52], [5, 53], [8, 57], [5, 61], [10, 65], [18, 70], [28, 71], [40, 67], [45, 60], [50, 55], [40, 50], [30, 46], [28, 41], [22, 38], [15, 38], [10, 44], [3, 43], [-5, 36]],
  // Asia
  [[45, 42], [50, 50], [55, 55], [60, 60], [70, 68], [90, 72], [110, 73], [130, 71], [150, 68], [170, 66], [179, 65], [178, 62], [160, 60], [157, 52], [142, 50], [135, 44], [128, 40], [122, 32], [122, 25], [110, 20], [108, 12], [104, 2], [100, 7], [98, 12], [94, 18], [88, 22], [80, 15], [77, 8], [72, 20], [66, 25], [57, 26], [52, 30], [48, 30], [44, 38]],
  // Indonesia / SE Asia arc
  [[95, 5], [105, 0], [115, -3], [125, -5], [135, -4], [140, -6], [135, -8], [120, -9], [110, -8], [100, -2]],
  // Australia
  [[114, -22], [122, -18], [130, -12], [136, -12], [142, -11], [147, -19], [153, -26], [152, -32], [146, -39], [140, -38], [135, -35], [129, -32], [124, -33], [115, -34], [113, -26]],
];

function pointInPolygon(lng: number, lat: number, poly: number[][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function isLand(lng: number, lat: number) {
  for (const poly of CONTINENTS) {
    if (pointInPolygon(lng, lat, poly)) return true;
  }
  return false;
}

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

/* ---------- Shaders ---------- */
const globeVertex = /* glsl */ `
  attribute vec3 aScatter;
  attribute float aOffset;
  attribute float aShade;
  uniform float uProgress;
  varying float vShade;
  varying float vAssembled;

  void main() {
    float p = smoothstep(aOffset * 0.55, aOffset * 0.55 + 0.45, uProgress);
    vec3 pos = mix(aScatter, position, p);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (28.0 / -mv.z) * mix(0.7, 1.15, aShade);
    vShade = aShade;
    vAssembled = p;
  }
`;

const globeFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vShade;
  varying float vAssembled;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.15, d);
    vec3 color = mix(uColorA, uColorB, vShade);
    gl_FragColor = vec4(color, alpha * mix(0.35, 0.95, vAssembled));
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
function GlobeDots({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const geo = useMemo(() => {
    const targets: number[] = [];
    const scatters: number[] = [];
    const offsets: number[] = [];
    const shades: number[] = [];

    const latStep = 1.8;
    for (let lat = -85; lat <= 85; lat += latStep) {
      const circumference = Math.cos((lat * Math.PI) / 180);
      const lngStep = latStep / Math.max(circumference, 0.15);
      for (let lng = -180; lng < 180; lng += lngStep) {
        if (!isLand(lng, lat)) continue;
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
        shades.push(Math.random());
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(targets), 3));
    geo.setAttribute('aScatter', new THREE.BufferAttribute(new Float32Array(scatters), 3));
    geo.setAttribute('aOffset', new THREE.BufferAttribute(new Float32Array(offsets), 1));
    geo.setAttribute('aShade', new THREE.BufferAttribute(new Float32Array(shades), 1));
    return geo;
  }, []);

  useEffect(() => () => geo.dispose(), [geo]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uColorA: { value: new THREE.Color('#2FA084') },
      uColorB: { value: new THREE.Color('#6FCF97') },
    }),
    []
  );

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
function Globe({ progressRef }: { progressRef: MutableRefObject<number> }) {
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
        <meshBasicMaterial ref={occluder} color="#0C1512" transparent opacity={0} />
      </mesh>
      <GlobeDots progressRef={progressRef} />
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
      <Globe progressRef={progressRef} />
    </Canvas>
  );
}
