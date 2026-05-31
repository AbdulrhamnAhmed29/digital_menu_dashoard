import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';

import 'react-responsive-modal/styles.css';

export default function AddSectionModal({ isOpen, setIsOpen }) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            categoryName: '',
            categoryDescription: '',
        }
    });

    const onSubmit = async (data) => {
        try {
            console.log('Category Data:', data);
            reset();
            setIsOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const pizzaKingStyles = {
        modal: {
            background: '#0d0d0d',
            borderRadius: '16px',
            border: '1px solid #e17c05',
            color: '#ffffff',
            padding: '32px',
            maxWidth: '480px',
            width: '90%',
            boxShadow: '0 0 30px rgba(225, 124, 5, 0.15)',
        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(5px)',
        },
        closeIcon: {
            fill: '#a1a1aa',
        }
    };

    return (
        <div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} center styles={pizzaKingStyles}>
                <div className="text-right" dir="rtl">

                    <div className="flex items-center gap-2 mb-2 border-b border-zinc-800 pb-3">
                        <span className="text-[#e17c05] text-xl">🔸</span>
                        <h2 className="text-xl font-bold text-white">إضافة سكشن (Sections)</h2>
                    </div>
                    <p className="text-xs text-zinc-400 mb-6">أدخل تفاصيل السكشن الرئيسية الجديدة التي ستظهر داخل الفئة.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-300 mb-2">اسم السكشن </label>
                            <input
                                type="text"
                                placeholder="ادخل اسم السكشن"
                                {...register('categoryName')}
                                className={`w-full px-4 py-3 rounded-xl bg-[#141414] border ${errors.categoryName ? 'border-red-500' : 'border-zinc-800 focus:border-[#e17c05]'
                                    } text-white placeholder-zinc-600 text-sm focus:outline-none transition-colors`}
                            />
                            {errors.categoryName && (
                                <span className="text-xs text-red-400 mt-1.5 block">{errors.categoryName.message}</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-300 mb-2">الفئة التابع لها (Category)</label>
                            <div className="relative">
                                <select
                                    id="categorySelect"
                                    {...register('categorySelect', {
                                        required: 'برجاء اختيار الفئة الرئيسية',
                                    })}
                                    className={`w-full px-4 py-3 rounded-xl bg-[#141414] border ${errors.categorySelect ? 'border-red-500' : 'border-zinc-800 focus:border-[#e17c05]'
                                        } text-zinc-300 focus:text-white text-sm focus:outline-none transition-colors appearance-none cursor-pointer`}
                                >
                                    {/* الـ Placeholder الافتراضي */}
                                    <option value="" className="bg-[#0d0d0d] text-zinc-600">اختر الفئة الرئيسية...</option>

                                    {/* الخيارات بستايل غامق متناسق */}
                                    <option value="pizza" className="bg-[#0d0d0d] text-zinc-300 py-2">بيتزا</option>
                                    <option value="kingdom" className="bg-[#0d0d0d] text-zinc-300 py-2">كينجدام</option>
                                </select>

                                {/* سهم مخصص شيك (SVG) عشان لغينا السهم الافتراضي البايخ بتاع المتصفح بـ appearance-none */}
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>

                            {/* عرض رسالة الخطأ لو لم يتم الاختيار */}
                            {errors.categorySelect && (
                                <span className="text-xs text-red-400 mt-1.5 block">{errors.categorySelect.message}</span>
                            )}
                        </div>

                        <div className="flex gap-3 justify-end pt-4 border-t border-zinc-900 mt-6">
                            <button
                                type="button"
                                onClick={() => { reset(); setIsOpen(false); }}
                                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
                            >
                                إلغاء التعديل
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 rounded-xl bg-[#e17c05] hover:bg-[#cf6f02] text-white text-xs font-bold transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'جاري الحفظ...' : 'تأكيد الحفظ'}
                            </button>

                        </div>

                    </form>
                </div>
            </Modal>
        </div>
    );
}