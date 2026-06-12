import React from 'react'
import { useForm, FormProvider } from "react-hook-form";
import ProductForm from '../components/product_form/ProductForm';

function EditProduct() {

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
    const mode = "update"

    // ======== DESTRACURING DATA FROM REACH HOOK FORM ========
    const { handleSubmit, reset, formState: { isSubmitting } } = methods

    return (
        <FormProvider {...methods}>
            <ProductForm
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                mode={mode}
                reset={reset}
            />
        </FormProvider>
    )
}
export default EditProduct
