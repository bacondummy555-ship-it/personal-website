/* =========================================================
   JL PERSONAL WEBSITE
========================================================= */

const GITHUB_USERNAME = "bacondummy555-ship-it";

/* =========================================================
   ELEMENTS
========================================================= */

const header =
    document.getElementById("header");

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");

const navLinkElements =
    document.querySelectorAll(".nav-link");

const scrollProgress =
    document.getElementById("scrollProgress");

const backToTop =
    document.getElementById("backToTop");

const cursorGlow =
    document.getElementById("cursorGlow");

const typingText =
    document.getElementById("typingText");

/* =========================================================
   CURRENT YEAR
========================================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

/* =========================================================
   MOBILE MENU
========================================================= */

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    document.body.classList.toggle("menu-open");

    const icon =
        menuButton.querySelector("i");

    if (navLinks.classList.contains("open")) {

        icon.className =
            "fa-solid fa-xmark";

    } else {

        icon.className =
            "fa-solid fa-bars";

    }

});

navLinkElements.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        document.body.classList.remove("menu-open");

        const icon =
            menuButton.querySelector("i");

        icon.className =
            "fa-solid fa-bars";

    });

});

/* =========================================================
   SCROLL
========================================================= */

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width =
        `${progress}%`;

    if (scrollTop > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

    if (scrollTop > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

    updateActiveNavigation();

});

/* =========================================================
   BACK TO TOP
========================================================= */

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    const sections =
        document.querySelectorAll("section[id]");

    let currentSection =
        "home";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });

    navLinkElements.forEach((link) => {

        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href");

        if (
            linkTarget ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

/* =========================================================
   CURSOR GLOW
========================================================= */

if (cursorGlow) {

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;

    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        }
    );

    function animateCursorGlow() {

        glowX +=
            (mouseX - glowX) * 0.12;

        glowY +=
            (mouseY - glowY) * 0.12;

        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;

        requestAnimationFrame(
            animateCursorGlow
        );

    }

    animateCursorGlow();

}

/* =========================================================
   TYPING EFFECT
========================================================= */

const typingWords = [

    "modern websites.",
    "interactive experiences.",
    "creative projects.",
    "digital ideas.",
    "cool things."

];

let typingWordIndex = 0;
let typingLetterIndex = 0;

let typingDeleting = false;

function typingEffect() {

    const currentWord =
        typingWords[typingWordIndex];

    if (!typingDeleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                typingLetterIndex + 1
            );

        typingLetterIndex++;

        if (
            typingLetterIndex ===
            currentWord.length
        ) {

            typingDeleting =
                true;

            setTimeout(
                typingEffect,
                1500
            );

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                typingLetterIndex - 1
            );

        typingLetterIndex--;

        if (
            typingLetterIndex === 0
        ) {

            typingDeleting =
                false;

            typingWordIndex =
                (
                    typingWordIndex + 1
                ) %
                typingWords.length;

        }

    }

    const typingSpeed =
        typingDeleting
            ? 40
            : 75;

    setTimeout(
        typingEffect,
        typingSpeed
    );

}

typingEffect();

