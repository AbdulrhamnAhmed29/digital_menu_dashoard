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
    const [section, setSection] = useState("")
    
    // ======== PRODUCTS QUERY ===========
    const { data: productsList, isLoading, isError, isFetching } = useQuery({
        queryKey: ["products", page, search],
        queryFn: () => productsservices.getProducts({ page, search }),
        placeholderData: keepPreviousData,
    });

    // ======== ONE PRODUCTS QUERY ===========
    const { data: oneProduct, isLoading: oneProductLoading, isError: oneProductError } = useQuery({
        queryKey: ["oneProduct", id],
        queryFn: () => productsservices.getOneProduct(id),
        enabled: !!id
    });


    // ========  PRODUCTS SIZES  ===========
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
        setSection,

        // === ONE PRODUCT DATA ===
        oneProduct: oneProduct,
        oneProductLoading,
        oneProductError,

        // === PRODUCT SIZE DATA ===
        productsSizes: productsSizes?.data
    }
}