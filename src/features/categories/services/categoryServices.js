import BaseApi from "../../../api/baseApi";

export const fetchCategories = {
    getCategories: async ()=>{
        const res = await BaseApi.getAll("/categories");
        return res?.data?.data
    },
    getSections:async ()=>{
        const res = await BaseApi.getAll("/menu-sections?populate=*");
        return res?.data?.data
    },

    CreateCategory: async (categoryData)=>{
        const res = await BaseApi.post("/categories", categoryData);
        return res;
    },
    
}