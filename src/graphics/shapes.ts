import { Graphics } from "pixi.js"

export interface Point {
  x: number
  y: number
}

const EDGE_THICKNESS = 4

export const getRadAngleBetweenPoints = (a: Point, b: Point): number => {
  return Math.atan2(b.y - a.y, b.x - a.x)
}

export const getDistanceBetweenPoints = (a: Point, b: Point): number => {
  const width = b.x - a.x
  const height = b.y - a.y
  return Math.sqrt(width ** 2 + height ** 2)
}

export const createDirectionalTriangle = (side: number, x: number, y: number, rotation: number): Graphics => {
  const halfSide = side / 2
  const height = side
  const width = Math.sqrt(side ** 2 - halfSide ** 2)

  const triangle = new Graphics()
  triangle.beginFill()
  triangle.lineStyle(2, 0xFF3300, 1)
  triangle.moveTo(0, 0)
  triangle.lineTo(width, halfSide)
  triangle.lineTo(0, height)
  triangle.lineTo(0, 0)
  triangle.closePath()
  triangle.endFill()
  triangle.beginFill()
  triangle.lineStyle(2, 0x000000, 1)
  triangle.moveTo(0, height * 0.2)
  triangle.lineTo(0, height * 0.8)
  triangle.endFill()
  triangle.pivot.set(0, 5)
  triangle.x = x
  triangle.y = x
  triangle.rotation = rotation
  
  triangle.interactive = true

  return triangle
}

export const createVertex = (x: number, y: number): Graphics => {
  const vertex = new Graphics()
  vertex.beginFill(0xFEEB77, 1)
  vertex.drawCircle(0, 0, 12)
  vertex.endFill()

  vertex.beginFill(0x650A5A, 1)
  vertex.drawCircle(0, 0, 10)
  vertex.endFill()

  vertex.position.set(x, y)

  vertex.interactive = true
  vertex.on('click', (e) => {
    console.log('vertex clicked');
  })

  vertex.on('pointerover', (e) =>  vertex.alpha = 0.5)
  vertex.on('pointerout', (e) => vertex.alpha = 1)

  return vertex
}

export const createEdge = (from: Point, to: Point): Graphics => {
  const width = getDistanceBetweenPoints(from, to)

  const edge = new Graphics()
  edge.beginFill(0xFEEB77)
  edge.drawRect(0, 0, width, EDGE_THICKNESS)
  edge.endFill()
  edge.pivot.set(0, EDGE_THICKNESS / 2)
  edge.position.set(from.x, from.y)
  edge.rotation = getRadAngleBetweenPoints(from, to)
  
  edge.interactive = true
  edge.on('click', (e) => {
    console.log('edge clicked');
  })
  
  edge.on('pointerover', (e) =>  edge.alpha = 0.5)
  edge.on('pointerout', (e) => edge.alpha = 1)

  return edge
}