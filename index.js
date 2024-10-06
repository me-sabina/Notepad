// Initialize notes array from localStorage or empty array
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Elements
const editor = document.getElementById('editor');
const noteTitle = document.getElementById('noteTitle');
const wordCountEl = document.getElementById('wordCount');
const timestampEl = document.getElementById('timestamp');
const notesContainer = document.getElementById('notesContainer');
const searchBar = document.getElementById('searchBar');

// Autosave feature: Save note on input
editor.addEventListener('input', () => {
    updateWordCount();
    updateTimestamp();
    autosaveNote();
});

// Update word count on input
function updateWordCount() {
    const text = editor.innerText.trim();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    wordCountEl.innerText = `Word Count: ${words.length}`;
}

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    timestampEl.innerText = `Last Modified: ${now.toLocaleString()}`;
}

// Format text
function formatText(command) {
    document.execCommand(command, false, null);
    editor.focus();
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Save note
function saveNote() {
    const title = noteTitle.value.trim();
    const content = editor.innerHTML.trim();

    if (title === '' || content === '') {
        alert('Title and content cannot be empty.');
        return;
    }

    const existingNoteIndex = notes.findIndex(note => note.title === title);

    const note = {
        title: title,
        content: content,
        wordCount: editor.innerText.trim().split(/\s+/).length,
        timestamp: new Date().toLocaleString(),
    };

    if (existingNoteIndex !== -1) {
        notes[existingNoteIndex] = note;
    } else {
        notes.push(note);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    alert('Note saved successfully!');
}

// Autosave note without alerts
function autosaveNote() {
    const title = noteTitle.value.trim();
    const content = editor.innerHTML.trim();

    if (title === '' || content === '') {
        return;
    }

    const existingNoteIndex = notes.findIndex(note => note.title === title);

    const note = {
        title: title,
        content: content,
        wordCount: editor.innerText.trim().split(/\s+/).length,
        timestamp: new Date().toLocaleString(),
    };

    if (existingNoteIndex !== -1) {
        notes[existingNoteIndex] = note;
    } else {
        notes.push(note);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Clear editor
function clearEditor() {
    if (confirm('Are you sure you want to clear the editor? Unsaved changes will be lost.')) {
        noteTitle.value = '';
        editor.innerHTML = '';
        wordCountEl.innerText = 'Word Count: 0';
        timestampEl.innerText = '';
    }
}

// Download note as .txt file
function downloadNote() {
    const title = noteTitle.value.trim() || 'Untitled';
    const text = editor.innerText.trim();

    if (text === '') {
        alert('Cannot download an empty note.');
        return;
    }

    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.txt`;
    link.click();
}

// Display notes in the list
function displayNotes(filteredNotes = notes) {
    notesContainer.innerHTML = '';

    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = '<li>No notes found.</li>';
        return;
    }

    filteredNotes.forEach(note => {
        const li = document.createElement('li');
        li.innerText = `${note.title} (${note.timestamp})`;
        li.onclick = () => loadNote(note.title);
        notesContainer.appendChild(li);
    });
}

// Load note into editor
function loadNote(title) {
    const note = notes.find(n => n.title === title);

    if (note) {
        noteTitle.value = note.title;
        editor.innerHTML = note.content;
        wordCountEl.innerText = `Word Count: ${note.wordCount}`;
        timestampEl.innerText = `Last Modified: ${note.timestamp}`;
    }
}

// Search notes
function searchNotes() {
    const query = searchBar.value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
    displayNotes(filteredNotes);
}

// Initialize
displayNotes();
