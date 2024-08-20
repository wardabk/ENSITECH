function signin() {
    const connectedUser={prenom: "Oumou", nom:"Sow", fonction:"Responsable des études"}
   localStorage.setItem("connectedUser", JSON.stringify(connectedUser)); 
   window.location.href = "../home/index.html"; 

}

document.getElementById("signinButton").addEventListener("click", signin);