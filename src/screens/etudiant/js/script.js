let etudiants = [];
let idCounter = 1;

// Afficher le formulaire d'ajout d'étudiant
function showForm() {
    document.getElementById('table-container').classList.add('d-none');
    document.getElementById('form-container').classList.remove('d-none');
    document.getElementById('success-message').classList.add('d-none'); // Masquer le message de succès
    document.getElementById('error-message').classList.add('d-none');  // Masquer le message d'erreur
}

// Afficher le tableau des étudiants
function showTable() {
    document.getElementById('form-container').classList.add('d-none');
    document.getElementById('table-container').classList.remove('d-none');
    document.getElementById('success-message').classList.add('d-none'); // Masquer le message de succès
    document.getElementById('error-message').classList.add('d-none');  // Masquer le message d'erreur
}

// Sauvegarder les étudiants dans le localStorage
function saveStudents() {
    localStorage.setItem('etudiants', JSON.stringify(etudiants));
    localStorage.setItem('idCounter', idCounter); // Sauvegarder le compteur d'id
}

// Charger les étudiants depuis le localStorage
function loadStudents() {
    const storedStudents = localStorage.getItem('etudiants');
    const storedIdCounter = localStorage.getItem('idCounter');

    if (storedStudents) {
        etudiants = JSON.parse(storedStudents);
    }
    if (storedIdCounter) {
        idCounter = parseInt(storedIdCounter, 10);
    } else {
        // Initialiser idCounter si non présent
        idCounter = etudiants.reduce((max, e) => e.id > max ? e.id : max, 0) + 1;
    }

    const table = document.getElementById('student-table');
    table.innerHTML = ''; // Clear existing rows

    etudiants.forEach(etudiant => {
        const row = table.insertRow();
        row.insertCell(0).textContent = etudiant.id;
        row.insertCell(1).textContent = etudiant.nom;
        row.insertCell(2).textContent = etudiant.prenom;
        row.insertCell(3).textContent = etudiant.telephone;

        const actionCell = row.insertCell(4);

        // Conteneur pour les boutons
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group'; // Appliquer la classe CSS

        // Détails
        const viewButton = document.createElement('button');
        viewButton.className = 'btn btn-success';
        viewButton.textContent = 'Détails';
        viewButton.onclick = () => showStudentDetails(etudiant.id);
        buttonGroup.appendChild(viewButton);

        // Suppression
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = () => deleteStudent(etudiant.id);
        buttonGroup.appendChild(deleteButton);

        // Ajouter le groupe de boutons à la cellule d'action
        actionCell.appendChild(buttonGroup);
    });
}

// Ajouter un nouvel étudiant
function ajouterEtudiant() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;
    const adresse = document.getElementById('adresse').value;
    const dateNaissance = document.getElementById('date_naissance').value;

    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    successMessage.classList.add('d-none');
    errorMessage.classList.add('d-none');

    // Validation des champs du formulaire
    if (!nom || !prenom || telephone.length != 8 || !email || !adresse || !dateNaissance) {
        errorMessage.classList.remove('d-none');
        errorMessage.textContent = 'Veuillez remplir tous les champs correctement.';
        return;
    }

    // Vérifier si l'adresse e-mail existe déjà
    if (etudiants.some(e => e.email === email)) {
        errorMessage.classList.remove('d-none');
        errorMessage.textContent = 'Cet e-mail est déjà utilisé ! Veuillez en choisir un autre.';
        return;
    }

    // Création de l'objet étudiant
    const etudiant = {
        id: getNextId(),
        nom,
        prenom,
        telephone,
        email,
        adresse,
        dateNaissance
    };

    etudiants.push(etudiant);
    saveStudents();

    showTable();
    successMessage.classList.remove('d-none');
    successMessage.textContent = 'L\'étudiant a été créé avec succès.';
    document.getElementById('student-form').reset();
}

// Fonction pour obtenir le prochain ID unique
function getNextId() {
    // Trouver le plus grand id existant
    const maxId = etudiants.reduce((max, e) => e.id > max ? e.id : max, 0);
    return maxId + 1; // Prochain id
}

// Supprimer un étudiant
function deleteStudent(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
        etudiants = etudiants.filter(e => e.id !== id);
        saveStudents();
        showTable();
    }
}

// Afficher les détails d'un étudiant dans une fenêtre modale
function showStudentDetails(id) {
    const etudiant = etudiants.find(e => e.id === id);
    if (etudiant) {
        const modal = new bootstrap.Modal(document.getElementById('studentModal'));
        const modalBody = document.querySelector('#studentModal .modal-body');
        const template = document.getElementById('studentDetailsTemplate').content.cloneNode(true);

        template.querySelector('.student-id').textContent = etudiant.id;
        template.querySelector('.student-nom').textContent = etudiant.nom;
        template.querySelector('.student-prenom').textContent = etudiant.prenom;
        template.querySelector('.student-telephone').textContent = etudiant.telephone;
        template.querySelector('.student-email').textContent = etudiant.email;
        template.querySelector('.student-adresse').textContent = etudiant.adresse;
        template.querySelector('.student-date-naissance').textContent = etudiant.dateNaissance;

        modalBody.innerHTML = '';
        modalBody.appendChild(template);

        modal.show();
    }
}

// Charger les étudiants depuis le localStorage lorsque le DOM est prêt
document.addEventListener("DOMContentLoaded", function () {
    loadStudents(); // Charger les étudiants depuis le localStorage
});
