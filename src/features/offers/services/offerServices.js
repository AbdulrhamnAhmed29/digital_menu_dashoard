import BaseApi from "../../../api/baseApi"

export const offerServices = {
    createOffer: async (payload) => {
        const res = await BaseApi.create("offers-prices", payload);
        return res.data
    },
    deleteOffer: async (id) => {
        const res = await BaseApi.remove("offers-prices", id);
        return res.data
    },

    updateOffer: async (payload, id) => {
        const res = await BaseApi.update("offers-prices", payload, id);
        return res.data
    },

    getAllOffers: async () => {
        const res = await BaseApi.getAll("offers-prices?populate=*");
        return res.data
    },
    getOneOffer: async (id) => {
        const queryString = "populate=*"
        const res = await BaseApi.getById("offers-prices", id, queryString);
        return res
    },
    getConstantOffer: async () => {
        const res = await BaseApi.getAll("offers");
        return res.data
    },
}