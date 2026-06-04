import { useQuery } from "@tanstack/react-query";
import { productsservices } from "../productServices/productServises";
import { productsSizeServices } from "../productServices/productsSizeServices";

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

    const { data: productsSizes } = useQuery({
        queryKey: ["productsSizes"],
        queryFn: productsSizeServices.getProductsSizes
    });

    return {
        productsList: productsList?.data,
        isLoading,
        isError,
        oneProduct: oneProduct?.data,
        oneProductLoading,
        oneProductError,
        productsSizes: productsSizes?.data
    }
}