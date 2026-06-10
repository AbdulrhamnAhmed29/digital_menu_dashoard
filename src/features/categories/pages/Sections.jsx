import { useState } from "react";
//=========IMPORT DATA FROM HOOKS =====
import { useCategories } from "../hooks/useGetCategories";
import { useCatMutation } from "../hooks/useCategoriesMutation";
import { useSectionGet } from "../hooks/useSection_Get";
import { useSectionMutation } from "../hooks/useSection_mutation";

// ===== SUB COMPONENT ======
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
      {/*========== SECTION HEADER ===== */}
      <SectionHeader
        //====== STATE FOR MODEL======= 
        //----- SECTION MODEL STAE-----
        setIsSectionOpen={setIsSectionOpen}
        isSectionOpen={isSectionOpen}

        //----- CATEGORY MODEL STAE-----
        setIsOpen={setIsOpen}
        isOpen={isOpen}

        //==== FUNCTIONS CREATE AND CATEGORIES ARRAY ======== 
        categories={categories}
        addSec={addSection}
        addCategory={addCategory}
        isError={isError}
      />

      {/*========== SECTION TABLE ===== */}
      <SectionTable
        sectionsList={sectionsList}
        deleteFunction={remove} />
    </div>
  );
};

export default Sections;