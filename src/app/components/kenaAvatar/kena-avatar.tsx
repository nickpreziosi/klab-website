"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useTexture,
  Decal,
  useGLTF,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import styles from "./kena-avatar.module.css";

function HolographicAvatar() {
  const groupRef = useRef<THREE.Group>(null);

  // Load the GLB model
  const { scene } = useGLTF(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kena_meshy_4__1030184110_texture-0R1l9skXI9ChpuOLJmQccVx6XQM680.glb"
  );

  // Apply holographic material effects to all meshes in the model
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.emissive = new THREE.Color("#00D9FF");
        material.emissiveIntensity = 0.1;
        material.metalness = 0.4;
        material.roughness = 0.3;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={2} position={[0, 0, 0]} />
    </group>
  );
}

function KeoSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  const logoTexture = useTexture("/keo-logo.png");

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color={"#2B4A6F"}
        metalness={0.8}
        roughness={0.2}
        emissive={"#2B4A6F"}
        emissiveIntensity={0.1}
      />

      <Decal
        position={[0, 0, 1.5]}
        rotation={[0, 0, 0]}
        scale={1.2}
        map={logoTexture}
        polygonOffsetFactor={-1}
      />
    </mesh>
  );
}

interface KenaAvatarProps {
  className?: string;
}

export function KenaAvatar({ className }: KenaAvatarProps) {
  return (
    <div className={`${styles.container} ${className || ""}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className={styles.canvas}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FF0055" />

        {/* 3D Scene */}
        <HolographicAvatar />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Controls for 360 rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Instruction text */}
      <div className={styles.instruction}>
        <svg
          width="24"
          height="16"
          viewBox="0 0 80 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.rotationIcon}
        >
          <path
            d="M28 52L22.4 46.4L29.4 39.2C20.8667 38.0667 13.8333 35.7333 8.3 32.2C2.76667 28.6667 0 24.6 0 20C0 14.4667 3.85 9.75 11.55 5.85C19.25 1.95 28.7333 0 40 0C51.2667 0 60.75 1.95 68.45 5.85C76.15 9.75 80 14.4667 80 20C80 24.1333 77.7833 27.8333 73.35 31.1C68.9167 34.3667 63.1333 36.8 56 38.4V30.2C61.1333 28.8667 65.0833 27.2167 67.85 25.25C70.6167 23.2833 72 21.5333 72 20C72 17.8667 69.15 15.3333 63.45 12.4C57.75 9.46667 49.9333 8 40 8C30.0667 8 22.25 9.46667 16.55 12.4C10.85 15.3333 8 17.8667 8 20C8 21.6 9.7 23.5167 13.1 25.75C16.5 27.9833 21.3333 29.6667 27.6 30.8L22.4 25.6L28 20L44 36L28 52Z"
            fill="currentColor"
          />
        </svg>
        <span className={styles.degree}>360°</span>
        <span>Click and drag to rotate</span>
      </div>
    </div>
  );
}

export default KenaAvatar;
