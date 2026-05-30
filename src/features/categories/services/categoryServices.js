import BaseApi from "../../../api/baseApi";

export const fetchCategories = {
    getCategories: async ()=>{
        const res = await BaseApi.get("/categories");
        return res.data;
    },

    CreateCategory: async (categoryData)=>{
        const res = await BaseApi.post("/categories", categoryData);
        return res.data;
    },
}