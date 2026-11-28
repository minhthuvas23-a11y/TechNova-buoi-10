# TechNova — Bản khởi đầu cho học sinh

## Mục tiêu và phạm vi

Làm mẫu **một trang `products.html`**: cấu hình API → fetch → đọc JSON → lấy mảng products → tạo card → tìm tên. Có trạng thái đang tải, không có kết quả và lỗi/thử lại. Các trang khác giữ dữ liệu tĩnh để học sinh chuyển đổi dần, không phải shop đã hoàn thiện.

UI đã chỉnh: thu gọn logo/menu, thay ô tìm kiếm menu chưa hoạt động bằng link đăng nhập, card đều nhau, bố cục mobile và màu trang đăng nhập/đăng ký thống nhất. Bỏ checkbox ghi nhớ và link quên mật khẩu chưa có xử lý. Logic đăng nhập/đăng ký cũ vẫn là demo localStorage.

## 1. Cách chạy

1. Mở thư mục `D:\mindx\TechNova` trong VS Code.
2. Dùng Live Server mở `products.html`, giữ kết nối Internet.
3. Không mở bằng `file://`; không cần PowerShell server, npm hoặc backend cho trang mẫu này.
4. F12 → Network → Fetch/XHR → tải lại để xem request.

## 2. Nguồn API

- Tài liệu: https://dummyjson.com/docs/products
- Danh sách: https://dummyjson.com/products/category/mobile-accessories?limit=24
- Chi tiết để học sinh làm tiếp: https://dummyjson.com/products/101
- GET công khai không cần API key. Dữ liệu là mẫu, không phải giá/tồn kho thực tế.
- Giá trên trang mẫu dùng USD; không gắn ký hiệu đồng vào số chưa quy đổi.
- API trả `{ products: [...], total, skip, limit }`, nên mảng cần lấy là `data.products`.
- Danh mục này không trùng chính xác 10 phụ kiện cũ. Không nối một món API vào trang chi tiết tĩnh của món khác.

## 3. Thứ tự học và tạo file

```text
products.html                   Tạo nơi hiển thị, input, template
  ↓
assets/js/config.js             Khai báo BASE_URL, CATEGORY, LIMIT
  ↓
assets/js/api.js                 Viết fetchProducts()
  ↓
assets/js/products.js            Render card và đăng ký sự kiện
  ↓
assets/css/style.css            Điều chỉnh kích thước và responsive
```

Đây cũng là thứ tự đọc code. Ba file JS mới nằm trong thư mục `assets/js` có sẵn, dùng script thường để học sinh chưa cần học module.

### Bước 1 — HTML: khung hiển thị

Trong `products.html`, tìm `#product-search`, `#product-status`, `#retry-products`, `#product-list`, `#product-card-template`.

- `template` là mẫu card ẩn, không tự xuất hiện.
- JS sao chép mẫu và điền dữ liệu bằng `textContent`.
- Ba script cuối trang phải theo thứ tự **config → api → products**.
- Trang này không nạp `main.js` để bộ lọc tĩnh cũ không chạy chồng lên danh sách API.

### Bước 2 — Cấu hình và fetch

Trong `config.js`, thử đổi `CATEGORY` sang `laptops`, reload và quan sát dữ liệu. Sau đó đổi lại `mobile-accessories`.

Trong `api.js`, đọc lần lượt:

```js
const response = await fetch(url);     // gửi HTTP GET
if (!response.ok) { /* báo lỗi */ }     // kiểm tra HTTP
const data = await response.json();    // đọc JSON
return data.products;                  // trả mảng, chưa render
```

`fetchProducts()` chỉ làm việc với dữ liệu. Không viết code sửa DOM trong hàm này.

### Bước 3 — Một sản phẩm thành một card

Trong `products.js`, đọc `formatPrice()` và `createProductCard(product)`.

`cloneNode(true)` sao chép template. `querySelector()` tìm phần tử trong bản sao. `textContent` điền tên, mô tả, giá, tồn kho. Khi ảnh lỗi, dùng ảnh placeholder cục bộ.

### Bước 4 — Mảng sản phẩm thành danh sách

Đọc `loadProducts()`:

```text
Đang tải → await fetchProducts() → products = mảng API → renderProducts()
                             lỗi → thông báo + nút Thử lại
```

Sau đó đọc `renderProducts()`: lấy từ khóa → `filter()` → xóa danh sách cũ → tạo và append từng card. Tìm kiếm chạy trên dữ liệu đã tải, không gọi API theo từng ký tự.

### Bước 5 — Tương tác

Ba dòng cuối file: nghe `input` để tìm kiếm, nghe `click` để thử lại, gọi `loadProducts()` lần đầu. Các đoạn quan trọng có comment BƯỚC 1–7 để lần theo.

## 4. Việc cần làm tiếp, theo thứ tự

### A. Củng cố trang mẫu

