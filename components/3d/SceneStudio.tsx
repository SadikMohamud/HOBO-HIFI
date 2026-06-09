"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, useTexture, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface SceneStudioProps {
  scrollProxy: React.RefObject<{ progress: number }>;
  activeFinish: string;
}

// Custom Premium 3D Speaker Assembly with PBR Clearcoat Lacquer
function Speaker({ activeFinish, position }: { activeFinish: string; position: [number, number, number] }) {
  // Cabinet PBR material maps based on finish
  const cabinetColor = 
    activeFinish === "walnut" 
      ? "#3e271a" // Premium deep rich walnut wood
      : activeFinish === "matte-black" 
      ? "#121212" // Matte satin black
      : "#080808"; // Piano black lacquer

  const cabinetRoughness = 
    activeFinish === "walnut" 
      ? 0.12 
      : activeFinish === "matte-black" 
      ? 0.85 
      : 0.03; // Piano black (high gloss)

  const cabinetMetalness = 
    activeFinish === "walnut" 
      ? 0.02 
      : activeFinish === "matte-black" 
      ? 0.1 
      : 0.1; // Piano black

  const cabinetClearcoat = 
    activeFinish === "walnut" 
      ? 0.8 
      : activeFinish === "matte-black" 
      ? 0.0 
      : 1.0; // Piano black (high clearcoat)

  const cabinetClearcoatRoughness = 
    activeFinish === "walnut" 
      ? 0.1 
      : activeFinish === "matte-black" 
      ? 0.0 
      : 0.03;

  return (
    <group position={position}>
      {/* Speaker Spikes */}
      <mesh position={[0.22, 0.03, 0.22]}>
        <coneGeometry args={[0.015, 0.05, 4]} />
        <meshStandardMaterial color="#eaeaea" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.22, 0.03, 0.22]}>
        <coneGeometry args={[0.015, 0.05, 4]} />
        <meshStandardMaterial color="#eaeaea" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.22, 0.03, -0.22]}>
        <coneGeometry args={[0.015, 0.05, 4]} />
        <meshStandardMaterial color="#eaeaea" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.22, 0.03, -0.22]}>
        <coneGeometry args={[0.015, 0.05, 4]} />
        <meshStandardMaterial color="#eaeaea" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Main Cabinet Body with Subtle Bevel Corners */}
      <RoundedBox
        position={[0, 0.95, 0]}
        args={[0.42, 1.7, 0.42]}
        radius={0.012} // Subtle bevel modifier
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial 
          color={cabinetColor} 
          roughness={cabinetRoughness} 
          metalness={cabinetMetalness}
          clearcoat={cabinetClearcoat}
          clearcoatRoughness={cabinetClearcoatRoughness}
        />
      </RoundedBox>

      {/* Tweeter Solid Body (Mounted on top) */}
      <group position={[0, 1.9, 0.04]}>
        <mesh castShadow>
          <sphereGeometry args={[0.11, 32, 32]} />
          <meshPhysicalMaterial color="#111111" metalness={0.95} roughness={0.05} clearcoat={1.0} />
        </mesh>
        {/* Metal Accent Ring */}
        <mesh position={[0, 0, 0.10]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.015, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Tweeter Dome */}
        <mesh position={[0, 0, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.038, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
        </mesh>
      </group>

      {/* Midrange Driver (Recessed physical cone) */}
      <group position={[0, 1.45, 0.21]}>
        {/* Outer Beveled Metal Trim Ring */}
        <mesh rotation={[0, 0, 0]} position={[0, 0, 0.002]} castShadow>
          <torusGeometry args={[0.15, 0.006, 16, 64]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Recessed Acoustic Cone (inward physical slope) */}
        <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.05, 0.04, 32, 1, true]} />
          <meshStandardMaterial 
            color="#bca136" // Brushed bronze/gold
            metalness={0.85} 
            roughness={0.25} 
          />
        </mesh>
        {/* Inner Dust Cap / Sub-cone (seated neatly inside) */}
        <mesh position={[0, 0, -0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.032, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Phase Bullet */}
        <mesh position={[0, 0, -0.01]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <coneGeometry args={[0.02, 0.05, 16]} />
          <meshStandardMaterial color="#0c0c0c" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Bass Driver 1 (Recessed physical cone) */}
      <group position={[0, 1.0, 0.21]}>
        {/* Outer Beveled Metal Trim Ring */}
        <mesh rotation={[0, 0, 0]} position={[0, 0, 0.002]} castShadow>
          <torusGeometry args={[0.17, 0.006, 16, 64]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Recessed Acoustic Cone */}
        <mesh position={[0, 0, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.06, 0.05, 32, 1, true]} />
          <meshStandardMaterial 
            color="#181818" // Dark carbon fiber look
            metalness={0.8} 
            roughness={0.3} 
          />
        </mesh>
        {/* Large Central Dust Cap (seated flush) */}
        <mesh position={[0, 0, -0.038]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <sphereGeometry args={[0.045, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#080808" roughness={0.5} metalness={0.2} />
        </mesh>
      </group>

      {/* Bass Driver 2 (Recessed physical cone) */}
      <group position={[0, 0.55, 0.21]}>
        {/* Outer Beveled Metal Trim Ring */}
        <mesh rotation={[0, 0, 0]} position={[0, 0, 0.002]} castShadow>
          <torusGeometry args={[0.17, 0.006, 16, 64]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Recessed Acoustic Cone */}
        <mesh position={[0, 0, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.06, 0.05, 32, 1, true]} />
          <meshStandardMaterial 
            color="#181818" 
            metalness={0.8} 
            roughness={0.3} 
          />
        </mesh>
        {/* Large Central Dust Cap (seated flush) */}
        <mesh position={[0, 0, -0.038]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <sphereGeometry args={[0.045, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#080808" roughness={0.5} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Background Display Speakers
function BackgroundSpeaker({ position, isFloor }: { position: [number, number, number]; isFloor: boolean }) {
  return (
    <group position={position}>
      {isFloor ? (
        <mesh castShadow>
          <boxGeometry args={[0.35, 1.1, 0.35]} />
          <meshStandardMaterial color="#301f15" roughness={0.65} metalness={0.05} />
        </mesh>
      ) : (
        <group>
          {/* Metal Stand */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.9, 8]} />
            <meshStandardMaterial color="#222222" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.01, 0]} castShadow>
            <boxGeometry args={[0.3, 0.02, 0.3]} />
            <meshStandardMaterial color="#1c1c1c" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Speaker Box */}
          <mesh position={[0, 1.05, 0]} castShadow>
            <boxGeometry args={[0.26, 0.45, 0.26]} />
            <meshStandardMaterial color="#141414" roughness={0.75} metalness={0.1} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function SceneStudio({ scrollProxy, activeFinish }: SceneStudioProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentLookAt = useRef(new THREE.Vector3(0, 1.0, 0));
  
  // Load the skyline background texture
  const skylineTexture = useTexture("/dusk_skyline.png");

  useFrame((state) => {
    if (!scrollProxy || !scrollProxy.current) return;
    const p = scrollProxy.current.progress;

    // Camera keyframes along the scroll progress path
    const keyframes = [
      { pos: [0, 1.4, 4.0], look: [0, 1.0, 0] },       // Section 0: Hero Overview
      { pos: [0.55, 1.92, 1.3], look: [0.55, 1.95, 0.15] }, // Section 1: Tweeter zoom
      { pos: [-0.95, 1.0, 1.75], look: [-0.55, 0.9, 0.2] }, // Section 2: Woofer & Material finish detail
      { pos: [2.0, 1.2, 3.8], look: [-0.8, 1.0, 0] }      // Section 3: Technical Specs (pointing at turntable/amp)
    ];

    const numSegments = keyframes.length - 1;
    const scaledP = p * numSegments;
    const index = Math.min(Math.floor(scaledP), numSegments - 1);
    const segmentP = scaledP - index;

    // Cubic easing for segment transition
    const t = segmentP * segmentP * (3 - 2 * segmentP);

    const startFrame = keyframes[index];
    const endFrame = keyframes[index + 1];

    const targetCamX = THREE.MathUtils.lerp(startFrame.pos[0], endFrame.pos[0], t);
    const targetCamY = THREE.MathUtils.lerp(startFrame.pos[1], endFrame.pos[1], t);
    const targetCamZ = THREE.MathUtils.lerp(startFrame.pos[2], endFrame.pos[2], t);

    const targetLookX = THREE.MathUtils.lerp(startFrame.look[0], endFrame.look[0], t);
    const targetLookY = THREE.MathUtils.lerp(startFrame.look[1], endFrame.look[1], t);
    const targetLookZ = THREE.MathUtils.lerp(startFrame.look[2], endFrame.look[2], t);

    // Dynamic mouse look-around strength based on zoom
    const lookAroundFactor = Math.min(targetCamZ * 0.08, 0.25);
    const finalCamX = targetCamX + state.pointer.x * lookAroundFactor * 1.2;
    const finalCamY = targetCamY + state.pointer.y * lookAroundFactor * 0.8;
    const finalCamZ = targetCamZ;

    // Fluid camera interpolation dampening
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, finalCamX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, finalCamY, 0.04);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, finalCamZ, 0.04);

    // Interpolate camera target
    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, targetLookX, 0.04);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, targetLookY, 0.04);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, targetLookZ, 0.04);
    
    state.camera.lookAt(currentLookAt.current);

    // Gentle rotate of midground group on mouse pointer drift
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.04,
        0.04
      );
    }
  });

  return (
    <>
      {/* PBR Environmental Reflection preset */}
      <Environment preset="studio" />

      {/* Dramatic Studio Lighting Rig */}
      <ambientLight intensity={0.05} />
      
      {/* High-Contrast Directional Key Light from Upper Right */}
      <directionalLight
        position={[8, 10, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00005} // Erases pixelated shadow artifacts on speaker heads
      />
      
      {/* Tube Amp warm orange pointlight */}
      <pointLight position={[-3.2, 0.9, -0.6]} intensity={1.8} color="#ff5500" distance={3} decay={1.5} />
      
      {/* Warm Golden Glow representing back LED fixture glow */}
      <pointLight position={[0, 1.8, -4.0]} intensity={2.5} color="#d4af37" distance={6} decay={1.8} />

      {/* Main Studio Scene */}
      <group ref={groupRef} position={[0, -0.9, 0]}>
        
        {/* Concrete Back Wall with Vertical Architectural Seams */}
        <group position={[0, 2, -4.5]}>
          {/* Left concrete panel */}
          <mesh position={[-4.01, 0, 0]} receiveShadow>
            <planeGeometry args={[4.0, 4.0]} />
            <meshStandardMaterial color="#1f1f1f" roughness={0.9} metalness={0.1} />
          </mesh>
          {/* Center concrete panel */}
          <mesh position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[3.98, 4.0]} />
            <meshStandardMaterial color="#222222" roughness={0.85} metalness={0.1} />
          </mesh>
          {/* Right concrete panel */}
          <mesh position={[4.01, 0, 0]} receiveShadow>
            <planeGeometry args={[4.0, 4.0]} />
            <meshStandardMaterial color="#1f1f1f" roughness={0.9} metalness={0.1} />
          </mesh>
        </group>

        {/* Back Wall Acoustic Panel */}
        <RoundedBox 
          position={[0, 1.8, -4.43]} 
          args={[5.5, 2.3, 0.06]} 
          radius={0.18} 
          smoothness={4}
          castShadow 
          receiveShadow
        >
          <meshStandardMaterial color="#161616" roughness={0.95} />
        </RoundedBox>
        
        {/* Back Wall Recessed LED Light Fixture Frame */}
        <RoundedBox 
          position={[0, 1.8, -4.44]} 
          args={[5.6, 2.4, 0.04]} 
          radius={0.19} 
          smoothness={4}
        >
          <meshStandardMaterial 
            color="#d4af37" 
            emissive="#d4af37" 
            emissiveIntensity={3.5} 
            toneMapped={false} 
          />
        </RoundedBox>

        {/* Left Wall Wood Slats Panel */}
        <group position={[-5, 0, 0]}>
          {/* Base Wall */}
          <mesh position={[-0.05, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
            <planeGeometry args={[10, 4]} />
            <meshStandardMaterial color="#181818" roughness={0.9} />
          </mesh>
          {/* Individual Slats */}
          {Array.from({ length: 15 }).map((_, i) => (
            <mesh key={i} position={[0, 2, -2.5 + i * 0.35]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 4.0, 0.12]} />
              <meshStandardMaterial color="#33251c" roughness={0.7} />
            </mesh>
          ))}
        </group>

        {/* Right Wall Window + Skyline Backdrop */}
        <group position={[5, 0, 0]}>
          {/* Window Frame Verticals */}
          <mesh position={[0, 2, -4.5]} castShadow>
            <boxGeometry args={[0.1, 4.0, 0.1]} />
            <meshStandardMaterial color="#111111" metalness={0.8} />
          </mesh>
          <mesh position={[0, 2, 0.5]} castShadow>
            <boxGeometry args={[0.1, 4.0, 0.1]} />
            <meshStandardMaterial color="#111111" metalness={0.8} />
          </mesh>
          <mesh position={[0, 2, 4.5]} castShadow>
            <boxGeometry args={[0.1, 4.0, 0.1]} />
            <meshStandardMaterial color="#111111" metalness={0.8} />
          </mesh>
          {/* Window Frame Horizontals */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[0.1, 0.05, 9.0]} />
            <meshStandardMaterial color="#111111" metalness={0.8} />
          </mesh>
          <mesh position={[0, 3.95, 0]} castShadow>
            <boxGeometry args={[0.1, 0.1, 9.0]} />
            <meshStandardMaterial color="#111111" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.1, 0.1, 9.0]} />
            <meshStandardMaterial color="#111111" metalness={0.8} />
          </mesh>

          {/* Dusk Skyline Background plane (placed far outside) */}
          <mesh position={[1.8, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[14, 6]} />
            <meshBasicMaterial map={skylineTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* Left Side Raw Charcoal Slate / Architectural Concrete Bench */}
        <group position={[-3.2, 0.35, -0.5]}>
          {/* Bench Concrete Slab */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.65, 3.0]} />
            <meshStandardMaterial color="#1e1e1e" roughness={0.85} metalness={0.15} />
          </mesh>
          {/* Bench raw steel supports */}
          <mesh position={[-0.53, -0.4, 1.3]} castShadow>
            <boxGeometry args={[0.06, 0.45, 0.06]} />
            <meshStandardMaterial color="#2d2d2d" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0.53, -0.4, 1.3]} castShadow>
            <boxGeometry args={[0.06, 0.45, 0.06]} />
            <meshStandardMaterial color="#2d2d2d" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[-0.53, -0.4, -1.3]} castShadow>
            <boxGeometry args={[0.06, 0.45, 0.06]} />
            <meshStandardMaterial color="#2d2d2d" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0.53, -0.4, -1.3]} castShadow>
            <boxGeometry args={[0.06, 0.45, 0.06]} />
            <meshStandardMaterial color="#2d2d2d" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Premium Brushed Aluminum Turntable */}
          <group position={[0, 0.355, 0.5]}>
            {/* Plinth */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.06, 0.5]} />
              <meshStandardMaterial color="#1c1c1c" roughness={0.4} metalness={0.6} />
            </mesh>
            {/* Platter */}
            <mesh position={[0, 0.045, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.03, 32]} />
              <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Tonearm */}
            <mesh position={[0.15, 0.06, -0.15]} rotation={[0, -Math.PI / 6, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.25, 8]} />
              <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.05} />
            </mesh>
          </group>

          {/* Premium PBR Tube Amplifier */}
          <group position={[0, 0.355, -0.7]}>
            {/* Chassis */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.06, 0.55]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.15} />
            </mesh>
            {/* Brushed Aluminum Faceplate */}
            <mesh position={[0, 0, 0.276]} castShadow>
              <boxGeometry args={[0.58, 0.08, 0.005]} />
              <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.25} />
            </mesh>
            {/* Transformers */}
            <mesh position={[-0.18, 0.11, -0.15]} castShadow>
              <boxGeometry args={[0.2, 0.16, 0.25]} />
              <meshStandardMaterial color="#0a0a0a" metalness={0.75} roughness={0.25} />
            </mesh>
            <mesh position={[0.18, 0.11, -0.15]} castShadow>
              <boxGeometry args={[0.2, 0.16, 0.25]} />
              <meshStandardMaterial color="#0a0a0a" metalness={0.75} roughness={0.25} />
            </mesh>
            {/* McIntosh Blue VU Meters */}
            <mesh position={[-0.14, 0.01, 0.279]} castShadow>
              <planeGeometry args={[0.12, 0.045]} />
              <meshBasicMaterial color="#00a0ff" toneMapped={false} />
            </mesh>
            <mesh position={[0.14, 0.01, 0.279]} castShadow>
              <planeGeometry args={[0.12, 0.045]} />
              <meshBasicMaterial color="#00a0ff" toneMapped={false} />
            </mesh>
            {/* Gold-tinted bezels around VU meters */}
            <mesh position={[-0.14, 0.01, 0.278]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.05, 0.004, 8, 32]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.14, 0.01, 0.278]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.05, 0.004, 8, 32]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Vacuum Tubes */}
            {[-0.2, -0.06, 0.06, 0.2].map((xOffset, i) => (
              <group key={i} position={[xOffset, 0.03, 0.08]}>
                {/* Tube Socket Base */}
                <mesh position={[0, 0.005, 0]} castShadow>
                  <cylinderGeometry args={[0.024, 0.024, 0.01, 16]} />
                  <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
                </mesh>
                {/* Internal Plate */}
                <mesh position={[0, 0.025, 0]} castShadow>
                  <boxGeometry args={[0.012, 0.03, 0.012]} />
                  <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.3} />
                </mesh>
                {/* Glowing Filament */}
                <mesh position={[0, 0.025, 0]}>
                  <cylinderGeometry args={[0.003, 0.003, 0.03, 8]} />
                  <meshStandardMaterial 
                    color="#ff5500" 
                    emissive="#ff5500" 
                    emissiveIntensity={4.5} 
                    toneMapped={false}
                  />
                </mesh>
                {/* Glass Envelope Mesh */}
                <mesh position={[0, 0.035, 0]} castShadow>
                  <cylinderGeometry args={[0.02, 0.02, 0.06, 16]} />
                  <meshPhysicalMaterial 
                    color="#ffffff" 
                    transparent 
                    opacity={0.18} 
                    roughness={0.05} 
                    metalness={0.1}
                    transmission={0.9}
                    thickness={0.02}
                  />
                </mesh>
                {/* Tube Glow Pointlight */}
                <pointLight position={[0, 0.025, 0]} intensity={0.35} color="#ff5500" distance={0.5} decay={2.0} />
              </group>
            ))}
          </group>
        </group>

        {/* Central Display Platform (White Marble) */}
        <mesh position={[0, 0.05, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.0, 0.1, 1.2]} />
          <meshStandardMaterial color="#eaeaea" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Two Bowers & Wilkins Speakers standing side-by-side */}
        <Speaker activeFinish={activeFinish} position={[-0.55, 0.1, 0]} />
        <Speaker activeFinish={activeFinish} position={[0.55, 0.1, 0]} />

        {/* Background Speakers for room depth */}
        <BackgroundSpeaker position={[-2.5, 0, -3.2]} isFloor={false} />
        <BackgroundSpeaker position={[2.5, 0, -3.2]} isFloor={false} />
        <BackgroundSpeaker position={[3.5, 0, -2.6]} isFloor={true} />
        
        {/* Floor Plane contact shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#121212" roughness={0.5} metalness={0.2} />
        </mesh>
      </group>
    </>
  );
}

