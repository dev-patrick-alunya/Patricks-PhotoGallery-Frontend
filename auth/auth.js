function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('togglePassword');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    }
}

function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (email === '' || password === '') {
        errorMessage.textContent = 'Please fill in all fields.';
        return false;
    }

    errorMessage.textContent = '';
    return true;
}

let token = localStorage.getItem('token');

if (token) {
    const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '../';
    window.location.href = returnUrl; // Redirect to the return URL or the project root if already logged in
} else {
    document.getElementById('login-form').style.display = 'block';
}

async function handleLogin(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('https://patricks-photogallery-backend.onrender.com//login', { // Fixed the URL by adding a slash
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            console.error('Error:', response.status, response.statusText);
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || 'Login failed. Please try again.';
            return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '../';
        window.location.href = returnUrl; // Redirect to the return URL or the project root after successful login
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again later.';
        console.error('Login error:', error);
    }
}

document.getElementById('login-form').addEventListener('submit', handleLogin);