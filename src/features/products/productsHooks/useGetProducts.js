import { useQuery } from "@tanstack/react-query";
import { productsservices } from "../productServices/productServises";
import { productsSizeServices } from "../productServices/productsSizeServices";
import { keepPreviousData } from "@tanstack/react-query";

import { useEffect, useState } from "react";

export const useGetProducts = (id) => {
    const [page, setPage] = useState(1);
    const [searchItem, setSearchItem] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchItem);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchItem]);
    const search = debouncedSearch.trim();

    // ======== products query===========
    const { data: productsList, isLoading, isError, isFetching } = useQuery({
        queryKey: ["products", page, search],
        queryFn: () => productsservices.getProducts({ page, search }),
        placeholderData: keepPreviousData,

    });

    // ========= one product query ==========
    const { data: oneProduct, isLoading: oneProductLoading, isError: oneProductError } = useQuery({
        queryKey: ["oneProduct", id],
        queryFn: () => productsservices.getProducts(id),
        enabled: !!id
    });

    const { data: productsSizes } = useQuery({
        queryKey: ["productsSizes"],
        queryFn: productsSizeServices.getProductsSizes
    });

    return {
        //==== PRODUCTS DATA ====
        productsList: productsList?.data?.data,
        isLoading,
        isError,
        isFetching,

        //==== PAGINATION DATA ===
        paginationData: productsList?.data?.meta,
        setPage,
        page,
        //==== SEARCH STATE ===
        search,
        setSearchItem,

        // === ONE PRODUCT DATA ===
        oneProduct: oneProduct?.data,
        oneProductLoading,
        oneProductError,

        // === PRODUCT SIZE DATA ===
        productsSizes: productsSizes?.data
    }
}