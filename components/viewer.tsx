import {Canvas} from '@react-three/fiber'

import {Scene} from './scene'

const Viewer = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <Canvas
          resize={{scroll: false}}
          frameloop="demand"
          performance={{current: 1, min: 0.1, max: 1, debounce: 200}}
        >
          <Scene />
        </Canvas>
      </div>
    </div>
  )
}

export default Viewer
