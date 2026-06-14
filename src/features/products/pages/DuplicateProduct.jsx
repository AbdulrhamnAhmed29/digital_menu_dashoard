import React from 'react'
import ProductForm from '../components/product_form/ProductForm'
import { useForm, FormProvider } from 'react-hook-form'

function DuplicateProduct() {
    const methods = useForm({
        defaultValues: {
            Title: "",
            Description: "",
            is_spicy: false,
            menu_section: [{ sectionId: "" }],
            prices: [{ products_size: "", price: "" }],
        }
    });
    const { handleSubmit, reset , formState: { isSubmitting } } = methods
    const mode = "duplicate"    
    return (
        <FormProvider {...methods}>
            <ProductForm
                mode={mode}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                reset={reset}
            />
        </FormProvider>
    )
}

export default DuplicateProduct
