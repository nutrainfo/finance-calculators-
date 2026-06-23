"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Html } from "@react-three/drei";
import * as THREE from "three";

/* ─── Star field ─────────────────────────────────────────────────────────── */
function StarField({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 22 + Math.random() * 18;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.005; });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.045} color="#a5b4fc" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ─── Central glowing orb ────────────────────────────────────────────────── */
function CoreOrb() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (outerRef.current) { outerRef.current.rotation.y = t * 0.09; outerRef.current.rotation.z = Math.sin(t * 0.18) * 0.05; }
    if (innerRef.current) { innerRef.current.rotation.y = -t * 0.14; innerRef.current.rotation.x = t * 0.07; }
    if (r1.current) r1.current.rotation.z = t * 0.11;
    if (r2.current) { r2.current.rotation.z = -t * 0.08; r2.current.rotation.y = t * 0.04; }
    if (r3.current) { r3.current.rotation.x = t * 0.06; r3.current.rotation.z = t * 0.035; }
  });

  return (
    <group position={[0, 0, -1]}>
      <Sphere args={[2.9, 32, 32]}>
        <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.25} transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
      <Float speed={0.7} rotationIntensity={0.07} floatIntensity={0.45}>
        <Sphere ref={outerRef} args={[2.0, 128, 128]}>
          <MeshDistortMaterial color="#1e3a8a" distort={0.14} speed={1.1} roughness={0} metalness={0.95} transparent opacity={0.92} envMapIntensity={3} />
        </Sphere>
        <Sphere ref={innerRef} args={[1.1, 64, 64]}>
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={1.5} roughness={0.1} metalness={0.8} transparent opacity={0.65} />
        </Sphere>
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial color="#e0f2fe" emissive="#7dd3fc" emissiveIntensity={2.8} roughness={0} metalness={0} />
        </Sphere>
      </Float>
      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.7, 0.016, 8, 300]} />
        <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={1.6} transparent opacity={0.85} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[3.1, 0.011, 8, 300]} />
        <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1.3} transparent opacity={0.6} />
      </mesh>
      <mesh ref={r3} rotation={[-Math.PI / 3, Math.PI / 4, Math.PI / 8]}>
        <torusGeometry args={[2.5, 0.008, 8, 300]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={1.1} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ─── Gold coin (no font required) ──────────────────────────────────────── */
function Coin({ position, speed = 1, phase = 0 }: { position: [number, number, number]; speed?: number; phase?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime * speed + phase;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.22;
    ref.current.rotation.y = t * 1.3;
  });
  return (
    <group ref={ref} position={position}>
      {/* Main disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.055, 32]} />
        <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={1.0} metalness={1} roughness={0.12} />
      </mesh>
      {/* Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.022, 8, 32]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.7} metalness={1} roughness={0.08} />
      </mesh>
      {/* Center emboss circle */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.032, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.008, 24]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* ₹ symbol via Html (no font file needed) */}
      <Html position={[0, 0, 0.035]} center style={{ pointerEvents: "none", userSelect: "none" }}>
        <span style={{ color: "#78350f", fontSize: "13px", fontWeight: 900, fontFamily: "system-ui, sans-serif", lineHeight: 1 }}>₹</span>
      </Html>
    </group>
  );
}

