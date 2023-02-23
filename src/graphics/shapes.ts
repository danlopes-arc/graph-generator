import { Graphics } from "pixi.js"

export interface Point {
  x: number
  y: number
}

export const getRadAngleBetweenPoints = (a: Point, b: Point): number => {
  return Math.atan2(b.y - a.y, b.x - a.x)
}

export const createDirectionalTriangle = (side: number, rotation: number): Graphics => {
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
  triangle.x = 20
  triangle.y = 20
  triangle.rotation = rotation

  return triangle
}

export const createVertex = (x: number, y: number): Graphics => {
  const vertex = new Graphics()
  vertex.lineStyle(2, 0xFEEB77, 1)
  vertex.beginFill(0x650A5A, 1)
  vertex.drawCircle(0, 0, 10)
  vertex.endFill()
  vertex.position.set(x, y)

  return vertex
}

export const createEdge = (from: Point, to: Point): Graphics => {
  const line = new Graphics()
  line.lineStyle(4, 0xFEEB77, 1)
  line.moveTo(from.x, from.y)
  line.lineTo(to.x, to.y)

  return line
}