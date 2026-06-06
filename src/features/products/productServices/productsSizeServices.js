import BaseApi from "../../../api/baseApi";

export const productsSizeServices = {
    getProductsSizes: async () => {
        const { data } = await BaseApi.getAll("/products-sizes");
        return data;
    },
}