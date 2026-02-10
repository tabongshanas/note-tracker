
// import { showAlert } from './alert'

const form = document.querySelector('.form');
const alertContainer = document.querySelector('.alert-container');
const alert = document.querySelector('.alert');
const errorDisplay = document.querySelector('.error-display');
const signupBtn = document.getElementById('signup-btn');
const submitPhoto = document.getElementById('submit-photo');

const showNotify = (res) => {
    signupBtn.textContent = 'Lon In';
    alert.style.transform = 'translateY(0)';
    alertContainer.style.transform = 'translateY(0)';
    alertContainer.style.opacity = '1';
    
    window.setTimeout(() => {
        alert.style.transform = 'translateY(-150%)';
        alertContainer.style.transform = 'translateY(-150%)';
        alertContainer.style.opacity = '0';

        if (res.data.status === 'success') {
            window.location.href = '/dashboard'
        }
    }, 3000)
}

// REQUEST FUNCTS

const login = async (data) => {
    
    try {

        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8080/api/v1/users/login',
            data
        })

        showNotify(res);
        signupBtn.textContent = 'Success';
        // showAlert(alertContainer);

    } catch (err) {
        signupBtn.textContent = 'Log In';
        errorDisplay.textContent = err.response.data.message;
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    signupBtn.textContent = 'Processing...';
    errorDisplay.textContent = '';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    login(data);
})