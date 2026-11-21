const loginForm = document.getElementById('login-form');
        const messageBox = document.getElementById('message-box');

        function showMessage(text, type) {
            messageBox.textContent = text;
            messageBox.className = `message-box ${type}`;
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            // Lấy danh sách tài khoản đã đăng ký
            let users = JSON.parse(localStorage.getItem('shop_users')) || [];

            // Tìm tài khoản khớp email và mật khẩu
            const validUser = users.find(user => user.email === email && user.password === password);

            if (validUser) {
                // Lưu thông tin người đang đăng nhập để hiển thị tên ở trang chủ (nếu cần)
                localStorage.setItem('current_user', JSON.stringify(validUser));
                
                showMessage(`Xin chào ${validUser.name}! Đang chuyển hướng về trang chủ...`, 'success');
                
                // Chuyển trang sau 1.5 giây
                setTimeout(() => {
                    window.location.href = 'index.html'; 
                }, 1500);
            } else {
                showMessage('Email hoặc mật khẩu không chính xác!', 'error');
            }
        });