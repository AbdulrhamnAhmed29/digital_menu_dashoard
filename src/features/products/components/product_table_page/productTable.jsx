import { Edit3, Trash2 } from 'lucide-react';
import React from 'react'
import { showDeleteConfirmAlert } from '../../../../shared/Alert';
import { Link } from 'react-router-dom';

function ProductTable({ products, deleteFunction, }) {
    const STRAPI_URL = "http://localhost:1337";
    const getPriceForSize = (pricesMatrix, sizeName) => {
        const priceObj = pricesMatrix?.find(
            (p) => p.products_size?.size?.toLowerCase() === sizeName.toLowerCase()
        );
        return priceObj ? (
            `${priceObj.price} ج.م`
        ) : (
            <span className="text-stone-600 font-normal text-xs">—</span>
        );
    };
    // ======= TABLE_HEADERS ========
    const TABLE_HEADERS = [
        { id: "image", label: "صورة المنتج", className: "p-4 pr-6 text-right" },
        { id: "title", label: "المنتج", className: "p-4 text-right" },
        { id: "section", label: "السيكشن", className: "p-4 text-right" },
        { id: "size-s", label: "صغير (S)", className: "p-4 text-center" },
        { id: "size-m", label: "وسط (M)", className: "p-4 text-center" },
        { id: "size-l", label: "كبير (L)", className: "p-4 text-center" },
        { id: "actions", label: "إجراءات التحكم", className: "p-4 text-left pl-6" }
    ];
    return (
        <div>
            <div className="w-full overflow-hidden rounded-[2rem] border border-white/[0.05] bg-transparent backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="overflow-x-auto">
                    {products.length === 0 ? (
                        <div className="p-12 text-center text-stone-500 text-sm font-medium">
                            لا توجد منتجات مضافة حالياً. ابدأ بإضافة أول منتج للمنيو!
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
                            <tbody className="divide-y divide-white/[0.04] text-sm text-zinc-300">
                                {products.map((product, idx) => {
                                    const productId = product.id || idx;
                                    return (
                                        <tr
                                            key={productId}
                                            className="hover:bg-white/[0.02] transition-colors group"
                                        >
                                            {/* ======= Image Column =========== */}
                                            <td className="p-4 pr-6">
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-stone-950/40 shadow-inner">
                                                    {product.Image ? (
                                                        <img
                                                            src={`${STRAPI_URL}${product.Image.formats?.small?.url || product.Image.formats?.thumbnail?.url}`}
                                                            alt={product.Title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-600 font-bold bg-stone-900/50">
                                                            لا صورة
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/*========= Title and Description ========== */}
                                            <td className="p-4 font-bold text-white tracking-wide">
                                                <div className="flex flex-col text-right">
                                                    <span className="text-[15px] flex items-center gap-2">
                                                        {product.Title}
                                                        {product.is_spicy && (
                                                            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-red-950/40 border border-red-500/20 text-red-400 font-black tracking-wider animate-pulse">
                                                                حراق
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span className="text-zinc-500 text-xs font-normal line-clamp-1 mt-1 max-w-[220px]">
                                                        {product.Description || "لا يوجد وصف حالياً."}
                                                    </span>
                                                </div>
                                            </td>

                                            {/*======= Section Tag ========*/}
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-sm">
                                                    {product.menu_section?.[0]?.Name || "غير مصنف"}
                                                </span>
                                            </td>

                                            {/*======= Prices =========*/}
                                            <td className="p-4 text-center font-bold text-zinc-200 text-xs tracking-wide">
                                                {getPriceForSize(product.prices, "small")}
                                            </td>
                                            <td className="p-4 text-center font-bold text-zinc-200 text-xs tracking-wide">
                                                {getPriceForSize(product.prices, "medium")}
                                            </td>
                                            <td className="p-4 text-center font-bold text-zinc-200 text-xs tracking-wide">
                                                {getPriceForSize(product.prices, "large")}
                                            </td>

                                            {/*========= Actions Control===========*/}
                                            <td className="p-4 pl-6 text-left">
                                                <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-all duration-200">
                                                    {/*===== Edit Action =======*/}
                                                    <Link to={`/products/${product.documentId}`}>
                                                        <button
                                                            className="p-2 hover:bg-amber-500/10 active:scale-90 rounded-xl text-zinc-500 hover:text-amber-400 border border-transparent hover:border-amber-500/10 transition-all"
                                                            title="تعديل المنتج"
                                                        >
                                                            <Edit3 size={15} />
                                                        </button>

                                                    </Link>

                                                    {/*===== Delete Action ========*/}
                                                    <button
                                                        onClick={() => showDeleteConfirmAlert(product.Title, () => deleteFunction(product.documentId))}
                                                        className="p-2 hover:bg-red-500/10 active:scale-90 rounded-xl text-zinc-500 hover:text-red-400 border border-transparent hover:border-red-500/10 transition-all"
                                                        title="حذف المنتج"
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
            </div >
        </div >
    )
}

export default ProductTable
