import { useGetProducts } from "../features/products/productsHooks/useGetProducts";
import { PlusCircle, FolderPlus, Trash2, Edit3 } from "lucide-react";
import Swal from "sweetalert2";
import { useProductMutation } from "../features/products/productsHooks/useProductMutation";
import { useCategories } from "../features/categories/hooks/useGetCategories";
import SectionModal from "../features/categories/components/SectionsModal";
import { useSectionMutation } from "../features/categories/hooks/useSection_mutation";
import { useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const { productsList, isLoading, isError } = useGetProducts();
  const { deleteFunction } = useProductMutation();
  const { categories } = useCategories();
  const { addSection } = useSectionMutation();
  const STRAPI_URL = "http://localhost:1337";
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  const handleDeleteProduct = (id, title) => {
    Swal.fire({
      title: "هل أنت متأكد من الحذف؟",
      text: `لن تتمكن من استعادة منتج (${title}) أو بياناته مجدداً!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#1c1917",
      confirmButtonText: "نعم، احذفه فوراً! 🗑️",
      cancelButtonText: "إلغاء",
      reverseButtons: true,
      background: "#0c0a09",
      color: "#f5f5f4",
      customClass: {
        popup: "border border-white/5 rounded-[2rem] backdrop-blur-md shadow-2xl",
        title: "font-black text-white text-xl",
        htmlContainer: "text-stone-400 text-sm mt-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFunction(id);
        Swal.fire({
          title: "تم الحذف!",
          text: "تم إزالة المنتج بنجاح من القائمة.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          background: "#0c0a09",
          color: "#f5f5f4",
          customClass: {
            popup: "border border-white/5 rounded-2xl shadow-2xl",
            title: "font-bold text-white",
            htmlContainer: "text-stone-400",
          },
        });
      }
    });
  };

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

  const products = productsList || [];

  const getPriceForSize = (pricesMatrix, sizeName) => {
    const priceObj = pricesMatrix?.find(
      (p) => p.products_size?.size?.toLowerCase() === sizeName.toLowerCase()
    );
    return priceObj ? (
      `${priceObj.price} ج.م`
    ) : (
      <span className="text-stone-600 font-normal text-xs">—</span>
    );
  };

  return (
    <div
      dir="rtl"
      className="p-6 space-y-6 select-none antialiased text-stone-100"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-5">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-l from-stone-100 via-amber-200 to-amber-500 bg-clip-text text-transparent">
            إدارة المنتجات (Products)
          </h1>
          <p className="text-stone-500 text-[10px] mt-1 tracking-widest uppercase font-medium">
            Products Management Dashboard
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSectionOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-stone-950/80 hover:bg-stone-900 text-stone-200 border border-white/[0.08] hover:border-amber-500/30 rounded-xl font-bold text-xs shadow-md transition-all active:scale-[0.98]"
          >
            <FolderPlus size={15} className="text-amber-500" />
            <span> اضافة سيكشن (Sections)</span>
          </button>
          
          <SectionModal
            categories={categories}
            addSection={addSection}
            isSectionOpen={isSectionOpen}
            setIsSectionOpen={setIsSectionOpen}
          />

          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 hover:shadow-[0_10px_25px_rgba(245,158,11,0.25)] text-stone-950 font-black text-xs rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.15)] transition-all active:scale-[0.98]"
          >
           <Link to="/products/add" className="flex items-center gap-2">
              <PlusCircle size={15} />
              <span>إضافة منتج جديد</span>
            </Link>
          </button>
        </div>
      </div>

      {/* Main Content Table Container */}
      <div className="w-full overflow-hidden rounded-[2rem] border border-white/[0.05] bg-transparent backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="overflow-x-auto">
          {products.length === 0 ? (
            <div className="p-12 text-center text-stone-500 text-sm font-medium">
              لا توجد منتجات مضافة حالياً. ابدأ بإضافة أول منتج للمنيو!
            </div>
          ) : (
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 pr-6">صورة المنتج</th>
                  <th className="p-4">المنتج</th>
                  <th className="p-4">السيكشن</th>
                  <th className="p-4 text-center">صغير (S)</th>
                  <th className="p-4 text-center">وسط (M)</th>
                  <th className="p-4 text-center">كبير (L)</th>
                  <th className="p-4 text-left pl-6">إجراءات التحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-sm text-zinc-300">
                {products.map((product, idx) => {
                  const productId = product.id || idx;
                  return (
                    <tr
                      key={productId}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Image Column */}
                      <td className="p-4 pr-6">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-stone-950/40 shadow-inner">
                          {product.Image ? (
                            <img
                              src={`${STRAPI_URL}${product.Image.formats?.small?.url || product.Image.formats?.thumbnail?.url}`}
                              alt={product.Title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-600 font-bold bg-stone-900/50">
                              لا صورة
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Title and Description */}
                      <td className="p-4 font-bold text-white tracking-wide">
                        <div className="flex flex-col text-right">
                          <span className="text-[15px] flex items-center gap-2">
                            {product.Title}
                            {product.is_spicy && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-red-950/40 border border-red-500/20 text-red-400 font-black tracking-wider animate-pulse">
                                حراق
                              </span>
                            )}
                          </span>
                          <span className="text-zinc-500 text-xs font-normal line-clamp-1 mt-1 max-w-[220px]">
                            {product.Description || "لا يوجد وصف حالياً."}
                          </span>
                        </div>
                      </td>

                      {/* Section Tag */}
                      <td className="p-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-sm">
                          {product.menu_section?.[0]?.Name || "غير مصنف"}
                        </span>
                      </td>

                      {/* Prices */}
                      <td className="p-4 text-center font-bold text-zinc-200 text-xs tracking-wide">
                        {getPriceForSize(product.prices, "small")}
                      </td>
                      <td className="p-4 text-center font-bold text-zinc-200 text-xs tracking-wide">
                        {getPriceForSize(product.prices, "medium")}
                      </td>
                      <td className="p-4 text-center font-bold text-zinc-200 text-xs tracking-wide">
                        {getPriceForSize(product.prices, "large")}
                      </td>

                      {/* Actions Control */}
                      <td className="p-4 pl-6 text-left">
                        <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-all duration-200">
                          {/* Edit Action */}
                          <button
                            className="p-2 hover:bg-amber-500/10 active:scale-90 rounded-xl text-zinc-500 hover:text-amber-400 border border-transparent hover:border-amber-500/10 transition-all"
                            title="تعديل المنتج"
                          >
                            <Edit3 size={15} />
                          </button>

                          {/* Delete Action */}
                          <button
                            onClick={() => handleDeleteProduct(product.documentId, product.Title)}
                            className="p-2 hover:bg-red-500/10 active:scale-90 rounded-xl text-zinc-500 hover:text-red-400 border border-transparent hover:border-red-500/10 transition-all"
                            title="حذف المنتج"
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

export default Products;