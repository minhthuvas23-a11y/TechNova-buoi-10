"use strict";

// BƯỚC 2: Hàm này chỉ lấy dữ liệu, không sửa giao diện.
// config.js phải được nạp trước api.js trong products.html.
async function fetchProducts() {
  const url = `${API_CONFIG.BASE_URL}/products/category/${API_CONFIG.CATEGORY}?limit=${API_CONFIG.LIMIT}`;
  const response = await fetch(url);

  // fetch chỉ tự báo lỗi mạng; HTTP 404/500 cần kiểm tra response.ok.
  if (!response.ok) {
    throw new Error(`Không tải được sản phẩm (HTTP ${response.status}).`);
  }

  const data = await response.json();

  // Chú ý: API trả { products: [...], total, skip, limit }, không phải mảng trực tiếp!
  if (!Array.isArray(data.products)) {
    throw new Error("Dữ liệu API không đúng cấu trúc products.");
  }

  return data.products;
}

// TODO HS 01: Viết fetchProductById(id) cho GET /products/{id}.
// Gợi ý: endpoint chi tiết trả MỘT object, không có data.products.
