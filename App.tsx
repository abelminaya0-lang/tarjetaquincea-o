
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Music, 
  Sparkles, 
  ExternalLink, 
  Star
} from 'lucide-react';
import { CountdownTime } from './types';

// Componente para los pétalos de rosa animados con efecto de viento
const RosePetals = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 120 - 10}vw`,
      top: `${Math.random() * -30}vh`,
      size: Math.random() * 20 + 15,
      duration: `${Math.random() * 8 + 7}s`,
      delay: `${Math.random() * 10}s`,
      color: i % 2 === 0 ? '#E0F2FE' : '#BAE6FD', // Tonos celestes y blancos
      rotation: Math.random() * 360
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {petals.map(p => (
        <div 
          key={p.id} 
          className="rose-petal opacity-70"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--duration': p.duration,
            animationDelay: p.delay,
            transform: `rotate(${p.rotation}deg)`
          } as React.CSSProperties}
        >
          <svg viewBox="0 0 24 24" fill={p.color} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const nameSparkles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 140 - 20}%`,
      left: `${Math.random() * 140 - 20}%`,
      size: Math.random() * 30 + 10,
      delay: `${Math.random() * 5}s`,
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
    <div className="min-h-screen relative overflow-x-hidden fade-in-up bg-slate-50">
      <RosePetals />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1920" 
            alt="Palace Background" 
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-blue/30 via-white/80 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl w-full">
          {/* MÚSICA */}
          <div className="mb-12 flex flex-col items-center">
            <p className="text-steel-blue font-serif-title italic mb-4 text-xl flex items-center gap-2">
              <Music size={20} className="animate-pulse" /> Escucha mi canción favorita <Music size={20} className="animate-pulse" />
            </p>
            <div className="bg-white/60 backdrop-blur-3xl p-4 rounded-[3rem] shadow-[0_0_80px_rgba(135,206,235,0.4)] border border-white/80 group">
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

          <p className="font-elegant text-5xl md:text-6xl text-steel-blue mb-2 flex items-center justify-center gap-4">
            <Sparkles className="text-sky-blue animate-pulse" size={28} />
            Mis Quinceaños
            <Sparkles className="text-sky-blue animate-pulse" size={28} />
          </p>
          
          <div className="relative inline-block mb-10 px-16 py-10">
            <div className="absolute inset-0 bg-sky-blue/20 blur-[120px] rounded-full animate-pulse"></div>
            
            {nameSparkles.map(s => (
              <Star 
                key={s.id}
                size={s.size}
                className="absolute text-white fill-white blur-[1.5px] animate-pulse pointer-events-none"
                style={{
                  top: s.top,
                  left: s.left,
                  animationDelay: s.delay,
                  animationDuration: s.duration,
                  opacity: 0.6
                }}
              />
            ))}

            <h1 className="font-serif-title text-9xl md:text-[15rem] static-name leading-none tracking-tighter italic relative z-20 select-none">
              Litsa
            </h1>
            
            <div className="absolute -top-10 -right-10 animate-bounce">
              <Sparkles className="text-sky-blue" size={64} />
            </div>
            <div className="absolute -bottom-10 -left-10 animate-bounce" style={{animationDelay: '1s'}}>
              <Sparkles className="text-steel-blue" size={64} />
            </div>
          </div>
          
          <div className="relative mb-14">
            <div className="h-[2px] w-96 bg-gradient-to-r from-transparent via-steel-blue/30 to-transparent mx-auto rounded-full"></div>
          </div>
          
          <p className="text-2xl md:text-4xl text-slate-800 font-serif-title font-medium tracking-[0.2em] mb-12 bg-white/40 backdrop-blur-md inline-block px-12 py-5 rounded-full border border-white/60 shadow-lg">
            Sábado 24 de Enero del 2026
          </p>
          
          <div className="flex justify-center gap-4 md:gap-10 mb-20">
            <TimeUnit value={timeLeft.days} label="Días" />
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <TimeUnit value={timeLeft.seconds} label="Seg" />
          </div>
        </div>
      </section>

      {/* Parents Section - Padres Arriba, Padrinos Abajo */}
      <section className="py-24 bg-white/50 backdrop-blur-sm px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-12">
             <Heart className="text-sky-blue fill-sky-blue/10 animate-pulse" size={72} />
          </div>
          <h2 className="font-serif-title text-4xl md:text-5xl text-slate-800 mb-20">Con la bendición de Dios y mis padres</h2>
          
          <div className="flex flex-col gap-12 items-center">
            {/* Padres Arriba */}
            <div className="w-full max-w-2xl p-14 bg-white/80 rounded-[4rem] shadow-xl border border-sky-blue/20 transform hover:-translate-y-2 transition-all">
              <h3 className="text-steel-blue font-bold uppercase tracking-[0.3em] text-[11px] mb-8">Mis Amados Padres</h3>
              <div className="flex flex-col items-center gap-2">
                <p className="text-3xl text-slate-800 font-serif-title">Maribel Francisco C.</p>
                <div className="text-sky-blue font-elegant text-4xl my-2">&</div>
                <p className="text-3xl text-slate-800 font-serif-title">Raffy Cavero G.</p>
              </div>
            </div>

            {/* Padrinos Abajo */}
            <div className="w-full max-w-2xl p-14 bg-white/80 rounded-[4rem] shadow-xl border border-sky-blue/20 transform hover:-translate-y-2 transition-all">
              <h3 className="text-sky-blue font-bold uppercase tracking-[0.3em] text-[11px] mb-8">Mis Queridos Padrinos</h3>
              <div className="flex flex-col items-center gap-2">
                <p className="text-3xl text-slate-800 font-serif-title">Erika Francisco C.</p>
                <div className="text-steel-blue font-elegant text-4xl my-2">&</div>
                <p className="text-3xl text-slate-800 font-serif-title">Richard Francisco C.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-4 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif-title text-5xl text-slate-800">Ubicación</h2>
          </div>
          <div className="bg-white rounded-[5rem] overflow-hidden shadow-2xl border-8 border-white group">
            <div className="bg-steel-blue h-64 flex items-center justify-center relative overflow-hidden">
               <MapPin className="text-white animate-bounce z-10" size={72} />
               <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
            </div>
            <div className="p-16 text-center">
              <h3 className="font-serif-title text-4xl text-slate-800 mb-6">Salón de Recepciones Alex</h3>
              <p className="text-slate-500 mb-12 leading-relaxed text-xl italic max-w-lg mx-auto">
                Mz.H, Lote 10, Sector 1, Villa Los Reyes<br/>
                (Frente al colegio José Faustino Sánchez Carrión)
              </p>
              <a 
                href="https://maps.app.goo.gl/k9bhK32sFGHDk6w36" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-14 py-6 rounded-[2rem] bg-slate-900 text-white font-bold text-lg hover:bg-steel-blue hover:scale-105 transition-all shadow-2xl shadow-slate-900/30"
              >
                <MapPin size={24} /> Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-20 bg-white rounded-[5rem] shadow-2xl relative border-b-[12px] border-steel-blue">
            <Sparkles className="text-steel-blue mx-auto mb-10" size={56} />
            <h3 className="font-serif-title text-5xl mb-8 text-slate-800">Código de Vestimenta</h3>
            <p className="text-steel-blue font-bold uppercase text-3xl tracking-[0.2em] mb-8">Sport Elegante</p>
            <p className="text-slate-500 italic text-xl leading-relaxed max-w-md mx-auto">
              "El color azul acero y celeste está reservado únicamente para la quinceañera."
            </p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-32 bg-slate-900 text-white px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-blue blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-steel-blue blur-[150px] rounded-full"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <Calendar className="mx-auto mb-12 text-sky-blue" size={80} />
          <h2 className="font-serif-title text-6xl mb-10">Confirmar Asistencia</h2>
          <p className="mb-16 text-2xl opacity-80 leading-relaxed italic font-serif-title">
            "Tu presencia es el regalo más valioso que podré atesorar en esta noche inolvidable."
          </p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSerNkYAQmA-mxiAgvo7F95yGoOtxNv7Vvd8_ol1bSqaYklrew/viewform" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-20 py-8 font-bold text-slate-900 bg-sky-blue rounded-[2.5rem] hover:bg-white hover:scale-105 transition-all shadow-[0_0_50px_rgba(135,206,235,0.4)] text-2xl"
          >
            ¡Confirmar aquí! <ExternalLink size={28} className="ml-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-20 text-[10px] opacity-30 uppercase tracking-[0.8em]">Por favor confirmar antes del 15 de enero</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white text-center px-4 relative">
        <h2 className="font-elegant text-9xl text-slate-800 mb-4">Litsa</h2>
        <p className="text-xs uppercase tracking-[1em] text-slate-400 mb-16">Mis Quinceaños • 2026</p>
        <div className="text-[11px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-4">
           Litsa Janice Cavero Francisco
        </div>
        <div className="text-[9px] uppercase tracking-widest text-slate-300">
           Villa Los Reyes • Ventanilla • Callao
        </div>
      </footer>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-24 h-24 md:w-36 md:h-36 bg-white rounded-[3rem] flex items-center justify-center shadow-xl border-2 border-slate-50 mb-5 group hover:rotate-2 transition-transform">
      <span className="text-4xl md:text-6xl font-serif-title text-slate-800 font-bold">{String(value).padStart(2, '0')}</span>
    </div>
    <span className="text-[11px] uppercase tracking-[0.4em] text-steel-blue font-bold">{label}</span>
  </div>
);

export default App;
