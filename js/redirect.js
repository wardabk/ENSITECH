function checkUserConnection() {
    const connectedUser = localStorage.getItem('connectedUser'); 

    if (connectedUser) {
        window.location.href = "src/screens/home/index.html"; 
    } else {
       
        window.location.href = "src/screens/signin/index.html";
    }
}

// Call the function on page load
checkUserConnection();