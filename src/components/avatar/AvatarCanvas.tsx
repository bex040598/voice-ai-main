import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh, Object3D } from "three";
import type { AvatarMode } from "../../types";

interface AvatarCanvasProps {
  speaking?: boolean;
  mode?: AvatarMode;
}

const modeLabelMap: Record<AvatarMode, string> = {
  idle: "ATMURA kutish rejimida",
  greeting: "ATMURA salomlashmoqda...",
  speaking: "ATMURA javob bermoqda...",
  thinking: "ATMURA savolni tahlil qilmoqda...",
  pointing: "ATMURA yo'lni ko'rsatmoqda...",
  happy: "ATMURA do'stona kayfiyatda",
  neutral: "ATMURA barqaror holatda",
  listening: "ATMURA hozir tinglamoqda...",
  sleep: "ATMURA quvvat tejash holatida"
};

const AvatarModel = ({ speaking = false, mode = "idle" }: AvatarCanvasProps) => {
  const groupRef = useRef<Group>(null);
  const mouthRef = useRef<Mesh>(null);
  const leftEyeRef = useRef<Mesh>(null);
  const rightEyeRef = useRef<Mesh>(null);
  const leftBrowRef = useRef<Object3D>(null);
  const rightBrowRef = useRef<Object3D>(null);
  const haloRef = useRef<Mesh>(null);
  const pointerRef = useRef<Mesh>(null);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 160);
    }, mode === "sleep" ? 3600 : 2400);

    return () => window.clearInterval(interval);
  }, [mode]);

  const stateConfig = useMemo(() => {
    switch (mode) {
      case "greeting":
        return { brow: 0.16, mouth: 0.2, rotation: 0.18, halo: "#00d4ff", pointer: false };
      case "speaking":
        return { brow: 0.1, mouth: 0.28, rotation: 0.1, halo: "#00d4ff", pointer: false };
      case "thinking":
        return { brow: 0.03, mouth: 0.12, rotation: -0.1, halo: "#7c3aed", pointer: false };
      case "pointing":
        return { brow: 0.08, mouth: 0.14, rotation: 0.3, halo: "#00d4ff", pointer: true };
      case "happy":
        return { brow: 0.18, mouth: 0.2, rotation: 0.12, halo: "#00d4ff", pointer: false };
      case "neutral":
        return { brow: 0.09, mouth: 0.1, rotation: 0, halo: "#6fe8ff", pointer: false };
      case "listening":
        return { brow: 0.06, mouth: 0.08, rotation: 0.05, halo: "#00d4ff", pointer: false };
      case "sleep":
        return { brow: -0.02, mouth: 0.04, rotation: -0.02, halo: "#7c3aed", pointer: false };
      default:
        return { brow: 0.08, mouth: 0.1, rotation: 0, halo: "#6fe8ff", pointer: false };
    }
  }, [mode]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (state.pointer.x * 0.28 + stateConfig.rotation - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x +=
        (-state.pointer.y * 0.1 - groupRef.current.rotation.x + (mode === "thinking" ? 0.08 : 0)) * 0.04;
      groupRef.current.position.y = Math.sin(time * (mode === "sleep" ? 0.5 : 1.2)) * 0.05;
      groupRef.current.position.x = mode === "pointing" ? Math.sin(time * 1.2) * 0.06 : 0;
    }

    if (mouthRef.current) {
      const animatedMouth = speaking || mode === "speaking";
      mouthRef.current.scale.y = animatedMouth
        ? 0.28 + Math.sin(time * 10) * 0.18
        : stateConfig.mouth;
      mouthRef.current.scale.x = mode === "happy" ? 1.3 : animatedMouth ? 1.04 : 0.92;
    }

    const eyeScale = mode === "sleep" ? 0.06 : blink ? 0.06 : 1;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScale;
      rightEyeRef.current.scale.y = eyeScale;
    }

    if (leftBrowRef.current && rightBrowRef.current) {
      const browOffset = stateConfig.brow + Math.sin(time * 2.6) * 0.02;
      leftBrowRef.current.position.y = browOffset;
      rightBrowRef.current.position.y = browOffset + 0.012;
      leftBrowRef.current.rotation.z = mode === "happy" ? 0.35 : 0.2;
      rightBrowRef.current.rotation.z = mode === "happy" ? -0.35 : -0.2;
    }

    if (haloRef.current) {
      haloRef.current.scale.x = 1.1 + Math.sin(time * 1.6) * 0.06;
      haloRef.current.scale.y = 1.1 + Math.sin(time * 1.4) * 0.06;
      haloRef.current.scale.z = 1.1 + Math.sin(time * 1.8) * 0.06;
    }

    if (pointerRef.current) {
      pointerRef.current.visible = stateConfig.pointer;
      pointerRef.current.rotation.z = -0.8 + Math.sin(time * 1.8) * 0.08;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, -0.35, 0]}>
        <mesh ref={haloRef} position={[0, 0.1, -0.2]}>
          <torusGeometry args={[1.18, 0.04, 16, 64]} />
          <meshStandardMaterial color={stateConfig.halo} emissive={stateConfig.halo} emissiveIntensity={0.55} />
        </mesh>

        <mesh position={[0, -0.95, 0]} castShadow>
          <capsuleGeometry args={[0.52, 1.3, 12, 18]} />
          <meshStandardMaterial color="#173759" roughness={0.42} />
        </mesh>

        <mesh position={[0, 0.22, 0]} castShadow>
          <sphereGeometry args={[0.74, 32, 32]} />
          <meshStandardMaterial color="#d9ecff" roughness={0.28} metalness={0.06} />
        </mesh>

        <mesh ref={leftEyeRef} position={[-0.24, 0.3, 0.63]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#0c1f39" />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.24, 0.3, 0.63]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#0c1f39" />
        </mesh>

        <group ref={leftBrowRef} position={[-0.24, 0.55, 0.63]}>
          <mesh>
            <boxGeometry args={[0.22, 0.04, 0.04]} />
            <meshStandardMaterial color="#0c1f39" />
          </mesh>
        </group>
        <group ref={rightBrowRef} position={[0.24, 0.55, 0.63]}>
          <mesh>
            <boxGeometry args={[0.22, 0.04, 0.04]} />
            <meshStandardMaterial color="#0c1f39" />
          </mesh>
        </group>

        <mesh ref={mouthRef} position={[0, 0.02, 0.64]}>
          <boxGeometry args={[0.22, 0.08, 0.05]} />
          <meshStandardMaterial color="#14b8d4" emissive="#0fb8de" emissiveIntensity={0.4} />
        </mesh>

        <mesh ref={pointerRef} position={[0.86, -0.1, 0.18]} rotation={[0, 0, -0.85]}>
          <coneGeometry args={[0.1, 0.44, 18]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

export const AvatarCanvas = ({ speaking = false, mode = "idle" }: AvatarCanvasProps) => (
  <div className="relative h-[340px] overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.2),transparent_26%),linear-gradient(180deg,#061426_0%,#0B2D5B_100%)]">
    <div className="absolute inset-0 atmura-noise opacity-40" />
    <div className="absolute inset-x-10 bottom-9 h-px atmura-route-line opacity-80" />
    <Canvas camera={{ position: [0, 0.35, 3.8], fov: 42 }}>
      <color attach="background" args={["#061426"]} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 2]} intensity={1.75} castShadow />
      <pointLight position={[-2, 2, 2]} intensity={0.75} color="#7c3aed" />
      <pointLight position={[2, 1, 3]} intensity={0.8} color="#00d4ff" />
      <AvatarModel mode={mode} speaking={speaking} />
    </Canvas>
    <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/72 backdrop-blur-md">
      {modeLabelMap[mode]}
    </div>
  </div>
);
