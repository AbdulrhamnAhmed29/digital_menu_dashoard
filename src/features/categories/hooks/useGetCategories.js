import { useQuery } from "@tanstack/react-query"
import { fetchCategories } from "../services/categoryServices"

export const useCategories = () => {
    const { data: categories, isError: error, isLoadin: isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategories.getCategories()
    });

    const { data: sections } = useQuery({
        queryKey: ["sections"],
        queryFn: fetchCategories.getSections
    })
    return {
        categories: categories,
        sections: sections,
        isError: error,
        isLoading:isLoading

    }
}