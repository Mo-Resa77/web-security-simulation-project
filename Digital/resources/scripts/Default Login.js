document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const passwordField = document.getElementById('password-field');
    const togglePassword = document.getElementById('toggle-password');
    const userNameElement = document.getElementById('user-name');

    const firstName = localStorage.getItem('firstName');
    userNameElement.textContent = firstName ? firstName : "User";

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        togglePassword.src = type === 'password' ? 'resources/assets/images/show.png' : 'resources/assets/images/hide.png';
    });

    const googleBtn = document.querySelector('.google-btn');
    googleBtn.addEventListener('mouseover', () => {
        googleBtn.style.backgroundColor = '#f0f0f0';
        googleBtn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
    });

    googleBtn.addEventListener('mouseout', () => {
        googleBtn.style.backgroundColor = '#fff';
        googleBtn.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    });

    // Handle login
    loginBtn.addEventListener('click', async function(e) {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]').value;
        const password = passwordField.value;
        const rememberMe = form.querySelector('input[type="checkbox"]').checked;

        try {
            const response = await fetch('http://192.168.143.172:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                if (rememberMe) {
                    // Store the token in localStorage if remember me is checked
                    localStorage.setItem('token', data.token);
                } else {
                    // Store the token in sessionStorage if remember me is not checked
                    sessionStorage.setItem('token', data.token);
                }

                // Store user info if available in the response
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }

                // Show success alert
                alert('Login successful! Welcome back!');

                // Redirect to main page or dashboard
                window.location.href = 'Destination.html';
            } else {
                // Login failed
                alert(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
