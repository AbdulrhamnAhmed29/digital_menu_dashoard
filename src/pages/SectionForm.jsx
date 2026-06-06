import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

export default function SectionForm({ addSection, categories, availableProducts, toBack }) {

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            SectionName: '',
            categorySelect: '',
            price_offers: [{ price: '', price_offers: '' }],
            priceOfCompo: [{ product_id: '', offer_price: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "priceOfCompo"
    });

    const categoriesArray = categories || [];
    const productsArray = availableProducts || [];

    const onSubmit = async (data) => {
        const payload = {
            data: {
                Name: data.SectionName,
                category: data.categorySelect,

                section_offers: data.section_offers.map(item => ({
                    product: item.product_id,
                    offer_price: Number(item.offer_price)
                }))
            }
        };

        await addSection(payload);
        reset();
        if (toBack) toBack();
    };

    return (
        <div className="min-h-screen  text-white p-3" dir="rtl">
            <div className="w-full  rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6 border-b border-zinc-850 pb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[#e17c05] text-xl">🔸</span>
                        <h1 className="text-xl font-bold text-white">إضافة سيكشن جديد (New Section)</h1>
                    </div>
                    <button
                        type="button"
                        onClick={toBack}
                        className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs py-2 px-4 rounded-lg transition-all duration-300 shadow-md transform active:scale-[0.98] inline-flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        العودة للقائمة
                    </button>
                </div>

                <p className="text-xs text-zinc-400 mb-8 font-medium">قم بإنشاء السكشن، وحدد المنتجات وأسعار العروض المخفضة الخاصة بها داخل هذا السكشن.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* section name   */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-300 mb-2">اسم السكشن</label>
                            <input
                                type="text"
                                placeholder="مثال:  الوجبات التوفيرية"
                                {...register('SectionName', { required: 'برجاء إدخال اسم السكشن' })}
                                className={`w-full px-4 py-3 rounded-xl bg-[#141414] border ${errors.SectionName ? 'border-red-500' : 'border-zinc-800 focus:border-[#e17c05]'
                                    } text-white placeholder-zinc-700 text-sm focus:outline-none transition-colors`}
                            />
                            {errors.SectionName && (
                                <span className="text-xs text-red-400 mt-1.5 block">{errors.SectionName.message}</span>
                            )}
                        </div>
                        {/* catrgory select  */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-300 mb-2">الفئة التابع لها (Category)</label>
                            <div className="relative">
                                <select
                                    {...register('categorySelect', { required: 'برجاء اختيار الفئة الرئيسية' })}
                                    className={`w-full px-4 py-3 rounded-xl bg-[#141414] border ${errors.categorySelect ? 'border-red-500' : 'border-zinc-800 focus:border-[#e17c05]'
                                        } text-zinc-300 focus:text-white text-sm focus:outline-none transition-colors appearance-none cursor-pointer`}
                                >
                                    <option value="" className="bg-[#0d0d0d] text-zinc-650">اختر الفئة الرئيسية...</option>
                                    {categoriesArray.map((cat) => (
                                        <option key={cat.documentId} value={cat.documentId} className="bg-[#0d0d0d] text-zinc-300 py-2">
                                            {cat.Name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.categorySelect && (
                                <span className="text-xs text-red-400 mt-1.5 block">{errors.categorySelect.message}</span>
                            )}
                        </div>
                        {/* compo offer  */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-300 mb-2">اختر عرض الكمبو </label>
                            <div className="relative">
                                <select
                                    {...register('categorySelect')}
                                    className={`w-full px-4 py-3 rounded-xl bg-[#141414] border ${errors.categorySelect ? 'border-red-500' : 'border-zinc-800 focus:border-[#e17c05]'
                                        } text-zinc-300 focus:text-white text-sm focus:outline-none transition-colors appearance-none cursor-pointer`}
                                >
                                    <option value="" className="bg-[#0d0d0d] text-zinc-650">اختر الفئة الرئيسية...</option>
                                    {categoriesArray.map((cat) => (
                                        <option key={cat.documentId} value={cat.documentId} className="bg-[#0d0d0d] text-zinc-300 py-2">
                                            {cat.Name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-zinc-850 pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-zinc-250"> اختر عروض هذا السيكشن </h3>
                                <p className="text-[11px] text-zinc-500 mt-0.5">اختر العرض وحدد "سعر العرض" المخصص له داخل هذا السكشن.</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => append({ product_id: '', offer_price: '' })}
                                className="text-white hover:text-black bg-[#e17c05] hover:bg-[#ff931e] text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-md shadow-orange-950/20"
                            >
                                + إضافة منتج للسكشن
                            </button>
                        </div>
                        <div className="space-y-3 mt-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-4 items-center bg-[#141414] p-4 rounded-xl  transition-all hover:border-zinc-800">
                                    <div className="w-8/12 relative">
                                        <select
                                            {...register(`section_offers.${index}.product_id`, { required: true })}
                                            className="w-full px-4 py-2.5 rounded-xl bg-[#0d0d0d] border border-zinc-800 text-zinc-300 focus:text-white text-sm focus:outline-none focus:border-[#e17c05] transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="" className="text-zinc-650">اختر المنتج...</option>
                                            {productsArray.map((prod) => (
                                                <option key={prod.documentId} value={prod.documentId} className="bg-[#0d0d0d]">
                                                    {prod.Name} (السعر الأصلي: {prod.Price} ج.م)
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="w-3/12">
                                        <div className="relative flex items-center">
                                            <input
                                                type="number"
                                                placeholder="سعر العرض"
                                                {...register(`section_offers.${index}.offer_price`, { required: true, valueAsNumber: true })}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d0d0d] border border-zinc-800 text-white placeholder-zinc-700 text-sm text-center focus:outline-none focus:border-[#e17c05] transition-colors"
                                            />
                                            <span className="absolute left-3 text-xs font-bold text-zinc-600">ج.م</span>
                                        </div>
                                    </div>
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="w-1/12 text-zinc-500 hover:text-red-500 flex justify-center items-center p-2 rounded-xl hover:bg-red-500/5 transition-colors"
                                            title="حذف السطر"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="flex gap-3 justify-end pt-5 border-t border-zinc-850 mt-8">
                        <button
                            type="button"
                            onClick={() => { reset(); }}
                            className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
                        >
                            مسح الحقول
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-2.5 rounded-xl bg-[#e17c05] hover:bg-[#cf6f02] text-white text-xs font-bold transition-all disabled:opacity-50 shadow-lg shadow-orange-950/20"
                        >
                            {isSubmitting ? 'جاري حفظ السكشن...' : 'تأكيد وحفظ السكشن'}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}