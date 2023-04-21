import {Decal, Environment, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef, useState } from "react";

let refreshColor;
const Shirt3d = () => {
    const group = useRef();
    const fullTexture = useTexture('/threejs.png');
//   const shirt = useGLTF("/shirt_baked.glb");
const {nodes, materials}= useGLTF("/shirt_baked.glb");
  useFrame((state, delta) => {
    // easing.damp3(state.camera.position,[10,0,0],0.5, delta);
//   })
    easing.dampE(
    group.current.rotation,
    [state.pointer.y / 10, -state.pointer.x / 5, 0],
    0.25,
    delta
    )

    easing.dampC(materials.lambert1.color,  [0,1,0], 0.5, delta)
    });

    // useFrame((state, delta) => {
    //     easing.dampC(materials.lambert1.color,  { r: 255, g: 255, b: 0 }, 0.25, delta)
    // })

  return <group>
  <mesh geometry={nodes.T_Shirt_male.geometry}
  material={materials.lambert1} ref={group}>
    <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={0.5}
            map={fullTexture}
          />
  </mesh>
  </group>
};


const Hero = () => {
    const [_, setRefreshComponent] = useState(false);
  return (
    <div style={{ width: "100%", height: "50vh", border: "2px solid red" }}>
      <Canvas camera={{ position: [5, 0, 0], fov: 45 }} gl={{preserveDrawingBuffer:true}}>
        <OrbitControls maxPolarAngle={Math.PI/2} minPolarAngle={Math.PI/2} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="city" />
          <mesh scale={5} >
            <meshBasicMaterial />
            <Shirt3d />
            {/* <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={refreshColor?refreshColor:undefined} /> */}
          </mesh>
      </Canvas>
      {/* <button onClick={() => setRefreshComponent(()=>refreshColor=useTexture('/threejs.png')) }>Click</button> */}
    </div>
  );
};

export default Hero;
