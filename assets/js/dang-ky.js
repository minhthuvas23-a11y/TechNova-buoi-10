const registerForm = document.getElementById('register-form');
        const messageBox = document.getElementById('message-box');

        function showMessage(text, type) {
            messageBox.textContent = text;
            messageBox.className = `message-box ${type}`;
        }

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;

            if (password.length < 6) {
                showMessage('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showMessage('Mật khẩu xác nhận không khớp!', 'error');
                return;
            }

            let users = JSON.parse(localStorage.getItem('shop_users')) || [];

            const userExists = users.some(user => user.email === email);
            if (userExists) {
                showMessage('Email này đã được đăng ký!', 'error');
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('shop_users', JSON.stringify(users));

            showMessage('Đăng ký thành công! Đang chuyển sang trang đăng nhập...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dang-nhap.html';
            }, 1500);
        });