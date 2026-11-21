# Ghi chú review và bàn giao cho học sinh

**Ngày review:** 19/11/2026  
**Project:** TechNova — website phụ kiện điện tử  
**Mục tiêu lần chỉnh này:** sửa UI cơ bản và làm mẫu fetch/render **một trang**, để học sinh tự triển khai các luồng tiếp theo.

## 1. Các file đã review và chỉnh sửa

| File / nhóm file | Nội dung đã review và sửa |
|---|---|
| `products.html` | Chuyển danh sách sản phẩm viết sẵn sang vùng render API; thêm ô tìm tên, vùng thông báo, nút thử lại và template card. Nạp JS theo thứ tự config → api → products; bỏ nạp `main.js` tại trang này để tránh xử lý bộ lọc tĩnh chồng lên API. |
| `assets/css/style.css` | Thu gọn logo, chỉnh menu mobile, bố cục thanh tìm kiếm, độ dài nội dung card và footer. |
| `dang-nhap.html` | Thêm đường về trang chủ, thông báo tài khoản demo và vùng thông báo có aria-live; bỏ checkbox ghi nhớ/link quên mật khẩu chưa có xử lý. |
| `dang-ky.html` | Thêm đường về trang chủ, ghi rõ tài khoản demo, vùng thông báo có aria-live và minlength cho mật khẩu đăng ký. |
| `assets/css/dang-nhap.css` | Đồng bộ màu xanh TechNova, focus input và khoảng cách trên màn hình nhỏ. |
| `assets/css/dang-ky.css` | Đồng bộ giao diện với trang đăng nhập. |
| `about.html` | Thay ảnh thành viên không tồn tại bằng `assets/images/avatar.svg` có sẵn; cập nhật menu. |
| `index.html`, `contact.html`, `checkout.html`, `faq.html` | Thay ô tìm kiếm trên menu chưa có xử lý bằng liên kết Đăng nhập. Nội dung và logic chính của các trang này chưa chuyển sang API. |
| Các trang chi tiết tĩnh | Sẽ loại bỏ khi hoàn thiện luồng API, không cần duy trì hay xử lý tương thích. Chỉ dùng một trang chi tiết động fetch theo ID. |
| `STUDENT_TASKS.md` | Bổ sung checklist giai đoạn API, phân biệt việc đã làm mẫu và bài tập còn lại. |
| `README.md` | Bổ sung cách chạy và đường dẫn tới hướng dẫn bắt đầu. |

## 2. Các file mới được tạo

| File | Vai trò |
|---|---|
| `assets/js/config.js` | Khai báo BASE_URL, CATEGORY, LIMIT. Đây là nơi thay đổi nguồn/danh mục API. |
| `assets/js/api.js` | Viết mẫu `fetchProducts()`: gọi API, kiểm tra HTTP, đọc JSON và kiểm tra mảng `data.products`. |
| `assets/js/products.js` | Tạo card từ template, render danh sách, tìm tên, xử lý loading/lỗi/thử lại. Có comment BƯỚC và TODO HS. |
| `HUONG_DAN_BAT_DAU.md` | Hướng dẫn cách chạy, thứ tự đọc code và bài tập học sinh làm tiếp. |
| `NOTE_REVIEW_CUA_THAY.md` | File bàn giao này: ghi rõ phạm vi đã sửa và phần chưa hoàn thiện. |

## 3. Các file đã đọc nhưng giữ nguyên để học sinh làm tiếp

| File | Nhận xét / phần còn thiếu |
|---|---|
| `assets/js/main.js` | Xử lý tương tác tĩnh hiện có. Đổi số lượng trong giỏ chưa gọi lại `updateCartTotals()`; tổng chưa tính phí vận chuyển; thêm giỏ mới cộng badge, chưa lưu giỏ thực sự. |
| `assets/js/dang-ky.js` | Có đăng ký demo, kiểm tra mật khẩu và email trùng. Cần chuẩn hóa email, kiểm tra tên và xử lý dữ liệu localStorage hỏng. Mật khẩu hiện lưu dạng rõ trong dữ liệu demo. |
| `assets/js/dang-nhap.js` | Có tìm tài khoản demo và chuyển trang. Cần xử lý localStorage hỏng, chuẩn hóa email và tránh lưu mật khẩu vào `current_user`. |
| `cart.html` | Giỏ tĩnh, chưa nối ID sản phẩm API và dữ liệu localStorage. |

**Lưu ý:** “đã review” không đồng nghĩa “đã sửa xong”. Logic tài khoản, giỏ và checkout chưa được nâng cấp đầy đủ trong lần làm mẫu này.

## 4. Phần đã kiểm tra

- Gọi trực tiếp endpoint DummyJSON danh mục `mobile-accessories`: nhận HTTP 200 và mảng sản phẩm; không dùng API key.
- Kiểm tra cú pháp ba file JS mới.
- Kiểm tra render với dữ liệu API thực trong môi trường DOM mô phỏng.
- Kiểm tra tìm tên không phân biệt hoa thường và trường hợp không có kết quả.
- Kiểm tra lỗi mạng, nút thử lại, dữ liệu sai cấu trúc và HTTP 500 bằng phản hồi mô phỏng.
- Kiểm tra tên sản phẩm được đưa lên bằng textContent, không bị diễn giải thành HTML.
- Rà đường dẫn nội bộ và phát hiện/sửa ảnh thiếu trên trang giới thiệu.

Các kiểm tra trên **không thay thế kiểm tra trực quan trên trình duyệt**. Học sinh cần kiểm tra desktop/mobile, menu Bootstrap, ảnh thực tế và toàn bộ các form trước khi nộp.

## 5. Việc học sinh cần làm tiếp — theo thứ tự ưu tiên

