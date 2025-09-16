"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
}

export function HeartParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 20 + 10,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 2 + 0.5,
          direction: Math.random() * Math.PI * 2,
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + Math.cos(particle.direction) * particle.speed,
          y: particle.y + Math.sin(particle.direction) * particle.speed,
          // Reiniciar partícula si sale de la pantalla
          ...(particle.x > window.innerWidth + 50 ||
          particle.x < -50 ||
          particle.y > window.innerHeight + 50 ||
          particle.y < -50
            ? {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }
            : {}),
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute transition-all duration-100 ease-linear"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
          }}
        >
          <Heart
            className="text-rose-400 fill-rose-400 animate-pulse"
            style={{
              width: particle.size,
              height: particle.size,
            }}
          />
        </div>
      ))}
    </div>
  );
}
