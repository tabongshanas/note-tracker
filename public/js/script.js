
const noteContents = document.querySelectorAll('.note-content');
const createNoteBtn = document.querySelector('.create-note-btn');
const createNoteContainer = document.querySelector('.create-note-container');
const cancelCreate = document.querySelector('.cancel-create');
const registerContainerBtns = document.querySelector('.register-container-btns');
const registerBtn = document.querySelector('.register--btn');
const createBtn = document.querySelector('.create-btn');
const createError = document.querySelector('.create-error');
const readIcons = document.querySelectorAll('.read-icon');

const registerBtns = document.querySelectorAll('.register-btns');

const createNoteForm = document.getElementById('create-note--form');

// FUNCTS
const createNote = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8080/api/v1/notes/createnote',
            data
        })

        
        createBtn.textContent = 'Create';
        createError.style.color = 'green';
        createError.textContent = res.request.statusText;

        if (res.data.status === 'success') {
            window.setTimeout(() => {
                createNoteContainer.classList.remove('bring-create-section');
                window.location.reload(true);
            }, 1500)
        }

    } catch (err) {
        createBtn.textContent = 'Create';
        createError.textContent = err.response.data.message;
    }
}


const getDetails = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:8080/api/v1/notes/details'
        })

        
        // createBtn.textContent = 'Create';
        // createError.style.color = 'green';
        // createError.textContent = res.request.statusText;
        console.log(res)


    } catch (err) {
        // createError.textContent = err.response.data.message;
    }
}


noteContents.forEach((noteContent) => {
    if (noteContent.textContent.length > 230) {
        noteContent.textContent = `${noteContent.textContent.slice(0, 230)}...`;
    }
});

createNoteBtn.addEventListener('click', () => {
    createNoteContainer.classList.add('bring-create-section');
})

cancelCreate.addEventListener('click', () => {
    createNoteContainer.classList.remove('bring-create-section');
})

registerBtn.addEventListener('click', () => {
    registerContainerBtns.classList.add('bring-create-section');
})
registerBtns.forEach((registerBtn) => {
    registerBtn.addEventListener('click', () => {
        window.setTimeout(() => {
            registerContainerBtns.classList.remove('bring-create-section');
        }, 500)
    })
})

createNoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createBtn.textContent = 'Creating...';

    const formData = new FormData(createNoteForm);
    const data = Object.fromEntries(formData.entries());
    
    createNote(data);
})

readIcons.forEach(async (readIcon) => {
    readIcon.addEventListener('click', (e) => {
        console.log(e.currentTarget.parentElement.parentElement.querySelector('.note-content').textContent)
        getDetails()
    })
})