import { useMutation, useQueryClient } from "@tanstack/react-query"
import { offerServices } from "../../services/offerServices"

export const useOfferMutation = () => {
    const queryClient = useQueryClient();
    //    ============ Delete function  ========
    const deleteOfferMutation = useMutation({
        mutationFn: (id) => offerServices.deleteOffer(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
        },
        onError: (error) => {
            console.error("Error deleting offer:", error)
        }
    });

    // ======= CREATE FUNCTION  ======= 
    const addOfferMutation = useMutation({
        mutationFn: (data) => offerServices.createOffer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
        },
        onError: (error) => {
            console.error("Error add offer:", error)
        }
    });

    // ===== UPDATE FUNCTION ===== 
    const updateFunction = useMutation({
        mutationFn: async ({payload, id}) => await offerServices.updateOffer(payload, id),

        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
        },
        onError: (error) => {
            console.error("Error update offer:", error)
        },
    })
    return {
        // ==== DELETE OFFER ====
        deleteOffer: deleteOfferMutation.mutate,
        isDeleting: deleteOfferMutation.isPending,
        deleteError: deleteOfferMutation.error,

        // ===== CREATE OFFER ======
        addOfferMutation: addOfferMutation.mutate,
        offerIsLoading: addOfferMutation.isPending,
        offerIsErorr: addOfferMutation.error,

        // ==== UPDATE OFFERS ====
        updateOfferFunction: updateFunction.mutate,

    };
};