/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    const particleContainer =
        document.getElementById("particles");

    if (!particleContainer) {
        return;
    }

    const particleCount =
        window.innerWidth < 700
            ? 18
            : 36;

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "particle";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${8 + Math.random() * 14}s`;

        particle.style.animationDelay =
            `${Math.random() * 12}s`;

        const size =
            1 + Math.random() * 2;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particleContainer.appendChild(
            particle
        );

    }

}

createParticles();

/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.13
        }
    );

revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);

/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters =
    document.querySelectorAll(
        ".stat-number"
    );

let countersStarted =
    false;

const statsGrid =
    document.querySelector(
        ".stats-grid"
    );

if (statsGrid) {

    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                if (
                    entries[0].isIntersecting &&
                    !countersStarted
                ) {

                    countersStarted =
                        true;

                    counters.forEach(
                        animateCounter
                    );

                }

            },
            {
                threshold:
                    0.35
            }
        );

    counterObserver.observe(
        statsGrid
    );

}

function animateCounter(
    counter
) {

    const target =
        Number(
            counter.dataset.target
        );

    const duration =
        1500;

    const startTime =
        performance.now();

    function updateCounter(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const easeProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );

        counter.textContent =
            Math.floor(
                target *
                easeProgress
            );

        if (
            progress < 1
        ) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target;

        }

    }

    requestAnimationFrame(
        updateCounter
    );

}

/* =========================================================
   SKILL BARS
========================================================= */

const skillBars =
    document.querySelectorAll(
        ".skill-bar span"
    );

const skillsSection =
    document.getElementById(
        "skills"
    );

let skillBarsAnimated =
    false;

if (skillsSection) {

    const skillsObserver =
        new IntersectionObserver(
            (entries) => {

                if (
                    entries[0].isIntersecting &&
                    !skillBarsAnimated
                ) {

                    skillBarsAnimated =
                        true;

                    skillBars.forEach(
                        (bar) => {

                            bar.style.width =
                                bar.dataset.width;

                        }
                    );

                }

            },
            {
                threshold:
                    0.2
            }
        );

    skillsObserver.observe(
        skillsSection
    );

}

/* =========================================================
   GITHUB PROFILE
========================================================= */

async function loadGitHubProfile() {

    try {

        const response =
            await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}`
            );

        if (!response.ok) {

            throw new Error(
                "Unable to fetch GitHub profile."
            );

        }

        const profile =
            await response.json();

        const avatar =
            document.getElementById(
                "githubAvatar"
            );

        const name =
            document.getElementById(
                "githubName"
            );

        const username =
            document.getElementById(
                "githubUsername"
            );

        const repos =
            document.getElementById(
                "githubRepos"
            );

        const followers =
            document.getElementById(
                "githubFollowers"
            );

        const following =
            document.getElementById(
                "githubFollowing"
            );

        avatar.src =
            profile.avatar_url;

        avatar.alt =
            `${profile.login} GitHub avatar`;

        name.textContent =
            profile.name ||
            profile.login;

        username.textContent =
            `@${profile.login}`;

        repos.textContent =
            profile.public_repos;

        followers.textContent =
            profile.followers;

        following.textContent =
            profile.following;

    } catch (error) {

        console.error(
            "GitHub profile error:",
            error
        );

        document.getElementById(
            "githubName"
        ).textContent =
            "GitHub unavailable";

    }

}

/* =========================================================
   GITHUB REPOSITORIES
========================================================= */

async function loadRepositories() {

    const repoGrid =
        document.getElementById(
            "repoGrid"
        );

    try {

        const response =
            await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
            );

        if (!response.ok) {

            throw new Error(
                "Unable to fetch repositories."
            );

        }

        const repositories =
            await response.json();

        repoGrid.innerHTML =
            "";

        if (
            repositories.length === 0
        ) {

            repoGrid.innerHTML =
                `
                <div class="repo-loading">
                    No public repositories found.
                </div>
                `;

            return;

        }

        repositories.forEach(
            (repository) => {

                const card =
                    document.createElement(
                        "a"
                    );

                card.className =
                    "repo-card";

                card.href =
                    repository.html_url;

                card.target =
                    "_blank";

                card.rel =
                    "noopener noreferrer";

                const description =
                    repository.description ||
                    "No description added yet.";

                const language =
                    repository.language ||
                    "Code";

                card.innerHTML =
                    `
                    <div class="repo-title">

                        <h4>
                            ${escapeHTML(repository.name)}
                        </h4>

                        <i class="fa-solid fa-arrow-up-right-from-square"></i>

                    </div>

                    <p class="repo-description">
                        ${escapeHTML(description)}
                    </p>

                    <div class="repo-footer">

                        <div class="repo-language">

                            <span class="repo-dot"></span>

                            <span>
                                ${escapeHTML(language)}
                            </span>

                        </div>

                        <div class="repo-stars">

                            <span>
                                <i class="fa-regular fa-star"></i>
                                ${repository.stargazers_count}
                            </span>

                            <span>
                                <i class="fa-solid fa-code-fork"></i>
                                ${repository.forks_count}
                            </span>

                        </div>

                    </div>
                    `;

                repoGrid.appendChild(
                    card
                );

            }
        );

    } catch (error) {

        console.error(
            "GitHub repositories error:",
            error
        );

        repoGrid.innerHTML =
            `
            <div class="repo-loading">

                <i class="fa-brands fa-github"></i>

                <span>
                    GitHub repositories could not be loaded.
                </span>

            </div>
            `;

    }

}

/* =========================================================
   SECURITY
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}

/* =========================================================
   PROJECT CARD EFFECT
========================================================= */

document.querySelectorAll(
    ".project-card, .skill-card, .repo-card"
).forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );

    }
);

/* =========================================================
   INITIAL LOAD
========================================================= */

loadGitHubProfile();

loadRepositories();

updateActiveNavigation();