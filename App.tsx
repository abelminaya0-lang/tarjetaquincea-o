
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Music, 
  Sparkles, 
  ExternalLink, 
  Star,
  Crown
} from 'lucide-react';
import { CountdownTime } from './types';

const RosePetals = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 120 - 10}vw`,
      top: `${Math.random() * -30}vh`,
      size: Math.random() * 20 + 15,
      duration: `${Math.random() * 8 + 7}s`,
      delay: `${Math.random() * 10}s`,
      color: i % 2 === 0 ? '#E0F2FE' : '#BAE6FD',
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
        
        <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
          {/* MÚSICA */}
          <div className="mb-12 flex flex-col items-center">
            <p className="text-steel-blue font-serif-title italic mb-4 text-xl flex items-center gap-2">
              <Music size={20} className="animate-pulse" /> Escucha mi canción favorita <Music size={20} className="animate-pulse" />
            </p>
            <div className="bg-white/60 backdrop-blur-3xl p-4 rounded-[3rem] shadow-[0_0_80px_rgba(135,206,235,0.4)] border border-white/80">
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

          <div className="flex flex-col items-center gap-4 mb-8">
            <Crown size={48} className="text-steel-blue mb-2" />
            <p className="font-elegant text-5xl md:text-6xl text-steel-blue">
              Mis Quinceaños
            </p>
          </div>
          
          {/* NOMBRE LITSA - ESTÁTICO Y ENMARCADO */}
          <div className="relative mb-16 px-8 py-12 md:px-24 md:py-20 group">
            {/* Marco decorativo "cuadrado" real */}
            <div className="absolute inset-0 border-[3px] border-steel-blue/30 rounded-[3rem] transform rotate-1 scale-[1.02]"></div>
            <div className="absolute inset-0 border-[1px] border-sky-blue/50 rounded-[3rem]"></div>
            
            <h1 className="font-royal text-[8rem] md:text-[18rem] leading-none name-static princess-glow-static relative z-20 select-none px-12">
              Litsa
            </h1>

            {/* Decoraciones en las esquinas */}
            <Sparkles className="absolute -top-6 -left-6 text-sky-blue" size={40} />
            <Sparkles className="absolute -bottom-6 -right-6 text-steel-blue" size={40} />
          </div>
          
          <div className="relative mb-14">
            <div className="h-[2px] w-64 bg-gradient-to-r from-transparent via-steel-blue/40 to-transparent mx-auto rounded-full"></div>
          </div>
          
          <p className="text-2xl md:text-3xl text-slate-700 font-serif-title tracking-[0.2em] mb-12 bg-white/50 backdrop-blur-sm inline-block px-12 py-5 rounded-full border border-white/80 shadow-md">
            Sábado 24 de Enero del 2026
          </p>
          
          <div className="flex justify-center gap-6 md:gap-12 mb-20">
            <TimeUnit value={timeLeft.days} label="Días" />
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <TimeUnit value={timeLeft.seconds} label="Seg" />
          </div>
        </div>
      </section>

      {/* Parents Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-12">
             <Heart className="text-sky-blue fill-sky-blue/10 animate-pulse" size={72} />
          </div>
          <h2 className="font-serif-title text-4xl md:text-5xl text-slate-800 mb-20">Con la bendición de Dios y mis padres</h2>
          
          <div className="flex flex-col gap-12 items-center">
            <div className="w-full max-w-2xl p-14 bg-white/90 rounded-[4rem] shadow-xl border border-sky-blue/20 transform hover:scale-[1.02] transition-all">
              <h3 className="text-steel-blue font-bold uppercase tracking-[0.3em] text-[11px] mb-8">Mis Amados Padres</h3>
              <div className="flex flex-col items-center gap-2">
                <p className="text-3xl text-slate-800 font-serif-title">Maribel Francisco C.</p>
                <div className="text-sky-blue font-elegant text-4xl my-2">&</div>
                <p className="text-3xl text-slate-800 font-serif-title">Raffy Cavero G.</p>
              </div>
            </div>

            <div className="w-full max-w-2xl p-14 bg-white/90 rounded-[4rem] shadow-xl border border-sky-blue/20 transform hover:scale-[1.02] transition-all">
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
          <div className="bg-white rounded-[5rem] overflow-hidden shadow-2xl border-8 border-white">
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
            <Crown className="text-steel-blue mx-auto mb-10" size={56} />
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
            className="group inline-flex items-center justify-center px-20 py-8 font-bold text-slate-900 bg-sky-blue rounded-[2.5rem] hover:bg-white hover:scale-105 transition-all shadow-lg text-2xl"
          >
            ¡Confirmar aquí! <ExternalLink size={28} className="ml-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white text-center px-4 relative">
        <h2 className="font-royal text-[6rem] text-slate-800 mb-4">Litsa</h2>
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
    <div className="w-24 h-24 md:w-36 md:h-36 bg-white rounded-[3rem] flex items-center justify-center shadow-lg border-2 border-slate-50 mb-5">
      <span className="text-4xl md:text-6xl font-serif-title text-slate-800 font-bold">{String(value).padStart(2, '0')}</span>
    </div>
    <span className="text-[11px] uppercase tracking-[0.4em] text-steel-blue font-bold">{label}</span>
  </div>
);

export default App;
