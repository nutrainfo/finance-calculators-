"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Environment } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.02;
      mesh.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#63b3ed" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function FloatingRing({ position, rotation, color, speed = 1 }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3 * speed;
      ref.current.rotation.y += delta * 0.2 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <Torus ref={ref} args={[1, 0.06, 16, 80]} position={position} rotation={rotation}>
        <meshStandardMaterial color={color} transparent opacity={0.25} wireframe />
      </Torus>
    </Float>
  );
}

function GlowSphere({ position, color, size = 1 }: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <Sphere ref={ref} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.35}
          speed={1.5}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.15}
        />
      </Sphere>
    </Float>
  );
}

function CentralOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1.8, 64, 64]} position={[0, 0, -3]}>
      <MeshDistortMaterial
        color="#1a365d"
        attach="material"
        distort={0.25}
        speed={1}
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={0.5}
      />
    </Sphere>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#63b3ed" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#48bb78" />
      <pointLight position={[0, 0, 8]} intensity={0.5} color="#ecc94b" />

      <Particles count={600} />
      <CentralOrb />

      <FloatingRing position={[-5, 2, -2]} rotation={[0.5, 0.3, 0]} color="#63b3ed" speed={0.6} />
      <FloatingRing position={[5, -1, -1]} rotation={[1.2, 0.5, 0.3]} color="#48bb78" speed={0.8} />
      <FloatingRing position={[0, 4, -4]} rotation={[0.2, 1.0, 0.5]} color="#ecc94b" speed={0.5} />
      <FloatingRing position={[-3, -3, -2]} rotation={[0.8, 0.2, 1.0]} color="#805ad5" speed={0.7} />

      <GlowSphere position={[-6, 3, -5]} color="#63b3ed" size={2} />
      <GlowSphere position={[6, -2, -4]} color="#48bb78" size={1.5} />
      <GlowSphere position={[3, 4, -6]} color="#ecc94b" size={1.2} />
      <GlowSphere position={[-4, -4, -3]} color="#805ad5" size={1.8} />

      <Environment preset="night" />
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
