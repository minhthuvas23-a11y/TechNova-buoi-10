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

// Chi tiết trả MỘT object, không dùng data.products như endpoint danh sách.
async function fetchProductById(id) {
  if (!/^[1-9]\d{0,7}$/.test(String(id))) {
    throw new Error("ID sản phẩm không hợp lệ. Hãy chọn lại từ danh sách.");
  }
  const response = await fetch(`${API_CONFIG.BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(response.status === 404 ? "Không tìm thấy sản phẩm này." : `Không tải được chi tiết (HTTP ${response.status}).`);
  }
  const product = await response.json();
  if (!product || product.id !== Number(id) || typeof product.title !== "string" || !Number.isFinite(product.price)) {
    throw new Error("Dữ liệu chi tiết sản phẩm không hợp lệ.");
  }
  return product;
}
