import React from 'react';
import {  useParams } from 'react-router-dom';
import { useSectionGet } from "../features/categories/hooks/useSection_Get";
import BackButton from '../shared/BackButton';

function SectionDetails() {
    const { id } = useParams();
    const { findOne, isLoading, error } = useSectionGet(id);


    const STRAPI_BASE_URL = "http://localhost:1337";

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] bg-[#0a0a0a]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }
 

    if (error || !findOne) {
        return (
            <div className="text-center py-20 text-amber-500/80 font-medium text-lg bg-[#000]/60 rounded-2xl border border-amber-950/40 max-w-2xl mx-auto my-10">
                عذراً، لم نتمكن من تحميل بيانات القسم حالياً.
            </div>
        );
    }

    const { Name, products, compo_offers_prices, offers_prices } = findOne;

    return (

        <div className="max-w-6xl mx-auto px-6 py-6 text-gray-200" dir="rtl">

            <BackButton />


            {/* ================= section name================= */}

            <div className="text-center mb-10 relative">
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 tracking-wide mb-2">
                    {Name}
                </h1>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mt-4"></div>
            </div>



            {/* ================ section offers ================ */}
            {
                (compo_offers_prices?.length > 0 || offers_prices?.length > 0) && (
                    <div className="mb-12">
                        <h2 className="text-lg font-bold text-amber-400/90 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-4 bg-amber-500 rounded-sm"></span>
                            عروض السيكشن الحالية
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {offers_prices?.map((offerObj) => (
                                <div key={offerObj.id} className="bg-[#050505] border border-amber-500/20 rounded-xl p-4 flex items-center justify-between shadow-2xl">
                                    <div>
                                        <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded border border-amber-500/20"> خصم</span>
                                        <h3 className="text-md font-semibold mt-2 text-gray-300"> عرض ال {offerObj.offer?.quantity || "خصم خاص"} {offerObj.offer?.offer_type === "medium" ? "وسط" : "كبير" || "خصم خاص"} </h3>
                                    </div>
                                    <span className="text-xl font-black text-amber-400">{offerObj.price} ج.م</span>
                                </div>
                            ))}
                            {/* compo offer */}
                            {compo_offers_prices?.length > 0 && (
                                <div className="bg-[#050505] border border-orange-500/20 rounded-xl p-4 flex items-center justify-between shadow-2xl">
                                    <div>
                                        <span className="bg-orange-500/10 text-orange-400 text-xs px-2 py-0.5 rounded border border-orange-500/20"> {compo_offers_prices?.[0]?.compo_offer?.title}</span>
                                        <h3 className="text-md font-semibold mt-2 text-gray-300">{compo_offers_prices?.compo_offer?.description || "ميكس كومبو"}</h3>
                                    </div>
                                    <span className="text-xl font-black text-orange-400">{compo_offers_prices?.[0]?.price} ج.م</span>
                                </div>
                            )}

                        </div>
                    </div>
                )
            }

            {/* ================= productas================= */}
            <div>
                <h2 className="text-lg font-bold text-amber-400/90 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-amber-500 rounded-sm"></span>
                    الأصناف المتاحة بالقسم
                </h2>

                {products?.length === 0 ? (
                    <p className="text-gray-500 text-center py-10 bg-[#000]/40 rounded-xl border border-gray-950">لا توجد منتجات متوفرة في هذا القسم حالياً.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products?.map((product) => {
                            const sortedPrices = product.prices?.sort((a, b) => a.price - b.price);
                            const startingPrice = sortedPrices?.[0]?.price;
                            const imageUrl = product.Image?.url ? `${STRAPI_BASE_URL}${product.Image.url}` : 'https://via.placeholder.com/300';

                            return (
                                <div key={product.id} className="bg-[#000] rounded-xl overflow-hidden border border-zinc-900 flex flex-col justify-between group hover:border-amber-500/30 transition-all duration-300 shadow-2xl">

                                    <div className="relative h-48 bg-[#050505] overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt={product.Title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent"></div>
                                        {product.is_On_Offer && (
                                            <span className="absolute top-3 right-3 bg-amber-500 text-black font-black text-[10px] px-2 py-0.5 rounded shadow-md">
                                                خصم
                                            </span>
                                        )}
                                    </div>

                                    {/* تفاصيل المنتج */}
                                    <div className="p-4 flex-1 flex flex-col justify-between bg-[#000]">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-200 group-hover:text-amber-400 transition-colors duration-200 mb-1">{product.Title}</h3>
                                            <p className="text-xs text-gray-400/70 line-clamp-2 min-h-[2rem] font-light leading-relaxed">{product.Description}</p>
                                        </div>

                                        {/* أسعار وأحجام المنتج */}
                                        <div className="mt-4 pt-3 border-t border-zinc-900">
                                            <div className="flex flex-col gap-1.5 mb-4">
                                                {product.prices?.map((p) => (
                                                    <div key={p.id} className="flex justify-between items-center bg-[#050505] px-2.5 py-1.5 rounded border border-zinc-900 text-xs">
                                                        <span className="text-gray-400 font-light">{p.products_size?.size || 'حجم عادي'}</span>
                                                        <span className="text-amber-400 font-bold">{p.price} ج.م</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* زر الإضافة بتصميم فخم متناسق مع اللوجو */}
                                            <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-black text-xs py-2 rounded-lg transition-all duration-300 shadow-md transform active:scale-[0.98]">
                                                تعديل / إدارة الصنف {startingPrice && `(من ${startingPrice} ج.م)`}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

        </div >
    );
}

export default SectionDetails;