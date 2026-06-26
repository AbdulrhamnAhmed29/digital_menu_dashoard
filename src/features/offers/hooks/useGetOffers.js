import { useQuery } from "@tanstack/react-query"
import { offerServices } from "../services/offerServices"

export const useGetOffers = () => {
    const { data: offers, offersIsLoading: isLoading, offerIsError: Error } = useQuery({
        queryKey: ["offers"],
        queryFn: offerServices.getAllOffers,
    });
    return {
        offers: offers,
        offersIsLoading: isLoading,
        offerIsError: Error
    }
}