const GITHUB_USERNAME = "bacondummy555-ship-it";

const GITHUB_REPOSITORY_LIMIT = 6;

const GITHUB_ACTIVITY_LIMIT = 6;

const GITHUB_CACHE_DURATION = 5 * 60 * 1000;


/* =========================================
   LOADING SCREEN
========================================= */

const loaderStartTime =
    performance.now();


window.addEventListener(
    "load",
    () => {

        const loader =
            document.getElementById(
                "siteLoader"
            );

        const progressBar =
            document.getElementById(
                "loaderProgressBar"
            );

        const percentText =
            document.getElementById(
                "loaderPercent"
            );


        if (!loader) {

            document.body.classList.remove(
                "loading"
            );

            return;

        }


        let percentage = 0;


        const progressInterval =
            setInterval(
                () => {

                    const remaining =
                        100 -
                        percentage;


                    percentage +=
                        Math.max(
                            1,
                            Math.ceil(
                                remaining *
                                0.16
                            )
                        );


                    percentage =
                        Math.min(
                            percentage,
                            100
                        );


                    if (progressBar) {

                        progressBar.style.width =
                            `${percentage}%`;

                    }


                    if (percentText) {

                        percentText.textContent =
                            `${percentage}%`;

                    }


                    if (
                        percentage >=
                        100
                    ) {

                        clearInterval(
                            progressInterval
                        );

                    }

                },
                55
            );


        const elapsed =
            performance.now() -
            loaderStartTime;


        const minimumDuration =
            1350;


        const remainingTime =
            Math.max(
                0,
                minimumDuration -
                elapsed
            );


        setTimeout(
            () => {

                if (progressBar) {

                    progressBar.style.width =
                        "100%";

                }


                if (percentText) {

                    percentText.textContent =
                        "100%";

                }


                setTimeout(
                    () => {

                        loader.classList.add(
                            "loader-hidden"
                        );


                        document.body.classList.remove(
                            "loading"
                        );

                    },
                    250
                );

            },
            remainingTime
        );

    }
);



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


        /* =========================================
           HEADER
        ========================================= */

        function updateHeader() {

            if (!header) {
                return;
            }


            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );

        }


        window.addEventListener(
            "scroll",
            updateHeader
        );


        updateHeader();


        /* =========================================
           MOBILE MENU
        ========================================= */

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

                        navLinks?.classList.remove(
                            "open"
                        );


                        document.body.classList.remove(
                            "menu-open"
                        );

                    }
                );

            }
        );


        /* =========================================
           CURSOR
        ========================================= */

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

        }


        /* =========================================
           TYPEWRITER
        ========================================= */

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


            const word =
                words[wordIndex];


            if (!deleting) {

                typingText.textContent =
                    word.substring(
                        0,
                        characterIndex + 1
                    );


                characterIndex++;


                if (
                    characterIndex ===
                    word.length
                ) {

                    deleting = true;


                    setTimeout(
                        typeWriter,
                        1500
                    );


                    return;

                }


                setTimeout(
                    typeWriter,
                    70
                );

            } else {

                characterIndex--;


                typingText.textContent =
                    word.substring(
                        0,
                        characterIndex
                    );


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
                        300
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


        /* =========================================
           REVEAL
        ========================================= */

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

            document
                .querySelectorAll(
                    ".reveal:not(.visible)"
                )
                .forEach(
                    (element) => {

                        revealObserver.observe(
                            element
                        );

                    }
                );

        }


        observeRevealElements();


        /* =========================================
           ACTIVE NAV
        ========================================= */

        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        function updateNavigation() {

            let current =
                "home";


            sections.forEach(
                (section) => {

                    if (
                        window.scrollY >=
                        section.offsetTop -
                        180
                    ) {

                        current =
                            section.id;

                    }

                }
            );


            navItems.forEach(
                (item) => {

                    item.classList.toggle(
                        "active",
                        item.getAttribute(
                            "href"
                        ) ===
                        `#${current}`
                    );

                }
            );

        }


        window.addEventListener(
            "scroll",
            updateNavigation
        );


        updateNavigation();


        /* =========================================
           COUNTER
        ========================================= */

        function animateCounter(
            element,
            target
        ) {

            if (!element) {
                return;
            }


            const start =
                performance.now();


            const duration =
                900;


            function frame(
                now
            ) {

                const progress =
                    Math.min(
                        (
                            now -
                            start
                        ) /
                        duration,
                        1
                    );


                element.textContent =
                    Math.floor(
                        target *
                        (
                            1 -
                            Math.pow(
                                1 -
                                progress,
                                3
                            )
                        )
                    );


                if (
                    progress <
                    1
                ) {

                    requestAnimationFrame(
                        frame
                    );

                }

            }


            requestAnimationFrame(
                frame
            );

        }


        /* =========================================
           GITHUB CACHE
        ========================================= */

        async function fetchGitHubCached(
            url,
            cacheKey
        ) {

            try {

                const cached =
                    localStorage.getItem(
                        cacheKey
                    );


                if (cached) {

                    const parsed =
                        JSON.parse(
                            cached
                        );


                    if (
                        Date.now() -
                        parsed.timestamp <
                        GITHUB_CACHE_DURATION
                    ) {

                        return {
                            data:
                                parsed.data,

                            cached:
                                true,

                            timestamp:
                                parsed.timestamp
                        };

                    }

                }

            } catch {}


            const response =
                await fetch(
                    url,
                    {
                        headers: {
                            Accept:
                                "application/vnd.github+json"
                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `GitHub ${response.status}`
                );

            }


            const data =
                await response.json();


            const timestamp =
                Date.now();


            try {

                localStorage.setItem(
                    cacheKey,
                    JSON.stringify({
                        timestamp,
                        data
                    })
                );

            } catch {}


            return {
                data,
                cached:
                    false,

                timestamp
            };

        }


        /* =========================================
           PROFILE
        ========================================= */

        async function loadGitHubProfile() {

            try {

                const result =
                    await fetchGitHubCached(
                        `https://api.github.com/users/${GITHUB_USERNAME}`,
                        `github-profile-${GITHUB_USERNAME}`
                    );


                const profile =
                    result.data;


                const avatar =
                    document.getElementById(
                        "githubAvatar"
                    );


                if (avatar) {

                    avatar.src =
                        profile.avatar_url;

                }


                const displayName =
                    document.getElementById(
                        "githubDisplayName"
                    );


                if (displayName) {

                    displayName.textContent =
                        profile.name ||
                        profile.login;

                }


                const username =
                    document.getElementById(
                        "githubUsername"
                    );


                if (username) {

                    username.textContent =
                        `@${profile.login}`;

                    username.href =
                        profile.html_url;

                }


                const bio =
                    document.getElementById(
                        "githubBio"
                    );


                if (bio) {

                    bio.textContent =
                        profile.bio ||
                        "Developer building projects and learning new technologies.";

                }


                animateCounter(
                    document.getElementById(
                        "githubProfileRepos"
                    ),
                    profile.public_repos
                );


                animateCounter(
                    document.getElementById(
                        "githubFollowers"
                    ),
                    profile.followers
                );


                animateCounter(
                    document.getElementById(
                        "githubFollowing"
                    ),
                    profile.following
                );


                animateCounter(
                    document.getElementById(
                        "githubRepoCount"
                    ),
                    profile.public_repos
                );

            } catch (error) {

                console.error(
                    error
                );

            }

        }


        /* =========================================
           ACTIVITY
        ========================================= */

        async function loadGitHubActivity() {

            const container =
                document.getElementById(
                    "githubActivity"
                );


            const syncTime =
                document.getElementById(
                    "activitySyncTime"
                );


            if (!container) {
                return;
            }


            try {

                const result =
                    await fetchGitHubCached(
                        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
                        `github-events-${GITHUB_USERNAME}`
                    );


                if (syncTime) {

                    syncTime.textContent =
                        result.cached
                            ? "Cached feed"
                            : "Feed refreshed";

                }


                const events =
                    result.data
                        .filter(
                            (event) =>
                                event.type ===
                                "PushEvent"
                        )
                        .slice(
                            0,
                            GITHUB_ACTIVITY_LIMIT
                        );


                container.innerHTML =
                    events.map(
                        (event) => {

                            const repo =
                                event.repo?.name ||
                                "repository";


                            return `

                                <a
                                    class="activity-item"
                                    href="https://github.com/${escapeHTML(repo)}"
                                    target="_blank"
                                >

                                    <div class="activity-type">
                                        PUSH
                                    </div>


                                    <div>

                                        <div class="activity-title">
                                            Pushed updates
                                        </div>

                                        <div class="activity-detail">
                                            ${escapeHTML(repo)}
                                            •
                                            ${escapeHTML(
                                                event.payload?.ref?.replace(
                                                    "refs/heads/",
                                                    ""
                                                ) ||
                                                "main"
                                            )}
                                        </div>

                                    </div>


                                    <div class="activity-time">
                                        ${relativeTime(
                                            event.created_at
                                        )}
                                    </div>

                                </a>

                            `;

                        }
                    ).join("");

            } catch (error) {

                container.innerHTML =
                    "GitHub activity unavailable.";

            }

        }


        /* =========================================
           PROJECTS
        ========================================= */

        async function loadGitHubProjects() {

            const container =
                document.getElementById(
                    "githubProjects"
                );


            if (!container) {
                return;
            }


            try {

                const result =
                    await fetchGitHubCached(
                        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
                        `github-repos-${GITHUB_USERNAME}`
                    );


                const repos =
                    result.data
                        .filter(
                            (repo) =>
                                !repo.fork
                        )
                        .slice(
                            0,
                            GITHUB_REPOSITORY_LIMIT
                        );


                container.innerHTML =
                    repos.map(
                        (
                            repo,
                            index
                        ) => {

                            const number =
                                String(
                                    index + 1
                                ).padStart(
                                    2,
                                    "0"
                                );


                            return `

                                <article class="project-card reveal">

                                    <div class="project-image">

                                        <div class="project-screen">

                                            <span class="screen-small">
                                                GITHUB REPOSITORY
                                            </span>

                                            <strong>
                                                ${escapeHTML(repo.name)}
                                            </strong>

                                            <span class="screen-blue">
                                                ${number}
                                            </span>

                                        </div>

                                    </div>


                                    <div class="project-content">

                                        <div class="project-top">

                                            <span class="project-type">
                                                GITHUB PROJECT
                                            </span>

                                            <span>
                                                ${number}
                                            </span>

                                        </div>


                                        <h3>
                                            ${escapeHTML(
                                                formatName(
                                                    repo.name
                                                )
                                            )}
                                        </h3>


                                        <p>

                                            ${escapeHTML(
                                                repo.description ||
                                                "A project from my GitHub portfolio."
                                            )}

                                        </p>


                                        <div class="project-tech">

                                            <span>
                                                ${escapeHTML(
                                                    repo.language ||
                                                    "Code"
                                                )}
                                            </span>

                                            <span>
                                                ★ ${repo.stargazers_count}
                                            </span>

                                            <span>
                                                Forks ${repo.forks_count}
                                            </span>

                                        </div>


                                        <div class="project-links">

                                            <a
                                                class="project-link"
                                                href="${repo.html_url}"
                                                target="_blank"
                                            >
                                                View Code ↗
                                            </a>

                                            ${
                                                repo.homepage
                                                    ? `
                                                        <a
                                                            class="project-link"
                                                            href="${repo.homepage}"
                                                            target="_blank"
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
                    ).join("");


                observeRevealElements();

            } catch (error) {

                console.error(
                    error
                );

            }

        }


        /* =========================================
           HELPERS
        ========================================= */

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


        function formatName(
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


        function relativeTime(
            date
        ) {

            const seconds =
                Math.floor(
                    (
                        Date.now() -
                        new Date(
                            date
                        )
                    ) /
                    1000
                );


            if (
                seconds <
                60
            ) {

                return `${seconds}s ago`;

            }


            const minutes =
                Math.floor(
                    seconds /
                    60
                );


            if (
                minutes <
                60
            ) {

                return `${minutes}m ago`;

            }


            const hours =
                Math.floor(
                    minutes /
                    60
                );


            if (
                hours <
                24
            ) {

                return `${hours}h ago`;

            }


            return `${Math.floor(
                hours /
                24
            )}d ago`;

        }


        /* =========================================
           START
        ========================================= */

        loadGitHubProfile();

        loadGitHubActivity();

        loadGitHubProjects();


        backTop?.addEventListener(
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
);