import BaseApi from "../../../api/baseApi";
    import qs from 'qs';


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
        const queryObj = {
            populate: {
                products: {
                    populate: {
                        prices: {
                            populate: {
                                products_size: '*'
                            }
                        },
                        Image: true
                    }
                },
                price_offers: {
                    populate: {
                        offers: '*'
                    }
                },
                priceOfCompo: {
                    populate: {
                        compo_offers: '*'
                    }
                }
            }
        };

        const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });
        const res = await BaseApi.getById("menu-sections", id, queryString);
        return res.data;
    },
    DeleteSection: async (id) => {
        const res = await BaseApi.remove("/menu-sections", id);
        return res
    }
}