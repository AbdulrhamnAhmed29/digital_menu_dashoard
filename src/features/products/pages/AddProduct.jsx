//  =========React_Hook_Form=========== 
import { useForm, FormProvider } from "react-hook-form";

// ==========data from hooks file====== 
import { useGetProducts } from "../productsHooks/useGetProducts";
import { useProductMutation } from "../productsHooks/useProductMutation";
import { useSectionGet } from "../../categories/hooks/useSection_Get";

// =========shared components==========
import BackButton from "../../../shared/BackButton";

// ========= sub componensts ========
import ProductInfoFields from "../components/ProductInfoFields";
import ProductSectionsList from "../components/ProductSectionsList";
import ProductVariants from "../components/ProductVariants";
import ProductImageUpload from "../components/ProductImageUpload";
import { showSuccessAlert } from "../../../shared/Alert";

const AddProductForm = () => {

    //  ======== destractrung data from hooks =========
    const { productsSizes } = useGetProducts();
    const { addFunction } = useProductMutation();
    const { sections } = useSectionGet();
    const sectionsList = sections || [];
    const Size = productsSizes || [];

    // ======== default values of inputes ========
    const methods = useForm({
        defaultValues: {
            Title: "",
            Description: "",
            is_spicy: false,
            menu_section: [{ sectionId: "" }],
            prices: [{ products_size: "", price: "" }],
        }
    });
    const { handleSubmit, formState: { isSubmitting } } = methods

    // ==========on submit function=======
    const onSubmit = async (data) => {
        const formData = new FormData();
        if (data.image && data.image[0]) {
            formData.append("files", data.image[0]);
        }
        addFunction({ formData, data });
        // =======alert functions======== 
        showSuccessAlert(
            `تمت إضافة ${data.Title || data.title} بنجاح`,
            "تم إدراج المنتج الجديد في قائمة المنيو الفاخرة."
        );
    };
    return (
        <FormProvider {...methods}>
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
                <ProductImageUpload />
                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-l from-amber-500 to-orange-600 text-black font-black text-sm rounded-xl hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.15)]"
                >
                    {isSubmitting ? "جاري حفظ الصنف الفاخر..." : "تأكيد وإضافة المنتج للمنيو"}
                </button>
            </form>
        </FormProvider>

    );
};
export default AddProductForm;