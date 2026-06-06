import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsservices } from "../productServices/productServises";

export const useProductMutation = () => {
    const queryClient = useQueryClient();
    const deleteProduct = useMutation({
        mutationFn: async (id) => {
            const res = await productsservices.productDelete(id);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        }
    });

    const addProduct = useMutation({
        mutationFn: async ({ formData, data }) => {
            const imageRes = await productsservices.createProductImage(formData);
            const imageId = imageRes.data[0].id;
            return await productsservices.CreateProduct({
                data: {
                    Title: data.Title,
                    Image: imageId,
                    Description: data.Description,
                    is_spicy: data.is_spicy,
                    menu_section: data.menu_section.map((section) => ({
                      documentId: section.sectionId
                    })),
                    prices: data.prices.map((size) => ({
                        price: size.price,
                        products_size: size.products_size,
                    }))
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            console.log("the product has created")
        },

    });




    return {
        deleteFunction: deleteProduct.mutate,
        addFunction: addProduct.mutate
    };
}