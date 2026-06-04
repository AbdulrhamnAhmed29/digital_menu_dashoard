import { useQuery } from "@tanstack/react-query";
import { productsservices } from "../productServices/productServises";

export const useGetProducts = (id) => {
    // ======== products query===========
    const { data: productsList, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: productsservices.getProducts
    });

    // ========= one product query ==========
    const { data: oneProduct, isLoading: oneProductLoading, isError: oneProductError } = useQuery({
        queryKey: ["oneProduct"],
        queryFn: () => productsservices.getProducts(id),
        enabled: !!id
    });

    return {
        productsList: productsList?.data,
        isLoading,
        isError,
        oneProduct: oneProduct?.data,
        oneProductLoading,
        oneProductError
    }
}