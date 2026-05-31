import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';

import 'react-responsive-modal/styles.css';

export default function AddCategoryModal({isOpen,setIsOpen}) {

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
            <h2 className="text-xl font-bold text-white">إضافة فئة (Category)</h2>
          </div>
          
          <p className="text-xs text-zinc-400 mb-6">أدخل تفاصيل الفئة الرئيسية الجديدة التي ستظهر في بنية المنيو.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* حقل اسم الفئة */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">اسم الفئة الرئيسية</label>
              <input
                type="text"
                placeholder="مثال: الأكثر مبيعاً، بيتزا لحوم، العروض التوفيرية"
                {...register('categoryName', { 
                  required: 'هذا الحقل مطلوب لتحديد اسم الفئة',
                })}
                className={`w-full px-4 py-3 rounded-xl bg-[#141414] border ${
                  errors.categoryName ? 'border-red-500' : 'border-zinc-800 focus:border-[#e17c05]'
                } text-white placeholder-zinc-600 text-sm focus:outline-none transition-colors`}
              />
              {errors.categoryName && (
                <span className="text-xs text-red-400 mt-1.5 block">{errors.categoryName.message}</span>
              )}
            </div>

            {/* حقل الوصف */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">الوصف المرجعي للقسم</label>
              <textarea
                rows="3"
                placeholder="اكتب وصفاً داخلياً يوضح تفرعات هذا القسم..."
                {...register('categoryDescription')}
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-zinc-800 focus:border-[#e17c05] text-white placeholder-zinc-600 text-sm focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* الأزرار السفلية متناسقة مع أزرار التحكم الجانبية */}
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