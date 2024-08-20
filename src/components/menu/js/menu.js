function loadMenu(path) {
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
                    <span class="d-none d-md-block dropdown-toggle ps-2">D. Gassama</span>
                </a><!-- End Profile Iamge Icon -->
            <!-- Start Profile -->
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li class="dropdown-header">
                    <h6>Djimo Gassama</h6>
                    <span>Responsable des etudes</span>
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

                <li class="nav-item">
                <a class="nav-link " href=${path.homePage}>
                    <i class="fa-solid fa-house"></i>
                    <span>Acceuil</span>
                </a>
                </li>
                <li class="nav-item">
                <a class="nav-link " href=${path.etudiantPage}>
                   <i class="fa-solid fa-graduation-cap"></i>
                    <span>Etudiant</span>
                </a>
                </li>
                <li class="nav-item">
                <a class="nav-link " href=${path.coursPage}>
                    <i class="fa-solid fa-book"></i>
                    <span>Cours</span>
                </a>
                </li>
                 <li class="nav-item">
<<<<<<< HEAD
                <a class="nav-link " href=${path.etudiantPage}>
                    <i class="fa-solid fa-book"></i>
                    <span>Etudiant</span>
=======
                <a class="nav-link " href=${path.enseignantPage}>
                  <i class="fa-solid fa-users"></i>
                    <span>Enseignant</span>
>>>>>>> 3fb439fe2b5dd7c06533bd1a58f0288742bb82cc
                </a>
                </li>
            </aside>
            <!--End Side bar-->
            </header>
        `;
  menuContainer.innerHTML = menuContent;
  document.body.insertAdjacentElement("afterbegin", menuContainer);
}

document.addEventListener("DOMContentLoaded", function () {
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
});
