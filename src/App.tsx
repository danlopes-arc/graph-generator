import { Application } from 'pixi.js';
import { useEffect, useRef } from "react";
import { createEdge, createVertex } from "./graphics/shapes";

const createApp = (): Application => {
  const app = new Application({
    background: '#1099bb',
    width: 100,
    height: 100,
    antialias: true
  })

  const vertex1 = createVertex(20, 20)
  const vertex2 = createVertex(80, 80)

  const line1 = createEdge(vertex1, vertex2)

  app.stage.addChild(line1)
  app.stage.addChild(vertex1)
  app.stage.addChild(vertex2)

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
