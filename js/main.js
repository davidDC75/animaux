/* Code pour afficher la navbar */
const navbarContainer = document.getElementById('navbar-container');

function returnNavbar() {
    return `        <span id="hamburger-icon">
    <a id="button-hamburger-icon">
        <img src="./images/nav/hamburger-icon-w64-h64.png" alt="">
    </a>
</span>
<nav id="navbar">
    <div id="logo-container">
        <img class="logo-sarah" src="./images/nav/Sarah_logo.jpg" alt="Sarah, la petite chatte">
    </div>
    <ul>
        <li>
            <a href="./index.html" class="button button--piyo">
                <div class="button__wrapper">
                    <span class="button__text">accueil</span>
                </div>

                <div class="characterBox">
                    <div class="character wakeup">
                        <div class="character__face"></div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="./lily.html" class="button button--piyo">
                <div class="button__wrapper">
                    <span class="button__text">lily</span>
                </div>

                <div class="characterBox">
                    <div class="character wakeup">
                        <div class="character__face"></div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="./fantomas.html" class="button button--piyo">
                <div class="button__wrapper">
                    <span class="button__text">fantomas</span>
                </div>

                <div class="characterBox">
                    <div class="character wakeup">
                        <div class="character__face"></div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="./theo.html" class="button button--piyo">
                <div class="button__wrapper">
                    <span class="button__text">theo</span>
                </div>

                <div class="characterBox">
                    <div class="character wakeup">
                        <div class="character__face"></div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="./tara.html" class="button button--piyo">
                <div class="button__wrapper">
                    <span class="button__text">tara</span>
                </div>

                <div class="characterBox">
                    <div class="character wakeup">
                        <div class="character__face"></div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="./jack.html" class="button button--piyo">
                <div class="button__wrapper">
                    <span class="button__text">jack</span>
                </div>

                <div class="characterBox">
                    <div class="character wakeup">
                        <div class="character__face"></div>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</nav>`;
}

navbarContainer.innerHTML=returnNavbar();

/* Code pour gérer le comportement de la navbar pour smarphone */
const btnHamburger = document.getElementById('button-hamburger-icon');
const navbar = document.getElementById('navbar');

btnHamburger.addEventListener('click', () => {
    navbar.classList.toggle('navbarToggle');
});