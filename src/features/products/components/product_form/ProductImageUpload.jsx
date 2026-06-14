import { ImagePlus } from 'lucide-react';
import React from 'react'
import { useFormContext } from 'react-hook-form';

function ProductImageUpload({ imageUrl, mode }) {
    const { register, watch, formState: { errors } } = useFormContext()
    const STRAPI_URL = "http://localhost:1337";
    const currantImage = imageUrl ? `${STRAPI_URL}${imageUrl}` : null

    //    ========= wselected image =====
    const selectedImage = watch("image");
    //    =========  image =====
    

    const imagePreview = selectedImage && selectedImage[0]
        ? URL.createObjectURL(selectedImage[0])
        : currantImage;
    const isImage = imagePreview || currantImage;
    const isCreate = mode === "create"

    return (
        <div>
            <div className="space-y-2 border-t border-white/5 pt-5">
                <label className="text-zinc-300 text-sm font-semibold">صورة المنتج</label>
                {isCreate && !isImage ? 
                    <div className="relative group flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-amber-500/40 bg-zinc-950/40 p-6 rounded-xl cursor-pointer transition-all duration-300">
                        <input
                            {...register("image")}
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="p-3 bg-zinc-900 rounded-full text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/10 transition-all duration-300">
                                <ImagePlus size={22} />
                            </div>
                            <p className="text-zinc-400 text-xs font-medium">
                                اضغط هنا لرفع صورة المنتج، أو اسحب الملف وأفلته مباشرة
                            </p>
                            <p className="text-zinc-600 text-[10px]">PNG, JPG, WEBP (الحد الأقصى 5 ميجا)</p>
                        </div>
                    </div>
                : (
                    <div className="relative w-full max-h-64 rounded-xl overflow-hidden border border-white/10 bg-zinc-950 flex items-center justify-center group shadow-inner">
                        <img
                            src={imagePreview}
                            alt="معاينة منتج المنيو"
                            className="w-full h-full max-h-64 object-contain p-2 rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <div className="relative cursor-pointer bg-zinc-900 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-zinc-800 active:scale-95 transition-all shadow-lg">
                                <ImagePlus size={14} className="text-amber-400" />
                                <span>تغيير الصورة</span>
                                <input
                                    {...register("image")}
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                )}
                {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image.message}</p>}
            </div>

        </div>
    )
}

export default ProductImageUpload
