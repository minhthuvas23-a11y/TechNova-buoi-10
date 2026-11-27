"use strict";

const detailRoot = document.querySelector("#product-detail");
const detailStatus = document.querySelector("#detail-status");
const detailRetry = document.querySelector("#retry-detail");
let detailLoading = false;

function detailPrice(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function setDetailImage(image, url, title) {
  image.src = "assets/images/product-placeholder.svg";
  try {
    const parsed = new URL(url);
    if (["http:", "https:"].includes(parsed.protocol)) image.src = parsed.href;
  } catch { /* Không có ảnh thì giữ ảnh dự phòng. */ }
  image.alt = title;
  image.onerror = () => { image.onerror = null; image.src = "assets/images/product-placeholder.svg"; };
}

function renderDetail(product) {
  // BƯỚC 3: Clone khung HTML, điền chữ bằng textContent để không diễn giải HTML nguồn.
  const view = document.querySelector("#detail-template").content.cloneNode(true);
  view.querySelector("h1").textContent = product.title;
  view.querySelector(".detail-description").textContent = product.description || "Chưa có mô tả.";
  view.querySelector(".detail-price").textContent = detailPrice(product.price);
  view.querySelector(".detail-category").textContent = product.category || "Chưa có danh mục";
  view.querySelector(".detail-brand").textContent = product.brand || "Chưa có thông tin";
  view.querySelector(".detail-sku").textContent = product.sku || "Chưa có thông tin";
  view.querySelector(".detail-warranty").textContent = product.warrantyInformation || "Chưa có thông tin";
  view.querySelector(".detail-stock").textContent = Number.isInteger(product.stock) ? `Tồn kho mẫu: ${product.stock}` : "Chưa có thông tin tồn kho";
  view.querySelector(".detail-rating").textContent = Number.isFinite(product.rating) ? `${product.rating}/5 · Điểm từ dữ liệu mẫu` : "Chưa có điểm đánh giá";
  const image = view.querySelector(".detail-photo");
  setDetailImage(image, product.images?.[0] || product.thumbnail, product.title);
  const gallery = view.querySelector(".detail-gallery");
  (Array.isArray(product.images) ? product.images : []).forEach((url, index) => {
    const button = document.createElement("button");
    button.className = "detail-thumb";
    button.type = "button";
    button.setAttribute("aria-label", `Xem ảnh ${index + 1} của ${product.title}`);
    const thumb = document.createElement("img");
    setDetailImage(thumb, url, product.title);
    button.append(thumb);
    button.addEventListener("click", () => setDetailImage(image, url, product.title));
    gallery.append(button);
  });
  const reviews = view.querySelector(".detail-reviews");
  const items = Array.isArray(product.reviews) ? product.reviews : [];
  if (!items.length) reviews.textContent = "Nguồn chưa có đánh giá.";
  items.forEach(review => {
    const item = document.createElement("article");
    item.className = "border-bottom py-3";
    const name = document.createElement("strong");
    name.textContent = `${review.reviewerName || "Khách"} · ${review.rating ?? "—"}/5`;
    const comment = document.createElement("p");
    comment.className = "text-secondary mt-2 mb-0";
    comment.textContent = review.comment || "Không có nhận xét.";
    item.append(name, comment);
    reviews.append(item);
  });
  document.title = `${product.title} | TechNova`;
  detailRoot.replaceChildren(view);
}

async function loadDetail() {
  if (detailLoading) return;
  detailLoading = true;
  detailRetry.hidden = true;
  detailRoot.replaceChildren();
  detailRoot.setAttribute("aria-busy", "true");
  detailStatus.className = "text-secondary";
  detailStatus.textContent = "Đang tải chi tiết sản phẩm...";
  try {
    // BƯỚC 1: Lấy ID từ link; BƯỚC 2: fetch trực tiếp, không phụ thuộc storage.
    const id = new URLSearchParams(location.search).get("id");
    const product = await fetchProductById(id);
    renderDetail(product);
    detailStatus.textContent = "";
  } catch (error) {
    detailStatus.className = "alert alert-danger";
    detailStatus.textContent = error.message || "Không tải được sản phẩm. Kiểm tra Internet và thử lại.";
    const id = new URLSearchParams(location.search).get("id");
    detailRetry.hidden = !/^[1-9]\d{0,7}$/.test(id || "");
  } finally { detailLoading = false; detailRoot.setAttribute("aria-busy", "false"); }
}
detailRetry.addEventListener("click", loadDetail);
loadDetail();
