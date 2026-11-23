"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { CuboidCollider, Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import type { Skill } from "@/data/skills";

const HALF_W = 7.5; // play area half-width (x)
const HALF_D = 5; // play area half-depth (z)
const ACCENT = "#ff4d00";

type Props = {
  skills: Skill[];
  selected: string;
  onSelect: (name: string) => void;
  shake: number;
  reset: number;
};

/* Camera framing adapts to the canvas aspect ratio (mobile vs desktop) */
function CameraRig() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    const dist = aspect < 1 ? 24 : aspect < 1.5 ? 17 : 14;
    camera.position.set(0, dist * 0.75, dist);
    camera.lookAt(0, 0, 0);
  }, [camera, size]);
  return null;
}

/* One draggable / throwable skill block */
function Block({
  skill,
  index,
  isSelected,
  onSelect,
  shake,
}: {
  skill: Skill;
  index: number;
  isSelected: boolean;
  onSelect: (n: string) => void;
  shake: number;
}) {
  const body = useRef<RapierRigidBody>(null);
  const dragging = useRef(false);
  const [hovered, setHovered] = useState(false);
  const { camera, pointer, raycaster } = useThree();

  const width = Math.max(1.6, skill.name.length * 0.27 + 0.7);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), -2.5), []); // drag plane at y = 2.5
  const target = useMemo(() => new THREE.Vector3(), []);
  const start = useMemo<[number, number, number]>(
    () => [((index % 3) - 1) * 4.2 + (Math.random() - 0.5), 3 + index * 1.1, ((index % 4) - 1.5) * 2],
    [index]
  );

  // release on pointer up anywhere (keeps velocity -> "throw")
  useEffect(() => {
    const up = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  // shake: random upward impulse
  useEffect(() => {
    const b = body.current;
    if (!shake || !b) return;
    const m = b.mass();
    b.applyImpulse({ x: (Math.random() - 0.5) * 8 * m, y: (9 + Math.random() * 6) * m, z: (Math.random() - 0.5) * 6 * m }, true);
    b.applyTorqueImpulse({ x: (Math.random() - 0.5) * m, y: (Math.random() - 0.5) * m, z: (Math.random() - 0.5) * m }, true);
  }, [shake]);

  // while dragging, steer the body toward the pointer on the drag plane
  useFrame(() => {
    const b = body.current;
    if (!dragging.current || !b) return;
    raycaster.setFromCamera(pointer, camera);
    if (!raycaster.ray.intersectPlane(plane, target)) return;
    target.x = THREE.MathUtils.clamp(target.x, -HALF_W + 1, HALF_W - 1);
    target.z = THREE.MathUtils.clamp(target.z, -HALF_D + 1, HALF_D - 1);
    const p = b.translation();
    b.setLinvel({ x: (target.x - p.x) * 12, y: (target.y - p.y) * 12, z: (target.z - p.z) * 12 }, true);
    const av = b.angvel();
    b.setAngvel({ x: av.x * 0.85, y: av.y * 0.85, z: av.z * 0.85 }, true);
  });

  const face = isSelected ? ACCENT : hovered ? "#ffffff" : "#e9e9e4";
  const label = { fontSize: 0.32, color: "#0a0a0a", anchorX: "center" as const, anchorY: "middle" as const };

  return (
    <RigidBody ref={body} position={start} colliders={false} restitution={0.25} friction={0.9} linearDamping={0.15} angularDamping={0.3}>
      <CuboidCollider args={[width / 2, 0.4, 0.4]} />
      <mesh
        castShadow
        receiveShadow
        onPointerDown={(e) => {
          e.stopPropagation();
          dragging.current = true;
          document.body.style.cursor = "grabbing";
          onSelect(skill.name);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (!dragging.current) document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          setHovered(false);
          if (!dragging.current) document.body.style.cursor = "";
        }}
      >
        <boxGeometry args={[width, 0.8, 0.8]} />
        <meshStandardMaterial color={face} roughness={0.45} metalness={0.05} />
      </mesh>
      <Text {...label} position={[0, 0, 0.401]}>{skill.name}</Text>
      <Text {...label} position={[0, 0, -0.401]} rotation={[0, Math.PI, 0]}>{skill.name}</Text>
      <Text {...label} position={[0, 0.401, 0]} rotation={[-Math.PI / 2, 0, 0]}>{skill.name}</Text>
      <Text {...label} position={[0, -0.401, 0]} rotation={[Math.PI / 2, 0, 0]}>{skill.name}</Text>
    </RigidBody>
  );
}

/* Floor + invisible walls */
function Bounds() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[HALF_W, 0.5, HALF_D]} position={[0, -0.5, 0]} />
      <CuboidCollider args={[0.5, 12, HALF_D]} position={[-HALF_W - 0.5, 12, 0]} />
      <CuboidCollider args={[0.5, 12, HALF_D]} position={[HALF_W + 0.5, 12, 0]} />
      <CuboidCollider args={[HALF_W, 12, 0.5]} position={[0, 12, -HALF_D - 0.5]} />
      <CuboidCollider args={[HALF_W, 12, 0.5]} position={[0, 12, HALF_D + 0.5]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[HALF_W * 2, HALF_D * 2]} />
        <meshStandardMaterial color="#141414" roughness={1} />
      </mesh>
      <gridHelper args={[HALF_W * 2, 30, "#2a2a2a", "#1d1d1d"]} position={[0, 0.002, 0]} scale={[1, 1, HALF_D / HALF_W]} />
    </RigidBody>
  );
}

export default function SkillsPlayground({ skills, selected, onSelect, shake, reset }: Props) {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ fov: 40, position: [0, 10, 14] }}>
      <color attach="background" args={["#0a0a0a"]} />
      <CameraRig />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[6, 14, 8]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-6, 4, -4]} intensity={20} color={ACCENT} />
      <Suspense fallback={null}>
        <Physics key={reset} gravity={[0, -20, 0]}>
          {skills.map((s, i) => (
            <Block key={s.name} skill={s} index={i} isSelected={selected === s.name} onSelect={onSelect} shake={shake} />
          ))}
          <Bounds />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
