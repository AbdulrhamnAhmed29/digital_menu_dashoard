
import { useState } from "react";

// ========= GET DATA FROM HOOKS ========
import { useGetProducts } from "../productsHooks/useGetProducts";
import { useProductMutation } from "../productsHooks/useProductMutation";
import { useCategories } from "../../categories/hooks/useGetCategories";
import { useSectionMutation } from "../../categories/hooks/useSection_mutation";

// ====== SUB COMPONENT ========
import ProductPageHeader from "../components/product_table_page/productPageHeader";
import ProductTable from "../components/product_table_page/productTable";
import ProductPagination from "../components/product_table_page/productPagination";
import SearchInput from "../../../shared/SearchInput";
import Loading from "../../../shared/Loading";
import Error from "../../../shared/Error";

const Products = () => {
  // ====== DESTRACTRUNG DATA FROM HOOKS  ========
  const { productsList,
    isLoading,
    isError,
    paginationData,
    page,
    setPage,
    search,
    setSearchItem,
  } = useGetProducts();
  const { deleteFunction } = useProductMutation();
  const { categories } = useCategories();
  const { addSection } = useSectionMutation();
  // ====== MODAEL STATE  ========
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const products = productsList || [];
  // ====== IS DATA LOADING ========
  if (isLoading) {
    return <Loading />
  }
  // ====== IS DATA ERRORS ========
  if (isError) {
    return <Error />
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
        setSearchItem={setSearchItem}
        search={search}

      />
      <div>
        <SearchInput
          setSearchItem={setSearchItem}
        />
      
      </div>

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