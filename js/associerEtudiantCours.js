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
    identifiant: idCounter + 1,
    idEtudiant: parseInt(studentId),
    idCours: parseInt(selectedCoursId),
  };
  console.log("Infos", newRegister);
  console.log("Compteur", etudiantCours);

  etudiantCours.push(newRegister);
  localStorage.setItem("ListEtudiantCours", JSON.stringify(etudiantCours));
}
