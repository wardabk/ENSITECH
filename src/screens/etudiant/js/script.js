let etudiants = [];
let idCounter = 1;

// Afficher le formulaire d'ajout d'étudiant
function showForm() {
  document.getElementById("table-container").classList.add("d-none");
  document.getElementById("form-container").classList.remove("d-none");
  document.getElementById("success-message").classList.add("d-none");
  document.getElementById("error-message").classList.add("d-none");
}

// Afficher le tableau des étudiants
function showTable() {
  document.getElementById("form-container").classList.add("d-none");
  document.getElementById("table-container").classList.remove("d-none");
  document.getElementById("success-message").classList.add("d-none");
  document.getElementById("error-message").classList.add("d-none");
}

// Sauvegarder les étudiants dans le localStorage
function saveStudents() {
  localStorage.setItem("etudiants", JSON.stringify(etudiants));
}

// Charger les étudiants depuis le localStorage
function loadStudents() {
  const storedStudents = localStorage.getItem("etudiants");
  if (storedStudents) {
    etudiants = JSON.parse(storedStudents);

    // Trouver le plus grand ID et mettre à jour le compteur
    idCounter = etudiants.reduce((maxId, e) => Math.max(maxId, e.id), 0) + 1;

    const table = document.getElementById("student-table");
    table.innerHTML = ""; // Clear existing rows
    etudiants.forEach(etudiant => {
      const row = table.insertRow();
      row.setAttribute("data-id", etudiant.id);
      row.insertCell(0).textContent = etudiant.id;
      row.insertCell(1).textContent = etudiant.nom;
      row.insertCell(2).textContent = etudiant.prenom;
      row.insertCell(3).textContent = etudiant.telephone;

      const actionCell = row.insertCell(4);

      // Créer les boutons d'action
      const viewButton = document.createElement("button");
      viewButton.className = "btn btn-success";
      viewButton.textContent = "Détails";
      viewButton.onclick = () => showStudentDetails(etudiant.id);
      actionCell.appendChild(viewButton);

      const editButton = document.createElement("button");
      editButton.className = "btn btn-info me-2";
      editButton.textContent = "Modifier";
      editButton.onclick = () => editStudent(etudiant.id);
      actionCell.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger ml-2";
      deleteButton.textContent = "Supprimer";
      deleteButton.onclick = () => deleteStudent(etudiant.id);
      actionCell.appendChild(deleteButton);

      const associateButton = document.createElement("button");
      associateButton.className = "btn btn-warning";
      associateButton.textContent = "Associer";
      associateButton.onclick = () => associateStudent(etudiant.id);
      actionCell.appendChild(associateButton);
    });
  }
}

// Ajouter un nouvel étudiant
function ajouterEtudiant() {
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const telephone = document.getElementById("telephone").value;
  const email = document.getElementById("email").value;
  const adresse = document.getElementById("adresse").value;
  const dateNaissance = document.getElementById("date_naissance").value;

  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  successMessage.classList.add("d-none");
  errorMessage.classList.add("d-none");

  // Validation des champs du formulaire
  if (!nom || !prenom || telephone.length != 8 || !email || !adresse || !dateNaissance) {
    errorMessage.classList.remove("d-none");
    errorMessage.textContent = "Veuillez remplir tous les champs correctement.";
    return;
  }

  // Vérifier si l'adresse e-mail existe déjà
  if (etudiants.some(e => e.email === email)) {
    errorMessage.classList.remove("d-none");
    errorMessage.textContent = "Cet e-mail est déjà utilisé ! Veuillez en choisir un autre.";
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
    dateNaissance
  };

  etudiants.push(etudiant);
  saveStudents();

  console.log("Étudiants après ajout:", etudiants);

  showTable();
  successMessage.classList.remove("d-none");
  successMessage.textContent = "L'étudiant a été créé avec succès.";
  document.getElementById("student-form").reset();
}

// Afficher les détails d'un étudiant
function showStudentDetails(id) {
  const etudiant = etudiants.find(e => e.id === id);
  if (etudiant) {
    const modal = new bootstrap.Modal(document.getElementById("studentModal"));
    const modalBody = document.querySelector("#studentModal .modal-body");

    const template = document.getElementById("studentDetailsTemplate").content.cloneNode(true);
    template.querySelector(".student-id").textContent = etudiant.id;
    template.querySelector(".student-nom").textContent = etudiant.nom;
    template.querySelector(".student-prenom").textContent = etudiant.prenom;
    template.querySelector(".student-telephone").textContent = etudiant.telephone;
    template.querySelector(".student-email").textContent = etudiant.email;
    template.querySelector(".student-adresse").textContent = etudiant.adresse;
    template.querySelector(".student-date-naissance").textContent = etudiant.dateNaissance;

    modalBody.innerHTML = "";
    modalBody.appendChild(template);

    modal.show();
  }
}

// Fonctionnalité de recherche
document.querySelector("#search").addEventListener("keyup", (e) => {
    const searchLetters = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("#student-table tr");
    let hasResults = false;
  
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(" ");
      if (rowText.includes(searchLetters)) {
        row.style.display = "";
        hasResults = true; // Il y a au moins un résultat
      } else {
        row.style.display = "none";
      }
    });
  
    const errorMessage = document.querySelector("#no-results-message");
  
    // Debugging to see if error message block is reached
    console.log("Has results:", hasResults);
  
    if (!hasResults) {
      console.log("Displaying error message.");
      errorMessage.textContent = "Aucun étudiant trouvé.";
      errorMessage.style.display = "block";
    } else {
      errorMessage.style.display = "none";
    }
  });
  

// Modifier les informations d'un étudiant
function editStudent(id) {
  const student = etudiants.find(etudiant => etudiant.id === id);
  if (!student) return;

  document.getElementById("nom").value = student.nom;
  document.getElementById("prenom").value = student.prenom;
  document.getElementById("telephone").value = student.telephone;
  document.getElementById("email").value = student.email;
  document.getElementById("adresse").value = student.adresse;
  document.getElementById("date_naissance").value = student.dateNaissance;

  showForm();

  document.querySelector("#student-form button[type='button']").onclick = function() {
    student.nom = document.getElementById("nom").value;
    student.prenom = document.getElementById("prenom").value;
    student.telephone = document.getElementById("telephone").value;
    student.email = document.getElementById("email").value;
    student.adresse = document.getElementById("adresse").value;
    student.dateNaissance = document.getElementById("date_naissance").value;

    const row = document.querySelector(`#student-table tr[data-id="${id}"]`);
    row.cells[1].textContent = student.nom;
    row.cells[2].textContent = student.prenom;
    row.cells[3].textContent = student.telephone;

    showTable();
    document.getElementById("student-form").reset();
  };
}

// Supprimer un étudiant
function deleteStudent(id) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) return;

  etudiants = etudiants.filter(e => e.id !== id);
  saveStudents();
  loadStudents();
}

// Initialiser les étudiants
document.addEventListener("DOMContentLoaded", function() {
  loadStudents();
});
