import { useState } from "react";
import AddCategoryModal from "../components/CategoriesModal";
import { useCategories } from "../hooks/useGetCategories";
import AddSectionModal from "../components/SectionsModal";
import { useCatMutation } from "../hooks/useCategoriesMutation";
import { useSectionGet } from "../hooks/useSection_Get";
import { useSectionMutation } from "../hooks/useSection_mutation";
import SectionHeader from "../components/SectionHeader";
import SectionTable from "../components/SectionTable";

const Sections = () => {

  //========= DATA FROM HOOKS =======
  const { sections, isLoading } = useSectionGet();
  const { addSection, remove } = useSectionMutation();
  const { categories } = useCategories();
  const { error } = useCategories();
  const { isError, addCategory } = useCatMutation();

  //======= STATE MODEL =====
  const [isOpen, setIsOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const sectionsList = sections || [];

  // ======= IS DATA LOADING =====
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

  // ======= IS DATA ERRORS =====
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400 font-semibold">
          حدث خطأ أثناء جلب البيانات: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="p-6 space-y-6 select-none antialiased text-stone-100">

      {/*========== CATEGORY MODEL ======== */}
      <AddCategoryModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        addCategory={addCategory}
        isError={isError}
      />

      {/*========== SECTION MODEL ======== */}
      <AddSectionModal
        setIsSectionOpen={setIsSectionOpen}
        isSectionOpen={isSectionOpen}
        addSection={addSection}
        categories={categories}
        remove={remove}
      />

      {/*========== SECTION HEADER ===== */}
      <SectionHeader setIsSectionOpen={setIsSectionOpen} setIsOpen={setIsOpen} />

      {/*========== SECTION HEADER ===== */}
      <SectionTable sectionsList={sectionsList} />
    </div>
  );
};

export default Sections;