'use client';

import { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Hero backdrop: a drifting neural constellation.
 * GPU-displaced particles (one draw call) + nearest-neighbour synapse
 * lines that share the same displacement so connections never detach.
 */

const COUNT = 750;
const MAX_LINKS = 420;
const LINK_DIST = 1.35;

const pointsVertex = /* glsl */ `
  attribute float aScale;
  attribute float aShade;
  attribute vec3 aRand;
  uniform float uTime;
  varying float vShade;

  vec3 drift(vec3 pos, vec3 rand) {
    pos.x += sin(uTime * 0.28 + rand.x * 6.2831) * 0.30;
    pos.y += cos(uTime * 0.22 + rand.y * 6.2831) * 0.26;
    pos.z += sin(uTime * 0.18 + rand.z * 6.2831) * 0.30;
    return pos;
  }

  void main() {
    vec3 pos = drift(position, aRand);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * (46.0 / -mv.z);
    vShade = aShade;
  }
`;

const pointsFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vShade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.08, d);
    vec3 color = mix(uColorA, uColorB, vShade);
    gl_FragColor = vec4(color, alpha * 0.85);
  }
`;

const linesVertex = /* glsl */ `
  attribute vec3 aRand;
  uniform float uTime;

  vec3 drift(vec3 pos, vec3 rand) {
    pos.x += sin(uTime * 0.28 + rand.x * 6.2831) * 0.30;
    pos.y += cos(uTime * 0.22 + rand.y * 6.2831) * 0.26;
    pos.z += sin(uTime * 0.18 + rand.z * 6.2831) * 0.30;
    return pos;
  }

  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(drift(position, aRand), 1.0);
  }
`;

const linesFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;

  void main() {
    float pulse = 0.5 + 0.5 * sin(uTime * 0.7);
    gl_FragColor = vec4(uColor, 0.10 + pulse * 0.05);
  }
`;

function Constellation() {
  const group = useRef<THREE.Group>(null);
  const pointsMat = useRef<THREE.ShaderMaterial>(null);
  const linesMat = useRef<THREE.ShaderMaterial>(null);

  const { pointsGeo, linesGeo } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const shades = new Float32Array(COUNT);
    const rands = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      // flattened ellipsoid cloud, denser toward the middle
      const r = Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * 7.5 * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * 4.0 * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * 4.5 * Math.cos(phi);
      scales[i] = 0.6 + Math.random() * 1.6;
      shades[i] = Math.random();
      rands[i * 3] = Math.random();
      rands[i * 3 + 1] = Math.random();
      rands[i * 3 + 2] = Math.random();
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    pointsGeo.setAttribute('aShade', new THREE.BufferAttribute(shades, 1));
    pointsGeo.setAttribute('aRand', new THREE.BufferAttribute(rands, 3));

    // nearest-neighbour synapse links (computed once)
    const linkPositions: number[] = [];
    const linkRands: number[] = [];
    let links = 0;
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    for (let i = 0; i < COUNT && links < MAX_LINKS; i++) {
      a.fromArray(positions, i * 3);
      for (let j = i + 1; j < COUNT && links < MAX_LINKS; j++) {
        b.fromArray(positions, j * 3);
        if (a.distanceTo(b) < LINK_DIST) {
          linkPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
          linkRands.push(
            rands[i * 3], rands[i * 3 + 1], rands[i * 3 + 2],
            rands[j * 3], rands[j * 3 + 1], rands[j * 3 + 2]
          );
          links++;
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linkPositions), 3));
    linesGeo.setAttribute('aRand', new THREE.BufferAttribute(new Float32Array(linkRands), 3));

    return { pointsGeo, linesGeo };
  }, []);

  useEffect(() => {
    return () => {
      pointsGeo.dispose();
      linesGeo.dispose();
    };
  }, [pointsGeo, linesGeo]);

  const pointsUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#1F6F5F') },
      uColorB: { value: new THREE.Color('#6FCF97') },
    }),
    []
  );

  const linesUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#2FA084') },
    }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (pointsMat.current) pointsMat.current.uniforms.uTime.value = t;
    if (linesMat.current) linesMat.current.uniforms.uTime.value = t;
    if (group.current) {
      group.current.rotation.y += delta * 0.03;
      // mouse parallax — eased, never snappy
      const px = state.pointer.x * 0.22;
      const py = state.pointer.y * 0.14;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -py, 2, delta);
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, px * 1.4, 2, delta);
    }
  });

  return (
    <group ref={group} position={[1.4, 0, 0]} rotation={[0, 0, -0.08]}>
      <points geometry={pointsGeo}>
        <shaderMaterial
          ref={pointsMat}
          vertexShader={pointsVertex}
          fragmentShader={pointsFragment}
          uniforms={pointsUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments geometry={linesGeo}>
        <shaderMaterial
          ref={linesMat}
          vertexShader={linesVertex}
          fragmentShader={linesFragment}
          uniforms={linesUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden
    >
      <Constellation />
    </Canvas>
  );
}
