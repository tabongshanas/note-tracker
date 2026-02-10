
exports.showAlert = (message) => {
    const div = document.createElement('div');
    div.style.backgroundColor = 'red';
    div.textContent = message;

    // window.setTimeout(() => {
    //     alertContainer.style.transform = 'translateY(-150%)';
    // }, 2000)
}