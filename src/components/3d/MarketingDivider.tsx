import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Growth Arrow Component
const GrowthArrow = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Arrow shaft */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Arrow head */}
      <mesh position={[0, 0.15, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.25, 0.4, 4]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
};

// Analytics Bar Chart Component
const BarChart = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bars = useMemo(() => [
    { height: 0.4, x: -0.3 },
    { height: 0.7, x: 0 },
    { height: 0.55, x: 0.3 },
    { height: 0.9, x: 0.6 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {bars.map((bar, i) => (
        <Float key={i} speed={2} rotationIntensity={0} floatIntensity={0.3}>
          <mesh position={[bar.x, bar.height / 2, 0]}>
            <boxGeometry args={[0.2, bar.height, 0.2]} />
            <meshStandardMaterial 
              color={i === bars.length - 1 ? "#2dd4bf" : "#1e3a5f"} 
              metalness={0.4} 
              roughness={0.3} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Target/Bullseye Component
const Target = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <torusGeometry args={[0.5, 0.08, 16, 32]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.3, 0.06, 16, 32]} />
        <meshStandardMaterial color="#2dd4bf" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#2dd4bf" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Megaphone Component (Marketing Symbol)
const Megaphone = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={[0, 0, -0.3]}>
      <mesh>
        <coneGeometry args={[0.4, 0.8, 32]} />
        <meshStandardMaterial color="#2dd4bf" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[-0.5, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.25, 16]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
};

// Connection Nodes (Network/Social Component)
const NetworkNodes = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => [
    { pos: [0, 0, 0] as [number, number, number], size: 0.12 },
    { pos: [0.4, 0.3, 0] as [number, number, number], size: 0.08 },
    { pos: [-0.3, 0.4, 0] as [number, number, number], size: 0.1 },
    { pos: [0.5, -0.2, 0] as [number, number, number], size: 0.06 },
    { pos: [-0.4, -0.3, 0] as [number, number, number], size: 0.08 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {nodes.map((node, i) => (
        <Float key={i} speed={1.5} floatIntensity={0.2}>
          <mesh position={node.pos}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial 
              color={i === 0 ? "#2dd4bf" : "#1e3a5f"} 
              metalness={0.5} 
              roughness={0.2} 
            />
          </mesh>
        </Float>
      ))}
      {/* Connection lines */}
      {nodes.slice(1).map((node, i) => (
        <line key={`line-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                ...nodes[0].pos,
                ...node.pos
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#2dd4bf" opacity={0.5} transparent />
        </line>
      ))}
    </group>
  );
};

// Scene wrapper for each divider type
interface MarketingDividerProps {
  variant: 'growth' | 'analytics' | 'target' | 'megaphone' | 'network';
  className?: string;
}

const Scene = ({ variant }: { variant: MarketingDividerProps['variant'] }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#2dd4bf" />
      
      {variant === 'growth' && (
        <>
          <GrowthArrow position={[-1.5, 0, 0]} color="#2dd4bf" />
          <GrowthArrow position={[0, 0.2, 0]} color="#1e3a5f" />
          <GrowthArrow position={[1.5, 0.4, 0]} color="#2dd4bf" />
        </>
      )}
      {variant === 'analytics' && <BarChart position={[0, -0.3, 0]} />}
      {variant === 'target' && <Target position={[0, 0, 0]} />}
      {variant === 'megaphone' && <Megaphone position={[0, 0, 0]} />}
      {variant === 'network' && <NetworkNodes position={[0, 0, 0]} />}
    </>
  );
};

const MarketingDivider = ({ variant, className = '' }: MarketingDividerProps) => {
  return (
    <div className={`h-32 w-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <Scene variant={variant} />
      </Canvas>
    </div>
  );
};

export default MarketingDivider;