/* ─── Mini bar chart ─────────────────────────────────────────────────────── */
function BarChart({ position, color, phase = 0 }: { position: [number, number, number]; color: string; phase?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const heights = [0.3, 0.55, 0.4, 0.7, 0.5, 0.82];

  useFrame((s) => {
    if (!groupRef.current) return;
    const t = s.clock.elapsedTime + phase;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.15;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.18;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* base plate */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[1.4, 0.03, 0.28]} />
        <meshStandardMaterial color="#1e293b" emissive="#0f172a" emissiveIntensity={0.5} roughness={0.3} metalness={0.7} />
      </mesh>
      {heights.map((h, i) => (
        <mesh key={i} position={[-0.52 + i * 0.22, h / 2 - 0.04, 0]}>
          <boxGeometry args={[0.15, h, 0.15]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45 + i * 0.08} roughness={0.2} metalness={0.6} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* trend line */}
      <mesh position={[0, 0.88, 0]}>
        <boxGeometry args={[1.32, 0.012, 0.012]} />
        <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1.6} />
      </mesh>
    </group>
  );
}

/* ─── Rate ticker card (Html label) ─────────────────────────────────────── */
function RateTicker({ position, label, value, color, phase = 0 }: {
  position: [number, number, number];
  label: string;
  value: string;
  color: string;
  phase?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime * 0.5 + phase;
    ref.current.position.y = position[1] + Math.sin(t) * 0.18;
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.14;
  });

  return (
    <group ref={ref} position={position}>
      {/* Card body */}
      <mesh>
        <boxGeometry args={[1.15, 0.52, 0.065]} />
        <meshStandardMaterial color="#0f172a" emissive="#1e293b" emissiveIntensity={0.7} roughness={0.1} metalness={0.85} transparent opacity={0.93} />
      </mesh>
      {/* Accent bar */}
      <mesh position={[-0.515, 0, 0]}>
        <boxGeometry args={[0.042, 0.52, 0.072]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.0} />
      </mesh>
      {/* Html text overlay */}
      <Html position={[0.04, 0, 0.04]} center style={{ pointerEvents: "none", userSelect: "none", width: "90px" }}>
        <div style={{ textAlign: "center", lineHeight: 1 }}>
          <div style={{ color: "#94a3b8", fontSize: "8px", fontWeight: 600, letterSpacing: "0.08em", fontFamily: "system-ui, sans-serif", marginBottom: "3px" }}>{label}</div>
          <div style={{ color, fontSize: "13px", fontWeight: 800, fontFamily: "system-ui, sans-serif" }}>{value}</div>
        </div>
      </Html>
    </group>
  );
}

/* ─── Orbiting particle belt ─────────────────────────────────────────────── */
function ParticleBelt({ count = 180 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const pos = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 3.8 + (Math.random() - 0.5) * 1.0;
      arr[i * 3]     = Math.cos(angle) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, [count]);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.035; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#93c5fd" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

/* ─── Scene ──────────────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[6, 6, 5]} intensity={6} color="#3b82f6" />
      <pointLight position={[-5, -3, 4]} intensity={3} color="#10b981" />
      <pointLight position={[0, -5, 3]} intensity={2} color="#7c3aed" />
      <pointLight position={[0, 2, 8]} intensity={2.5} color="#60a5fa" />
      <pointLight position={[4, 2, 2]} intensity={2} color="#f59e0b" />

      <StarField count={1200} />
      <CoreOrb />
      <ParticleBelt count={180} />

      {/* Floating coins */}
      <Coin position={[3.6, 1.4, 0.5]} speed={0.9} phase={0} />
      <Coin position={[-3.8, -0.8, 0.8]} speed={1.1} phase={2.1} />
      <Coin position={[1.8, 3.0, 1.2]} speed={0.75} phase={4.2} />
      <Coin position={[-2.2, 2.5, -0.5]} speed={1.0} phase={1.5} />
      <Coin position={[3.0, -2.2, -0.8]} speed={0.85} phase={3.0} />

      {/* Bar charts */}
      <BarChart position={[-4.5, 0.5, -1.0]} color="#3b82f6" phase={0} />
      <BarChart position={[4.2, -1.2, 0.5]} color="#10b981" phase={2.5} />

      {/* Rate tickers */}
      <RateTicker position={[-3.5, 2.5, 0.0]} label="NIFTY 50" value="24,833" color="#10b981" phase={0} />
      <RateTicker position={[3.8, 2.0, -0.5]} label="SBI FD 3Y" value="6.75%" color="#60a5fa" phase={1.5} />
      <RateTicker position={[-4.0, -2.2, 0.5]} label="REPO RATE" value="6.50%" color="#a78bfa" phase={3.0} />
      <RateTicker position={[2.5, -3.0, 1.0]} label="SENSEX" value="81,452" color="#f59e0b" phase={4.5} />
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 52 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
