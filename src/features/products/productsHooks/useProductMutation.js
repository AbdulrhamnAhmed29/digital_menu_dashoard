import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsservices } from "../productServices/productServises";

export const useProductMutation = () => {
    const queryClient = useQueryClient();
    // ======= DELETE PRODUT FUNCTION ====
    const deleteProduct = useMutation({
        mutationFn: async (id) => {
            const res = await productsservices.productDelete(id);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        }
    });
    // ======= ADD PRODUT FUNCTION ====
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
    // ======= UPDATE PRODUT FUNCTION ==== 
    const updateProduct = useMutation({
        mutationFn: async ({ formData, id, data }) => {
            const imageRes = await productsservices.createProductImage(formData);
            const imageId = imageRes?.data[0].id
            return (id, data) => productsservices(id, {
                data: {
                    Title: data.Title,
                    Image: imageId,
                    Description: data.Description,
                    is_spicy: data.is_spicy,
                    prices: data.prices.map((size) => ({
                        price: size.price,
                        products_size: size.products_size,
                    })),
                    menu_section: data.menu_section.map((section) => ({
                        documentId: section.sectionId
                    })),
                }
            })
        },
    });




    return {
        deleteFunction: deleteProduct.mutate,
        addFunction: addProduct.mutate,
        updateProduct: updateProduct.mutate
    };
}