
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Music, 
  Camera, 
  Sparkles, 
  ExternalLink, 
  Star
} from 'lucide-react';
import { CountdownTime } from './types';

// Componente para los pétalos de rosa animados
const RosePetals = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * -20}vh`,
      size: Math.random() * 20 + 15,
      duration: `${Math.random() * 10 + 10}s`,
      delay: `${Math.random() * 10}s`,
      color: i % 2 === 0 ? '#E0F2FE' : '#BAE6FD' // Tonos celestes claros
    }));
  }, []);

  return (
    <>
      {petals.map(p => (
        <div 
          key={p.id} 
          className="rose-petal"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--duration': p.duration,
            animationDelay: p.delay,
          } as React.CSSProperties}
        >
          <svg viewBox="0 0 24 24" fill={p.color} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </>
  );
};

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Cambiado a true para que abra directamente la invitación
  const [hasEntered, setHasEntered] = useState(true);

  // Destellos específicos para el área del nombre (DETRÁS DEL NOMBRE)
  const nameSparkles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 120 - 10}%`,
      left: `${Math.random() * 120 - 10}%`,
      size: Math.random() * 25 + 10,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 2 + 1}s`
    }));
  }, []);

  const targetDate = new Date('2026-01-24T20:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden fade-in-up">
      <RosePetals />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1920" 
            alt="Palace Background" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-blue/20 via-white/70 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl w-full">
          {/* REPRODUCTOR - Nota: Muchos navegadores requieren interacción para el autoplay */}
          <div className="mb-12 flex flex-col items-center animate-in fade-in slide-in-from-top-10 duration-1000">
            <p className="text-steel-blue font-serif-title italic mb-4 text-xl flex items-center gap-2">
              <Music size={20} className="animate-bounce" /> Dale play a mi música favorita <Music size={20} className="animate-bounce" />
            </p>
            <div className="bg-white/40 backdrop-blur-3xl p-4 rounded-[3rem] shadow-[0_0_80px_rgba(135,206,235,0.4)] border border-white/80 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-blue/30 via-white/50 to-steel-blue/30 blur-xl opacity-50 animate-pulse rounded-[3rem]"></div>
              <div className="relative z-10">
                <iframe 
                  width="300" 
                  height="60" 
                  src="https://vocaroo.com/embed/1fxJq0SKxTCr?autoplay=1" 
                  frameBorder="0" 
                  allow="autoplay"
                  className="rounded-2xl"
                ></iframe>
              </div>
            </div>
          </div>

          <p className="font-elegant text-5xl text-steel-blue mb-4 flex items-center justify-center gap-4">
            <Sparkles className="text-sky-blue animate-pulse" size={24} />
            Mis Quinceaños
            <Sparkles className="text-sky-blue animate-pulse" size={24} />
          </p>
          
          {/* ÁREA DEL NOMBRE: FONDO CON DESTELLOS + NOMBRE ESTÁTICO */}
          <div className="relative inline-block mb-12 px-12 py-8">
            {/* Aura de resplandor */}
            <div className="absolute inset-0 bg-sky-blue/30 blur-[100px] rounded-full animate-pulse"></div>
            
            {/* Destellos de estrellas ANIMADOS en el fondo */}
            {nameSparkles.map(s => (
              <Star 
                key={s.id}
                size={s.size}
                className="absolute text-white fill-white blur-[1px] animate-pulse pointer-events-none"
                style={{
                  top: s.top,
                  left: s.left,
                  animationDelay: s.delay,
                  animationDuration: s.duration,
                  opacity: 0.7
                }}
              />
            ))}

            {/* NOMBRE LITSA ESTÁTICO Y MAJESTUOSO */}
            <h1 className="font-serif-title text-9xl md:text-[14rem] static-name leading-none tracking-tighter italic relative z-20 select-none">
              Litsa
            </h1>
            
            {/* Destellos extras flotando en el aire */}
            <div className="absolute -top-12 -right-12 animate-bounce">
              <Sparkles className="text-sky-blue" size={60} />
            </div>
            <div className="absolute -bottom-12 -left-12 animate-bounce" style={{animationDelay: '2s'}}>
              <Sparkles className="text-steel-blue" size={60} />
            </div>
          </div>
          
          <div className="relative mb-12">
            <div className="h-[2px] w-96 bg-gradient-to-r from-transparent via-steel-blue/40 to-transparent mx-auto rounded-full"></div>
          </div>
          
          <p className="text-xl md:text-3xl text-slate-700 font-serif-title font-medium tracking-[0.2em] mb-12 bg-white/50 backdrop-blur-md inline-block px-10 py-4 rounded-full border border-white/80 shadow-lg">
            Sábado 24 de Enero del 2026
          </p>
          
          <div className="flex justify-center gap-3 md:gap-8 mb-12">
            <TimeUnit value={timeLeft.days} label="Días" />
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <TimeUnit value={timeLeft.seconds} label="Seg" />
          </div>
        </div>
      </section>

      {/* Parents Section */}
      <section className="py-24 bg-white/40 backdrop-blur-sm px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-10">
             <Heart className="text-sky-blue fill-sky-blue/10 animate-pulse" size={64} />
          </div>
          <h2 className="font-serif-title text-4xl md:text-5xl text-slate-800 mb-16">Con la bendición de Dios y mis padres</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-12 bg-white/80 rounded-[4rem] shadow-xl border border-sky-blue/10">
              <h3 className="text-steel-blue font-bold uppercase tracking-widest text-xs mb-8">Mis Amados Padres</h3>
              <p className="text-2xl text-slate-800 font-serif-title mb-2">Maribel Francisco Celedonio</p>
              <p className="text-2xl text-slate-800 font-serif-title">Raffy Yoel Cavero Gonzales</p>
            </div>
            <div className="p-12 bg-white/80 rounded-[4rem] shadow-xl border border-sky-blue/10">
              <h3 className="text-sky-blue font-bold uppercase tracking-widest text-xs mb-8">Mis Queridos Padrinos</h3>
              <p className="text-2xl text-slate-800 font-serif-title mb-2">Erika Bertha Francisco Celedonio</p>
              <p className="text-2xl text-slate-800 font-serif-title">Richard Henry Francisco Celedonio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif-title text-5xl text-slate-800">Ubicación</h2>
          </div>
          <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-white group">
            <div className="bg-steel-blue h-56 flex items-center justify-center relative overflow-hidden">
               <MapPin className="text-white animate-bounce z-10" size={64} />
               <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-black to-transparent"></div>
            </div>
            <div className="p-12 text-center">
              <h3 className="font-serif-title text-3xl text-slate-800 mb-4">Salón de Recepciones Alex</h3>
              <p className="text-slate-500 mb-10 leading-relaxed text-lg italic">
                Mz.H, Lote 10, Sector 1, Villa Los Reyes<br/>
                (Frente al colegio José Faustino Sánchez Carrión)
              </p>
              <a 
                href="https://www.google.com/maps/place/Recepciones+Alex/@-11.8301494,-77.2750684,12z/data=!4m7!3m6!1s0x9105d54c4546d755:0xc447afe9d3b0a476!8m2!3d-11.8301494!4d-77.1226331" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-steel-blue transition-all shadow-xl"
              >
                <MapPin size={22} /> Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-16 bg-white rounded-[4rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-steel-blue"></div>
            <Sparkles className="text-steel-blue mx-auto mb-8" size={48} />
            <h3 className="font-serif-title text-4xl mb-6 text-slate-800">Código de Vestimenta</h3>
            <p className="text-steel-blue font-bold uppercase text-2xl tracking-widest mb-6">Sport Elegante</p>
            <p className="text-slate-500 italic text-lg leading-relaxed">
              "El color azul y celeste está reservado únicamente para nuestra festejada."
            </p>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-32 bg-slate-900 text-white px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <Calendar className="mx-auto mb-10 text-sky-blue" size={72} />
          <h2 className="font-serif-title text-6xl mb-8">Confirmar Asistencia</h2>
          <p className="mb-14 text-2xl opacity-80 leading-relaxed italic font-serif-title">
            "Tu presencia es el mejor regalo que puedo recibir en esta noche tan especial."
          </p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSerNkYAQmA-mxiAgvo7F95yGoOtxNv7Vvd8_ol1bSqaYklrew/viewform" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-16 py-8 font-bold text-slate-900 bg-sky-blue rounded-3xl hover:bg-white transition-all shadow-2xl text-2xl"
          >
            ¡Confirmar mi lugar! <ExternalLink size={24} className="ml-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white text-center px-4">
        <h2 className="font-elegant text-8xl text-slate-800 mb-2">Litsa</h2>
        <p className="text-xs uppercase tracking-[0.8em] text-slate-400 mb-16">Mis Quinceaños • 2026</p>
        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">
           Litsa Janice Cavero Francisco
        </div>
      </footer>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-20 h-20 md:w-32 md:h-32 bg-white/60 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center shadow-xl border border-white mb-4">
      <span className="text-3xl md:text-5xl font-serif-title text-slate-800 font-bold">{String(value).padStart(2, '0')}</span>
    </div>
    <span className="text-[10px] uppercase tracking-widest text-steel-blue font-bold">{label}</span>
  </div>
);

export default App;
