/** @format */

import { useParticleCanvas } from "../Hook/useParticleCanvas";

function ParticleBackground() {
  const canvasRef = useParticleCanvas();

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default ParticleBackground;
