import BaseApi from "../../../api/baseApi";

export const fetchCategories = {
    getCategories: async () => {
        const res = await BaseApi.getAll("/categories");
        return res?.data?.data
    },
    CreateCategory: async (categoryData) => {        
        const res = await BaseApi.create("/categories", categoryData);
        return res;
    },
}