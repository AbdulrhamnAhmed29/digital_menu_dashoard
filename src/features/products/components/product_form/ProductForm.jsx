import React, { useEffect } from 'react'
//========= SUB COMPONENTS ========
import BackButton from '../../../../shared/BackButton'
import ProductInfoFields from './ProductInfoFields'
import ProductSectionsList from './ProductSectionsList'
import ProductVariants from './ProductVariants'
import ProductImageUpload from './ProductImageUpload'

// ========== DATA FROM HOOKS ====== 
import { useGetProducts } from "../../productsHooks/useGetProducts";
import { useProductMutation } from "../../productsHooks/useProductMutation";

import { useSectionGet } from "../../../categories/hooks/useSection_Get";
import { showSuccessAlert } from '../../../../shared/Alert'
import { useParams } from 'react-router-dom'

function ProductForm({ handleSubmit, isSubmitting, mode, reset }) {
    //  === PRODUCT ID ====
    const id = useParams().id;


    //  ======== DESTRACTRUNG DATA FROM HOOKS =========
    const { productsSizes, oneProduct } = useGetProducts(id);
    const { addFunction, updateProduct } = useProductMutation();
    const { sections } = useSectionGet();

    //  ======== TO SAVE FROM ERROR BTING LOADING ========= 
    const sectionsList = sections || [];
    const Size = productsSizes || [];
    const currantProduct = oneProduct;
    const imageUrl = currantProduct?.Image?.formats?.small?.url || currantProduct?.Image?.formats?.thumbnail?.url
    // ==== MODE OF PAGES ====
    // const isCreate = mode === "create";
    const isUpdate = mode === "update";

    useEffect(() => {
        if (isUpdate) {
            reset({
                Title: currantProduct?.Title,
                Description: currantProduct?.Description,
                is_spicy: currantProduct?.is_spicy,
                menu_section: currantProduct?.menu_section.map((section) => {
                    return { sectionId: section.documentId }
                }),
                prices: currantProduct?.prices.map((price) => {
                    return { products_size: price.products_size?.documentId, price: price.price }
                })
            })
        }
    }, [isUpdate, currantProduct])

    const onSubmit = async (data) => {
        const formData = new FormData();
        if (data.image && data.image[0]) {
            formData.append("files", data.image[0]);
        }
        if (isUpdate) {
            console.log("this update page");
            updateProduct({ formData, id, data })
            // =======alert functions======== 
            showSuccessAlert(
                `تمت تحديث ${data.Title || data.title} بنجاح`,
                "تم تحديث المنتج  في قائمة المنيو الفاخرة."
            );
        } else {
            addFunction({ formData, data });
            // =======alert functions======== 
            showSuccessAlert(
                `تمت إضافة ${data.Title || data.title} بنجاح`,
                "تم إدراج المنتج الجديد في قائمة المنيو الفاخرة."
            );
            console.log("this else page");

        }
      
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 rounded-2xl w-full mx-auto space-y-6 text-right shadow-2xl backdrop-blur-md "
            dir="rtl"
        >
            <BackButton />
            {/* ============Header================ */}
            <div className="text-right border-b border-white/5 pb-4">
                <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-l from-stone-100 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                    إضافة منتج جديد للمنيو (Add New Product)
                </h1>
                <p className="text-stone-500 text-[10px] mt-1 tracking-widest uppercase font-medium">
                    Add a new product to the menu
                </p>
            </div>
            {/* ============info inputs===========  */}
            <ProductInfoFields />

            {/*=========== Dynamic Sections List=======  */}
            <ProductSectionsList sectionsList={sectionsList} />

            {/* =============Product Variants (sizes)========== */}
            <ProductVariants Size={Size} />

            {/* =========Product Image=========== */}
            <ProductImageUpload
                imageUrl={imageUrl}
                mode={mode}
            />
            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-l from-amber-500 to-orange-600 text-black font-black text-sm rounded-xl hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.15)]"
            >
                {isSubmitting ? "جاري حفظ الصنف الفاخر..." : "تأكيد وإضافة المنتج للمنيو"}
            </button>
        </form>
    )
}

export default ProductForm
