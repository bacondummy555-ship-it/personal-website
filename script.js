// =========================================
// JL PERSONAL PORTFOLIO
// =========================================

const GITHUB_USERNAME =
    "bacondummy555-ship-it";

const GITHUB_REPOSITORY_LIMIT =
    6;


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const header =
            document.querySelector(
                ".header"
            );

        const menuButton =
            document.getElementById(
                "menuButton"
            );

        const navLinks =
            document.getElementById(
                "navLinks"
            );

        const navItems =
            document.querySelectorAll(
                ".nav-link"
            );

        const cursorGlow =
            document.getElementById(
                "cursorGlow"
            );

        const typingText =
            document.getElementById(
                "typingText"
            );

        const backTop =
            document.getElementById(
                "backTop"
            );


        // =========================================
        // HEADER
        // =========================================

        function updateHeader() {

            if (!header) {
                return;
            }

            if (window.scrollY > 20) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateHeader
        );

        updateHeader();


        // =========================================
        // MOBILE MENU
        // =========================================

        if (
            menuButton &&
            navLinks
        ) {

            menuButton.addEventListener(
                "click",
                () => {

                    navLinks.classList.toggle(
                        "open"
                    );

                    document.body.classList.toggle(
                        "menu-open"
                    );

                }
            );

        }


        navItems.forEach(
            (item) => {

                item.addEventListener(
                    "click",
                    () => {

                        if (navLinks) {

                            navLinks.classList.remove(
                                "open"
                            );

                        }

                        document.body.classList.remove(
                            "menu-open"
                        );

                    }
                );

            }
        );


        // =========================================
        // CURSOR GLOW
        // =========================================

        if (cursorGlow) {

            document.addEventListener(
                "mousemove",
                (event) => {

                    cursorGlow.style.left =
                        `${event.clientX}px`;

                    cursorGlow.style.top =
                        `${event.clientY}px`;

                    cursorGlow.style.opacity =
                        "1";

                }
            );


            document.addEventListener(
                "mouseleave",
                () => {

                    cursorGlow.style.opacity =
                        "0";

                }
            );

        }


        // =========================================
        // TYPEWRITER
        // =========================================

        const words = [

            "modern websites.",
            "creative experiences.",
            "useful applications.",
            "cool projects.",
            "the future."

        ];


        let wordIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        function typeWriter() {

            if (!typingText) {
                return;
            }


            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );


                characterIndex++;


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeWriter,
                        1600
                    );

                    return;

                }


                setTimeout(
                    typeWriter,
                    70
                );

            } else {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );


                characterIndex--;


                if (
                    characterIndex ===
                    0
                ) {

                    deleting = false;


                    wordIndex =
                        (
                            wordIndex + 1
                        ) %
                        words.length;


                    setTimeout(
                        typeWriter,
                        350
                    );

                    return;

                }


                setTimeout(
                    typeWriter,
                    35
                );

            }

        }


        typeWriter();


        // =========================================
        // REVEAL
        // =========================================

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
                    threshold: 0.12
                }

            );


        function observeRevealElements() {

            const elements =
                document.querySelectorAll(
                    ".reveal:not(.visible)"
                );


            elements.forEach(
                (element) => {

                    revealObserver.observe(
                        element
                    );

                }
            );

        }


        observeRevealElements();


        // =========================================
        // ACTIVE NAV
        // =========================================

        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        function updateNavigation() {

            let currentSection =
                "home";


            sections.forEach(
                (section) => {

                    const sectionTop =
                        section.offsetTop - 180;


                    if (
                        window.scrollY >=
                        sectionTop
                    ) {

                        currentSection =
                            section.id;

                    }

                }
            );


            navItems.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );


                    if (
                        item.getAttribute(
                            "href"
                        ) ===
                        `#${currentSection}`
                    ) {

                        item.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        window.addEventListener(
            "scroll",
            updateNavigation
        );

        updateNavigation();


        // =========================================
        // COUNTER
        // =========================================

        function animateCounter(
            element,
            target
        ) {

            if (!element) {
                return;
            }


            target =
                Number(target) || 0;


            const duration =
                1000;


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
                        elapsed /
                        duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                element.textContent =
                    Math.floor(
                        target *
                        eased
                    );


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    element.textContent =
                        target;

                }

            }


            requestAnimationFrame(
                updateCounter
            );

        }


        const statNumbers =
            document.querySelectorAll(
                "[data-count]"
            );


        const statsObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounter(
                                    entry.target,
                                    Number(
                                        entry.target.dataset.count
                                    )
                                );


                                statsObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.7
                }

            );


        statNumbers.forEach(
            (number) => {

                if (
                    number.id !==
                    "githubRepoCount"
                ) {

                    statsObserver.observe(
                        number
                    );

                }

            }
        );


        // =========================================
        // BACK TO TOP
        // =========================================

        if (backTop) {

            backTop.addEventListener(
                "click",
                () => {

                    window.scrollTo({

                        top: 0,

                        behavior:
                            "smooth"

                    });

                }
            );

        }


        // =========================================
        // GITHUB PROFILE
        // =========================================

        async function loadGitHubProfile() {

            const avatar =
                document.getElementById(
                    "githubAvatar"
                );

            const displayName =
                document.getElementById(
                    "githubDisplayName"
                );

            const username =
                document.getElementById(
                    "githubUsername"
                );

            const bio =
                document.getElementById(
                    "githubBio"
                );

            const profileRepos =
                document.getElementById(
                    "githubProfileRepos"
                );

            const followers =
                document.getElementById(
                    "githubFollowers"
                );

            const following =
                document.getElementById(
                    "githubFollowing"
                );

            const profileLink =
                document.getElementById(
                    "githubProfileLink"
                );

            const repoCount =
                document.getElementById(
                    "githubRepoCount"
                );


            try {

                const response =
                    await fetch(
                        `https://api.github.com/users/${GITHUB_USERNAME}`
                    );


                if (!response.ok) {

                    throw new Error(
                        `GitHub profile request failed: ${response.status}`
                    );

                }


                const profile =
                    await response.json();


                if (avatar) {

                    avatar.src =
                        profile.avatar_url;

                    avatar.alt =
                        `${profile.login} GitHub profile picture`;

                }


                if (displayName) {

                    displayName.textContent =
                        profile.name ||
                        profile.login;

                }


                if (username) {

                    username.textContent =
                        `@${profile.login}`;

                    username.href =
                        profile.html_url;

                }


                if (bio) {

                    bio.textContent =
                        profile.bio ||
                        "Developer building projects, learning new technologies and creating cool things.";

                }


                if (profileLink) {

                    profileLink.href =
                        profile.html_url;

                }


                animateCounter(
                    profileRepos,
                    profile.public_repos
                );


                animateCounter(
                    followers,
                    profile.followers
                );


                animateCounter(
                    following,
                    profile.following
                );


                animateCounter(
                    repoCount,
                    profile.public_repos
                );


            } catch (error) {

                console.error(
                    "GitHub profile loading failed:",
                    error
                );


                if (bio) {

                    bio.textContent =
                        "GitHub profile information is temporarily unavailable.";

                }

            }

        }


        // =========================================
        // GITHUB PROJECTS
        // =========================================

        async function loadGitHubProjects() {

            const projectsContainer =
                document.getElementById(
                    "githubProjects"
                );


            if (!projectsContainer) {
                return;
            }


            try {

                const apiURL =
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos` +
                    `?sort=updated` +
                    `&direction=desc` +
                    `&per_page=100` +
                    `&type=owner`;


                const response =
                    await fetch(
                        apiURL
                    );


                if (!response.ok) {

                    throw new Error(
                        `GitHub API returned ${response.status}`
                    );

                }


                const repositories =
                    await response.json();


                const originalRepositories =
                    repositories.filter(
                        (repo) =>
                            !repo.fork
                    );


                const featuredRepositories =
                    originalRepositories.slice(
                        0,
                        GITHUB_REPOSITORY_LIMIT
                    );


                if (
                    featuredRepositories.length ===
                    0
                ) {

                    showNoProjects(
                        projectsContainer
                    );

                    return;

                }


                projectsContainer.innerHTML =
                    featuredRepositories
                        .map(
                            (
                                repository,
                                index
                            ) =>
                                createRepositoryCard(
                                    repository,
                                    index
                                )
                        )
                        .join("");


                observeRevealElements();

                setupCardMouseEffects();


            } catch (error) {

                console.error(
                    "GitHub project loading failed:",
                    error
                );


                showGitHubError(
                    projectsContainer
                );

            }

        }


        // =========================================
        // CREATE PROJECT CARD
        // =========================================

        function createRepositoryCard(
            repository,
            index
        ) {

            const projectNumber =
                String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                );


            const name =
                formatRepositoryName(
                    repository.name
                );


            const description =
                repository.description ||
                "A project from my GitHub portfolio. Explore the repository to learn more about the code and development process.";


            const language =
                repository.language ||
                "Code";


            const stars =
                repository.stargazers_count ??
                0;


            const forks =
                repository.forks_count ??
                0;


            const updatedDate =
                formatDate(
                    repository.updated_at
                );


            const repositoryURL =
                repository.html_url;


            const liveURL =
                repository.homepage &&
                repository.homepage.trim() !== ""
                    ? repository.homepage
                    : null;


            return `

                <article class="project-card reveal">

                    <div class="project-image">

                        <div class="project-screen">

                            <span class="screen-small">
                                GITHUB REPOSITORY
                            </span>

                            <strong>
                                ${escapeHTML(
                                    shortenName(
                                        repository.name
                                    )
                                )}
                            </strong>

                            <span class="screen-blue">
                                ${projectNumber}
                            </span>

                        </div>

                    </div>


                    <div class="project-content">

                        <div class="project-top">

                            <span class="project-type">
                                GITHUB PROJECT
                            </span>

                            <span class="project-number">
                                ${projectNumber}
                            </span>

                        </div>


                        <h3>
                            ${escapeHTML(name)}
                        </h3>


                        <p>
                            ${escapeHTML(description)}
                        </p>


                        <div class="project-tech">

                            <span>
                                ${escapeHTML(language)}
                            </span>

                            <span>
                                ★ ${stars}
                            </span>

                            <span>
                                Forks ${forks}
                            </span>

                            <span>
                                Updated ${escapeHTML(updatedDate)}
                            </span>

                        </div>


                        <div class="project-links">

                            <a
                                href="${escapeAttribute(repositoryURL)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="project-link"
                            >
                                View Code ↗
                            </a>


                            ${
                                liveURL
                                    ? `
                                        <a
                                            href="${escapeAttribute(liveURL)}"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="project-link"
                                        >
                                            Live Website ↗
                                        </a>
                                    `
                                    : ""
                            }

                        </div>

                    </div>

                </article>

            `;

        }


        // =========================================
        // HELPERS
        // =========================================

        function formatRepositoryName(
            name
        ) {

            return name
                .replace(
                    /[-_]+/g,
                    " "
                )
                .replace(
                    /\b\w/g,
                    (letter) =>
                        letter.toUpperCase()
                );

        }


        function shortenName(
            name
        ) {

            const cleanName =
                name
                    .replace(
                        /[-_]+/g,
                        " "
                    )
                    .toUpperCase();


            if (
                cleanName.length <=
                15
            ) {

                return cleanName;

            }


            return (
                cleanName.substring(
                    0,
                    13
                ) +
                "..."
            );

        }


        function formatDate(
            dateString
        ) {

            if (!dateString) {

                return "Recently";

            }


            const date =
                new Date(
                    dateString
                );


            return date.toLocaleDateString(
                undefined,
                {

                    year:
                        "numeric",

                    month:
                        "short"

                }
            );

        }


        function escapeHTML(
            value
        ) {

            return String(value)
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }


        function escapeAttribute(
            value
        ) {

            return escapeHTML(
                String(value)
            );

        }


        // =========================================
        // EMPTY PROJECTS
        // =========================================

        function showNoProjects(
            container
        ) {

            container.innerHTML = `

                <article class="project-card reveal">

                    <div class="project-image">

                        <div class="project-screen">

                            <span class="screen-small">
                                GITHUB
                            </span>

                            <strong>
                                EMPTY
                            </strong>

                            <span class="screen-blue">
                                00
                            </span>

                        </div>

                    </div>


                    <div class="project-content">

                        <span class="project-type">
                            NO PROJECTS FOUND
                        </span>

                        <h3>
                            No public projects yet
                        </h3>

                        <p>
                            New public GitHub repositories
                            will automatically appear here.
                        </p>

                    </div>

                </article>

            `;


            observeRevealElements();

        }


        // =========================================
        // GITHUB ERROR
        // =========================================

        function showGitHubError(
            container
        ) {

            container.innerHTML = `

                <article class="project-card reveal">

                    <div class="project-image">

                        <div class="project-screen">

                            <span class="screen-small">
                                GITHUB
                            </span>

                            <strong>
                                OFFLINE
                            </strong>

                            <span class="screen-blue">
                                !
                            </span>

                        </div>

                    </div>


                    <div class="project-content">

                        <span class="project-type">
                            GITHUB CONNECTION
                        </span>

                        <h3>
                            Couldn't load projects
                        </h3>

                        <p>
                            GitHub may be temporarily unavailable
                            or the API request limit may have
                            been reached.
                        </p>


                        <div class="project-links">

                            <a
                                href="https://github.com/${GITHUB_USERNAME}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="project-link"
                            >
                                Open GitHub ↗
                            </a>

                        </div>

                    </div>

                </article>

            `;


            observeRevealElements();

        }


        // =========================================
        // CARD GLOW
        // =========================================

        function setupCardMouseEffects() {

            const cards =
                document.querySelectorAll(
                    ".project-card, .skill-card"
                );


            cards.forEach(
                (card) => {

                    if (
                        card.dataset.mouseEffect ===
                        "true"
                    ) {

                        return;

                    }


                    card.dataset.mouseEffect =
                        "true";


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


                            card.style.background =
                                `
                                radial-gradient(
                                    circle at ${x}px ${y}px,
                                    rgba(0, 132, 255, 0.09),
                                    rgba(4, 10, 19, 0.65) 45%
                                )
                                `;

                        }
                    );


                    card.addEventListener(
                        "mouseleave",
                        () => {

                            card.style.background =
                                "";

                        }
                    );

                }
            );

        }


        // =========================================
        // START
        // =========================================

        setupCardMouseEffects();

        loadGitHubProfile();

        loadGitHubProjects();

    }
);