/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import JarGlass from './JarGalss'

type GLTFResult = GLTF & {
  nodes: {
    BezierCurve_Material002_0: THREE.Mesh
    BezierCurve001_Material002_0: THREE.Mesh
    cerveau_Material_0: THREE.Mesh
    Circle_Material003_0: THREE.Mesh
    Circle001_Material003_0: THREE.Mesh
    Cube001_Material_0: THREE.Mesh
    Cylinder_Material001_0: THREE.Mesh
  }
  materials: {
    ['Material.004']: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
  }
}

export function Jar(allProps: JSX.IntrinsicElements['group']) {
  // @ts-ignore investigate what's typescript disliking here
  const { nodes, materials } = useGLTF('/assets/jar.gltf') as GLTFResult
  const { children, ...props } = allProps

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.1}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve_Material002_0.geometry}
              material={materials['Material.004']}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve001_Material002_0.geometry}
              material={materials['Material.004']}
            />
          </group>
          <group position={[0, 678.72, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={25.07}>
            {/* <mesh
              castShadow
              receiveShadow
              geometry={nodes.cerveau_Material_0.geometry}
              material={materials['Material.001']}
            /> */}
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={590.64}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_Material003_0.geometry}
              material={materials['Material.003']}
            />
          </group>
          <group position={[0, 1258.13, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={494.45}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle001_Material003_0.geometry}
              material={materials['Material.003']}
            />
          </group>

          <group position={[0, 809.77, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.55}>
            <group position={[0, 0, 100]} rotation={[-Math.PI / 2, 0, 0]} scale={201.71}>
              <JarGlass />
              {children}
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/jar.gltf')
