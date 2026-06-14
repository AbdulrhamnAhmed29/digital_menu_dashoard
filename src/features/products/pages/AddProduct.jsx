//  =========React_Hook_Form=========== 
import { useForm, FormProvider } from "react-hook-form";
import ProductForm from "../components/product_form/ProductForm";

const AddProductForm = () => {
    // ======== DEFAULT VALUES OF IBPUTS ========
    const methods = useForm({
        defaultValues: {
            Title: "",
            Description: "",
            is_spicy: false,
            menu_section: [{ sectionId: "" }],
            prices: [{ products_size: "", price: "" }],
        }
    });
    const mode = "create"
    // ======== DESTRACURING DATA FROM REACH HOOK FORM ========
    const { handleSubmit, formState: { isSubmitting } } = methods
    return (
        <FormProvider {...methods}>
            <ProductForm
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                mode={mode}
                reset={""}
            />
        </FormProvider>
    );
};
export default AddProductForm;