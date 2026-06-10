import { useQuery } from "@tanstack/react-query";
import { productsservices } from "../productServices/productServises";
import { productsSizeServices } from "../productServices/productsSizeServices";
import { useState } from "react";

export const useGetProducts = (id) => {
    const [page, setPage] = useState(1);
    // ======== products query===========
    const { data: productsList, isLoading, isError } = useQuery({
        queryKey: ["products", page],
        queryFn: () => productsservices.getProducts(page)
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
        productsList: productsList?.data?.data,
        paginationData:productsList?.data?.meta,
        isLoading,
        isError,
        setPage,
        page,
        oneProduct: oneProduct?.data,
        oneProductLoading,
        oneProductError,
        productsSizes: productsSizes?.data
    }
}