import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh, Object3D } from "three";

interface AvatarCanvasProps {
  speaking?: boolean;
}

const AvatarModel = ({ speaking = false }: AvatarCanvasProps) => {
  const groupRef = useRef<Group>(null);
  const mouthRef = useRef<Mesh>(null);
  const leftEyeRef = useRef<Mesh>(null);
  const rightEyeRef = useRef<Mesh>(null);
  const leftBrowRef = useRef<Object3D>(null);
  const rightBrowRef = useRef<Object3D>(null);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 180);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += (state.pointer.x * 0.35 - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (-state.pointer.y * 0.12 - groupRef.current.rotation.x) * 0.04;
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.04;
    }

    if (mouthRef.current) {
      mouthRef.current.scale.y = speaking ? 0.3 + Math.sin(time * 10) * 0.18 : 0.12;
      mouthRef.current.scale.x = speaking ? 1.05 : 0.88;
    }

    const eyeScale = blink ? 0.08 : 1;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScale;
      rightEyeRef.current.scale.y = eyeScale;
    }

    if (leftBrowRef.current && rightBrowRef.current) {
      const browOffset = 0.08 + Math.sin(time * 2.6) * 0.02;
      leftBrowRef.current.position.y = browOffset;
      rightBrowRef.current.position.y = browOffset + 0.02;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.24} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -0.35, 0]}>
        <mesh position={[0, -0.95, 0]} castShadow>
          <capsuleGeometry args={[0.52, 1.3, 12, 18]} />
          <meshStandardMaterial color="#173759" roughness={0.45} />
        </mesh>

        <mesh position={[0, 0.22, 0]} castShadow>
          <sphereGeometry args={[0.74, 32, 32]} />
          <meshStandardMaterial color="#d9ecff" roughness={0.28} metalness={0.05} />
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
          <mesh rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.22, 0.04, 0.04]} />
            <meshStandardMaterial color="#0c1f39" />
          </mesh>
        </group>
        <group ref={rightBrowRef} position={[0.24, 0.55, 0.63]}>
          <mesh rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.22, 0.04, 0.04]} />
            <meshStandardMaterial color="#0c1f39" />
          </mesh>
        </group>

        <mesh ref={mouthRef} position={[0, 0.02, 0.64]}>
          <boxGeometry args={[0.22, 0.08, 0.05]} />
          <meshStandardMaterial color="#14b8d4" emissive="#0fb8de" emissiveIntensity={0.35} />
        </mesh>
      </group>
    </Float>
  );
};

export const AvatarCanvas = ({ speaking = false }: AvatarCanvasProps) => (
  <div className="h-[340px] overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(111,232,255,0.28),_transparent_38%),linear-gradient(180deg,_#08192f_0%,_#0f2948_100%)]">
    <Canvas camera={{ position: [0, 0.35, 3.8], fov: 42 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 2]} intensity={1.8} castShadow />
      <Environment preset="city" />
      <AvatarModel speaking={speaking} />
    </Canvas>
  </div>
);
