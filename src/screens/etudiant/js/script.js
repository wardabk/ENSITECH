
let etudiants = [];
let idCounter = 1;




function showForm() {
    document.getElementById('table-container').classList.add('d-none');
    document.getElementById('form-container').classList.remove('d-none');
    document.getElementById('success-message').classList.add('d-none'); // Masquer le message de succès lors de l'affichage du formulaire
    document.getElementById('error-message').classList.add('d-none');  // Masquer le message d'erreur lors de l'affichage du formulaire
}

function showTable() {
    document.getElementById('form-container').classList.add('d-none');
    document.getElementById('table-container').classList.remove('d-none');
    document.getElementById('success-message').classList.add('d-none'); // Masquer le message de succès lors de l'affichage du tableau
    document.getElementById('error-message').classList.add('d-none');  // Masquer le message d'erreur lors de l'affichage du tableau
}
function ajouterEtudiant() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
   
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;
    const adresse = document.getElementById('adresse').value;
    const dateNaissance = document.getElementById('date_naissance').value;
   
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Réinitialiser les messages
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
        id: idCounter++,
        nom,
        prenom,
        telephone,
        email,
        adresse,
        dateNaissance,
        
    };

    etudiants.push(etudiant);

    // Afficher le tableau avec les données
    const table = document.getElementById('student-table');
    const row = table.insertRow();
    row.insertCell(0).textContent = etudiant.id;
    row.insertCell(1).textContent = etudiant.nom;
    row.insertCell(2).textContent = etudiant.prenom;
    row.insertCell(3).textContent = etudiant.telephone;

    // Créer une cellule pour le bouton "Voir"
    const actionCell = row.insertCell(4);
    const viewButton = document.createElement('button');
    viewButton.className = 'btn btn-primary';
    viewButton.textContent = 'Voir';
    viewButton.onclick = () => showStudentDetails(etudiant.id);
    actionCell.appendChild(viewButton);

    // Cacher le formulaire et afficher le tableau
    showTable();
    successMessage.classList.remove('d-none');
    successMessage.textContent = 'L\'étudiant a été créé avec succès.';

    // Réinitialiser les champs du formulaire
    document.getElementById('student-form').reset();
}
function showStudentDetails(id) {
  const etudiant = etudiants.find(e => e.id === id);
  if (etudiant) {
      // Sélectionner la modale et le modèle
      const modal = document.getElementById('studentModal');
      const modalBody = modal.querySelector('.modal-body');
      const template = document.getElementById('studentDetailsTemplate').content.cloneNode(true);

      // Mettre à jour le modèle avec les données de l'étudiant
      template.querySelector('.student-id').textContent = etudiant.id;
      template.querySelector('.student-nom').textContent = etudiant.nom;
      template.querySelector('.student-prenom').textContent = etudiant.prenom;
      template.querySelector('.student-telephone').textContent = etudiant.telephone;
      template.querySelector('.student-email').textContent = etudiant.email;
      template.querySelector('.student-adresse').textContent = etudiant.adresse;
      template.querySelector('.student-date-naissance').textContent = etudiant.dateNaissance;

      // Insérer le modèle mis à jour dans la modale
      modalBody.innerHTML = '';
      modalBody.appendChild(template);

      // Afficher la modale
      modal.style.display = 'block';
  }
}

// Fonction pour masquer la modale des détails de l'étudiant
function hideStudentDetails() {
  const modal = document.getElementById('studentModal');
  if (modal) {
      modal.style.display = 'none';
  }
}