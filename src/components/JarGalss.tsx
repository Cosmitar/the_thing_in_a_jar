import { MeshTransmissionMaterial } from '@react-three/drei'

const config = {
  meshPhysicalMaterial: false,
  transmissionSampler: false,
  backside: false,
  samples: 10,
  resolution: 2048,
  transmission: 1,
  roughness: 0.0,
  thickness: 0.71,
  ior: 1.5,
  chromaticAberration: 0.06,
  anisotropy: 0.1,
  distortion: 0.0,
  distortionScale: 0.3,
  temporalDistortion: 0.5,
  clearcoat: 1,
  attenuationDistance: 0.5,
  attenuationColor: '#ffffff',
  color: '#7f97c7',
  bg: '#484848',
}

export default function JarGlass() {
  return (
    <group dispose={null}>
      <mesh position={[-0, 0.38, -0]}>
        <cylinderGeometry args={[1.5, 1.5, 3, 50, 50]} />
        {config.meshPhysicalMaterial ? (
          <meshPhysicalMaterial {...config} />
        ) : (
          <MeshTransmissionMaterial  {...config} />
        )}
      </mesh>
      {/* <Guts /> */}
    </group>
  )
}
