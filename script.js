const inputBox = document.getElementById('input-box');
const addButton = document.getElementById('add-button');
const listContainer = document.getElementById('list-container');

// Add task function
function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        
        // Create delete button
        let deleteSpan = document.createElement('span');
        deleteSpan.innerHTML = '\u00d7';
        deleteSpan.className = 'delete';
        
        // Create edit button
        let editSpan = document.createElement('span');
        editSpan.innerHTML = '<i class="fas fa-edit"></i>';
        editSpan.className = 'edit';
        
        li.appendChild(editSpan);
        li.appendChild(deleteSpan);
        listContainer.appendChild(li);
    }
    inputBox.value = '';
    saveData();
}

// Add task when clicking the add button
addButton.addEventListener('click', addTask);

// Add task when pressing Enter key
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Handle clicks on list items (check/uncheck, edit, delete)
listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.className === 'delete' || (e.target.parentElement && e.target.parentElement.className === 'delete')) {
        const li = e.target.tagName === 'SPAN' ? e.target.parentElement : e.target.parentElement.parentElement;
        li.remove();
        saveData();
    } else if (e.target.className === 'edit' || (e.target.parentElement && e.target.parentElement.className === 'edit')) {
        const li = e.target.tagName === 'SPAN' ? e.target.parentElement : e.target.parentElement.parentElement;
        const taskText = li.firstChild.textContent;
        
        const newText = prompt('Edit your task:', taskText);
        if (newText !== null && newText.trim() !== '') {
            li.firstChild.textContent = newText;
            saveData();
        }
    }
}, false);

// Save data to local storage
function saveData() {
    localStorage.setItem('todoData', listContainer.innerHTML);
}

// Load data from local storage
function loadData() {
    listContainer.innerHTML = localStorage.getItem('todoData') || '';
}

// Load saved data when page loads
loadData();