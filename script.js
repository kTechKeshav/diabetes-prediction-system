document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediction-form');
    const output = document.getElementById('prediction-output');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send this data to your backend
        // and receive a prediction. For now, we'll just display the input.
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
