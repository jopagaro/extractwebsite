import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import * as d3geo from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
// @ts-ignore
import worldData from 'world-atlas/countries-110m.json'

const RADIUS = 1.55
const DOT_SIZE = 0.013
const GRID_DEG = 2.2   // degrees between dot samples

function latLonTo3D(lat: number, lon: number, r: number): [number, number, number] {
  const phi   = (90 - lat)  * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return [
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  ]
}

function useLandPositions() {
  return useMemo(() => {
    const land = feature(
      worldData as unknown as Topology,
      (worldData as { objects: { land: GeometryCollection } }).objects.land as GeometryCollection
    )
    const pts: [number, number, number][] = []
    for (let lat = -90; lat <= 90; lat += GRID_DEG) {
      for (let lon = -180; lon <= 180; lon += GRID_DEG) {
        if (d3geo.geoContains(land, [lon, lat])) {
          pts.push(latLonTo3D(lat, lon, RADIUS))
        }
      }
    }
    return pts
  }, [])
}

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null)
  const landPts   = useLandPositions()

  const dotGeo = useMemo(() => new THREE.SphereGeometry(DOT_SIZE, 5, 5), [])
  const dotMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#7A7068' }), [])

  const instanced = useMemo(() => {
    const mesh = new THREE.InstancedMesh(dotGeo, dotMat, landPts.length)
    const m = new THREE.Matrix4()
    landPts.forEach(([x, y, z], i) => {
      m.setPosition(x, y, z)
      mesh.setMatrixAt(i, m)
    })
    mesh.instanceMatrix.needsUpdate = true
    return mesh
  }, [landPts, dotGeo, dotMat])

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.14
  })

  return (
    <group ref={groupRef}>
      {/* Subtle ocean sphere */}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 40]} />
        <meshBasicMaterial color="#E8E2D6" transparent opacity={0.18} />
      </mesh>

      {/* Land dots */}
      <primitive object={instanced} />

      {/* Grid lines */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.003, 26, 16]} />
        <meshBasicMaterial color="#CEC8BA" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Equatorial ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS + 0.012, 0.004, 2, 120]} />
        <meshBasicMaterial color="#B0A898" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

export default function Globe() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 4.0], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <GlobeScene />
      </Canvas>
    </div>
  )
}
