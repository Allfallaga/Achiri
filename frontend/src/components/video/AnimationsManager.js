import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * AnimationsManager – Achiri
 * Gère les animations visuelles de la salle vidéo (ex : confettis, réactions, effets d’accessibilité).
 * Props :
 * - accessibility : objet d’options d’accessibilité (highContrast, reduceMotion, etc.)
 * - type : type d’animation à afficher (optionnel)
 * - trigger : clé pour déclencher une animation (optionnel)
 */

export default function AnimationsManager({
  accessibility = {},
  type,
  trigger,
}) {
  const canvasRef = useRef(null);

  // Exemple d’animation : confettis (désactivé si reduceMotion)
  useEffect(() => {
    if (accessibility.reduceMotion) return;
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let confettis = [];

    // Génère des confettis
    for (let i = 0; i < 40; i++) {
      confettis.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        r: 6 + Math.random() * 8,
        d: Math.random() * 40,
        color: `hsl(${Math.random() * 360},90%,60%)`,
        tilt: Math.random() * 10 - 10,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettis.forEach((c, i) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
        c.y += 2 + Math.random() * 2;
        c.x += Math.sin(c.d) * 2;
        c.d += 0.05;
        if (c.y > canvas.height) {
          c.y = -10;
          c.x = Math.random() * canvas.width;
        }
      });
      animationFrame = requestAnimationFrame(draw);
    }

    draw();

    // Nettoyage
    return () => {
      cancelAnimationFrame(animationFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [trigger, accessibility.reduceMotion]);

  // Responsive : ajuste la taille du canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = 180;
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Accessibilité : pas d’animation si reduceMotion
  if (accessibility.reduceMotion) return null;

  return (
    <div
      className="animations-manager"
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: 180,
          display: "block",
        }}
        tabIndex={-1}
        aria-label="Animations visuelles"
      />
    </div>
  );
}

AnimationsManager.propTypes = {
  accessibility: PropTypes.object,
  type: PropTypes.string,
  trigger: PropTypes.any,
};
