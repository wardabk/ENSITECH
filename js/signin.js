const ListCours = [
    { identifiant: 1, theme: 'Réseau', nbreHeure: 8 },
    { identifiant: 2, theme: 'Conception', nbreHeure: 16 },
    { identifiant: 3, theme: 'Algorithmique', nbreHeure: 4 },

];
const ListUsers = [
    { identifiant: 1, prenom: "Warda", nom: "Boubaker", fonction: "Responsable des études", email: "warda@gmail.com", adresse: "15 avn tn",password: "12345678", telephone: "11223344", dateNaissance: "01/01/1980" },
    { identifiant: 2, prenom: "Djimo", nom: "Gassama", fonction: "Directeur", email: "djimo@gmail.com", adresse: "18 abn sn", password: "12345678",telephone: "55667788", dateNaissance: "18/03/1985" },

];

const ListEtudiant = [
    { id: 1, prenom: "Aicha", nom: "Bendjir", email: "aicha@gmail.com", adresse: "15 avn tn", telephone: "66445500", dateNaissance: "01/01/1980" },
    { id: 2, prenom: "Jean Batiste", nom: "Goumou", email: "jean@gmail.com", adresse: "15 avn tn", telephone: "66445501", dateNaissance: "01/01/1980" },
    
];
const ListEnseignant = [
    { id: 1, prenom: "Oumou", nom: "Sow", email: "oumou@gmail.com", adresse: "15 avn tn", telephone: "88445500", dateNaissance: "01/01/1980" },
    { id: 2, prenom: "Cheikh Oumar", nom: "Diakité", email: "cheikh@gmail.com", adresse: "15 avn tn", telephone: "88445501", dateNaissance: "01/01/1980" },
    
];

const ListEnseignantCours = [
    { identifiant: 1,idEnseignant: 1, idCours: 2},
    { identifiant: 2,idEnseignant: 2, idCours: 3},   
    { identifiant: 3,idEnseignant: 2, idCours: 1},   
];
const ListEtudiantCours = [
    { identifiant: 1,idEtudiant: 1, idCours: 2},
    { identifiant: 2,idEtudiant: 2, idCours: 3},   
    { identifiant: 3,idEtudiant: 2, idCours: 1},   
];
const ListNote = [
    { identifiant: 1,idEtudiant: 1, idCours: 2,idEnseignant: 1, valeur: 15},
    { identifiant: 2,idEtudiant: 2, idCours: 3,idEnseignant: 2, valeur: 12},   
    { identifiant: 3,idEtudiant: 2, idCours: 1,idEnseignant: 2, valeur: 8},   
];
function signin(email, password) {
const connectedUser= ListUsers.find((i)=>i.email == email && i.password=== password)

if(connectedUser){
    localStorage.setItem("connectedUser", JSON.stringify(connectedUser));
    localStorage.setItem("ListCours", JSON.stringify(ListCours));
    localStorage.setItem("etudiants", JSON.stringify(ListEtudiant));
    localStorage.setItem("ListEnseignant", JSON.stringify(ListEnseignant));
    localStorage.setItem("ListEnseignantCours", JSON.stringify(ListEnseignantCours));
    localStorage.setItem("ListEtudiantCours", JSON.stringify(ListEtudiantCours));
    localStorage.setItem("ListNote", JSON.stringify(ListNote));
    
    // window.location.href = "../home/index.html";
    if(connectedUser.fonction==="Directeur"){
        window.location.href = "../home/index.html";
         
        } else {
            window.location.href = "../etudiant/index.html"; 
        }
} else {
    alert("email ou mot de passe incorrect");
}
}

document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("mail").value.trim();
    const password = document.getElementById("mdp").value.trim();

    if (email === "" || password === "") {
        alert("Veuillez remplir tous les champs avant de vous connecter.");
    } else {
        signin(email, password);

    }
});
