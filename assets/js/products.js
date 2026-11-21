"use strict";

// BƯỚC 3: Lấy các vùng HTML cần cập nhật. File này chỉ nạp trên products.html.
const productList = document.querySelector("#product-list");
const productStatus = document.querySelector("#product-status");
const productSearch = document.querySelector("#product-search");
const retryButton = document.querySelector("#retry-products");
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
  // TODO HS 02: Thêm link product-detail.html?id=... sau khi làm chi tiết động.(Done)
  let detailLink = card.querySelector(".product-detail-link");
  detailLink.href = `product-detail.html?id=${product.id}`;
  // Chưa nối vào 10 trang chi tiết tĩnh vì đó là các sản phẩm khác với API.
  return card;
}

// BƯỚC 5: Lọc trên mảng đã tải, không fetch lại mỗi lần gõ phím.
function renderProducts() {
  const keyword = productSearch.value.trim().toLowerCase();
  const visibleProducts = products.filter(product => product.title.toLowerCase().includes(keyword));

  productList.replaceChildren();
  visibleProducts.forEach(product => productList.append(createProductCard(product)));
  productStatus.className = "text-secondary mb-3";
  productStatus.textContent = visibleProducts.length
    ? `Hiển thị ${visibleProducts.length} sản phẩm`
    : "Không tìm thấy sản phẩm phù hợp.";

  // TODO HS 03: Thêm select sắp xếp giá và xử lý visibleProducts.sort(...).(Done)
  sortSelect.addEventListener("change", () => {
    const sortValue = sortSelect.value;
    if (sortValue === "price-asc") {
      visibleProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      visibleProducts.sort((a, b) => b.price - a.price);
    }
    productList.replaceChildren();
    visibleProducts.forEach(product => productList.append(createProductCard(product)));
  });
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
retryButton.addEventListener("click", loadProducts);
loadProducts();

// TODO HS 04: Dùng lại fetchProducts để render 4 sản phẩm nổi bật trên index.html.(Done)
fetchProducts().then(products => {
  const featuredList = document.querySelector("#featured-list");
  products.slice(0, 4).forEach(product => {
    featuredList.append(createProductCard(product));
  });
});
// TODO HS 05: Làm giỏ localStorage theo ID + quantity, rồi validate checkout.(Done)
createCartFromLocalStorage();