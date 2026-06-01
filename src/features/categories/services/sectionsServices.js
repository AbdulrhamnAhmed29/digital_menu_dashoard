import BaseApi from "../../../api/baseApi";

export const SectionServices = {
    getSections: async () => {
        const res = await BaseApi.getAll("/menu-sections?populate=*");
        return res?.data?.data
    },
    CreateSection: async (sectionPayload) => {
        const res = await BaseApi.create("/menu-sections", sectionPayload);
        return res;
    },
    findOne: async (id) => {
        const query = "populate[products][populate][prices][populate][products_size]=*&populate[products][populate][Image]=true&populate[price_offers][populate][offers]=*&populate[priceOfCompo][populate][compo_offers]=*";
        const res = await BaseApi.getById("/menu-sections", id, query);
        return res.data
    },
    DeleteSection: async (id) => {
        const res = await BaseApi.remove("/menu-sections", id);
        return res
    }
}