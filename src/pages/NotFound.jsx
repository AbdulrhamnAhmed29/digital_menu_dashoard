import React from 'react';

function NotFound() {
    return (
        <div dir="rtl" className="relative min-h-[60vh] w-full flex flex-col items-center justify-center overflow-hidden   text-center select-none">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-md p-8 rounded-2xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-neutral-800">

                <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 drop-shadow-[0_10px_10px_rgba(245,158,11,0.15)] animate-pulse">
                    404
                </h1>

                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto my-6" />

                <h2 className="text-xl font-bold text-neutral-200 tracking-wide">
                    عذرًا، الصفحة غير موجودة
                </h2>

                <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-xs mx-auto">
                    يبدو أن الرابط الذي تحاول الوصول إليه قد تم نقله، أو لم يعد متوفرًا في نظام إدارة المنيو حاليًا.
                </p>

                <div className="mt-8">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold tracking-wider text-neutral-950 bg-amber-500 hover:bg-amber-400 border border-amber-600 rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.2)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        العودة للصفحة السابقة
                    </button>
                </div>

            </div>

            <div className="absolute bottom-6 z-10 text-[10px] uppercase tracking-widest text-neutral-600 font-medium">
                Pizza King • Menu Management System
            </div>
        </div>
    );
}

export default NotFound;