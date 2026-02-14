
const updateDataFrom = document.querySelector('.updateDataFrom');
const accoutHomeBtn = document.querySelector('.accout-home-btn');
const photoInput = document.getElementById('photo');

const updateMe = async (form) => {

    try {
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:8080/update-me',
            data: form
        });

        if (res.data.status === 'success') {
            alert('Settings updated successfully!');
            window.location.reload();
        }

    } catch (err) {
        alert(err.response.data.message || 'Something went wrong!');
    }
    
}


document.addEventListener('DOMContentLoaded', () => {
    updateDataFrom.addEventListener('submit', (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('fullname', document.querySelector('.fullname').value);
        form.append('email', document.querySelector('.email').value);
        form.append('phonenumber', document.querySelector('.phonenumber').value);
        form.append('gender', document.querySelector('.gender').value);
        form.append('purpose', document.querySelector('.purpose').value);
        
        if (photoInput.files[0]) {
            form.append('photo', photoInput.files[0]);
        }

        updateMe(form);
    })
})



accoutHomeBtn.addEventListener('click', () => {
    window.location.href = '/dashboard';
})