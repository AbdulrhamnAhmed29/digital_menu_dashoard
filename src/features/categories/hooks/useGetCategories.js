import { useQuery } from "@tanstack/react-query"
import { fetchCategories } from "../services/categoryServices"

export const useCategories = () => {
    const { data: categories, isError: error, isLoadin: isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategories.getCategories()
    });
    


    return {
        categories: categories,
        isError: error,
        isLoading:isLoading
    }
}