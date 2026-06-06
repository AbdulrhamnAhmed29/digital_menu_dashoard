import { useQuery } from "@tanstack/react-query"
import { SectionServices } from "../services/sectionsServices"
export const useSectionGet = (id) => {
    const { data: sections, isLoading } = useQuery({
        queryKey: ["sections"],
        queryFn: SectionServices.getSections
    });
    const findOne = useQuery({
        queryKey: ["section", id],
        queryFn: () => SectionServices.findOne(id),
        enabled:id
    })
    return {
        sections: sections,
        isLoading,
        findOne: findOne.data
    }
}