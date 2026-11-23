"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

type Block = { x: number; z: number; h: number; accent: boolean };
type Mouse = { x: number; y: number };

function useBlocks() {
  return useMemo(() => {
    let seed = 11;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const out: Block[] = [];
    for (let x = -5; x <= 5; x++) {
      for (let z = -5; z <= 5; z++) {
        if (rand() < 0.3) continue;
        const d = Math.hypot(x, z);
        const h = 0.2 + rand() * rand() * Math.max(0.4, 4.4 - d * 0.5);
        out.push({ x: x * 1.15, z: z * 1.15, h, accent: rand() < 0.035 });
      }
    }
    return out;
  }, []);
}

// Wireframe "city massing model" that grows in and follows the mouse
function City({ mouse }: { mouse: React.RefObject<Mouse> }) {
  const group = useRef<THREE.Group>(null);
  const blocks = useBlocks();

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const m = mouse.current;
    const t = state.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t * 0.04 + m.x * 0.35, 2.5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, m.y * 0.1, 2.5, dt);
    g.scale.y = THREE.MathUtils.damp(g.scale.y, 1, 1.4, dt);
  });

  return (
    <group ref={group} scale={[1, 0.001, 1]} position={[1.5, -1, 0]}>
      {blocks.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[0.9, b.h, 0.9]} />
          <meshBasicMaterial color={b.accent ? "#ff4d00" : "#0a0a0a"} />
          <Edges color={b.accent ? "#ff4d00" : "#5a5a55"} />
        </mesh>
      ))}
      <gridHelper args={[16, 32, "#262626", "#161616"]} />
    </group>
  );
}

export default function HeroScene() {
  const mouse = useRef<Mouse>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas camera={{ position: [10, 8, 10], fov: 32 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <fog attach="fog" args={["#0a0a0a", 12, 28]} />
      <City mouse={mouse} />
    </Canvas>
  );
}
