'strict mode'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy : 'byEdited'
}

renderNotes(notes, filters);

document.querySelector('#create-note').addEventListener('submit',(e) => {
    e.preventDefault()
    const noteId = uuidv4()
    const noteTimestamp = moment().valueOf();
    notes.push({
        id : noteId,
        title: e.target.elements.textNote.value,
        body: '',
        createdAt : noteTimestamp,
        updatedAt : noteTimestamp
    })
    saveNotes(notes);
    renderNotes(notes, filters);
    e.target.elements.textNote.value = '';
    location.assign(`./edit.html#${noteId}`)
})

document.querySelector('#search-text').addEventListener('input',(e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change',(e) => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters)
})

window.addEventListener('storage',(e) => {
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue);
        renderNotes(notes,filters)
    }
})

