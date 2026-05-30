// ========================================
// Component
// Header Component (Centered Logo Style with Premium Motion Animations)
// ========================================

import React from 'react';
import { motion } from 'framer-motion';
import { APP_NAME, APP_TAGLINE } from '../config/constants';

const Header = () => {
    return (
        <header className="w-full   z-50 py-4 text-center header overflow-hidden">
            <div className="relative  max-w-7xl mx-auto px-4">

                <div className="flex flex-col items-center justify-center text-center">

                    <h1 className="relative  text-4xl md:text-4xl  font-black tracking-tight uppercase select-none flex items-center justify-center gap-4 md:gap-6 flex-wrap leading-none">
                        <motion.div
                            initial={{ left: '-100%' }}
                            animate={{ left: '200%' }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatDelay: 4
                            }}
                            className="absolute top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none select-none z-10"
                        />
                        {APP_NAME.includes(' ') ? (
                            <>
                                {/* 1- first word */}
                                <span className="bg-gradient-to-l from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                    {APP_NAME.split(' ')[0]}
                                </span>
                                <div className="relative inline-flex items-center justify-center group mx-1">
                                    <motion.div
                                        animate={{
                                            opacity: [0.15, 0.35, 0.15],
                                            scale: [0.95, 1.05, 0.95]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-0 bg-orange-500 rounded-2xl blur-xl"
                                    />
                                    <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-1.5 border border-white/10 shadow-inner">
                                        <img
                                            src="/images/logo.png"
                                            alt="بيتزا كينج لوجو"
                                            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(251,146,60,0.2)]"
                                        />
                                    </div>
                                </div>
                                {/* 1.  seconed word  */}

                                <span className="bg-gradient-to-r from-white  via-zinc-200 to-zinc-600 bg-clip-text text-transparent">

                                    {APP_NAME.split(' ').slice(1).join(' ')}
                                </span>

                            </>
                        ) : (
                            // if name one word 
                            <div className="flex flex-col items-center gap-6">
                                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                                    {APP_NAME}
                                </span>
                                <div className="relative h-16 w-16 p-2 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
                                    <img src="/image/logo.png" className="w-full h-full object-contain" alt="Logo" />
                                </div>
                            </div>
                        )}
                    </h1>
                    {/* tagline  */}
                    {APP_TAGLINE && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.85, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-[11px] md:text-[10px] text-zinc-400 font-bold tracking-[0.4em] uppercase mt-2 max-w-md leading-relaxed drop-shadow-[0_2px_8px_rgba(249,115,22,0.1)]"
                        >
                            {APP_TAGLINE}
                        </motion.p>
                    )}
                </div>

                <div className="relative mt-4 pb-5 flex justify-center items-center max-w-xl mx-auto">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
                    <motion.div
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6],
                            boxShadow: ["0 0 8px #f97316", "0 0 18px #f97316", "0 0 8px #f97316"]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute h-1.5 w-1.5 rounded-full bg-white"
                    />
                </div>



            </div>
        </header>
    );
};

export default Header;