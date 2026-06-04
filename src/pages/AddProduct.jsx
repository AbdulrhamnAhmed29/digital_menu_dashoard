import { useForm, useFieldArray } from "react-hook-form";
import { PlusCircle, Trash2, ImagePlus, Flame } from "lucide-react";
import { useGetProducts } from "../features/products/productsHooks/useGetProducts";
const premiumInputClass = "w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all duration-200 placeholder-zinc-600 text-sm text-right";

const AddProductForm = () => {
    const {productsSizes}= useGetProducts();
    const Size = productsSizes || [];
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            isSpicy: false,
            prices: [{ sizeId: "", price: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "prices",
    });

    const selectedImage = watch("image");
    const imagePreview = selectedImage && selectedImage[0]
        ? URL.createObjectURL(selectedImage[0])
        : null;

    const onSubmit = async (data) => {
        console.log("الداتا النهائية الجاهزة للـ Payload:", data);

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("is_spicy", data.isSpicy);
        formData.append("prices", JSON.stringify(data.prices));

        if (data.image && data.image[0]) {
            formData.append("files.image", data.image[0]);
        }

        // هنا تقوم باستدعاء دالة الـ Mutation أو الـ API Request الخاصة بك
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 rounded-2xl w-full mx-auto space-y-6 text-right shadow-2xl backdrop-blur-md"
            dir="rtl"
        >
            <div className="text-right">
                <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-l from-stone-100 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                     اضافة منتج جديد للمنيو (Add New Product)
                </h1>
                <p className="text-stone-500 text-[10px] mt-1 tracking-widest uppercase font-medium">
                    Add a new product to the menu 
                </p>
            </div>

            {/* اسم المنتج */}
            <div className="flex flex-col gap-2">
                <label className="text-zinc-300 text-sm font-semibold">اسم المنتج</label>
                <input
                    {...register("title", {
                        required: "اسم المنتج مطلوب إدخاله",
                        minLength: { value: 3, message: "يجب أن يكون الاسم 3 أحرف على الأقل" }
                    })}
                    type="text"
                    placeholder="مثال: بيتزا سي فود رانش"
                    className={premiumInputClass}
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>

            {/* وصف المنتج */}
            <div className="flex flex-col gap-2">
                <label className="text-zinc-300 text-sm font-semibold">وصف المكونات</label>
                <textarea
                    {...register("description", {
                        required: "وصف المكونات مطلوب لتوضيح تفاصيل الصنف للزبون",
                        minLength: { value: 10, message: "الوصف يجب أن يكون 10 أحرف على الأقل" }
                    })}
                    rows={3}
                    placeholder="مثال: جبنه موتزريلا - بصل – جمبري كاليماري - صوص رانش..."
                    className={`${premiumInputClass} resize-none`}
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
            </div>

            {/* حقل الـ Checkbox للحار (Spicy) */}
            <div className="flex items-center gap-3 bg-zinc-950/60 p-4 rounded-xl border border-white/5">
                <input
                    {...register("isSpicy")}
                    type="checkbox"
                    id="isSpicy"
                    className="w-4 h-4 rounded accent-amber-500 bg-zinc-900 border-white/10 cursor-pointer focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="isSpicy" className="text-sm font-bold text-zinc-300 cursor-pointer flex items-center gap-2 select-none">
                    <Flame size={16} className="text-orange-500 animate-pulse" />
                    <span>هل هذا المنتج حار؟ (Spicy)</span>
                </label>
            </div>

            {/* الـ Dynamic Variants (الأحجام والأسعار الديناميكية) */}
            <div className="space-y-4 border-t border-white/5 pt-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-amber-400 font-bold text-sm">أسعار وأحجام المنتج (Variants)</h3>
                    <button
                        type="button"
                        onClick={() => append({ sizeId: "", price: "" })}
                        className="flex items-center gap-1.5 text-xs bg-gradient-to-l from-amber-500 to-orange-600 text-black px-3 py-2 rounded-xl font-black hover:opacity-90 transition-all duration-200"
                    >
                        <PlusCircle size={14} />
                        <span>إضافة حجم وسعر</span>
                    </button>
                </div>

                {/* عرض القائمة الديناميكية وعمل Loop عليها */}
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex flex-col sm:flex-row items-end gap-3 bg-white/[0.01] p-4 rounded-xl border border-white/[0.04]"
                        >
                            {/* اختيار الحجم */}
                            <div className="w-full sm:flex-1 flex flex-col gap-2">
                                <label className="text-zinc-400 text-xs">اختر الحجم</label>
                                <select
                                    {...register(`prices.${index}.sizeId`, {
                                        required: "برجاء اختيار الحجم"
                                    })}
                                    className={premiumInputClass}
                                >
                                    <option value="" className="bg-zinc-950">اختر الحجم...</option>
                                    {Size.map((size) => (
                                        <option key={size.documentId} value={size.documentId} className="bg-zinc-950">
                                            {size.size === "large" ? "كبير (Large)" : size.size === "medium" ? "وسط (Medium)" : size.size === "small" ? "صغير (Small)" : ""}
                                        </option>
                                    ))}
                                </select>
                                {errors.prices?.[index]?.sizeId && (
                                    <p className="text-red-400 text-[10px] mt-1">{errors.prices[index].sizeId.message}</p>
                                )}
                            </div>

                            {/* إدخال السعر */}
                            <div className="w-full sm:w-44 flex flex-col gap-2">
                                <label className="text-zinc-400 text-xs">السعر (ج.م)</label>
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

                            {/* زر حذف الـ Variant المعين (يختفي في حالة وجود عنصر واحد فقط) */}
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-transparent hover:border-red-500/10 transition-colors"
                                    title="حذف هذا البديل"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* حقل رفع الصورة مع ميزة المعاينة قبل الـ Submit */}
            <div className="space-y-2 border-t border-white/5 pt-5">
                <label className="text-zinc-300 text-sm font-semibold">صورة المنتج</label>

                {!imagePreview ? (
                    /* في حالة عدم وجود صورة مختارة: يعرض صندوق الرفع الافتراضي */
                    <div className="relative group flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-amber-500/40 bg-zinc-950/40 p-6 rounded-xl cursor-pointer transition-colors">
                        <input
                            {...register("image", {
                                required: "صورة المنتج الفاخرة مطلوبة"
                            })}
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="p-3 bg-zinc-900 rounded-full text-amber-400 group-hover:scale-110 transition-transform duration-300">
                                <ImagePlus size={22} />
                            </div>
                            <p className="text-zinc-400 text-xs font-medium">
                                اضغط هنا لرفع صورة المنتج، أو اسحب الملف وأفلته مباشرة
                            </p>
                            <p className="text-zinc-600 text-[10px]">PNG, JPG, WEBP (الحد الأقصى 5 ميجا)</p>
                        </div>
                    </div>
                ) : (
                    /* في حالة وجود صورة مختارة: يعرض معاينة حية فاخرة */
                    <div className="relative w-full max-h-64 rounded-xl overflow-hidden border border-white/10 bg-zinc-950 flex items-center justify-center group shadow-inner">
                        <img
                            src={imagePreview}
                            alt="معاينة منتج المنيو"
                            className="w-full h-full max-h-64 object-contain p-2 rounded-xl"
                        />

                        {/* طبقة شفافة تظهر عند الـ Hover تتيح تغيير الصورة فورًا */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                            <div className="relative cursor-pointer bg-zinc-900 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg">
                                <ImagePlus size={14} className="text-amber-400" />
                                <span>تغيير الصورة الفاخرة</span>
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

            {/* زر الحفظ النهائي للوحة التحكم */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-l from-amber-500 to-orange-600 text-black font-black text-sm rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.15)]"
            >
                {isSubmitting ? "جاري حفظ وتشفير المنتج الفاخر..." : "تأكيد وإضافة المنتج للمنيو"}
            </button>
        </form>
    );
};

export default AddProductForm;