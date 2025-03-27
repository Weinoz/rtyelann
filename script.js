let currentEditElement = null;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let responses = JSON.parse(localStorage.getItem('responses')) || [];
let predefinedTags = JSON.parse(localStorage.getItem('predefinedTags')) || [];
let employees = JSON.parse(localStorage.getItem('employees')) || [];
let draggedItem = null;
let itemToDelete = null;

function showConfirmation(text) {
    navigator.clipboard.writeText(text).then(function() {
        const confirmation = document.getElementById('confirmation');
        confirmation.classList.add('show');
        setTimeout(() => {
            confirmation.classList.remove('show');
        }, 2000);
    }, function(err) {
        console.error('Erreur lors de la copie du texte : ', err);
    });
}

function filterResponses() {
    const input = document.getElementById('searchBar');
    const filter = input.value.toLowerCase();
    const responses = document.getElementById('responsesContainer').getElementsByClassName('response');

    for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        const text = response.textContent || response.innerText;
        response.style.display = text.toLowerCase().includes(filter) ? '' : 'none';
    }
}

function addResponse() {
    const newResponseTitle = document.getElementById('newResponseTitle').value.trim();
    const newResponseText = document.getElementById('newResponseText').value.trim();
    const selectedEmployee = document.getElementById('employeeSelect').value;
    const selectedTags = Array.from(document.querySelectorAll('#tagSelectionContainer .selected')).map(tag => tag.textContent);

    if (newResponseTitle && newResponseText && selectedEmployee) {
        const container = document.getElementById('responsesContainer');
        const responseDiv = document.createElement('div');
        responseDiv.className = 'response';
        responseDiv.setAttribute('onclick', `showConfirmation('${newResponseText}')`);
        responseDiv.setAttribute('data-employee', selectedEmployee);
        responseDiv.innerHTML = `
            <div class="title">${newResponseTitle}</div>
            <div class="text">${newResponseText}</div>
            <div class="tags">\${selectedTags.map(tag => `<span class="tag">${tag} <button onclick="removeTagFromResponse(this)">✖</button>`).join('')}</div>
            <div class="actions">
                <button class="edit" onclick="showEditResponseSection(this)">✎</button>
                <button class="delete" onclick="showConfirmDelete(this)">✖</button>
                <button class="favorite" onclick="toggleFavorite(event)">♥</button>
            </div>
        `;
        container.appendChild(responseDiv);

        // Save the new response
        responses.push({ title: newResponseTitle, text: newResponseText, tags: selectedTags, employee: selectedEmployee });
        localStorage.setItem('responses', JSON.stringify(responses));

        hideAddResponseSection();
    } else {
        alert('Veuillez remplir tous les champs obligatoires.');
    }
}

function showAddResponseSection() {
    const addResponseSection = document.getElementById('addResponseSection');
    const tagSelectionContainer = document.getElementById('tagSelectionContainer');
    const employeeSelect = document.getElementById('employeeSelect');

    // Clear previous options
    employeeSelect.innerHTML = '';

    // Populate employee select options
    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = `${employee.nom} ${employee.prenom}`;
        employeeSelect.appendChild(option);
    });

    tagSelectionContainer.innerHTML = '';
    predefinedTags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.textContent = tag;
        tagButton.className = 'tag-selection';
        tagButton.onclick = function() {
            this.classList.toggle('selected');
        };
        tagSelectionContainer.appendChild(tagButton);
    });
    addResponseSection.classList.add('show');
    document.getElementById('overlay').classList.add('show');
}

function hideAddResponseSection() {
    const addResponseSection = document.getElementById('addResponseSection');
    addResponseSection.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('newResponseTitle').value = '';
    document.getElementById('newResponseText').value = '';
    document.getElementById('employeeSelect').value = '';
}

function showEditResponseSection(button) {
    currentEditElement = button.closest('.response');
    const currentTitle = currentEditElement.querySelector('.title').textContent.trim();
    const currentText = currentEditElement.querySelector('.text').textContent.trim();
    const currentTags = Array.from(currentEditElement.querySelectorAll('.tag')).map(tag => tag.textContent.trim().replace('✖', ''));
    const currentEmployee = currentEditElement.getAttribute('data-employee');

    const editResponseSection = document.getElementById('editResponseSection');
    const editTitle = document.getElementById('editResponseTitle');
    const editText = document.getElementById('editResponseText');
    const editTagSelectionContainer = document.getElementById('editTagSelectionContainer');
    editTagSelectionContainer.innerHTML = '';
    predefinedTags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.textContent = tag;
        tagButton.className = 'tag-selection';
        if (currentTags.includes(tag)) {
            tagButton.classList.add('selected');
        }
        tagButton.onclick = function() {
            this.classList.toggle('selected');
        };
        editTagSelectionContainer.appendChild(tagButton);
    });
    editTitle.va
