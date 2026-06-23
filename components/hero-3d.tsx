"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarField({ count = 1500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 22 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.006;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.05} color="#a5b4fc" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function GlowOrb() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Orbiting particles
  const particles = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.8 + (Math.random() - 0.5) * 1.2;
      const height = (Math.random() - 0.5) * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.1;
      outerRef.current.rotation.z = Math.sin(t * 0.2) * 0.06;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.15;
      innerRef.current.rotation.x = t * 0.08;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.09;
      ring2Ref.current.rotation.y = t * 0.05;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.07;
      ring3Ref.current.rotation.z = t * 0.04;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.04;
    }
  });

  return (
    <group position={[0, 0, -1]}>
      {/* Outer glow aura */}
      <Sphere args={[2.85, 32, 32]}>
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.3}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main distorted glass sphere */}
      <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.5}>
        <Sphere ref={outerRef} args={[2.0, 128, 128]}>
          <MeshDistortMaterial
            color="#1e3a8a"
            distort={0.15}
            speed={1.2}
            roughness={0}
            metalness={0.95}
            transparent
            opacity={0.92}
            envMapIntensity={3}
          />
        </Sphere>

        {/* Bright inner core */}
        <Sphere ref={innerRef} args={[1.1, 64, 64]}>
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={1.4}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.7}
          />
        </Sphere>

        {/* Hot center */}
        <Sphere args={[0.55, 32, 32]}>
          <meshStandardMaterial
            color="#e0f2fe"
            emissive="#7dd3fc"
            emissiveIntensity={2.5}
            roughness={0}
            metalness={0}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>

      {/* Equatorial ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.7, 0.018, 8, 300]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={1.5}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Tilted ring 1 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[3.1, 0.012, 8, 300]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#10b981"
          emissiveIntensity={1.2}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Tilted ring 2 */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 3, Math.PI / 4, Math.PI / 8]}>
        <torusGeometry args={[2.45, 0.009, 8, 300]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={1.0}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Orbiting particle belt */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#93c5fd" transparent opacity={0.7} sizeAttenuation />
      </points>
    </group>
  );
}

function DataNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => [
    { pos: [3.8, 1.2, 0.5] as [number, number, number], color: "#10b981", emissive: "#059669", scale: 0.14 },
    { pos: [-3.5, -1.0, 1.0] as [number, number, number], color: "#60a5fa", emissive: "#3b82f6", scale: 0.11 },
    { pos: [2.5, -2.5, -0.5] as [number, number, number], color: "#a78bfa", emissive: "#7c3aed", scale: 0.13 },
    { pos: [-2.8, 2.2, 0.8] as [number, number, number], color: "#fbbf24", emissive: "#d97706", scale: 0.10 },
    { pos: [1.0, 3.2, 1.5] as [number, number, number], color: "#34d399", emissive: "#10b981", scale: 0.09 },
    { pos: [-1.5, -3.0, -1.0] as [number, number, number], color: "#93c5fd", emissive: "#60a5fa", scale: 0.12 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <Float key={i} speed={0.5 + i * 0.15} floatIntensity={0.3} rotationIntensity={0.2}>
          <Sphere position={n.pos} args={[n.scale, 16, 16]}>
            <meshStandardMaterial
              color={n.color}
              emissive={n.emissive}
              emissiveIntensity={2.0}
              roughness={0.1}
              metalness={0.6}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      {/* Key light — strong blue */}
      <pointLight position={[6, 6, 5]} intensity={6} color="#3b82f6" />
      {/* Fill light — teal */}
      <pointLight position={[-5, -3, 4]} intensity={3} color="#10b981" />
      {/* Rim light — violet */}
      <pointLight position={[0, -5, 3]} intensity={2} color="#7c3aed" />
      {/* Front fill */}
      <pointLight position={[0, 2, 8]} intensity={2} color="#60a5fa" />
      <StarField count={1500} />
      <GlowOrb />
      <DataNodes />
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 52 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
