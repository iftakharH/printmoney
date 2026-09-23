"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshWobbleMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

function Banknote({
  position,
  rotation,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  speed?: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.y = rotation[1] + Math.sin(t * 0.6) * 0.35;
    ref.current.rotation.x = rotation[0] + Math.cos(t * 0.5) * 0.15;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[2.1, 1, 0.02]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[1.7, 0.7]} />
        <meshStandardMaterial color="#052e1c" metalness={0.2} roughness={0.5} />
      </mesh>
      <mesh position={[0.6, 0.25, 0.025]}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial color="#ffd700" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Press() {
  const top = useRef<Mesh>(null);
  const bottom = useRef<Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const gap = 0.55 + Math.sin(t * 1.4) * 0.12;
    if (top.current) top.current.position.y = 0.75 + gap * 0.5;
    if (bottom.current) bottom.current.position.y = -0.75 - gap * 0.2;
    if (top.current) top.current.rotation.z = t * 0.4;
    if (bottom.current) bottom.current.rotation.z = -t * 0.4;
  });
  return (
    <group position={[0, -0.2, -1.2]}>
      <mesh ref={top}>
        <cylinderGeometry args={[0.55, 0.55, 2.4, 32]} />
        <MeshWobbleMaterial color="#1a3d30" speed={2} factor={0.15} metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh ref={bottom} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.45, 0.45, 2.4, 32]} />
        <meshStandardMaterial color="#0f2a20" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 2.6, 0.15]} />
        <meshStandardMaterial color="#0a1814" metalness={0.4} roughness={0.7} />
      </mesh>
      <pointLight position={[0, 1.2, 1]} color="#00ff9d" intensity={18} distance={6} />
      <pointLight position={[-1, -0.5, 1]} color="#ffd700" intensity={8} distance={5} />
    </group>
  );
}

function Coin() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.8;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.4;
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
      <mesh ref={ref} position={[1.8, 1.1, 0.5]}>
        <cylinderGeometry args={[0.45, 0.45, 0.08, 48]} />
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.25} />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.5], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} color="#ccffe8" />
      <Suspense fallback={null}>
        <Press />
        <Coin />
        <Banknote position={[-2.2, 0.8, 0]} rotation={[0.2, 0.5, 0.15]} color="#0d3d28" speed={0.9} />
        <Banknote position={[2.3, -0.3, 0.3]} rotation={[-0.15, -0.4, -0.1]} color="#1a3a20" speed={1.1} />
        <Banknote position={[-1.4, -1.0, 0.8]} rotation={[0.3, 0.8, 0]} color="#12304a" speed={0.7} />
      </Suspense>
      <fog attach="fog" args={["#050807", 6, 14]} />
    </Canvas>
  );
}
