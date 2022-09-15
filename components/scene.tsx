import {extend, invalidate, useFrame, useThree} from '@react-three/fiber'
import CameraControls from 'camera-controls'
import {FC, useMemo, useRef} from 'react'
import * as THREE from 'three'

import {Object} from './object'

CameraControls.install({THREE})

extend({CameraControls})

export const Scene: FC = () => {
  const defaultCamera = useThree(({camera}) => camera)
  const gl = useThree(({gl}) => gl)
  const controlRef = useRef()

  const controls = useMemo(
    () => new CameraControls(defaultCamera, gl.domElement),
    [defaultCamera, gl.domElement],
  )

  useFrame((_state, delta) => {
    const hasControlsUpdated = controls.update(delta)
    if (hasControlsUpdated) invalidate()
  })

  return (
    <>
      <Object controls={controls} />
      <primitive ref={controlRef} object={controls} />
    </>
  )
}
