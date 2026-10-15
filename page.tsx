import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AlexApartment() {
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="text-2xl font-black tracking-tight text-cyan-900">
            Aura<span className="text-cyan-500 font-light">Mamaia Nord</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#galerie" className="font-semibold text-slate-600 hover:text-cyan-600 transition-colors">Galerie</a>
            <a href="#facilitati" className="font-semibold text-slate-600 hover:text-cyan-600 transition-colors">Facilități</a>
            <a href="#locatie" className="font-semibold text-slate-600 hover:text-cyan-600 transition-colors">Locație</a>
          </div>
          <a href="#rezervare" className="bg-cyan-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-600/30">
            Rezervă Acum
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-cyan-100 text-cyan-800 font-bold px-4 py-1.5 rounded-full text-sm mb-6"
            >
              🏖️ La doar 50m de plajă
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-tight"
            >
              Evadarea ta de lux în <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">Mamaia Nord.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 max-w-2xl font-medium"
            >
              Un apartament modern, spațios și complet utilat, gândit pentru relaxare absolută. Terasa cu vedere la mare și confort de 5 stele.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a href="#rezervare" className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 inline-block">
                Verifică Disponibilitatea
              </a>
            </motion.div>
          </div>
          <div className="flex-1 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img src="/api/placeholder/800/600" alt="Apartment View" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilitati" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Tot confortul de acasă. Și mai mult.</h2>
            <p className="text-xl text-slate-600">Am pregătit fiecare detaliu pentru ca tu să te bucuri de vacanță.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🛏️', text: 'Pat King Size Premium' },
              { icon: '❄️', text: 'Aer Condiționat' },
              { icon: '🍳', text: 'Bucătărie Complet Utilată' },
              { icon: '📺', text: 'Smart TV & Netflix' },
              { icon: '📶', text: 'Wi-Fi de Mare Viteză' },
              { icon: '🌅', text: 'Terasă cu Vedere' },
              { icon: '🚗', text: 'Parcare Privată' },
              { icon: '☕', text: 'Espressor Cafea' },
            ].map((fac, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center hover:border-cyan-200 transition-colors">
                <div className="text-4xl mb-3">{fac.icon}</div>
                <h3 className="font-bold text-slate-800">{fac.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Widget Section */}
      <section id="rezervare" className="py-24 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Rezervă-ți sejurul</h2>
              <p className="text-slate-400 mb-6">Alege datele dorite, iar noi te vom contacta instant pentru confirmare și detalii.</p>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xl mb-8">
                <span>De la 450 RON / noapte</span>
              </div>
            </div>
            <div className="flex-1 w-full bg-slate-900 p-6 rounded-2xl border border-slate-700">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Check-in</label>
                    <input type="date" className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Check-out</label>
                    <input type="date" className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Nume Complet</label>
                  <input type="text" className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Telefon / WhatsApp</label>
                  <input type="tel" className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500" />
                </div>
                <button className="w-full bg-cyan-600 text-white font-bold text-lg p-4 rounded-xl hover:bg-cyan-500 transition-colors mt-4">
                  Trimite Cererea
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 text-center text-slate-500 border-t border-slate-800">
        <p>© 2026 Aura Mamaia Nord. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
}
