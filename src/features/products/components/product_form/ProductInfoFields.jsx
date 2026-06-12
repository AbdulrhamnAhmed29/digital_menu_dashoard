import { Flame } from 'lucide-react';
import React from 'react'
import { useFormContext } from 'react-hook-form'

function ProductInfoFields() {
    const { register, formState: { errors } } = useFormContext();
    const premiumInputClass = "w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all duration-200 placeholder-zinc-600 text-sm text-right";

    return (
        <div>
           
            {/* Product Name */}
            <div className="flex flex-col gap-2">
                <label className="text-zinc-300 text-sm font-semibold">اسم المنتج</label>
                <input
                    {...register("Title", {
                        required: "اسم المنتج مطلوب إدخاله",
                        minLength: { value: 3, message: "يجب أن يكون الاسم 3 أحرف على الأقل" }
                    })}
                    type="text"
                    placeholder="مثال: بيتزا سي فود رانش"
                    className={premiumInputClass}
                />
                {errors.Title && <p className="text-red-400 text-xs mt-1">{errors.Title.message}</p>}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
                <label className="text-zinc-300 text-sm font-semibold">وصف المكونات</label>
                <textarea
                    {...register("Description", {
                        required: "وصف المكونات مطلوب لتوضيح تفاصيل الصنف للزبون",
                        minLength: { value: 10, message: "الوصف يجب أن يكون 10 أحرف على الأقل" }
                    })}
                    rows={3}
                    placeholder="مثال: جبنه موتزريلا - بصل – جمبري كاليماري - صوص رانش..."
                    className={`${premiumInputClass} resize-none`}
                />
                {errors.Description && <p className="text-red-400 text-xs mt-1">{errors.Description.message}</p>}
            </div>
            {/* Is Spicy Checkbox */}
            <div className="flex items-center gap-3 bg-zinc-950/60 p-4 rounded-xl border border-white/5 hover:border-orange-500/20 transition-colors duration-300">
                <input
                    {...register("is_spicy")}
                    type="checkbox"
                    id="is_spicy"
                    className="w-5 h-5 rounded accent-amber-500 bg-zinc-900 border-white/10 cursor-pointer focus:ring-0 focus:ring-offset-0 transition-transform active:scale-95"
                />
                <label htmlFor="is_spicy" className="text-sm font-bold text-zinc-300 cursor-pointer flex items-center gap-2 select-none w-full">
                    <Flame size={16} className="text-orange-500 animate-pulse" />
                    <span>هل هذا المنتج حار؟ (Spicy)</span>
                </label>
            </div>

        </div>
    )
}

export default ProductInfoFields
