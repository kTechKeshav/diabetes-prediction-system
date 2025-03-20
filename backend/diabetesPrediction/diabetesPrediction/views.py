from django.shortcuts import render
from joblib import load
from django.http import HttpResponse

# Load the trained model
trained_model = load('trained_model.joblib')

# Create your views here.
def index(request):
    if request.method == 'POST':
        # Get the form data
        Pregnancies = float(request.POST.get('Pregnancies'))
        Glucose = float(request.POST.get('Glucose'))
        BloodPressure = float(request.POST.get('BloodPressure')) 
        SkinThickness = float(request.POST.get('SkinThickness'))
        Insulin = float(request.POST.get('Insulin'))
        BMI = float(request.POST.get('BMI'))
        DiabetesPedigreeFunction = float(request.POST.get('DiabetesPedigreeFunction'))
        Age = int(request.POST.get('Age'))

        # Make prediction
        input_data = [[Pregnancies, 
                       Glucose, 
                       BloodPressure, 
                       SkinThickness, 
                       Insulin,
                       BMI, 
                       DiabetesPedigreeFunction, 
                       Age]]  # Include all input features
        prediction = trained_model.predict(input_data)
        # Display a user-friendly message based on the prediction
        if prediction[0] == 1:
            result_message = 'You have Diabetes.'
        else:
            result_message = 'You do not have Diabetes.'

        # Pass the result message to the template
        return render(request, 'home.html', {'result_message': result_message})
    
    return render(request, 'home.html', {'result_message': None})