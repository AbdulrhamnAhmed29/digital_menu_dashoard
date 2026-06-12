import BaseApi from "../../../api/baseApi";

export const productsservices = {
  // ===== GET ALL PRODUCTS ====
  getProducts: async ({ page, search }) => {
    const res = await BaseApi.getAll(`/products?populate[prices][populate][products_size]=*&populate[Image]=true&populate[menu_section]=true&filters[Title][$contains]=${search}&pagination[page]=${page}&pagination[pageSize]=25`);
    return res;
  },

  // ===== GET ONE PRODUCT ====
  getOneProduct: async (id) => {
    const queryString = "populate[prices][populate][products_size]=*&[populate][menu_section]=true";
    const res = await BaseApi.getById("/products", id, queryString);
    return res.data
  },

  // ===== CREATE PRODUCT  ====
  CreateProduct: async (data) => {
    const res = await BaseApi.create("/products", data);
    return res;
  },

  // ===== GET PRODUCT IMAGE ====
  createProductImage: async (formData) => {
    const res = await BaseApi.upload("/upload", formData);
    return res
  },

  // ===== DELETE PRODUCTS ====
  productDelete: async (id) => {
    const { data } = await BaseApi.remove("/products", id);
    return data;
  },
  // ===== UPDATE PRODUCTS ====
  productUpdate: async (id, productPayload) => {
    const { data } = await BaseApi.update("/products", id, productPayload);
    return data;
  },
} 