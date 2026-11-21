"use strict";

// BƯỚC 1: Chỉ khai báo địa chỉ API ở một nơi để dễ thay đổi.
// DummyJSON cung cấp dữ liệu shop mẫu, GET công khai không cần API key.
// Tài liệu: https://dummyjson.com/docs/products
const API_CONFIG = {
  BASE_URL: "https://dummyjson.com",
  CATEGORY: "mobile-accessories",
  LIMIT: 24,
};

// API không trả giá VND. Trang mẫu hiển thị USD để không đổi nhầm đơn vị.
// TODO HS: Thử CATEGORY = "laptops", tải lại và quan sát dữ liệu.(Done)
const API_URL = `${API_CONFIG.BASE_URL}/products/category/${API_CONFIG.CATEGORY}?limit=${API_CONFIG.LIMIT}`;
