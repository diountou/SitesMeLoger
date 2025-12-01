
// Fonction d'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  // Gestion des boutons de la galerie
  setupGalleryButtons();
  
  // Animation au défilement
  setupScrollAnimations();
  
  // Gestion du menu responsive
  setupMobileMenu();
  
  // Gestion de la connexion utilisateur
  setupLoginModal();
});

/********** FONCTIONS PRINCIPALES **********/

// Configuration des boutons de la galerie
function setupGalleryButtons() {
  const galleryButtons = document.querySelectorAll('.gallery-btn');
  
  galleryButtons.forEach(button => {
    button.addEventListener('click', function() {
      const propertyId = this.getAttribute('data-id');
      const detailsElement = document.getElementById(`details-${propertyId}`);
      
      // Basculer l'affichage des détails
      if (detailsElement.style.display === 'block') {
        detailsElement.style.display = 'none';
        this.textContent = 'Voir détails';
      } else {
        // Fermer tous les autres détails ouverts
        document.querySelectorAll('.gallery-details').forEach(detail => {
          detail.style.display = 'none';
        });
        
        // Réinitialiser tous les boutons
        document.querySelectorAll('.gallery-btn').forEach(btn => {
          btn.textContent = 'Voir détails';
        });
        
        // Ouvrir les détails sélectionnés
        detailsElement.style.display = 'block';
        this.textContent = 'Masquer détails';
        
        // Faire défiler jusqu'aux détails pour les mobiles
        if (window.innerWidth < 768) {
          detailsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });
}

// Configuration des animations au défilement
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Éléments à animer
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
}

// Configuration du menu mobile
function setupMobileMenu() {
  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  document.querySelector('nav').prepend(menuToggle);
  
  const navList = document.querySelector('nav ul');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navList.classList.toggle('active');
  });
  
  // Fermer le menu quand un lien est cliqué
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navList.classList.remove('active');
    });
  });
}

// Configuration de la modale de connexion
function setupLoginModal() {
  const loginBtn = document.querySelector('.btn-login');
  const modal = document.createElement('div');
  modal.className = 'login-modal';
  modal.innerHTML = 
  document.body.appendChild(modal);
  
  // Gestion de l'affichage de la modale
  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
  });
  
  // Fermeture de la modale
  modal.querySelector('.close-modal').addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Fermeture quand on clique en dehors
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Gestion du formulaire
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Ici, vous ajouteriez votre logique de connexion réelle
    console.log('Tentative de connexion avec:', email, password);
    
    // Simulation de connexion réussie
    setTimeout(() => {
      alert('Connexion réussie !');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      loginBtn.textContent = 'Mon compte';
    }, 1000);
  });
}














// Gestion des rôles et affichage
let currentUser = null;

// Fonction pour montrer/cacher les éléments selon le rôle
function updateUI() {
  const publierLink = document.querySelector('a[href="publier.html"]').parentElement;
  
  if (currentUser === 'admin') {
    publierLink.style.display = 'block';
    // Autres éléments spécifiques à l'admin si nécessaire
  } else if (currentUser === 'user') {
    publierLink.style.display = 'none';
  } else {
    // Non connecté
    publierLink.style.display = 'none';
  }
}

//  Gestion des formulaires de 
 connexiondocument.addEventListener('DOMContentLoaded', () => {
  setupGalleryButtons();
  setupScrollAnimations();
  setupMobileMenu();
  setupLoginModal();
  setupRoleManagement();
});

/********** GESTION DES GALERIES **********/
function setupGalleryButtons() {
  const galleryButtons = document.querySelectorAll('.gallery-btn');

  galleryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const target = document.getElementById(`details-${id}`);
      if (!target) return;

      // Masquer tous les détails
      document.querySelectorAll('.gallery-details').forEach(d => d.style.display = 'none');
      document.querySelectorAll('.gallery-btn').forEach(b => b.textContent = 'Voir détails');

      // Toggle sélectionné
      if (target.style.display === 'block') {
        target.style.display = 'none';
        button.textContent = 'Voir détails';
      } else {
        target.style.display = 'block';
        button.textContent = 'Masquer détails';

        if (window.innerWidth < 768) {
          target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });
}

/********** ANIMATIONS AU DÉFILEMENT **********/
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
}

/********** MENU MOBILE **********/
function setupMobileMenu() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  nav.prepend(menuToggle);

  const navList = nav.querySelector('ul');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navList.classList.toggle('active');
  });

  navList.querySelectorAll('li a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navList.classList.remove('active');
    });
  });
}

/********** MODALE DE CONNEXION **********/
function setupLoginModal() {
  const loginBtn = document.querySelector('.btn-login');
  if (!loginBtn) return;

  // Création de la modale
  const modal = document.createElement('div');
  modal.className = 'login-modal';
  modal.id = 'login-modal';
  modal.innerHTML = 

  document.body.appendChild(modal);

  // Ouvrir la modale
  loginBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  // Fermer la modale
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Onglets connexion
  modal.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      modal.querySelectorAll('.login-form').forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

/********** GESTION DES ROLES UTILISATEUR **********/
function setupRoleManagement() {
  let currentUser = null;

  const publierLink = document.querySelector('a[href="publier.html"]')?.parentElement;
  if (publierLink) publierLink.style.display = 'none';

  const updateUI = () => {
    if (!publierLink) return;

    if (currentUser === 'admin') {
      publierLink.style.display = 'block';
    } else {
      publierLink.style.display = 'none';
    }
  };

  document.addEventListener('submit', e => {
    if (e.target.matches('#user-login-form')) {
      e.preventDefault();
      const email = document.getElementById('user-email')?.value;
      const password = document.getElementById('user-password')?.value;
      if (email && password) {
        currentUser = 'user';
        updateUI();
        document.getElementById('login-modal').style.display = 'none';
        alert('Connexion utilisateur réussie!');
      }
    }

    if (e.target.matches('#admin-login-form')) {
      e.preventDefault();
      const email = document.getElementById('admin-email')?.value;
      const password = document.getElementById('admin-password')?.value;
      if (email === 'admin@meloger.com' && password === 'admin123') {
        currentUser = 'admin';
        updateUI();
        document.getElementById('login-modal').style.display = 'none';
        alert('Connexion administrateur réussie!');
      } else {
        alert('Identifiants admin incorrects');
      }
    }
  });
}

