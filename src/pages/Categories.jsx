import { useState } from "react";
import AddCategoryModal from "../features/categories/components/CategoriesModal"
import { useCategories } from "../features/categories/hooks/useGetCategories"
import { PlusCircle, FolderPlus, Edit2, Trash2, Layers } from "lucide-react"
import AddSectionModal from "../features/categories/components/SectionsModal";
const Categories = () => {
  const { isLoading, error, sections } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-400 text-sm animate-pulse font-medium">جاري تحميل الأقسام الفاخرة...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400 font-semibold">حدث خطأ أثناء جلب البيانات: {error.message}</p>
      </div>
    )
  }

  const sectionsList = sections || []

  return (
    <div className="p-6 space-y-6 animate-fade-in" dir="rtl">
      <AddCategoryModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <AddSectionModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Layers className="text-amber-500" size={24} />
            <span>إدارة بنية المنيو</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">عرض الأقسام الفرعية والفئات الرئيسية التابعة لها والتحكم بها</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white border border-white/10 rounded-xl font-medium text-sm transition-all duration-300 shadow-md">
            <FolderPlus size={16} className="text-amber-400" />
            <span>إضافة فئة (Category)</span>
          </button>
          <button onClick={() => setIsOpen(true)}  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-sm rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.4)] hover:scale-[1.01]">
            <PlusCircle size={16} />
            <span>إضافة قسم (Sections)</span>
          </button>
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-zinc-900/20 to-zinc-950/40 backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          {sectionsList.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 text-sm">
              لا توجد أقسام مضافة حالياً. ابدأ بإضافة أول قسم للمنيو!
            </div>
          ) : (
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 pr-6">اسم القسم الفرعي (Section)</th>
                  <th className="p-4">الفئة الرئيسية التابع لها (Category)</th>
                  <th className="p-4 text-left pl-6">إجراءات التحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-sm text-zinc-300">
                {sectionsList.map((section) => {
                  const sectionId = section.id;
                  const sectionName = section?.Name;
                  const categoryName = section?.category?.Name || "عام";
                  return (
                    <tr key={sectionId} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 pr-6 font-bold text-white tracking-wide">
                        {sectionName}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-sm">
                          {categoryName}
                        </span>
                      </td>
                      <td className="p-4 pl-6 text-left">
                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            className="p-2 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white border border-transparent hover:border-white/10 transition-all duration-200"
                            title="تعديل القسم"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="p-2 hover:bg-red-500/10 rounded-xl text-zinc-500 hover:text-red-400 border border-transparent hover:border-red-500/10 transition-all duration-200"
                            title="حذف القسم"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  )
}

export default Categories