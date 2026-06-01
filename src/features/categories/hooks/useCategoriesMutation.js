import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchCategories } from "../services/categoryServices"

export const useCatMutation = () => {
    const queryClient = useQueryClient()
    const addCat = useMutation({
        mutationFn: (payload) => {
            return fetchCategories.CreateCategory({
                data: {
                    Name: payload.categoryName,
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryClient, queryKey: ['categories'] });
        }
    });

  
    return {
        addCategory: addCat.mutate,
        isLoading: addCat.isPending,
        isError: addCat.error,
    }
}