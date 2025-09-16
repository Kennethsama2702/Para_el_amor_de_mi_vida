"use client";

import { useState, useEffect } from "react";
import { Heart, Play } from "lucide-react";
import { HorizontalTimeline } from "@/components/horizontal-timeline";
import { HeartParticles } from "@/components/heart-particles";

const memories = [
  {
    id: 1,
    date: "05 de Septiembre, 2025",
    title: "Mi Primer Sueldo",
    description: "Un fin de semana diferente",
    image: "/amor.jpg",
  },
  {
    id: 2,
    date: "17 de Marzo, 2024",
    title: "Primera Vez Durmiendo En Tu Casa",
    description:
      "Tres días mágicos cerca de ti. Risas, abrazosy besos que no quiero que se acabe.",
    image: "/amor1.jpg",
  },
  {
    id: 3,
    date: "28 de Diciembre, 2022",
    title: "Nuestra Primera Cita",
    description:
      "Nervios, sonrisas y la calidez de sentirme parte de algo especial.",
    image: "/amor2.jpg",
  },
  {
    id: 4,
    date: "31 de Agosto, 2024",
    title: "Nuestra Primera vez",
    description:
      "Uno de los momentos que mas me han dejado marcado pues contigo he hecho muchas cosas por primera vez lo que te convierte en alguien aún más especial.",
    image: "/amor3.jpg",
  },
  {
    id: 5,
    date: "21 de Diciembre, 2024",
    title: "Nuestra Primera Navidad Juntos ",
    description:
      "Ese dia lo recuerdo mucho pues fue la primera vez que dormimmos juntos, imaginando que asi seria nuestras vidas.",
    image: "/amor4.jpg",
  },
  {
    id: 6,
    date: "27 de Diciembre, 2022",
    title: "Un Día Muy Especial",
    description:
      "Como olvidar la primera vez que te vi tímida pero sobre todo hermosa diciendo dentro de mí me he sacado la lotería (no te dejabas grabar).",
    image: "/video.gif",
  },
  {
    id: 7,
    date: "27 de Diciembre, 2022",
    title: "Primera Foto Juntos",
    description:
      "A pesar de no gustarte las fotos pero por ser conmigo accedías.",
    image: "/amor5.jpg",
  },
  {
    id: 8,
    date: "08 de Octubre, 2023",
    title: "Cita En Cuenca",
    description:
      "Nuestra primera cita en cuenca aunque corriendo y poquito tiempo a tu lado todo es maravilloso que no se siente el tiempo.",
    image: "/amor6.jpg",
  },
  {
    id: 9,
    date: "02 de Septiembre, 2024",
    title: "Ya De Regreso A Guayaquil",
    description:
      "No me queria ir como todas las veces y siempre te pones triste pero disfruntando hasta el ultimo minuto conmigo.",
    image: "/amor7.jpg",
  },
  {
    id: 10,
    date: "08 de Octubre, 2023",
    title: "Feliz Siempre A Tu Lado",
    description:
      "Eres mi tesoro más grande en serio quiero que esto duro por mucho tiempo me haces muy feliz y como dice la canción gracias por amarme y elegirme. J.P.C.J ❤️‍🩹",
    image: "/amor8.jpg",
  },
];

export default function HomePage() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/musica.mp3");
    audio.loop = true;
    audio.volume = 0.8;
    setAudioRef(audio);

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handleReveal = () => {
    setShowTimeline(true);
    if (audioRef) {
      audioRef.play().catch(console.error);
    }
  };

  if (!showTimeline) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-center justify-center relative overflow-hidden">
        <HeartParticles />

        <div className="text-center z-10 px-4">
          <div className="mb-8">
            <Heart className="h-20 w-20 text-rose-500 fill-rose-500 mx-auto mb-6 animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-rose-600 mb-12 text-balance">
            Para el Amor de mi Vida
          </h1>

          <button
            onClick={handleReveal}
            className="inline-flex items-center justify-center text-xl px-12 py-6 rounded-lg font-semibold text-white shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-none outline-none"
            style={{
              background:
                "linear-gradient(135deg, #881337 0%, #be185d 50%, #c2185b 100%)",
              color: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(136, 19, 55, 0.5)",
            }}
          >
            <Play className="h-6 w-6 mr-3" />
            ¿Lista para ver esto?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 relative overflow-hidden">
      <HeartParticles />

      <div className="absolute inset-0 opacity-10">
        {memories.map((memory, index) => (
          <div
            key={memory.id}
            className="absolute w-64 h-48 rounded-lg overflow-hidden"
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 80}%`,
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <img
              src={memory.image || "/placeholder.svg"}
              alt={memory.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <Heart className="h-16 w-16 text-rose-500 fill-rose-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-6 text-balance">
            Nuestra Historia de Amor
          </h1>
          <p className="text-xl text-rose-700/80 text-balance max-w-2xl mx-auto">
            Un viaje a través del tiempo, recordando cada momento especial que
            hemos compartido juntos
          </p>
        </div>

        <HorizontalTimeline memories={memories} />
      </div>
    </div>
  );
}
