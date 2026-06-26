import React from 'react';
import {  Edit3, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { showDeleteConfirmAlert } from '../../../shared/Alert';
import { OFFER } from '../../../config/constants';

// ======= TABLE_HEADERS (Premium Style & Fixed Structure) ========
const TABLE_HEADERS = [
    { id: "name", label: "اسم العرض", className: "p-4 pr-6 text-right" },
    { id: "price", label: "سعر العرض", className: "p-4 text-center" },
    { id: "section", label: "السيكشن", className: "p-4 text-right" },
    { id: "actions", label: "إجراءات التحكم", className: "p-4 text-left pl-6" }
];

export default function OfferTable({ offersData = [],  deleteOffer }) {
    console.log(offersData);

    return (
        <div>
            <div className="w-full overflow-hidden rounded-[2rem] border border-white/[0.05] bg-transparent backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="overflow-x-auto">
                    {offersData.length === 0 ? (
                        <div className="p-12 text-center text-stone-500 text-sm font-medium">
                            لا توجد عروض مضافة حالياً. ابدأ بإضافة أول عرض!
                        </div>
                    ) : (
                        <table className="w-full text-right border-collapse">
                            {/* ======= TABLE_HEADER ==== */}
                            <thead>
                                <tr className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 text-xs font-bold uppercase tracking-wider">
                                    {TABLE_HEADERS.map((header) => (
                                        <th key={header.id} className={header.className}>
                                            {header.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* ======= TABLE_BODY ==== */}
                            <tbody className="divide-y divide-white/[0.04] text-sm text-zinc-300">
                                {offersData.map((offer, idx) => {
                                    const offerId = offer.id || idx;

                                    return (
                                        <tr
                                            key={offerId}
                                            className="hover:bg-white/[0.02] transition-colors group"
                                        >
                                            {/* ======= Offer Name & Description ======= */}
                                            <td className="p-4 pr-6 font-bold text-white tracking-wide">
                                                <div className="flex flex-col text-right">
                                                    <span className="text-[15px]">
                                                        <span className='m-1'>{offer.offer.quantity}</span>
                                                        {offer.offer.offer_type === OFFER.SIZE ? "بيتزا وسط" : "بيتزا كبيره "}
                                                    </span>
                                                    {offer.Description && (
                                                        <span className="text-zinc-500 text-xs font-normal line-clamp-1 mt-1 max-w-[220px]">
                                                            {offer.Description}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>


                                            {/* ======= Price ======= */}
                                            <td className="p-4 text-center font-bold text-zinc-200 text-xs tracking-wide">
                                                {offer.price ? `${offer.price} ج.م` : <span className="text-stone-600 font-normal text-xs">—</span>}
                                            </td>


                                            {/* ======= Section Tag ======= */}
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-sm">
                                                    {offer.menu_section?.Name || "عام"}
                                                </span>
                                            </td>
                                            {/* ======= Actions Control ======= */}
                                            <td className="p-4 pl-6 text-left">
                                                <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-all duration-200">

                                                

                                                    {/*===== Edit Action =======*/}
                                                    <Link to={`/offers/${offer.documentId}`} title="تعديل العرض">
                                                        <button className="p-2 hover:bg-amber-500/10 active:scale-90 rounded-xl text-zinc-500 hover:text-amber-400 border border-transparent hover:border-amber-500/10 transition-all">
                                                            <Edit3 size={15} />
                                                        </button>
                                                    </Link>

                                                    {/*===== Delete Action ========*/}
                                                    <button
                                                        onClick={() => showDeleteConfirmAlert(offer.offer.offer_type , () => deleteOffer?.(offer.documentId))}
                                                        className="p-2 hover:bg-red-500/10 active:scale-90 rounded-xl text-zinc-500 hover:text-red-400 border border-transparent hover:border-red-500/10 transition-all"
                                                        title="حذف العرض"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}