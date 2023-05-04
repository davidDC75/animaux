const btnHamburger = document.getElementById('button-hamburger-icon');
const navbar = document.getElementById('navbar');

btnHamburger.addEventListener('click', () => {
    navbar.classList.toggle('navbarToggle');
});