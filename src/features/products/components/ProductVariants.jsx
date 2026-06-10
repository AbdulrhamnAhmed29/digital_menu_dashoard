import { PlusCircle, Trash2 } from 'lucide-react';
import React from 'react'
import { useFormContext , useFieldArray } from 'react-hook-form'

function ProductVariants({Size}) {
    const { register,control, formState: { errors } } = useFormContext();
    const {fields , append , remove}=useFieldArray({
        control,
        name:"prices"
    });
    const premiumInputClass = "w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all duration-200 placeholder-zinc-600 text-sm text-right";
    return (
        <div>
            <div className="space-y-4 border-t border-white/5 pt-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-amber-400 font-bold text-sm">أسعار وأحجام المنتج (Variants)</h3>
                    <button
                        type="button"
                        onClick={() => append({ products_size: "", price: "" })}
                        className="flex items-center gap-1.5 text-xs bg-gradient-to-l from-amber-500 to-orange-600 text-black px-4 py-2 rounded-xl font-black hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md shadow-orange-600/10"
                    >
                        <PlusCircle size={14} />
                        <span>إضافة حجم وسعر</span>
                    </button>
                </div>

                {/* Dynamic List */}
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex flex-col sm:flex-row items-end gap-3 bg-zinc-950/40 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors duration-200"
                        >
                            {/* Size Selector */}
                            <div className="w-full sm:flex-1 flex flex-col gap-2">
                                <label className="text-zinc-400 text-xs font-medium">اختر الحجم</label>
                                <select
                                    {...register(`prices.${index}.products_size`, {
                                        required: "برجاء اختيار الحجم"
                                    })}
                                    className={`${premiumInputClass} bg-zinc-950`}
                                >
                                    <option value="" className="bg-zinc-950 text-zinc-500">اختر الحجم...</option>
                                    {Size.map((size) => (
                                        <option key={size.documentId} value={size.documentId} className="bg-zinc-950">
                                            {size.size === "large" ? "كبير (Large)" : size.size === "medium" ? "وسط (Medium)" : size.size === "small" ? "صغير (Small)" : size.size}
                                        </option>
                                    ))}
                                </select>
                                {errors.prices?.[index]?.products_size && (
                                    <p className="text-red-400 text-[10px] mt-1">{errors.prices[index].products_size.message}</p>
                                )}
                            </div>

                            {/* Price Input */}
                            <div className="w-full sm:w-44 flex flex-col gap-2">
                                <label className="text-zinc-400 text-xs font-medium">السعر (ج.م)</label>
                                <input
                                    {...register(`prices.${index}.price`, {
                                        required: "السعر مطلوب",
                                        valueAsNumber: true,
                                        min: { value: 1, message: "يجب أن يكون أكبر من 0" }
                                    })}
                                    type="number"
                                    placeholder="السعر"
                                    className={premiumInputClass}
                                />
                                {errors.prices?.[index]?.price && (
                                    <p className="text-red-400 text-[10px] mt-1">{errors.prices[index].price.message}</p>
                                )}
                            </div>

                            {/* Delete Button */}
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-200 sm:mb-0 mb-1 active:scale-95"
                                    title="حذف هذا البديل"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductVariants
