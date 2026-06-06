import { useForm, useFieldArray } from "react-hook-form";
import { PlusCircle, Trash2, ImagePlus, Flame } from "lucide-react";
import { useGetProducts } from "../features/products/productsHooks/useGetProducts";
import { useProductMutation } from "../features/products/productsHooks/useProductMutation";
import { useSectionGet } from "../features/categories/hooks/useSection_Get";
import Swal from "sweetalert2";
const premiumInputClass = "w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all duration-200 placeholder-zinc-600 text-sm text-right";

const AddProductForm = () => {
    const { productsSizes } = useGetProducts();
    const { addFunction } = useProductMutation();
    const { sections } = useSectionGet();
    const sectionsList = sections || [];
    const Size = productsSizes || [];
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            Title: "",
            Description: "",
            is_spicy: false,
            menu_section: [{ sectionId: "" }],
            prices: [{ products_size: "", price: "" }],
        },
    });

    // fields of sizes 
    const { fields: priceFields, append: priceAppend, remove: priceRemove } = useFieldArray({
        control,
        name: "prices",
    });

    // fields of sections 
    const { fields: sectionFields, append: sectionsAppend, remove: sectionsRemove } = useFieldArray({
        control,
        name: "menu_section"
    });


    const selectedImage = watch("image");
    const imagePreview = selectedImage && selectedImage[0]
        ? URL.createObjectURL(selectedImage[0])
        : null;

    const onSubmit = async (data) => {
        console.log(data)
        const formData = new FormData();
        if (data.image[0]) {
            formData.append("files", data.image[0]);
        }
        addFunction({ formData, data });
        Swal.fire({
            title: `تمت إضافة ${data.Title || data.title} بنجاح`, // تعديل الحرف الكبير حسب الـ register في حقولك
            text: "تم إدراج المنتج الجديد في قائمة المنيو الفاخرة.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            background: "#0c0a09", // متناسق تماماً مع bg-zinc-950/bg-stone-950
            color: "#f5f5f4",
            iconColor: "#f59e0b",  // لون الأيقونة برتقالي/ذهبي متناسق مع تصميمك
            customClass: {
                popup: "border border-white/5 rounded-2xl shadow-2xl backdrop-blur-md",
                title: "font-black text-white text-lg",
                htmlContainer: "text-stone-400 text-sm font-medium",
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 rounded-2xl w-full mx-auto space-y-6 text-right shadow-2xl backdrop-blur-md "
            dir="rtl"
        >
            {/* Header */}
            <div className="text-right border-b border-white/5 pb-4">
                <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-l from-stone-100 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                    إضافة منتج جديد للمنيو (Add New Product)
                </h1>
                <p className="text-stone-500 text-[10px] mt-1 tracking-widest uppercase font-medium">
                    Add a new product to the menu
                </p>
            </div>

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

            {/* Dynamic Sections List  */}
            <div className="space-y-4 border-t border-white/5 pt-5">
                {/* btn of append section  */}
                <div className="flex items-center justify-between">
                    <h3 className="text-amber-400 font-bold text-sm">أقسام القائمة (Sections)</h3>
                    <button
                        type="button"
                        onClick={() => sectionsAppend({ sectionId: "" })}
                        className="flex items-center gap-1.5 text-xs bg-gradient-to-l from-amber-500 to-orange-600 text-black px-4 py-2 rounded-xl font-black hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md shadow-orange-600/10"
                    >
                        <PlusCircle size={14} />
                        <span>إضافة سيكشن (Section)</span>
                    </button>
                </div>
                {/* Dynamic List of sections */}
                <div className="space-y-3">
                    {sectionFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex flex-col sm:flex-row items-end gap-3 bg-zinc-950/40 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors duration-200"
                        >
                            {/* section Selector */}
                            <div className="w-full sm:flex-1 flex flex-col gap-2">
                                <label className="text-zinc-400 text-xs font-medium">اختر السيكشن</label>
                                <select
                                    {...register(`menu_section.${index}.sectionId`, {
                                        required: "برجاء اختيار السيكشن"
                                    })}
                                    className={`${premiumInputClass} bg-zinc-950`}
                                >
                                    <option value="" className="bg-zinc-950 text-zinc-500">اختر السيكشن...</option>
                                    {sectionsList.map((section) => (
                                        <option key={section.documentId} value={section.documentId} className=" text-white bg-zinc-950">
                                            {section.Name }
                                        </option>
                                    ))}
                                </select>
                                {errors.menu_section?.[index]?.sectionId && (
                                    <p className="text-red-400 text-[10px] mt-1">{errors.menu_section[index].sectionId.message}</p>
                                )}
                            </div>

                            {/* Delete Button */}
                            {sectionFields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => sectionsRemove(index)}
                                    className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-200 sm:mb-0 mb-1 active:scale-95"
                                    title="حذف هذا السيكشن"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>



            {/* Product Variants */}
            <div className="space-y-4 border-t border-white/5 pt-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-amber-400 font-bold text-sm">أسعار وأحجام المنتج (Variants)</h3>
                    <button
                        type="button"
                        onClick={() => priceAppend({ products_size: "", price: "" })}
                        className="flex items-center gap-1.5 text-xs bg-gradient-to-l from-amber-500 to-orange-600 text-black px-4 py-2 rounded-xl font-black hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md shadow-orange-600/10"
                    >
                        <PlusCircle size={14} />
                        <span>إضافة حجم وسعر</span>
                    </button>
                </div>

                {/* Dynamic List */}
                <div className="space-y-3">
                    {priceFields.map((field, index) => (
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
                            {priceFields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => priceRemove(index)}
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

            {/* Product Image */}
            <div className="space-y-2 border-t border-white/5 pt-5">
                <label className="text-zinc-300 text-sm font-semibold">صورة المنتج</label>
                {!imagePreview ? (
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
                ) : (
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

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-l from-amber-500 to-orange-600 text-black font-black text-sm rounded-xl hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.15)]"
            >
                {isSubmitting ? "جاري حفظ الصنف الفاخر..." : "تأكيد وإضافة المنتج للمنيو"}
            </button>
        </form>
    );
};

export default AddProductForm;