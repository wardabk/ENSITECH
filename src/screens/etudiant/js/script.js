/* let etudiants1 = JSON.parse(localStorage.getItem("ListEtudiant"));
let etudiants = etudiants1.map((i) => {
  const item = {
    ...i,
    id: i.identifiant,
  };
  return item;
}); */
let etudiants = JSON.parse(localStorage.getItem("etudiants"));
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
    idCounter = etudiants.reduce((maxId, e) => Math.max(maxId, e.id), 0) + 1;
    displayStudents(etudiants);
  } else {
    etudiants = []; // Initialiser une liste vide si aucun étudiant n'est stocké
  }
}

// Afficher les étudiants dans le tableau
function displayStudents(students) {
  const table = document.getElementById("student-table");
  if (table) {
    table.innerHTML = ""; // Effacer les lignes existantes

    students.forEach((etudiant) => {
      const row = table.insertRow();
      row.setAttribute("data-id", etudiant.id);
      row.insertCell(0).textContent = etudiant.id;
      row.insertCell(1).textContent = etudiant.nom;
      row.insertCell(2).textContent = etudiant.prenom;
      row.insertCell(3).textContent = etudiant.telephone;

      const actionCell = row.insertCell(4);

      // Créer le bouton Détails uniquement
      const viewButton = document.createElement("button");
      viewButton.className = "btn btn-success";
      viewButton.textContent = "Détails";
      viewButton.onclick = () => showStudentDetails(etudiant.id);
      actionCell.appendChild(viewButton);
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
  if (
    !nom ||
    !prenom ||
    telephone.length != 8 ||
    !email ||
    !adresse ||
    !dateNaissance
  ) {
    errorMessage.classList.remove("d-none");
    errorMessage.textContent = "Veuillez remplir tous les champs correctement.";
    return;
  }

  // Vérifier si l'adresse e-mail existe déjà
  if (etudiants.some((e) => e.email === email)) {
    errorMessage.classList.remove("d-none");
    errorMessage.textContent =
      "Cet e-mail est déjà utilisé ! Veuillez en choisir un autre.";
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
  saveStudents();

  // Ajouter directement le nouvel étudiant dans le tableau sans recharger la page
  addStudentToTable(etudiant);

  console.log("Étudiants après ajout:", etudiants);

  successMessage.classList.remove("d-none");
  successMessage.textContent = "L'étudiant a été créé avec succès.";
  document.getElementById("student-form").reset();

  // Afficher la liste des étudiants
  showTable();
}

// Fonction pour ajouter un étudiant au tableau HTML
function addStudentToTable(etudiant) {
  const table = document.getElementById("student-table");
  const row = table.insertRow();

  row.setAttribute("data-id", etudiant.id);
  row.insertCell(0).textContent = etudiant.id;
  row.insertCell(1).textContent = etudiant.nom;
  row.insertCell(2).textContent = etudiant.prenom;
  row.insertCell(3).textContent = etudiant.telephone;

  const actionCell = row.insertCell(4);

  // Créer le bouton Détails uniquement
  const viewButton = document.createElement("button");
  viewButton.className = "btn btn-success";
  viewButton.textContent = "Détails";
  viewButton.onclick = () => showStudentDetails(etudiant.id);
  actionCell.appendChild(viewButton);
}

// Fonction de recherche
function rechercherEtudiants() {
  const searchTerm = document.getElementById("search").value.toLowerCase();

  // Filtrer les étudiants en fonction du terme de recherche
  const filteredStudents = etudiants.filter((etudiant) => {
    return (
      etudiant.nom.toLowerCase().includes(searchTerm) ||
      etudiant.prenom.toLowerCase().includes(searchTerm) ||
      etudiant.telephone.includes(searchTerm)
    );
  });

  // Afficher les résultats filtrés
  displayStudents(filteredStudents);

  // Afficher un message si aucun résultat trouvé
  document.getElementById("no-results-message").style.display =
    filteredStudents.length === 0 ? "block" : "none";
}

// Afficher les détails d'un étudiant
function showStudentDetails(id) {
  const etudiant = etudiants.find((e) => e.id === id);
  if (etudiant) {
    const modal = new bootstrap.Modal(document.getElementById("studentModal"));
    const modalBody = document.querySelector("#studentModal .modal-body");

    const template = document
      .getElementById("studentDetailsTemplate")
      .content.cloneNode(true);
    template.querySelector(".student-id").textContent = etudiant.id;
    template.querySelector(".student-nom").textContent = etudiant.nom;
    template.querySelector(".student-prenom").textContent = etudiant.prenom;
    template.querySelector(".student-telephone").textContent =
      etudiant.telephone;
    template.querySelector(".student-email").textContent = etudiant.email;
    template.querySelector(".student-adresse").textContent = etudiant.adresse;
    template.querySelector(".student-date-naissance").textContent =
      etudiant.dateNaissance;

    // Ajouter les cours associés
    const coursSection = document.createElement("p");
    coursSection.innerHTML = "<strong>Cours Associés:</strong> ";

    const AllCours = JSON.parse(localStorage.getItem("ListCours"));
    const etudiantCours = JSON.parse(localStorage.getItem("ListEtudiantCours"));
    const coursAssocie = etudiantCours.filter(
      (i) => i.idEtudiant === etudiant.id
    );
    console.log("Cours", coursAssocie);
    const coursNom = coursAssocie
      .map((e) => {
        //e.idEtudiant === etudiant.id;
        const name = AllCours.find((i) => i.identifiant === e.idCours);
        const item = { cours: name?.theme ?? "" };
        return item;
      })
      .map((e) => e.cours);
    coursSection.innerHTML += coursNom.join(",");
    const studentCours = coursNom.join(",");

    template.querySelector(".student-cours-associe").textContent = studentCours;
    console.log("Nom du cours", studentCours);
    modalBody.innerHTML = "";
    modalBody.appendChild(template);

    // Ajout de l'ID sur les boutons Modifier et Supprimer
    document
      .querySelector("#studentModal .btn-info")
      .setAttribute("data-id", id);
    document
      .querySelector("#studentModal .btn-danger")
      .setAttribute("data-id", id);

    document.querySelector("#studentModal .btn-warning").onclick = function () {
      window.open(`associerCours.html?id=${id}`, "width=600,height=400");
    };
    modal.show();
  }
}

// Fonction pour modifier un étudiant depuis le modal
function modifierEtudiant() {
  const id = document
    .querySelector("#studentModal .btn-info")
    .getAttribute("data-id");
  if (id) {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("studentModal")
    );
    modal.hide(); // Fermer le modal des détails

    editStudent(parseInt(id, 10));
  }
}

// Modifier les informations d'un étudiant
function editStudent(id) {
  const student = etudiants.find((etudiant) => etudiant.id === id);
  if (!student) return;
console.log("Mon id", id)
  // Remplir le formulaire avec les informations de l'étudiant
  document.getElementById("nom").value = student.nom;
  document.getElementById("prenom").value = student.prenom;
  document.getElementById("telephone").value = student.telephone;
  document.getElementById("email").value = student.email;
  document.getElementById("adresse").value = student.adresse;
  document.getElementById("date_naissance").value = student.dateNaissance;

  showForm(); // Afficher le formulaire de modification

  // Changer le texte du bouton de "Ajouter" à "Modifier"
  const submitButton = document.querySelector(
    "#student-form button[type='button']"
  );
  submitButton.textContent = "Modifier";

  // Réassigner l'événement onclick au bouton pour qu'il mette à jour l'étudiant
  submitButton.onclick = function () {
    student.nom = document.getElementById("nom").value;
    student.prenom = document.getElementById("prenom").value;
    student.telephone = document.getElementById("telephone").value;
    student.email = document.getElementById("email").value;
    student.adresse = document.getElementById("adresse").value;
    student.dateNaissance = document.getElementById("date_naissance").value;

    saveStudents(); // Sauvegarder les modifications dans le localStorage

    const row = document.querySelector(`#student-table tr[data-id="${id}"]`);
    row.cells[1].textContent = student.nom;
    row.cells[2].textContent = student.prenom;
    row.cells[3].textContent = student.telephone;

    showTable(); // Afficher la liste des étudiants
    document.getElementById("student-form").reset();
    submitButton.textContent = "Ajouter";
  };
}

// Fonction pour supprimer un étudiant depuis le modal
function supprimerEtudiant() {
  const id = document
    .querySelector("#studentModal .btn-danger")
    .getAttribute("data-id");
  if (id) {
    deleteStudent(parseInt(id, 10));
  }
}

// Supprimer un étudiant
function deleteStudent(id) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) return;

  etudiants = etudiants.filter((e) => e.id !== id);
  saveStudents();
  loadStudents(); // Recharger la liste pour refléter la suppression
}

// Initialiser les étudiants et la recherche
document.addEventListener("DOMContentLoaded", function () {
  loadStudents();

  // Ajouter l'événement de recherche
  document
    .getElementById("search")
    .addEventListener("input", rechercherEtudiants);
});

// Association étudiant / cours

// Récupérer l'ID de l'étudiant à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get("id");

// Charger les détails de l'étudiant et les cours
document.addEventListener("DOMContentLoaded", function () {
  const etudiants = JSON.parse(localStorage.getItem("etudiants"));
  const etudiant = etudiants.find((e) => e.id == studentId);
  const studentInfoDiv = document.getElementById("student-info");
  if (etudiant) {
    studentInfoDiv.innerHTML = `
              <p><strong>ID:</strong> ${etudiant.id}</p>
              <p><strong>Nom:</strong> ${etudiant.nom}</p>
              <p><strong>Prénom:</strong> ${etudiant.prenom}</p>
              <p><strong>Téléphone:</strong> ${etudiant.telephone}</p>
              <p><strong>Email:</strong> ${etudiant.email}</p>
          `;
  }

  // Charger les cours dans la liste déroulante
  const AllCours = JSON.parse(localStorage.getItem("ListCours"));
  const coursSelect = document.getElementById("cours");
  if (coursSelect) {
    AllCours.forEach((cours) => {
      const option = document.createElement("option");
      option.value = cours.identifiant;
      option.textContent = `${cours.theme} - ${cours.nbreHeure} heures`;
      //console.log("L'option de choix", option);
      coursSelect.appendChild(option);
    });
  }
  //console.log("Tous les cours", coursSelect);
});

// Fonction pour associer un cours à un étudiant
function associerCours() {
  const selectedCoursId = document.getElementById("cours").value;
  const etudiantCours = JSON.parse(localStorage.getItem("ListEtudiantCours"));
  //const idCounter = Math.max(...etudiantCours.map((i) => i.id));
  const idCounter = Math.max(...etudiantCours.map((i) => i.identifiant));
  const newRegister = {
    identifiant: idCounter,
    idEtudiant: parseInt(studentId),
    idCours: parseInt(selectedCoursId),
  };
  console.log("Infos", newRegister);

  // etudiantCours.push(newRegister);
  // localStorage.setItem("ListEtudiantCours", JSON.stringify(etudiantCours));
}
