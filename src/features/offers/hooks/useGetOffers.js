import { useQuery } from "@tanstack/react-query"
import { offerServices } from "../services/offerServices"

export const useGetOffers = (id) => {
    // ======= GET ALL OFFERS ======
    const { data: offers, offersIsLoading: isLoading, offerIsError: Error } = useQuery({
        queryKey: ["offers"],
        queryFn: offerServices.getAllOffers,
    });

    // ======= GET ONE OFFER ======
    const { data: offer } = useQuery({
        queryKey: ["offer", id],
        queryFn: () => offerServices.getOneOffer(id),
        enabled: !!id
    });

    const { data: constantOffer } = useQuery({
        queryKey: ["constantOffer"],
        queryFn: offerServices.getConstantOffer
    })
    return {
        offers: offers,
        offersIsLoading: isLoading,
        offerIsError: Error,
        // =========================
        oneOffer: offer,
        // ========================
        constantOffer: constantOffer
    }
}