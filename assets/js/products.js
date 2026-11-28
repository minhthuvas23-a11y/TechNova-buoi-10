"use strict";

// BƯỚC 3: Lấy các vùng HTML cần cập nhật. File này chỉ nạp trên products.html.
const productList = document.querySelector("#product-list");
const productStatus = document.querySelector("#product-status");
const productSearch = document.querySelector("#product-search");
const retryButton = document.querySelector("#retry-products");
const sortSelect = document.querySelector("#product-sort");
let products = []; // Dữ liệu gốc từ API; tìm kiếm không làm thay đổi mảng này.
let isLoading = false;

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// BƯỚC 4: Một object -> một card. Dùng textContent cho nội dung từ API.
// cloneNode sao chép khung <template> mà không cần ghép dữ liệu vào innerHTML.
function createProductCard(product) {
  const card = document.querySelector("#product-card-template").content.cloneNode(true);
  const image = card.querySelector("img");
  image.src = product.thumbnail || "assets/images/headphones.svg";
  image.alt = product.title;
  image.addEventListener("error", () => {
    image.src = "assets/images/headphones.svg";
  }, { once: true });

  card.querySelector(".product-brand").textContent = product.brand || "Phụ kiện điện tử";
  card.querySelector(".product-title").textContent = product.title;
  card.querySelector(".product-price").textContent = formatPrice(product.price);
  card.querySelector(".product-description").textContent = product.description || "Chưa có mô tả.";
  card.querySelector(".product-stock").textContent = product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng";

  // Giữ ID trên card để học sinh dùng khi thêm trang chi tiết hoặc giỏ hàng.
  card.querySelector(".product-item").dataset.id = product.id;
  // Trang chi tiết đọc ID này và gọi GET /products/{id}.
  let detailLink = card.querySelector(".product-detail-link");
  detailLink.href = `product-detail.html?id=${product.id}`;
  return card;
}

// BƯỚC 5: Lọc trên mảng đã tải, không fetch lại mỗi lần gõ phím.
function renderProducts() {
  const keyword = productSearch.value.trim().toLowerCase();
  const visibleProducts = products.filter(product => product.title.toLowerCase().includes(keyword));
  // Sắp xếp trước khi render; chỉ đăng ký sự kiện change MỘT lần ở cuối file.
  if (sortSelect.value === "price-asc") visibleProducts.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "price-desc") visibleProducts.sort((a, b) => b.price - a.price);

  productList.replaceChildren();
  visibleProducts.forEach(product => productList.append(createProductCard(product)));
  productStatus.className = "text-secondary mb-3";
  productStatus.textContent = visibleProducts.length
    ? `Hiển thị ${visibleProducts.length} sản phẩm`
    : "Không tìm thấy sản phẩm phù hợp.";

}

// BƯỚC 6: Nối API với UI, có đủ trạng thái tải / thành công / lỗi.
async function loadProducts() {
  if (isLoading) return;
  isLoading = true;
  productSearch.disabled = true;
  retryButton.hidden = true;
  productList.setAttribute("aria-busy", "true");
  productStatus.className = "text-secondary mb-3";
  productStatus.textContent = "Đang tải sản phẩm...";

  try {
    products = await fetchProducts();
    renderProducts();
    productSearch.disabled = false;
  } catch (error) {
    productList.replaceChildren();
    productStatus.className = "alert alert-danger";
    productStatus.textContent = `${error.message} Kiểm tra kết nối Internet và thử lại.`;
    retryButton.hidden = false;
  } finally {
    productList.setAttribute("aria-busy", "false");
    isLoading = false;
  }
}

// BƯỚC 7: Đăng ký sự kiện, rồi tải dữ liệu lần đầu.
productSearch.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);
retryButton.addEventListener("click", loadProducts);
loadProducts();

// TODO HS: Trang chủ cần file home.js riêng. Không chạy code cho #featured-list
// hoặc gọi hàm giỏ chưa viết ở đây vì products.html không có các vùng đó.
