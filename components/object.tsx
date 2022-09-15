import {Environment, OrthographicCamera, useGLTF} from '@react-three/drei'
import {applyProps, invalidate, useThree} from '@react-three/fiber'
import CameraControls from 'camera-controls'
import {FC, useEffect, useLayoutEffect, useRef} from 'react'
import * as THREE from 'three'

interface Props {
  controls: CameraControls
}

export const Object: FC<Props> = ({controls}) => {
  const orthoCam = useRef<THREE.OrthographicCamera>()
  const {set} = useThree(({set}) => ({set}))

  const {scene, materials} = useGLTF(
    'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/suzanne-high-poly/model.gltf',
  ) as any

  const reRenderNeeded = () => {
    invalidate()
  }

  /**
   * Manually trigger re-rendering when orbit control changes
   * https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance#triggering-manual-frames
   */
  useLayoutEffect(() => {
    if (controls) {
      controls.addEventListener('update', reRenderNeeded)
      controls.addEventListener('control', reRenderNeeded)
    }

    return () => {
      if (controls) {
        controls.removeEventListener('update', reRenderNeeded)
        controls.removeEventListener('control', reRenderNeeded)
      }
    }
  })

  useLayoutEffect(() => {
    scene.traverse((obj: any) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true))
    applyProps(materials.default, {color: 'white'})
  })

  useEffect(() => {
    set({camera: orthoCam.current!})

    const mesh: THREE.Mesh = scene.children[0]

    const boundingBox = new THREE.Box3().setFromObject(mesh)
    const xSize = boundingBox.max.x - boundingBox.min.x
    const ySize = boundingBox.max.y - boundingBox.min.y
    const zSize = boundingBox.max.z - boundingBox.min.z
    const maxSize = Math.max(xSize, ySize, zSize)

    orthoCam.current!.far = maxSize * 100
    orthoCam.current!.near = maxSize * 0.00001

    const center = new THREE.Vector3()
    boundingBox.getCenter(center)

    const padding = maxSize * 0.3
    controls.fitToBox(boundingBox, false, {
      paddingLeft: padding,
      paddingRight: padding,
      paddingBottom: padding,
      paddingTop: padding,
    })

    // order of those methods below was the fix!
    controls.moveTo(center.x, center.y, maxSize)
    controls.setTarget(center.x, center.y, center.z)

    controls.rotateTo(Math.PI * 0.25, Math.PI * 0.25)

    invalidate()
  }, [set, controls, scene])

  // useLayoutEffect(() => {
  //   setTimeout(() => {
  //     controls.rotateTo(Math.PI * 0.25, Math.PI * 0.25)
  //     invalidate()
  //   }, 1000)
  // })

  return (
    <group>
      <OrthographicCamera ref={orthoCam} />
      <ambientLight />
      <primitive object={scene} />
      <Environment preset="city" />
    </group>
  )
}
