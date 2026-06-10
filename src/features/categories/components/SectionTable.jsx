import { Eye,  Trash2 } from 'lucide-react';
import React from 'react'
import { showDeleteConfirmAlert } from '../../../shared/Alert';
import { Link } from 'react-router-dom';

function SectionTable({ sectionsList, deleteFunction }) {
    return (
        <div>
            <div className="w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-zinc-900/20 to-zinc-950/40 backdrop-blur-md shadow-2xl">
                <div className="overflow-x-auto">
                    {sectionsList.length === 0 ? (
                        <div className="p-12 text-center text-zinc-500 text-sm">
                            لا توجد أقسام مضافة حالياً. ابدأ بإضافة أول قسم للمنيو!
                        </div>
                    ) : (

                        <table className="w-full text-right border-collapse">
                            {/*====== TABLE HEADER ===== */}
                            <thead>
                                <tr className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="p-4 pr-6">اسم القسم الفرعي (Section)</th>
                                    <th className="p-4">الفئة الرئيسية التابع لها (Category)</th>
                                    <th className="p-4 text-left pl-6">إجراءات التحكم</th>
                                </tr>
                            </thead>

                            {/*====== TABLE BODY ===== */}
                            <tbody className="divide-y divide-white/[0.04] text-sm text-zinc-300">
                                {sectionsList.map((section) => {
                                    const sectionId = section?.documentId;
                                    const sectionName = section?.Name;
                                    const categoryName = section?.category?.Name || "عام";
                                    return (
                                        <tr
                                            key={sectionId}
                                            className="hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <td className="p-4 pr-6 font-bold text-white tracking-wide">
                                                {sectionName}
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-sm">
                                                    {categoryName}
                                                </span>
                                            </td>
                                            <td className="p-4 pl-6 text-left">
                                                <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-all duration-200">
                                                    <Link to={`/section/${sectionId}`}>
                                                        <button
                                                            className="p-2 hover:bg-white/5 active:scale-90 rounded-xl text-zinc-500 hover:text-amber-400 border border-transparent hover:border-white/5 transition-all cursor-pointer"
                                                            title="عرض تفاصيل السيكشن"
                                                        >
                                                            <Eye size={15} />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => showDeleteConfirmAlert(sectionName ,()=> deleteFunction(sectionId))}
                                                        className="p-2 hover:bg-red-500/10 active:scale-90 rounded-xl text-zinc-500 hover:text-red-400 border border-transparent hover:border-red-500/10 transition-all cursor-pointer"
                                                        title="حذف القسم"
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
    )
}

export default SectionTable
