import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import * as THREE from "three";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAGV,
  selectAllAGVs,
  selectSelectedAGV,
} from "../store/agvsSlice";
import { makeTextSprite } from "../utils";

const MapDisplay = () => {
  const dispatch = useDispatch();
  const agvs = useSelector(selectAllAGVs);
  const selectedAGV = useSelector(selectSelectedAGV);

  const camera = {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: [0, 10, 0],
    up: [0, 0, 1],
  };

  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);

  return (
    <div className="w-4/5 h-screen bg-gray-50">
      <Canvas camera={camera}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* Grid */}
        <primitive object={gridHelper} position={[0, 0, 0]} />

        {/* AGVs */}
        {agvs.map((agv) => (
          <group position={agv.position} key={agv.id}>
            <Box
              args={[1, 0.01, 1]}
              onClick={() => dispatch(selectAGV(agv.id))}
            >
              <meshStandardMaterial
                color={
                  agv.id === selectedAGV
                    ? "#EF4444" // Tailwind color: 'red-500'
                    : agv.batteryLevel === 0
                    ? "#4B5563" // Tailwind color: 'gray-700'
                    : "#60A5FA" // Tailwind color: 'blue-300'
                }
              />
            </Box>
            <sprite position={[0, 0.1, 0]}>
              <spriteMaterial attach="material" map={makeTextSprite(agv.id)} />
            </sprite>
          </group>
        ))}

        <OrbitControls
          target={[0, 0, 0]}
          enableZoom={true}
          enableRotate={false}
          enablePan={true}
        />
      </Canvas>
    </div>
  );
};

export default MapDisplay;
