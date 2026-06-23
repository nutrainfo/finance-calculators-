"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function StarField({ count = 2000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 28 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const brightness = 0.3 + Math.random() * 0.7;
      colors[i * 3] = brightness * 0.7;
      colors[i * 3 + 1] = brightness * 0.85;
      colors[i * 3 + 2] = brightness;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function NetworkOrb() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.08;
      outerRef.current.rotation.z = Math.sin(t * 0.15) * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.06;
      wireRef.current.rotation.x = t * 0.04;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.12;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* Core glowing sphere */}
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.4}>
        <Sphere ref={outerRef} args={[2.2, 128, 128]}>
          <MeshDistortMaterial
            color="#0a1628"
            distort={0.12}
            speed={0.8}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.95}
            envMapIntensity={2}
          />
        </Sphere>
      </Float>

      {/* Inner bright core */}
      <Sphere ref={innerRef} args={[1.4, 64, 64]}>
        <meshStandardMaterial
          color="#1a3a6e"
          emissive="#0d2856"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.5}
        />
      </Sphere>

      {/* Wireframe geodesic shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.6, 2]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.015, 8, 200]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.5, 0.01, 8, 200]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function AmbientParticles({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#93c5fd" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[8, 8, 6]} intensity={3} color="#3b82f6" />
      <pointLight position={[-6, -4, 4]} intensity={1.5} color="#1d4ed8" />
      <pointLight position={[0, 0, 6]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[4, -6, 2]} intensity={1} color="#34d399" />
      <StarField count={2000} />
      <AmbientParticles count={250} />
      <NetworkOrb />
      <Environment preset="city" />
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
