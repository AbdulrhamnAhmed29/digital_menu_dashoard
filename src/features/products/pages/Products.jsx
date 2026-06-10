
import { useState } from "react";

// ========= GET DATA FROM HOOKS ========
import { useGetProducts } from "../productsHooks/useGetProducts";
import { useProductMutation } from "../productsHooks/useProductMutation";
import { useCategories } from "../../categories/hooks/useGetCategories";
import { useSectionMutation } from "../../categories/hooks/useSection_mutation";

// ====== SUB COMPONENT ========
import ProductPageHeader from "../components/productPageHeader";
import ProductTable from "../components/productTable";
import ProductPagination from "../components/productPagination";

const Products = () => {

  // ====== DESTRACTRUNG DATA FROM HOOKS  ========
  const { productsList,
    isLoading,
    isError,
    paginationData,
    page,
    setPage
  } = useGetProducts();

  console.log(productsList);

  const { deleteFunction } = useProductMutation();
  const { categories } = useCategories();
  const { addSection } = useSectionMutation();

  // ====== MODAEL STATE  ========
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const products = productsList || [];

  // ====== IS DATA LOADING ========
  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#f59e0b]"></div>
        <p className="text-amber-400 text-sm animate-pulse font-medium tracking-wide">
          جاري تحميل المنتجات الفاخرة...
        </p>
      </div>
    );
  }

  // ====== IS DATA ERRORS ========
  if (isError) {
    return (
      <div className="p-6 bg-stone-950 min-h-screen flex justify-center items-center">
        <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-2xl text-center max-w-md shadow-2xl backdrop-blur-md">
          <p className="text-red-400 font-bold mb-2">فشل في تحميل البيانات</p>
          <p className="text-stone-400 text-sm">
            تأكد من اتصال السيرفر بالداتا بيز وحاول مجدداً.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="p-6 space-y-6 select-none antialiased text-stone-100"
    >
      {/* ====== HEADER ======= */}
      <ProductPageHeader
        setIsSectionOpen={setIsSectionOpen}
        isSectionOpen={isSectionOpen}
        addSection={addSection}
        categories={categories}
      />

      {/* ========== TABLE BODY=========== */}
      <ProductTable
        deleteFunction={deleteFunction}
        products={products}
      />

      {/*======= PRODUCT PAGINATION ===== */}
      <ProductPagination
        page={page}
        setPage={setPage}
        paginationData={paginationData}
      />
    </div>
  );
};

export default Products;