"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Sparkles, TorusKnot } from "@react-three/drei";
import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

export type CameraTarget = { x: number; y: number; z: number; focus: number };
type MuseumCanvasProps = { target: MutableRefObject<CameraTarget> };

function CameraRig({ target }: MuseumCanvasProps) {
  const lookAt = useRef(new THREE.Vector3());
  useFrame((state, delta) => {
    const smoothing = 1 - Math.exp(-delta * 3.4);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, target.current.x + state.pointer.x * 0.22, smoothing);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, target.current.y + state.pointer.y * 0.14, smoothing);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, target.current.z, smoothing);
    lookAt.current.set(target.current.x, target.current.y, 0);
    state.camera.lookAt(lookAt.current);
  });
  return null;
}

function SeedArtifact() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.075;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12 - 0.2;
  });
  return (
    <group ref={group} position={[1.9, 0.2, 0]} scale={1.35}>
      <TorusKnot args={[1.45, 0.5, 196, 28, 2, 3]}>
        <meshPhysicalMaterial color="#e0c69e" emissive="#5a4128" emissiveIntensity={0.72} roughness={0.34} metalness={0.2} clearcoat={0.45} clearcoatRoughness={0.48} />
      </TorusKnot>
      <TorusKnot args={[1.47, 0.515, 90, 10, 2, 3]} scale={1.005}>
        <meshBasicMaterial color="#403a33" wireframe transparent opacity={0.055} />
      </TorusKnot>
    </group>
  );
}

function Mobius() {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const indices: number[] = [];
    const segments = 180;
    const widthSegments = 18;
    for (let i = 0; i <= segments; i += 1) {
      const u = (i / segments) * Math.PI * 2;
      for (let j = 0; j <= widthSegments; j += 1) {
        const v = (j / widthSegments - 0.5) * 1.25;
        positions.push((2.1 + v * Math.cos(u / 2)) * Math.cos(u), (2.1 + v * Math.cos(u / 2)) * Math.sin(u), v * Math.sin(u / 2));
      }
    }
    for (let i = 0; i < segments; i += 1) {
      for (let j = 0; j < widthSegments; j += 1) {
        const a = i * (widthSegments + 1) + j;
        const b = a + widthSegments + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    result.setIndex(indices);
    result.computeVertexNormals();
    return result;
  }, []);
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (mesh.current) mesh.current.rotation.z += delta * 0.055; });
  return (
    <mesh ref={mesh} geometry={geometry} rotation={[1.05, -0.28, 0]}>
      <meshPhysicalMaterial color="#e8d5b7" emissive="#5b4630" emissiveIntensity={0.65} side={THREE.DoubleSide} roughness={0.27} metalness={0.55} />
    </mesh>
  );
}

function LiquidCube() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.035;
    mesh.current.rotation.y += delta * 0.06;
    mesh.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 0.85) * 0.045;
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[3.2, 3.2, 3.2, 28, 28, 28]} />
      <MeshDistortMaterial color="#8d9aa5" emissive="#24313d" emissiveIntensity={0.8} roughness={0.18} metalness={0.42} distort={0.34} speed={0.75} />
    </mesh>
  );
}

function FracturedSphere() {
  const group = useRef<THREE.Group>(null);
  const shards = useMemo(() => Array.from({ length: 14 }, (_, index) => {
    const phi = Math.acos(-1 + (2 * index) / 14);
    const theta = Math.sqrt(14 * Math.PI) * phi;
    return { position: [Math.cos(theta) * Math.sin(phi) * 1.45, Math.sin(theta) * Math.sin(phi) * 1.45, Math.cos(phi) * 1.45] as [number, number, number], scale: 0.42 + (index % 4) * 0.08 };
  }), []);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y -= delta * 0.055; });
  return (
    <group ref={group}>
      {shards.map((shard, index) => (
        <Icosahedron key={index} args={[shard.scale, 1]} position={shard.position} rotation={[index * 0.37, index * 0.19, index * 0.11]}>
          <meshStandardMaterial color={index % 3 === 0 ? "#8192a2" : "#e0c9a4"} emissive={index % 3 === 0 ? "#25323d" : "#4f3924"} emissiveIntensity={0.7} roughness={0.62} metalness={0.08} flatShading />
        </Icosahedron>
      ))}
    </group>
  );
}

function Crystal() {
  const group = useRef<THREE.Group>(null);
  const pieces = useMemo(() => Array.from({ length: 11 }, (_, index) => {
    const angle = index * 2.399;
    const radius = (index % 4) * 0.34;
    return { position: [Math.cos(angle) * radius, (index % 3) * 0.2 - 0.5, Math.sin(angle) * radius] as [number, number, number], height: 1.6 + (index % 5) * 0.42, rotation: [0.12 * (index % 2), angle, 0.1 * (index % 3)] as [number, number, number] };
  }), []);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.045;
    group.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.45) * 0.025);
  });
  return (
    <group ref={group}>
      {pieces.map((piece, index) => (
        <mesh key={index} position={piece.position} rotation={piece.rotation}>
          <coneGeometry args={[0.42, piece.height, 5, 1]} />
          <meshPhysicalMaterial color={index % 4 === 0 ? "#d4b879" : "#c9d1d6"} emissive={index % 4 === 0 ? "#604619" : "#35414a"} emissiveIntensity={0.7} roughness={0.22} metalness={0.24} transmission={0.08} thickness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function StudioRelic() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => { if (mesh.current) mesh.current.rotation.set(state.clock.elapsedTime * 0.025, -state.clock.elapsedTime * 0.04, 0.35); });
  return <Icosahedron ref={mesh} args={[1.8, 3]}><meshBasicMaterial color="#927f60" wireframe transparent opacity={0.34} /></Icosahedron>;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.1} color="#9aa3ad" />
      <hemisphereLight args={["#e8d5b7", "#18202a", 2.2]} />
      <directionalLight position={[4, 6, 7]} intensity={3.2} color="#e8d5b7" />
      <pointLight position={[-5, -4, 3]} intensity={18} color="#6c7a89" />
      <Sparkles count={90} scale={[16, 40, 10]} position={[6, -14, -2]} size={1.1} speed={0.12} opacity={0.38} color="#e8d5b7" />
      <Float speed={0.35} rotationIntensity={0.12} floatIntensity={0.24}><SeedArtifact /></Float>
      <group position={[0, -15.2, 0]}><Mobius /></group>
      <group position={[7, -15.2, 0]}><LiquidCube /></group>
      <group position={[14, -15.2, 0]}><FracturedSphere /></group>
      <group position={[21, -15.2, 0]}><Crystal /></group>
      <group position={[4, -24.2, 0]}><StudioRelic /></group>
      <mesh position={[0, -31.5, 0]}><sphereGeometry args={[0.18, 24, 24]} /><meshBasicMaterial color="#c9a96e" /></mesh>
    </>
  );
}

export function MuseumCanvas({ target }: MuseumCanvasProps) {
  return (
    <Canvas dpr={[1, 1.65]} camera={{ position: [0, 0, 8.4], fov: 40, near: 0.1, far: 90 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} fallback={<div className="scene-fallback" />}>
      <color attach="background" args={["#0A0A0C"]} />
      <fog attach="fog" args={["#0A0A0C", 10, 30]} />
      <Suspense fallback={null}><Scene /></Suspense>
      <CameraRig target={target} />
    </Canvas>
  );
}
