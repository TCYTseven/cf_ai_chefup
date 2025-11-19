"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function ChefHat(props: any) {
    const group = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((state) => {
        if (group.current) {
            // Gentle floating rotation
            group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;

            // Shake effect when active (clicked)
            if (active) {
                group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 20) * 0.2;
            } else {
                group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0, 0.1);
            }
        }
    });

    return (
        <group
            ref={group}
            {...props}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onClick={() => {
                setActive(true);
                props.onShake && props.onShake();
                setTimeout(() => setActive(false), 1000);
            }}
        >
            {/* Base of the hat */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[1, 1, 1.5, 32]} />
                <meshStandardMaterial color="white" roughness={0.3} />
            </mesh>

            {/* Rim */}
            <mesh position={[0, -0.7, 0]}>
                <torusGeometry args={[1.1, 0.1, 16, 100]} />
                <meshStandardMaterial color="#eee" roughness={0.3} />
            </mesh>

            {/* Poofy Top - made of multiple spheres */}
            <group position={[0, 0.8, 0]}>
                <mesh position={[0, 0, 0]} scale={[1.2, 0.8, 1.2]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="white" roughness={0.3} />
                </mesh>
                {/* Extra poofs for detail */}
                <mesh position={[0.8, 0.2, 0]} scale={[0.6, 0.6, 0.6]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="white" roughness={0.3} />
                </mesh>
                <mesh position={[-0.8, 0.2, 0]} scale={[0.6, 0.6, 0.6]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="white" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.2, 0.8]} scale={[0.6, 0.6, 0.6]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="white" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.2, -0.8]} scale={[0.6, 0.6, 0.6]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="white" roughness={0.3} />
                </mesh>
            </group>
        </group>
    );
}

export default function Scene3D({ onShake }: { onShake?: () => void }) {
    return (
        <div className="w-full h-[400px] cursor-pointer">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                dpr={[1, 2]}
                gl={{
                    powerPreference: "default",
                    preserveDrawingBuffer: true,
                    antialias: true
                }}
                resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
            >
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ChefHat onShake={onShake} />
                </Float>

                <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
                <Environment preset="city" />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
