document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('user-email').textContent = currentUser;

    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    const form = document.getElementById('prediction-form');
    const output = document.getElementById('prediction-output');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const glucose = document.getElementById('glucose').value;
        const age = document.getElementById('age').value;
        const bmi = document.getElementById('bmi').value;

        output.innerHTML = `
            <h3>Input Data:</h3>
            <p>Glucose Level: ${glucose}</p>
            <p>Age: ${age}</p>
            <p>BMI: ${bmi}</p>
            <p>Prediction: Sample prediction (this would come from your ML model)</p>
        `;
    });
});
