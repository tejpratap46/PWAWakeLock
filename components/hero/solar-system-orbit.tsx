import React, { useEffect, useRef } from "react";

interface Planet {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  angle: number;
  color: string;
  hasRings?: boolean;
  moons?: Moon[];
}

interface Moon {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  angle: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinkSpeed: number;
  driftX: number;
  driftY: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface Asteroid {
  angle: number;
  distance: number;
  size: number;
  speed: number;
  color: string;
}

export const SolarSystemOrbit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // background stars
    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      opacity: Math.random() * 0.8 + 0.2,
      blinkSpeed: Math.random() * 0.02 + 0.005,
      driftX: (Math.random() - 0.5) * 0.05,
      driftY: (Math.random() - 0.5) * 0.05,
    }));

    // planets in correct order
    const planets: Planet[] = [
      { name: "Mercury", radius: 4, distance: 40, speed: 0.04, angle: 0, color: "gray" },
      { name: "Venus", radius: 6, distance: 70, speed: 0.03, angle: 0, color: "orange" },
      {
        name: "Earth", radius: 6, distance: 100, speed: 0.025, angle: 0, color: "blue",
        moons: [{ name: "Moon", radius: 2, distance: 12, speed: 0.07, angle: 0, color: "lightgray" }]
      },
      {
        name: "Mars", radius: 5, distance: 140, speed: 0.02, angle: 0, color: "red",
        moons: [
          { name: "Phobos", radius: 1.5, distance: 8, speed: 0.08, angle: 0, color: "lightgray" },
          { name: "Deimos", radius: 1, distance: 12, speed: 0.06, angle: 0, color: "lightgray" }
        ]
      },
      {
        name: "Jupiter", radius: 12, distance: 230, speed: 0.015, angle: 0, color: "#c9a26b",
        moons: [
          { name: "Io", radius: 2.5, distance: 16, speed: 0.06, angle: 0, color: "gold" },
          { name: "Europa", radius: 2, distance: 22, speed: 0.05, angle: 0, color: "#dcdcdc" },
          { name: "Ganymede", radius: 3, distance: 28, speed: 0.04, angle: 0, color: "#b0a17b" },
          { name: "Callisto", radius: 2.8, distance: 35, speed: 0.035, angle: 0, color: "#a3a3a3" }
        ]
      },
      {
        name: "Saturn", radius: 10, distance: 300, speed: 0.012, angle: 0, color: "#d1c089", hasRings: true,
        moons: [
          { name: "Titan", radius: 3, distance: 20, speed: 0.05, angle: 0, color: "orange" }
        ]
      },
      {
        name: "Uranus", radius: 8, distance: 360, speed: 0.009, angle: 0, color: "#7fffd4", hasRings: true
      },
      {
        name: "Neptune", radius: 8, distance: 420, speed: 0.007, angle: 0, color: "#4b6aff",
        moons: [{ name: "Triton", radius: 2, distance: 14, speed: 0.06, angle: 0, color: "#b0c4de" }]
      }
    ];

    // asteroid belt between Mars & Jupiter
    const asteroidBelt: Asteroid[] = Array.from({ length: 400 }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: 180 + Math.random() * 20,
      size: Math.random() * 1.5 + 0.5,
      speed: 0.004 + Math.random() * 0.002,
      color: Math.random() > 0.5 ? "rgba(180,180,180,0.8)" : "rgba(120,120,120,0.8)",
    }));

    let ringRotation = 0;
    let shootingStars: ShootingStar[] = [];
    let shootingStarTimer = 0;

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        vx: -(Math.random() * 4 + 6),
        vy: Math.random() * 2 + 2,
        life: 0,
        maxLife: 60,
      });
    };

    const drawBackground = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.opacity += star.blinkSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) star.blinkSpeed *= -1;

        star.x += star.driftX;
        star.y += star.driftY;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
      });
    };

    const drawAsteroidBelt = (centerX: number, centerY: number) => {
      asteroidBelt.forEach((asteroid) => {
        asteroid.angle += asteroid.speed;
        const x = centerX + asteroid.distance * Math.cos(asteroid.angle);
        const y = centerY + asteroid.distance * Math.sin(asteroid.angle);
        ctx.beginPath();
        ctx.arc(x, y, asteroid.size, 0, Math.PI * 2);
        ctx.fillStyle = asteroid.color;
        ctx.fill();
      });
    };

    const drawShootingStars = () => {
      shootingStars.forEach((star) => {
        const tailLength = 10;
        for (let i = 0; i < tailLength; i++) {
          const px = star.x - star.vx * i * 0.5;
          const py = star.y - star.vy * i * 0.5;
          const alpha = (1 - i / tailLength) * (1 - star.life / star.maxLife);
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
        star.x += star.vx;
        star.y += star.vy;
        star.life++;
      });
      shootingStars = shootingStars.filter((star) => star.life < star.maxLife);
    };

    const drawSun = (centerX: number, centerY: number) => {
      const sunRadius = 20;

      // Create radial gradient for glow effect
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, sunRadius * 6
      );

      // Multiple color stops for realistic sun glow
      gradient.addColorStop(0, "rgba(255, 255, 100, 1)");      // Bright yellow center
      gradient.addColorStop(0.2, "rgba(255, 220, 50, 0.9)");   // Golden yellow
      gradient.addColorStop(0.4, "rgba(255, 180, 30, 0.6)");   // Orange
      gradient.addColorStop(0.6, "rgba(255, 120, 20, 0.3)");   // Deep orange
      gradient.addColorStop(0.8, "rgba(255, 80, 10, 0.1)");    // Red-orange
      gradient.addColorStop(1, "rgba(255, 60, 0, 0)");         // Transparent red

      // Draw the outer glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius * 6, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw the sun itself with a brighter core
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, sunRadius
      );
      coreGradient.addColorStop(0, "rgba(255, 255, 150, 1)");   // Very bright center
      coreGradient.addColorStop(0.7, "rgba(255, 200, 50, 1)");  // Golden edge
      coreGradient.addColorStop(1, "rgba(255, 150, 0, 1)");     // Orange rim

      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();
    };

    const draw = () => {
      drawBackground();

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // sun
      drawSun(centerX, centerY)

      // planets
      planets.forEach((planet) => {
        planet.angle += planet.speed;
        const planetX = centerX + planet.distance * Math.cos(planet.angle);
        const planetY = centerY + planet.distance * Math.sin(planet.angle);

        // orbit path
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.stroke();

        // planet body
        ctx.beginPath();
        ctx.arc(planetX, planetY, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // rings
        if (planet.hasRings) {
          ctx.save();
          ctx.translate(planetX, planetY);
          ctx.rotate(ringRotation);
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.radius * 2, planet.radius * 0.7, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(200,200,200,0.6)";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }

        // moons
        planet.moons?.forEach((moon) => {
          moon.angle += moon.speed;
          const moonX = planetX + moon.distance * Math.cos(moon.angle);
          const moonY = planetY + moon.distance * Math.sin(moon.angle);

          ctx.beginPath();
          ctx.arc(moonX, moonY, moon.radius, 0, Math.PI * 2);
          ctx.fillStyle = moon.color;
          ctx.fill();
        });
      });

      // asteroid belt
      drawAsteroidBelt(centerX, centerY);

      // shooting stars
      drawShootingStars();

      // spawn every ~10 seconds
      shootingStarTimer++;
      if (shootingStarTimer > 600) {
        spawnShootingStar();
        shootingStarTimer = 0;
      }

      ringRotation += 0.002;
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-full bg-black" />;
};
