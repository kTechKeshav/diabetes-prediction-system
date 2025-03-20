document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login');

    // Initialize memory database with admin user
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([
            { email: 'keshav@gmail.com', password: '2201641520090' },
            { email: 'kavisha@gmail.com', password: '2201641520088' },
            { email: 'kushagrakumar@gmail.com', password: '2201641520094' },
            { email: 'kushagratiwari@gmail.com', password: '2201641520095' },
            { email: 'akbar@gmail.com', password: '2201641520105' },
            { email: 'admin@gmail.com', password: '99999' }
        ]));
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            alert('Login successful!');
            localStorage.setItem('currentUser', email);
            // window.location.href = 'dashboard.html';
            window.location.href = "http://127.0.0.1:8000"
        } else {
            alert('Invalid email or password');
        }
    });
});
