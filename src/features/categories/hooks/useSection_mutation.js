import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SectionServices } from "../services/sectionsServices"

export const useSectionMutation = () => {
    const queryClient = useQueryClient()
    const addSection = useMutation({
        mutationFn: (data) => {
            return SectionServices.CreateSection({
                data: {
                    Name: data.SectionName,
                    category: data.categorySelect,
                }
            })
        },


        onSuccess: () => {
            queryClient.invalidateQueries({ queryClient, queryKey: ['sections'] });
        }
    });

    const remove = useMutation({
        mutationFn: (id) => SectionServices.DeleteSection(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryClient, queryKey: ['sections'] });
        }
    })
    return {
        addSection: addSection.mutate,
        remove:remove.mutate
    }
}