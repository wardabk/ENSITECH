function loadMenu(path) {
  const connectedUser = JSON.parse(localStorage.getItem('connectedUser')); 
 // console.log("dd", connectedUser);
  if(connectedUser) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path.cssFile;
  document.head.appendChild(link);
  var menuContainer = document.createElement("div");
  var menuContent = `
           <header id="header"class="menu_theme header fixed-top d-flex align-items-center">
            <!-- Start Logo div -->
            <div class="d-flex align-items-center justify-content-between">
                <a href="index.html" class="logo d-flex align-items-center">
                <img src=${path.logo} alt="">
                <span class="d-none d-lg-block">Ensitech</span>
                </a>
                <i class="fa-solid fa-bars toggle-sidebar-btn"></i>
            </div>
            <!-- End Logo div -->

            <!-- Start nav Bar -->
            <nav class="header-nav ms-auto">
            <ul class="d-flex align-items-center">
                <li class="nav-item dropdown pe-3">

                <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img src=${path.avatar} alt="Profile" class="rounded-circle">
                    <span class="d-none d-md-block dropdown-toggle ps-2">${connectedUser.prenom[0]}.${connectedUser.nom}</span>
                </a><!-- End Profile Iamge Icon -->
            <!-- Start Profile -->
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li class="dropdown-header">
                    <h6>${connectedUser.prenom} ${connectedUser.nom}</h6>
                    <span>${connectedUser.fonction}</span>
                    </li>
                    <li>
                    <hr class="dropdown-divider">
                    </li>
                    <li>        
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <i class="fa-solid fa-user"></i>
                        <span>Mon Profil</span>
                    </a>
                    </li>
                    <li>
                    <hr class="dropdown-divider">
                    </li>

                    <li id="signoutButton">
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <span>Déconnexion</span>
                    </a>
                    </li>

                </ul><!-- End Profile -->
                </li>
            </ul>
                </nav>
            <!-- End nav Bar -->

            <!--Start Side bar-->
            <aside id="sidebar" class="sidebar">
            <ul class="sidebar-nav" id="sidebar-nav">
${connectedUser.fonction === "Directeur" ? (
                `<li class="nav-item">
                <a class="nav-link " href=${path.homePage}>
                    <i class="fa-solid fa-house"></i>
                    <span>Dashboard</span>
                </a>
                </li>`
                ):``}
                <li class="nav-item">
                <a class="nav-link " href=${path.etudiantPage}>
                   <i class="fa-solid fa-graduation-cap"></i>
                    <span>Etudiant</span>
                </a>
                </li>
                 <li class="nav-item">
                <a class="nav-link " href=${path.enseignantPage}>
                  <i class="fa-solid fa-users"></i>
                    <span>Enseignant</span>
                </a>
                </li>
                <li class="nav-item">
                <a class="nav-link " href=${path.coursPage}>
                    <i class="fa-solid fa-book"></i>
                    <span>Cours</span>
                </a>
                </li>
                 <li class="nav-item">
                <a class="nav-link " href=${path.notePage}>
                  <i class="fa-solid fa-file-signature"></i>
                    <span>Note</span>
                </a>
                </li>
            </aside>
            <!--End Side bar-->
            </header>
        `;
  menuContainer.innerHTML = menuContent;
  document.body.insertAdjacentElement("afterbegin", menuContainer);

  } else {
    window.location.href = "../signin/index.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  /* const selectedSidebarItem = localStorage.getItem('selectedSidebarItem');
  if (selectedSidebarItem) {
    const selectedItem = document.querySelector(`.sidebar-item[data-id="${selectedSidebarItem}"]`);
    if (selectedItem) {
      selectedItem.classList.add('selected');
    }
  } */

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };
  // console.log("fff")

  if (select(".toggle-sidebar-btn")) {
    on("click", ".toggle-sidebar-btn", function (e) {
      select("body").classList.toggle("toggle-sidebar");
    });
  }

  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);


    // Chargement du Footer
    function loadFooter() {
      fetch('src/components/footer/index.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('tableContainer').innerHTML = data;
          // document.getElementById('FormComponent').addEventListener('submit', addStudent);
        });
    }
    //loadFooter()
   /*  document.querySelectorAll('.nav-link').forEach(item => {
      item.addEventListener('click', function() {
        console.log("item clicked");
        document.querySelectorAll('.nav-link').forEach(i => i.classList.remove('selected'));
        this.classList.add('selected');
        localStorage.setItem('selectedSidebarItem', this.getAttribute('data-id'));
      });
     
    });*/
    
});
