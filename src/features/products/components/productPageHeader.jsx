import SectionModal from "../../categories/components/SectionsModal";
import { FolderPlus, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';


function ProductPageHeader({setIsSectionOpen,isSectionOpen,addSection,categories}) {

 

    return (
        <div>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-5">
                <div className="text-right">
                    <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-l from-stone-100 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                        إدارة المنتجات (Products)
                    </h1>
                    <p className="text-stone-500 text-[10px] mt-1 tracking-widest uppercase font-medium">
                        Products Management Dashboard
                    </p>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSectionOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-stone-950/80 hover:bg-stone-900 text-stone-200 border border-white/[0.08] hover:border-amber-500/30 rounded-xl font-bold text-xs shadow-md transition-all active:scale-[0.98]"
                    >
                        <FolderPlus size={15} className="text-amber-500" />
                        <span> اضافة سيكشن (Sections)</span>
                    </button>

                    <SectionModal
                        category={categories}
                        addSec={addSection}
                        isSection={isSectionOpen}
                        setIsSection={setIsSectionOpen}
                    />

                    <button
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 hover:shadow-[0_10px_25px_rgba(245,158,11,0.25)] text-stone-950 font-black text-xs rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.15)] transition-all active:scale-[0.98]"
                    >
                        <Link to="/products/add" className="flex items-center gap-2">
                            <PlusCircle size={15} />
                            <span>إضافة منتج جديد</span>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductPageHeader
