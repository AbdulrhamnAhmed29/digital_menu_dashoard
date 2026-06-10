import BaseApi from "../../../api/baseApi";

export const productsservices = {
  getProducts: async ({page ,search}) => {
    const  res  = await BaseApi.getAll(`/products?populate[prices][populate][products_size]=*&populate[Image]=true&populate[menu_section]=true&filters[Title][$contains]=${search}&pagination[page]=${page}&pagination[pageSize]=25`);    
    return res;
  },

  CreateProduct: async (data) => {
    const res = await BaseApi.create("/products", data);  
      
    return res;
  },
  createProductImage: async (formData) => {
    const res = await BaseApi.upload("/upload", formData);
    return res
  },
  productDelete: async (id) => {
    const { data } = await BaseApi.remove("/products", id);
    return data;
  },
  productUpdate: async (id, productPayload) => {
    const { data } = await BaseApi.update("/products", id, productPayload);
    return data;
  },

} 