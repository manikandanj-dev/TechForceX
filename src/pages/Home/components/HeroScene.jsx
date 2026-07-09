import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import * as THREE from 'three'

function FloatingObject({ color, geometry = 'icosahedron', position, scale = 1, speed = 1 }) {
  const meshRef = useRef(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const elapsed = clock.getElapsedTime()
    meshRef.current.rotation.x = elapsed * 0.18 * speed
    meshRef.current.rotation.y = elapsed * 0.26 * speed
  })

  return (
    <Float speed={1.4 * speed} rotationIntensity={0.85} floatIntensity={1.4} position={position}>
      <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
        {geometry === 'torus' ? (
          <torusKnotGeometry args={[0.72, 0.22, 112, 18]} />
        ) : (
          <icosahedronGeometry args={[1, 5]} />
        )}
        <MeshDistortMaterial
          color={color}
          roughness={0.24}
          metalness={0.58}
          distort={0.22}
          speed={1.7}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  )
}

function ParticleField({ count }) {
  const pointsRef = useRef(null)
  const positions = useMemo(() => {
    const coordinates = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      const horizontalOffset = Math.sin(index * 12.9898) * 43758.5453
      const verticalOffset = Math.sin(index * 78.233) * 24634.6345
      const depthOffset = Math.sin(index * 37.719) * 12515.8732
      coordinates[index * 3] = (horizontalOffset - Math.floor(horizontalOffset) - 0.5) * 16
      coordinates[index * 3 + 1] = (verticalOffset - Math.floor(verticalOffset) - 0.5) * 9
      coordinates[index * 3 + 2] = (depthOffset - Math.floor(depthOffset) - 0.5) * 8
    }
    return coordinates
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.025
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8dd8c9"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function AnimatedLights() {
  const lightRef = useRef(null)

  useFrame(({ clock }) => {
    if (!lightRef.current) return
    const elapsed = clock.getElapsedTime()
    lightRef.current.position.x = Math.sin(elapsed * 0.7) * 3.2
    lightRef.current.position.y = 2.6 + Math.cos(elapsed * 0.55) * 1.1
    lightRef.current.intensity = 2.2 + Math.sin(elapsed * 1.1) * 0.6
  })

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[-4, 5, 4]} intensity={1.2} />
      <pointLight
        ref={lightRef}
        color="#72f1d5"
        position={[2, 3, 4]}
        intensity={2.5}
        distance={9}
      />
    </>
  )
}

function CameraRig({ isMobile }) {
  const target = useMemo(() => new THREE.Vector3(0, 0.1, 0), [])

  useFrame(({ camera, pointer }) => {
    const cameraDepth = isMobile ? 8.3 : 7.1
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.035)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.35 + pointer.y * 0.45, 0.035)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraDepth, 0.025)
    camera.lookAt(target)
  })

  return null
}

function SceneContent({ isMobile, mode }) {
  const primaryColor = mode === 'dark' ? '#64ffda' : '#0f9f8f'
  const secondaryColor = mode === 'dark' ? '#ffb86b' : '#ec6f45'

  return (
    <>
      <CameraRig isMobile={isMobile} />
      <AnimatedLights />
      <ParticleField count={isMobile ? 120 : 260} />
      <Sparkles
        count={isMobile ? 28 : 52}
        scale={[8, 4.8, 4]}
        size={1.4}
        speed={0.35}
        color={primaryColor}
        opacity={0.4}
      />
      <FloatingObject
        color={primaryColor}
        position={isMobile ? [1.75, 1.05, -1.3] : [1.7, 0.55, 0]}
        scale={isMobile ? 0.58 : 1.25}
      />
      <FloatingObject
        color={secondaryColor}
        geometry="torus"
        position={isMobile ? [2.2, -2.35, -1.8] : [2.45, -1.35, -1.4]}
        scale={isMobile ? 0.3 : 0.72}
        speed={0.8}
      />
      {!isMobile && (
        <FloatingObject color="#3d7eff" position={[3.05, -1.55, -2.25]} scale={0.62} speed={1.15} />
      )}
      <Environment preset="city" />
    </>
  )
}

export function HeroScene() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const dpr = isMobile ? [1, 1.35] : [1, 1.75]

  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: [0, 0.4, isMobile ? 8.3 : 7.1], fov: isMobile ? 48 : 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <SceneContent isMobile={isMobile} mode={theme.palette.mode} />
      </Suspense>
    </Canvas>
  )
}

export default HeroScene
