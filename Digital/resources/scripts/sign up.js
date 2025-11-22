document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const passwordInput = form.querySelector('input[type="password"]');
    const showPasswordIcon = form.querySelector('.password-input img');

    // Toggle password visibility
    if (showPasswordIcon) {
        showPasswordIcon.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            showPasswordIcon.src = type === 'password' ? 'resources/assets/images/show.png' : 'resources/assets/images/hide.png';
        });
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = form.querySelector('input[placeholder="Full Name"]').value;
        const email = form.querySelector('input[placeholder="Email Address"]').value;
        const password = form.querySelector('input[placeholder="Password"]').value;

        try {
            const response = await fetch('http://192.168.143.172:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })
            });

            // Try to get the response data
            let data;
            try {
                data = await response.json();
            } catch (e) {
                console.error('Failed to parse response:', e);
                data = null;
            }

            if (response.ok) {
                // Signup successful
                alert('Registration successful! Please login to continue.');
                window.location.href = 'Default Login.html';
            } else {
                // Signup failed with error from server
                const errorMessage = data?.message || `Signup failed. Server returned status: ${response.status}`;
                alert(errorMessage);
                console.error('Server response:', data);
            }
        } catch (error) {
            // Network or connection error
            console.error('Connection error:', error);
            alert('Connection failed! Please check if:\n\n1. The server is running at 192.168.1.10:8000\n2. Your network can reach the server\n3. The server is accepting connections');
        }
    });
});


