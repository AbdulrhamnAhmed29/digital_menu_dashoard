import React from 'react';
import { MODE } from '../constant/constant';
import BackButton from '../../../shared/BackButton';
import { Link } from 'react-router-dom';
import { PlusCircleIcon } from 'lucide-react';

function OfferHeader({ mode }) {
    let title = "";
    let subtitle = "";

    if (mode === MODE.SHOW) {
        title = "إدارة العروض (Offers)";
        subtitle = "Offers Management Dashboard";
    } else if (mode === MODE.CREATE) {
        title = "إضافة عرض جديد (Add New Offer)";
        subtitle = "Create A New Promotional Offer";
    } else {
        title = "تعديل العرض (Edit Offer)";
        subtitle = "Modify Existing Offer Details";
    }
    return (
        <div dir='rtl'>
            <BackButton />
            {/* Header Section */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-5">
                <div className="text-right">
                    <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-l from-stone-100 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                        {title}
                    </h1>
                    <p className="text-stone-500 text-[10px] mt-1 tracking-widest uppercase font-medium">
                        {subtitle}
                    </p>
                </div>
                {
                    mode === MODE.SHOW ?
                        <div div className="flex items-center gap-3">
                            <Link to={"/addoffers"}>       <button
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 hover:shadow-[0_10px_25px_rgba(245,158,11,0.25)] text-stone-950 font-black text-xs rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.15)] transition-all active:scale-[0.98]"
                            >
                                <PlusCircleIcon size={15} />
                                <span>إضافة عرض جديد</span>
                            </button></Link>
                        </div> : null
                }
            </header>
        </div >
    );
}

export default OfferHeader;