### Ưu tiên 1 — Hiểu và hoàn thiện trang sản phẩm

- [d] Chạy `products.html` bằng Live Server; chỉ ra request API trong Network.
- [ ] Giải thích tại sao dùng `data.products` thay vì `data.map()`.
- [ ] Đọc được luồng config → fetchProducts → loadProducts → renderProducts → createProductCard.
- [d] Tự thêm sắp xếp giá tăng/giảm và nút xóa từ khóa.
- [d] Kiểm tra trường hợp không có dữ liệu, mất mạng và thử lại.

**Output:** trang danh sách API chạy ổn; học sinh tự giải thích được code, không chỉ sao chép.

### Ưu tiên 2 — Chuyển trang chi tiết sang API

- [ ] Viết `fetchProductById(id)` trong `api.js` cho endpoint `/products/{id}`.
- [ ] Tạo `assets/js/product-detail.js`.
- [ ] Đọc ID từ URL bằng URLSearchParams và render đúng sản phẩm.
- [ ] Thêm link chi tiết vào template card tại `products.html`.
- [ ] Có thông báo khi thiếu ID hoặc ID không tồn tại.
- [d] Xóa product-detail_2.html đến product-detail_10.html khi hoàn thiện chi tiết API; bỏ toàn bộ nội dung sản phẩm hardcode trong product-detail.html và dùng file này làm trang động theo ID. Không cần redirect hoặc hỗ trợ các URL chi tiết cũ.

**Output:** một trang chi tiết dùng chung cho tất cả sản phẩm API.

### Ưu tiên 3 — Trang chủ dùng cùng nguồn dữ liệu

- [ ] Tạo `assets/js/home.js`, dùng lại `fetchProducts()` để render sản phẩm nổi bật.
- [ ] Các link chi tiết phải truyền đúng ID của API.
- [ ] Chọn thống nhất đơn vị giá cho toàn bộ website.

**Output:** trang chủ và danh sách không còn dùng hai bộ sản phẩm khác nhau.

### Ưu tiên 4 — Giỏ hàng thực sự bằng localStorage

- [ ] Lưu mảng `[{ id, quantity }]`, thống nhất một key dùng ở mọi trang.
- [ ] Thêm cùng sản phẩm thì cộng số lượng; reload vẫn giữ giỏ.
- [ ] Render giỏ theo ID, lấy tên/ảnh/giá từ dữ liệu API.
- [ ] Tăng/giảm/xóa cập nhật badge, thành tiền và tổng ngay.
- [ ] Chặn số lượng âm, lẻ, rỗng hoặc vượt tồn kho.
- [ ] Có trạng thái giỏ trống, xử lý sản phẩm không còn tìm thấy.
- [ ] Tính phí vận chuyển và tổng theo cùng quy tắc ở giỏ và checkout.

**Output:** giỏ hoạt động xuyên trang, không chỉ thay số hiển thị.

### Ưu tiên 5 — Validate và hoàn thiện tài khoản demo

- [ ] Checkout/liên hệ: trim, chặn khoảng trắng, kiểm tra điện thoại/email và hiển thị lỗi rõ.
- [ ] Chặn đặt hàng khi giỏ trống; chỉ xóa giỏ sau khi xác nhận demo thành công.
- [ ] Đăng ký: chuẩn hóa email về chữ thường, kiểm tra tên, email trùng và xác nhận mật khẩu.
- [ ] Đọc localStorage với try/catch và kiểm tra dữ liệu có đúng kiểu mảng/object.
- [ ] Khi đăng nhập chỉ lưu thông tin phiên cần thiết, không chép mật khẩu vào `current_user`.
- [ ] Menu hiển thị tên người dùng và nút Đăng xuất.
- [ ] Ghi rõ tính chất demo, không dùng mật khẩu thật. Đăng nhập bảo mật thực tế cần backend.

**Output:** các form phản hồi đúng với dữ liệu hợp lệ/không hợp lệ, tài khoản demo có đăng xuất.

### Ưu tiên 6 — Kiểm tra và chuẩn bị thuyết trình

- [ ] Kiểm tra ở chiều rộng 390px và desktop; không tràn ngang, menu mở được.
- [ ] Không có ảnh, link hoặc file JS bị 404; không có lỗi Console chặn luồng.
- [ ] Kiểm tra từ trang chủ → danh sách → chi tiết → giỏ → checkout.
- [ ] Cập nhật README và checklist theo trạng thái thực tế.
- [ ] Tự trình bày luồng API → JSON → DOM và localStorage; nêu được phần tự làm.

## 6. Các điểm cần nhớ khi nối luồng

1. Tiêu chí hoàn thiện: dữ liệu sản phẩm phải fetch từ API. Bỏ bộ sản phẩm hardcode và các trang chi tiết tĩnh; trang chủ/danh sách/chi tiết dùng chung ID API. Cập nhật các link trên giao diện đang sử dụng, không cần duy trì URL cũ.
2. Trang sản phẩm đang hiển thị USD; các trang tĩnh cũ dùng VND. Không cộng lẫn hai loại giá.
3. `main.js` phục vụ phần tĩnh cũ; `products.js` phục vụ trang API mới. Không nạp cả hai vào trang sản phẩm một cách máy móc.
4. API công khai này cung cấp dữ liệu mẫu; không phải giá/tồn kho của cửa hàng thật.
5. Không cần làm tất cả cùng lúc: hoàn thành và chạy thử một ưu tiên rồi mới chuyển sang ưu tiên kế tiếp.

Đọc hướng dẫn chi tiết trong **[HUONG_DAN_BAT_DAU.md](HUONG_DAN_BAT_DAU.md)** và đối chiếu **[STUDENT_TASKS.md](STUDENT_TASKS.md)** khi đánh dấu tiến độ.
