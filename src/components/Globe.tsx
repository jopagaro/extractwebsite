import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'
import * as d3geo from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
// @ts-ignore — world-atlas has no type declarations
import worldData from 'world-atlas/countries-110m.json'

function buildGlobeTexture(): THREE.CanvasTexture {
  const W = 2048
  const H = 1024
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Ocean — bone dark
  ctx.fillStyle = '#EAE4D6'
  ctx.fillRect(0, 0, W, H)

  // Land — stone color
  const projection = d3geo
    .geoEquirectangular()
    .scale(H / Math.PI)
    .translate([W / 2, H / 2])

  const path = d3geo.geoPath(projection, ctx)

  const countries = feature(
    worldData as unknown as Topology,
    worldData.objects.countries as GeometryCollection
  )

  ctx.beginPath()
  path(countries)
  ctx.fillStyle = '#9E9890'
  ctx.fill()

  // Subtle country borders
  ctx.beginPath()
  path(countries)
  ctx.strokeStyle = '#CEC8BA'
  ctx.lineWidth = 1.2
  ctx.stroke()

  return new THREE.CanvasTexture(canvas)
}

function GlobeModel() {
  const groupRef = useRef<THREE.Group>(null)
  const texture = useMemo(() => buildGlobeTexture(), [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.16
    }
  })

  return (
    <group ref={groupRef}>
      {/* Textured sphere — land masses */}
      <Sphere args={[1.6, 64, 40]}>
        <meshStandardMaterial
          map={texture}
          roughness={1}
          metalness={0}
        />
      </Sphere>

      {/* Wireframe overlay for the grid effect */}
      <Sphere args={[1.605, 28, 18]}>
        <meshBasicMaterial
          color="#CEC8BA"
          wireframe
          transparent
          opacity={0.25}
        />
      </Sphere>

      {/* Equatorial ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.62, 0.004, 2, 100]} />
        <meshBasicMaterial color="#9E9890" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 2, 4]} intensity={0.4} />
      <GlobeModel />
    </Canvas>
  )
}
