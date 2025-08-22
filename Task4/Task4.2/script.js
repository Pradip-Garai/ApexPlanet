document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const notesList = document.getElementById('notes-list');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const saveNoteBtn = document.getElementById('save-note');
    const newNoteBtn = document.getElementById('new-note-btn');
    const deleteNoteBtn = document.getElementById('delete-note');
    const searchInput = document.getElementById('search-notes');
    
    // State variables
    let currentNoteId = null;
    let notes = [];
    
    // Initialize the app
    function init() {
        loadNotes();
        renderNotesList();
        setupEventListeners();
    }
    
    // Load notes from local storage
    function loadNotes() {
        const notesJSON = localStorage.getItem('notes');
        notes = notesJSON ? JSON.parse(notesJSON) : [];
    }
    
    // Save notes to local storage
    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    
    // Render the notes list
    function renderNotesList(filterText = '') {
        notesList.innerHTML = '';
        
        const filteredNotes = filterText 
            ? notes.filter(note => 
                note.title.toLowerCase().includes(filterText.toLowerCase()) || 
                note.content.toLowerCase().includes(filterText.toLowerCase()))
            : notes;
        
        if (filteredNotes.length === 0) {
            notesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-sticky-note"></i>
                    <p>${filterText ? 'No matching notes' : 'No notes yet'}</p>
                </div>
            `;
            return;
        }
        
        filteredNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note-item');
            if (note.id === currentNoteId) {
                noteElement.classList.add('active');
            }
            
            const date = new Date(note.updatedAt).toLocaleDateString();
            const preview = note.content.length > 50 
                ? note.content.substring(0, 50) + '...' 
                : note.content;
            
            noteElement.innerHTML = `
                <h3>${note.title || 'Untitled'}</h3>
                <p>${preview}</p>
                <div class="note-date">Updated: ${date}</div>
            `;
            
            noteElement.addEventListener('click', () => openNote(note.id));
            notesList.appendChild(noteElement);
        });
    }
    
    // Set up event listeners
    function setupEventListeners() {
        saveNoteBtn.addEventListener('click', saveCurrentNote);
        newNoteBtn.addEventListener('click', createNewNote);
        deleteNoteBtn.addEventListener('click', deleteCurrentNote);
        searchInput.addEventListener('input', (e) => renderNotesList(e.target.value));
        
        // Auto-save when typing stops
        let typingTimer;
        const doneTypingInterval = 1000;
        
        noteTitle.addEventListener('input', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(saveCurrentNote, doneTypingInterval);
        });
        
        noteContent.addEventListener('input', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(saveCurrentNote, doneTypingInterval);
        });
    }
    
    // Create a new note
    function createNewNote() {
        currentNoteId = Date.now().toString();
        noteTitle.value = '';
        noteContent.value = '';
        noteTitle.focus();
        
        // Remove active class from all notes
        document.querySelectorAll('.note-item').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Open a note for editing
    function openNote(id) {
        const note = notes.find(note => note.id === id);
        if (note) {
            currentNoteId = note.id;
            noteTitle.value = note.title;
            noteContent.value = note.content;
            
            // Update active note in the list
            document.querySelectorAll('.note-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const noteElements = document.querySelectorAll('.note-item');
            const noteIndex = notes.findIndex(n => n.id === id);
            if (noteIndex >= 0 && noteElements[noteIndex]) {
                noteElements[noteIndex].classList.add('active');
            }
        }
    }
    
    // Save the current note
    function saveCurrentNote() {
        if (!currentNoteId) return;
        
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        
        if (!title && !content) {
            // Don't save empty notes
            return;
        }
        
        const existingNoteIndex = notes.findIndex(note => note.id === currentNoteId);
        
        if (existingNoteIndex > -1) {
            // Update existing note
            notes[existingNoteIndex] = {
                ...notes[existingNoteIndex],
                title,
                content,
                updatedAt: new Date().toISOString()
            };
        } else {
            // Create new note
            notes.push({
                id: currentNoteId,
                title,
                content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }
        
        saveNotes();
        renderNotesList(searchInput.value);
    }
    
    // Delete the current note
    function deleteCurrentNote() {
        if (!currentNoteId) return;
        
        const confirmDelete = confirm('Are you sure you want to delete this note?');
        if (!confirmDelete) return;
        
        notes = notes.filter(note => note.id !== currentNoteId);
        saveNotes();
        
        // Clear the editor
        currentNoteId = null;
        noteTitle.value = '';
        noteContent.value = '';
        
        renderNotesList(searchInput.value);
    }
    
    // Initialize the application
    init();
});