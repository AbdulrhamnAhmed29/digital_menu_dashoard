import { useState } from "react";
import AddCategoryModal from "../features/categories/components/CategoriesModal";
import { useCategories } from "../features/categories/hooks/useGetCategories";
import { PlusCircle, FolderPlus, Trash2, Eye } from "lucide-react";
import AddSectionModal from "../features/categories/components/SectionsModal";
import { useCatMutation } from "../features/categories/hooks/useCategoriesMutation";
import { useSectionGet } from "../features/categories/hooks/useSection_Get";
import { useSectionMutation } from "../features/categories/hooks/useSection_mutation";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Sections = () => {
  const { sections, isLoading } = useSectionGet();
  const { addSection, remove } = useSectionMutation();
  const { categories } = useCategories();
  const { error } = useCategories();
  const { isError, addCategory } = useCatMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  const handleDelete = (id) => {
    Swal.fire({
      title: "هل أنت متأكد من الحذف؟",
      text: "لن تتمكن من استعادة هذا القسم أو البيانات المرتبطة به مجدداً!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#27272a",
      confirmButtonText: "نعم، احذفه فوراً! 🗑️",
      cancelButtonText: "إلغاء",
      reverseButtons: true,
      background: "#09090b",
      color: "#f4f4f5",
      customClass: {
        popup: "border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl",
        title: "font-bold text-white text-xl",
        htmlContainer: "text-zinc-400 text-sm mt-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id);
        Swal.fire({
          title: "تم الحذف!",
          text: "تم إزالة القسم بنجاح من المنيو.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          background: "#09090b",
          color: "#f4f4f5",
          customClass: {
            popup: "border border-white/10 rounded-2xl shadow-2xl",
            title: "font-bold text-white",
            htmlContainer: "text-zinc-400",
          },
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#f59e0b]"></div>
        <p className="text-zinc-400 text-sm animate-pulse font-medium">
          جاري تحميل الأقسام الفاخرة...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400 font-semibold">
          حدث خطأ أثناء جلب البيانات: {error.message}
        </p>
      </div>
    );
  }

  const sectionsList = sections || [];

  return (
    <div
      dir="rtl"
      className="p-6 space-y-6 select-none antialiased text-stone-100"
    >
      <AddCategoryModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        addCategory={addCategory}
        isError={isError}
      />
      <AddSectionModal
        setIsSectionOpen={setIsSectionOpen}
        isSectionOpen={isSectionOpen}
        addSection={addSection}
        categories={categories}
        remove={remove}
      />

      {/* الهيدر */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-l from-stone-100 via-amber-200 to-amber-500 bg-clip-text text-transparent">
            إدارة الاصناف (Sections)
          </h1>
          <p className="text-stone-500 text-[10px] mt-1 tracking-widest uppercase font-medium">
            Sections Management Dashboard
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white border border-white/10 rounded-xl font-medium text-sm transition-all active:scale-[0.98] shadow-md cursor-pointer"
          >
            <FolderPlus size={16} className="text-amber-400" />
            <span>إضافة فئة (Category)</span>
          </button>

          <button
            onClick={() => setIsSectionOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-[0_10px_25px_rgba(245,158,11,0.25)] text-black font-extrabold text-sm rounded-xl transition-all active:scale-[0.98] shadow-[0_4px_15px_rgba(245,158,11,0.2)] cursor-pointer"
          >
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
                  const sectionId = section?.documentId;
                  const sectionName = section?.Name;
                  const categoryName = section?.category?.Name || "عام";
                  return (
                    <tr
                      key={sectionId}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-4 pr-6 font-bold text-white tracking-wide">
                        {sectionName}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-sm">
                          {categoryName}
                        </span>
                      </td>
                      <td className="p-4 pl-6 text-left">
                        <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-all duration-200">
                          <Link to={`/section/${sectionId}`}>
                            <button
                              className="p-2 hover:bg-white/5 active:scale-90 rounded-xl text-zinc-500 hover:text-amber-400 border border-transparent hover:border-white/5 transition-all cursor-pointer"
                              title="عرض تفاصيل السيكشن"
                            >
                              <Eye size={15} />
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDelete(sectionId)}
                            className="p-2 hover:bg-red-500/10 active:scale-90 rounded-xl text-zinc-500 hover:text-red-400 border border-transparent hover:border-red-500/10 transition-all cursor-pointer"
                            title="حذف القسم"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sections;