import { Canvas } from '@react-three/fiber'
import './styles.css'
import { Box, Center, Environment, OrbitControls, Plane, SpotLight, BakeShadows } from '@react-three/drei'
import TheThing from './components/TheThing'
import { DoubleSide, PCFSoftShadowMap, PointLight, sRGBEncoding, Vector3 } from 'three'
import { Jar } from './components/Jar'
import { useEffect, useRef } from 'react'

const Scene = () => {
  return (
    <>
      <Center>
        <Jar>
          <TheThing position={[0, 0.7, 0]} />
        </Jar>
        <Plane args={[10, 10, 10]} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
          <meshStandardMaterial color={'#383232'} side={DoubleSide} />
        </Plane>
      </Center>
    </>
  )
}

export default function App() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 2, 10], fov: 60, zoom: 3 }}
      shadows
      onCreated={({ gl: renderer }) => {
        renderer.physicallyCorrectLights = true
        renderer.outputEncoding = sRGBEncoding
        renderer.shadowMap.type = PCFSoftShadowMap
      }}
    >
      <color attach="background" args={['#202020']} />
      <directionalLight position={[10, 10, 12]} intensity={1.5} castShadow />

      <pointLight position={[0.5, 0.5, 0.75]} intensity={1.75} castShadow />
      <pointLight position={[-0.5, 0.0, 0.75]} intensity={1.75} castShadow />

      <Environment preset="night" />
      <Scene />
      {/* <BakeShadows /> */}
      <OrbitControls />
    </Canvas>
  )
}
