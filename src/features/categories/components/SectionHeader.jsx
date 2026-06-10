import { FolderPlus, PlusCircle } from 'lucide-react'
import React from 'react'

function SectionHeader({ setIsSectionOpen, setIsOpen }) {

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
                <div className="text-right">
                    <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-l from-stone-100 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                        إدارة الاصناف (Sections)
                    </h1>
                    <p className="text-stone-500 text-[10px] mt-1 tracking-widest uppercase font-medium">
                        Sections Management Dashboard
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white border border-white/10 rounded-xl font-medium text-sm transition-all active:scale-[0.98] shadow-md cursor-pointer"
                    >
                        <FolderPlus size={16} className="text-amber-400" />
                        <span>إضافة فئة (Category)</span>
                    </button>

                    <button
                        onClick={() => setIsSectionOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-[0_10px_25px_rgba(245,158,11,0.25)] text-black font-extrabold text-sm rounded-xl transition-all active:scale-[0.98] shadow-[0_4px_15px_rgba(245,158,11,0.2)] cursor-pointer"
                    >
                        <PlusCircle size={16} />
                        <span>إضافة قسم (Sections)</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SectionHeader
