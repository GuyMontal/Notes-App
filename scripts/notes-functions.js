'strict mode'

// Read existing notes from localStorage
const getSavedNotes = () => {
    const noteJson = localStorage.getItem('notes');

    try {
        const savedTodos = noteJson ? JSON.parse(noteJson) : [];
        return savedTodos;
    } catch(e) {
        return [];
    }

    
}
// save notes into localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id = id);

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
}

// Generate a DOM structure for the note
const generateNotesDom = (note) => {
    const noteEl = document.createElement('a');
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p')

    //setup the note title
    textEl.textContent = note.title.length > 0 ?  note.title : "Unnamed note";
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl);

    //setup the link
    noteEl.setAttribute('href', `./edit.html#${note.id}`);
    noteEl.classList.add('list-item')

    //setup the status
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl;
}

// Render notes app
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    notesEl.innerHTML = '';

    if(filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
            const noteEl = generateNotesDom(note);
            notesEl.appendChild(noteEl);
        })  
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

// Sort notes by order of picked
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byAlphabetically') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    }
    else {
        return notes
    }
}

// Check how much time ago the note has been updated
const generateLastEdited = (timestamp) => `Last edited : ${moment(timestamp).fromNow()}`;