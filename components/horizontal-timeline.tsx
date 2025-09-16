"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Calendar, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

interface HorizontalTimelineProps {
  memories: Memory[];
}

export function HorizontalTimeline({ memories }: HorizontalTimelineProps) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Función para detectar si es un video
  const isVideo = (src: string) => {
    return (
      src.endsWith(".mp4") ||
      src.endsWith(".webm") ||
      src.endsWith(".mov") ||
      src.endsWith(".avi")
    );
  };

  // Función para detectar si es un GIF
  const isGif = (src: string) => {
    return src.endsWith(".gif");
  };

  // Duplicar memorias para efecto infinito
  const duplicatedMemories = [...memories, ...memories, ...memories];

  useEffect(() => {
    const animate = () => {
      if (!isHovered) {
        setTranslateX((prev) => {
          const itemWidth = 250; // ancho aproximado de cada elemento
          const maxTranslate = memories.length * itemWidth;

          if (prev <= -maxTranslate) {
            return 0;
          }
          return prev - 0.5; // velocidad del movimiento
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, memories.length]);

  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={containerRef}
      >
        {/* Línea horizontal */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-full transform -translate-y-1/2" />

        {/* Contenedor de puntos con movimiento */}
        <div
          className="flex items-center relative z-10 py-8"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isHovered ? "transform 0.3s ease" : "none",
            width: `${duplicatedMemories.length * 250}px`,
          }}
        >
          {duplicatedMemories.map((memory, index) => (
            <div
              key={`${memory.id}-${index}`}
              className="flex flex-col items-center cursor-pointer group flex-shrink-0"
              style={{ width: "250px" }}
              onClick={() => setSelectedMemory(memory)}
            >
              {/* Punto en la línea */}
              <div className="w-5 h-5 bg-rose-500 rounded-full border-3 border-white shadow-md group-hover:scale-125 transition-transform duration-300 mb-3" />

              {/* Fecha */}
              <div className="text-sm font-medium text-rose-600 mb-2 text-center">
                {memory.date.split(",")[0]}
              </div>

              {/* Imagen miniatura */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-rose-200 group-hover:border-rose-400 transition-colors duration-300 shadow-lg relative">
                {isVideo(memory.image) ? (
                  <>
                    <video
                      src={memory.image || "/placeholder.svg"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                      <Play className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                  </>
                ) : (
                  <img
                    src={memory.image || "/placeholder.svg"}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>

              {/* Título */}
              <div className="text-xs font-medium text-rose-700 mt-2 text-center max-w-20">
                {memory.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMemory && (
        <Card className="mt-16 bg-white/90 backdrop-blur-sm border-rose-200 shadow-2xl">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-600">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">{selectedMemory.date}</span>
                </div>

                <h3 className="text-3xl font-bold text-rose-700">
                  {selectedMemory.title}
                </h3>

                <p className="text-lg text-rose-600/80 leading-relaxed">
                  {selectedMemory.description}
                </p>

                <div className="flex items-center gap-2 text-rose-500">
                  <Heart className="h-5 w-5 fill-current" />
                  <span className="text-sm">
                    Un momento especial para recordar
                  </span>
                  <Heart className="h-5 w-5 fill-current" />
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  {isVideo(selectedMemory.image) ? (
                    <video
                      src={selectedMemory.image || "/placeholder.svg"}
                      className="w-full h-full object-cover"
                      controls
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <img
                      src={selectedMemory.image || "/placeholder.svg"}
                      alt={selectedMemory.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center shadow-lg">
                  {isVideo(selectedMemory.image) ? (
                    <Play className="h-6 w-6 text-white fill-current animate-pulse" />
                  ) : (
                    <Heart className="h-6 w-6 text-white fill-current animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Componente de ejemplo con datos de prueba
export default function TimelineDemo() {
  const sampleMemories: Memory[] = [
    {
      id: 1,
      date: "14 Feb, 2023",
      title: "Primer Encuentro",
      description:
        "El día que nos conocimos en esa pequeña cafetería del centro. No sabíamos que ese momento cambiaría nuestras vidas para siempre.",
      image:
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400",
    },
    {
      id: 2,
      date: "15 Mar, 2023",
      title: "Primera Cita",
      description:
        "Nuestra primera cita oficial. Caminamos por el parque y hablamos durante horas. El tiempo se detuvo esa tarde.",
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400",
    },
    {
      id: 3,
      date: "22 Jun, 2023",
      title: "Viaje Juntos",
      description:
        "Nuestro primer viaje juntos a la playa. Arena, sol, risas y la certeza de que queremos compartir muchas más aventuras.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    },
    {
      id: 4,
      date: "10 Sep, 2023",
      title: "Aniversario",
      description:
        "Celebrando nuestro primer aniversario con una cena romántica bajo las estrellas. Cada día contigo es una nueva página en nuestra historia.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    },
    {
      id: 5,
      date: "25 Dec, 2023",
      title: "Navidad",
      description:
        "Nuestra primera Navidad juntos. Intercambiamos regalos y promesas de amor eterno junto al árbol navideño.",
      image:
        "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-rose-700 mb-4">
            Nuestra Historia de Amor
          </h1>
          <p className="text-lg text-rose-600/80">
            Cada momento especial que hemos vivido juntos
          </p>
        </div>

        <HorizontalTimeline memories={sampleMemories} />
      </div>
    </div>
  );
}