- [ ] Giải thích `data` khác `data.products` thế nào; dùng console quan sát.
- [ ] Thêm select sắp xếp tăng/giảm giá bằng `sort()` trên mảng kết quả, không sửa mảng gốc.
- [ ] Thêm nút xóa từ khóa; kiểm tra tìm kiếm không phân biệt hoa thường.

### B. Trang chi tiết API — ưu tiên tiếp theo

- [ ] Viết `fetchProductById(id)` trong `api.js`, kiểm tra HTTP và trả một object.
- [ ] Tạo `assets/js/product-detail.js`.
- [ ] Đọc `id` bằng `new URLSearchParams(location.search).get('id')`.
- [ ] Chuyển `product-detail.html` sang khung động, bỏ dữ liệu hardcode trước khi render.
- [ ] Thêm link `product-detail.html?id=...` vào template sản phẩm.
- [ ] Kiểm tra thiếu ID / ID không tồn tại / lỗi mạng.
- [ ] Xóa `product-detail_2.html` đến `product-detail_10.html` sau khi làm xong trang chi tiết API. `product-detail.html` chỉ giữ khung để fetch/render theo ID; không giữ dữ liệu tĩnh hoặc xử lý tương thích URL cũ.

### C. Trang chủ và giỏ hàng

- [ ] Tạo `assets/js/home.js`, dùng lại `fetchProducts()` render 4 sản phẩm nổi bật.
- [ ] Lưu giỏ vào localStorage dạng `[{ id, quantity }]`, thống nhất một key.
- [ ] Không chỉ cộng số trên badge: reload phải giữ giỏ và mọi trang đọc cùng dữ liệu.
- [ ] Nối dữ liệu API theo ID để render giỏ, tăng/giảm/xóa, tính tổng.
- [ ] Kiểm tra số lượng nguyên, tối thiểu 1, không vượt tồn kho.
- [ ] Sửa phần giỏ cũ: đổi số lượng hiện chưa gọi lại `updateCartTotals()`; tổng chưa tính phí vận chuyển. Đây là bài tập còn lại trong `main.js`.

### D. Validate và tài khoản

- [ ] Checkout/liên hệ: trim, chặn tên/địa chỉ chỉ có khoảng trắng; kiểm tra điện thoại và email; báo dưới trường sai.
- [ ] Đăng ký: email về chữ thường, tên hợp lệ, email trùng, mật khẩu xác nhận.
- [ ] Đăng nhập: xử lý localStorage hỏng bằng try/catch; không lưu toàn bộ mật khẩu vào `current_user`.
- [ ] Hiện tên và nút đăng xuất trên menu; bỏ phiên khi đăng xuất.
- [ ] Dữ liệu mật khẩu hiện là demo trong trình duyệt; không dùng mật khẩu thật. Xác thực sản phẩm thật cần backend.

## 5. Checklist tự kiểm tra

| Thao tác | Kết quả mong đợi |
|---|---|
| Mở products.html có mạng | Có request DummyJSON và card sản phẩm |
| Nhập Apple hoặc một tên đang có | Chỉ còn sản phẩm phù hợp |
| Nhập chuỗi không tồn tại | Hiện trạng thái không có kết quả |
| Network Offline rồi reload | Hiện lỗi, có nút Thử lại |
| Chuyển Online, nhấn Thử lại | Danh sách tải lại được |
| Bật giả lập mobile 390px | Card một cột, menu thu gọn, không tràn ngang |
| Mở đăng nhập/đăng ký | Có link quay về trang chủ, báo kết quả form ở vùng thông báo |

Phân biệt: API sản phẩm mới dùng giá USD; các trang chi tiết/giỏ cũ vẫn là mẫu VND. Khi nối toàn bộ luồng phải chọn chung một đơn vị, không cộng lẫn hai loại giá.

## 6. Gợi ý chia 3 buổi đầu

1. HTML → config → API → render: học sinh tự chỉ ra request và mảng dữ liệu.
2. Tự viết sắp xếp và trang chi tiết theo ID.
3. Nối giỏ localStorage và validate cơ bản; tự kiểm tra theo bảng trên.

Mỗi bước làm xong phải chạy thử trước khi chuyển sang bước kế tiếp. Không cần hoàn thiện toàn bộ shop ngay trong buổi đầu.

## Trang chi tiết API đã có

Đọc theo thứ tự `config.js` → `api.js` (`fetchProductById`) → `product-detail.html`
(template) → `assets/js/product-detail.js`.

Luồng: card trên `products.html` → `product-detail.html?id=ID` → kiểm tra ID →
GET `/products/{id}` → kiểm tra HTTP/JSON → điền template bằng `textContent`.
Chi tiết nhận một object, không có `data.products`. Refresh vẫn fetch lại đúng ID.

Đã sửa sắp xếp danh sách và các lời gọi hàm chưa tồn tại. Giỏ/checkout và sản phẩm
nổi bật trang chủ vẫn cần học sinh nối API. Đọc `NOTE_REVIEW_CUA_THAY.txt` để xem
trạng thái hiện tại; checklist chi tiết API ở phần hướng dẫn cũ phía trên là bước
đã được làm mẫu, không phải việc còn thiếu.
