import { useEffect, useRef } from "react";
import { Application, Graphics } from 'pixi.js'

const createDirectionalTriangle = (side: number, rotation: number): Graphics => {
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

interface Point {
  x: number
  y: number
}

const getRadAngleBetweenPoints = (a: Point, b: Point): number => {
  return Math.atan2(b.y - a.y, b.x - a.x)
}

const createApp = (): Application => {
  const app = new Application({
    background: '#1099bb',
    width: 100,
    height: 100,
    antialias: true
  })

  const vertex1 = new Graphics()
  vertex1.lineStyle(2, 0xFEEB77, 1)
  vertex1.beginFill(0x650A5A, 1)
  vertex1.drawCircle(0, 0, 10)
  vertex1.endFill()
  vertex1.x = 20
  vertex1.y = 20

  const vertex2 = new Graphics()
  vertex2.lineStyle(2, 0xFEEB77, 1)
  vertex2.beginFill(0x650A5A, 1)
  vertex2.drawCircle(0, 0, 10)
  vertex2.endFill()
  vertex2.x = 80
  vertex2.y = 80

  const line1 = new Graphics()
  line1.lineStyle(4, 0xFEEB77, 1)
  line1.moveTo(20, 20)
  line1.lineTo(80, 80)

  const triangle = createDirectionalTriangle(10, getRadAngleBetweenPoints(vertex1, vertex2))

  app.stage.addChild(line1)
  app.stage.addChild(vertex1)
  app.stage.addChild(vertex2)
  app.stage.addChild(triangle)

  return app
}

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const app = createApp()

    const view = app.view as HTMLCanvasElement

    const container = containerRef.current

    container?.appendChild(view)

    return () => {
      container?.removeChild(view)
      app.destroy()
    }
  }, [])


  return (
    <div ref={containerRef}></div>
  );
}
