import { useMutation, useQueryClient } from "@tanstack/react-query"
import { offerServices } from "../../services/offerServices"

export const useOfferMutation = () => {
    const queryClient = useQueryClient();

    const deleteOfferMutation = useMutation({
        mutationFn: (id) => offerServices.deleteOffer(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
        },
        onError: (error) => {
            console.error("Error deleting offer:", error);
        }
    });
    return {
        // ==== DELETE ODDER ====
        deleteOffer: deleteOfferMutation.mutate,
        isDeleting: deleteOfferMutation.isPending,
        deleteError: deleteOfferMutation.error,

        
    };
};