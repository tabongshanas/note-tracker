
const noteContents = document.querySelectorAll('.note-content');
const createNoteBtn = document.querySelector('.create-note-btn');
const createNoteContainer = document.querySelector('.create-note-container');
const cancelCreate = document.querySelector('.cancel-create');
const registerContainerBtns = document.querySelector('.register-container-btns');
const registerBtn = document.querySelector('.register--btn');
const createBtn = document.querySelector('.create-btn');
const createError = document.querySelector('.create-error');
const readIcons = document.querySelectorAll('.read-icon');
const deleteIcons = document.querySelectorAll('.delete-icon');
const detailsNote = document.querySelector('.details-note');

const detailTitle = document.querySelector('.detail-title');
const detailNote = document.querySelector('.detail-note');
const noteDetailContainer = document.querySelector('.note-detail-container');
const dirDetailBtn = document.querySelector('.dir-detail-btn');
const detailDate = document.querySelector('.detail-date');
const userInfoContainer = document.querySelector('.user-info');

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

const deleteNote = async (data) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8080/api/v1/notes/delete-note/${data}`
            
        })

        if (res.data == '') {
            window.location.reload(true);
            window.location.href = '/dashboard';
        }

        console.log(res)
        
    } catch (err) {
        console.log(err)
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
        const note_detail = e.currentTarget.parentElement.parentElement.querySelector('.note-content').textContent;
        const title_detail = e.currentTarget.parentElement.parentElement.querySelector('.note-title').textContent;
        const date_detail = e.currentTarget.parentElement.parentElement.querySelector('.note-date').textContent;
        noteDetailContainer.classList.add('bring-note-detail-container');
        detailTitle.textContent = title_detail;
        detailNote.textContent = note_detail;
        detailDate.textContent = date_detail;
    })
})

deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', (e) => {
        e.currentTarget.parentElement.parentElement.style.opacity = '60%';
        e.currentTarget.parentElement.parentElement.style.backgroundColor = 'rgba(0, 0, 0, 0.699)';
        const choiceDel = confirm('Are you sure you want to delete this note?');

        if (choiceDel) {
            const data = `${e.currentTarget.parentElement.parentElement.querySelector('.note-title').textContent}`;
            deleteNote(data);
        } else {
            e.currentTarget.parentElement.parentElement.style.opacity = '100%';
            e.currentTarget.parentElement.parentElement.style.backgroundColor = 'transparent';
        }
    })
})

dirDetailBtn.addEventListener('click', () => {
    noteDetailContainer.classList.remove('bring-note-detail-container');
})


// ACCOUNT FUNCT
userInfoContainer.addEventListener('click', () => {
    console.log('working')
    window.location.href = 'account';
})