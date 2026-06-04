import BaseApi from "../../../api/baseApi";

export const productsservices = {
  getProducts: async () => {
    const { data } = await BaseApi.getAll("/products?populate[prices][populate][products_size]=*&populate[Image]=true&pagination[limit]=100&populate[menu_section]=true");
    return data;
  },

  CreateProduct: async (productPayload) => {
    const { data } = await BaseApi.post("/products", productPayload);
    return data;
  },
  productDelete: async (id) => {
    const { data } = await BaseApi.remove("/products", id);
    return data;
  },
  productUpdate: async (id, productPayload) => {
    const { data } = await BaseApi.update("/products", id, productPayload);
    return data;
  }
} 