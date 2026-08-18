// =========================================
// JL PERSONAL PORTFOLIO
// =========================================


// =========================================
// GITHUB SETTINGS
// =========================================

const GITHUB_USERNAME = "bacondummy555-ship-it";

const GITHUB_REPOSITORY_LIMIT = 6;

const GITHUB_ACTIVITY_LIMIT = 6;

const GITHUB_CACHE_DURATION = 5 * 60 * 1000;



document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // ELEMENTS
    // =========================================

    const header =
        document.querySelector(".header");

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");

    const navItems =
        document.querySelectorAll(".nav-link");

    const cursorGlow =
        document.getElementById("cursorGlow");

    const typingText =
        document.getElementById("typingText");

    const backTop =
        document.getElementById("backTop");



    // =========================================
    // ACTIVITY BADGE
    // =========================================

    const activityBadge =
        document.querySelector(
            ".activity-live-badge"
        );


    if (activityBadge) {

        activityBadge.innerHTML = `
            <span class="activity-live-dot"></span>
            PUBLIC FEED
        `;

    }



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


    navItems.forEach((item) => {

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

    });



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
    // ACTIVE NAVIGATION
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
                    section.offsetTop -
                    180;


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
            Number(target) ||
            0;


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


            if (
                progress <
                1
            ) {

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
    // GITHUB CACHE
    // =========================================

    async function fetchGitHubCached(
        url,
        cacheKey
    ) {

        try {

            const saved =
                localStorage.getItem(
                    cacheKey
                );


            if (saved) {

                const parsed =
                    JSON.parse(
                        saved
                    );


                const age =
                    Date.now() -
                    parsed.timestamp;


                if (
                    age <
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

        } catch (error) {

            console.warn(
                "GitHub cache read failed:",
                error
            );

        }


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
                `GitHub API returned ${response.status}`
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

        } catch (error) {

            console.warn(
                "GitHub cache save failed:",
                error
            );

        }


        return {

            data,

            cached:
                false,

            timestamp

        };

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

            const result =
                await fetchGitHubCached(

                    `https://api.github.com/users/${GITHUB_USERNAME}`,

                    `github-profile-${GITHUB_USERNAME}`

                );


            const profile =
                result.data;


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
    // GITHUB ACTIVITY
    // =========================================

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


            const events =
                Array.isArray(
                    result.data
                )
                    ? result.data
                    : [];


            const usefulEvents =
                events
                    .filter(
                        isSupportedGitHubEvent
                    )
                    .slice(
                        0,
                        GITHUB_ACTIVITY_LIMIT
                    );


            if (syncTime) {

                if (result.cached) {

                    syncTime.textContent =
                        `Cached • ${relativeTime(result.timestamp)}`;

                } else {

                    syncTime.textContent =
                        "Feed refreshed just now";

                }

            }


            if (
                usefulEvents.length ===
                0
            ) {

                container.innerHTML = `

                    <div class="activity-empty">

                        No recent supported public activity found.
                        New public GitHub activity will appear here automatically.

                    </div>

                `;


                return;

            }


            container.innerHTML =
                usefulEvents
                    .map(
                        createActivityItem
                    )
                    .join("");


        } catch (error) {

            console.error(
                "GitHub activity loading failed:",
                error
            );


            if (syncTime) {

                syncTime.textContent =
                    "Feed unavailable";

            }


            container.innerHTML = `

                <div class="activity-error">

                    GitHub activity could not be loaded right now.
                    Your profile and projects may still be available.

                </div>

            `;

        }

    }



    // =========================================
    // SUPPORTED GITHUB EVENTS
    // =========================================

    function isSupportedGitHubEvent(
        event
    ) {

        const supported = [

            "PushEvent",

            "CreateEvent",

            "WatchEvent",

            "ForkEvent",

            "PullRequestEvent",

            "IssuesEvent",

            "ReleaseEvent",

            "DeleteEvent"

        ];


        return supported.includes(
            event.type
        );

    }



    // =========================================
    // CREATE ACTIVITY ITEM
    // =========================================

    function createActivityItem(
        event
    ) {

        const details =
            getActivityDetails(
                event
            );


        const repoName =
            event.repo?.name ||
            "GitHub";


        const repoURL =
            repoName.includes("/")
                ? `https://github.com/${repoName}`
                : `https://github.com/${GITHUB_USERNAME}`;


        return `

            <a
                href="${escapeAttribute(repoURL)}"
                target="_blank"
                rel="noopener noreferrer"
                class="activity-item"
            >

                <div class="activity-type">

                    ${escapeHTML(
                        details.type
                    )}

                </div>


                <div class="activity-content">

                    <div class="activity-title">

                        ${escapeHTML(
                            details.title
                        )}

                    </div>


                    <div class="activity-detail">

                        ${escapeHTML(
                            details.detail
                        )}

                    </div>

                </div>


                <div class="activity-time">

                    ${escapeHTML(
                        relativeTime(
                            event.created_at
                        )
                    )}

                </div>

            </a>

        `;

    }



    // =========================================
    // ACTIVITY DETAILS
    // =========================================

    function getActivityDetails(
        event
    ) {

        const repo =
            event.repo?.name ||
            "repository";


        switch (
            event.type
        ) {


            // =====================================
            // PUSH
            // =====================================

            case "PushEvent": {

                const payload =
                    event.payload ||
                    {};


                const branch =
                    payload.ref
                        ? payload.ref.replace(
                            "refs/heads/",
                            ""
                        )
                        : "branch";


                const commits =
                    Array.isArray(
                        payload.commits
                    )
                        ? payload.commits
                        : [];


                // ---------------------------------
                // FIND A VALID COMMIT COUNT
                // ---------------------------------

                let commitCount = null;


                if (
                    Number.isFinite(
                        payload.size
                    ) &&
                    payload.size > 0
                ) {

                    commitCount =
                        payload.size;

                }


                if (
                    commitCount === null &&
                    Number.isFinite(
                        payload.distinct_size
                    ) &&
                    payload.distinct_size > 0
                ) {

                    commitCount =
                        payload.distinct_size;

                }


                if (
                    commitCount === null &&
                    commits.length > 0
                ) {

                    commitCount =
                        commits.length;

                }


                // ---------------------------------
                // TITLE
                // ---------------------------------

                let title;


                if (
                    commitCount !== null &&
                    commitCount > 0
                ) {

                    title =
                        `Pushed ${commitCount} ` +
                        `commit${commitCount === 1 ? "" : "s"}`;

                } else {

                    title =
                        "Pushed updates";

                }


                // ---------------------------------
                // COMMIT MESSAGE
                // ---------------------------------

                const firstCommit =
                    commits[0]?.message;


                let detail =
                    `${repo} • ${branch}`;


                if (firstCommit) {

                    detail +=
                        ` • ${firstLine(firstCommit)}`;

                }


                return {

                    type:
                        "PUSH",

                    title,

                    detail

                };

            }



            // =====================================
            // CREATE
            // =====================================

            case "CreateEvent": {

                const refType =
                    event.payload?.ref_type ||
                    "repository";


                const ref =
                    event.payload?.ref;


                return {

                    type:
                        "CREATE",

                    title:
                        `Created ${refType}`,

                    detail:
                        ref
                            ? `${repo} • ${ref}`
                            : repo

                };

            }



            // =====================================
            // STAR
            // =====================================

            case "WatchEvent":

                return {

                    type:
                        "STAR",

                    title:
                        "Starred a repository",

                    detail:
                        repo

                };



            // =====================================
            // FORK
            // =====================================

            case "ForkEvent": {

                const forkName =
                    event.payload
                        ?.forkee
                        ?.full_name;


                return {

                    type:
                        "FORK",

                    title:
                        "Forked a repository",

                    detail:
                        forkName ||
                        repo

                };

            }



            // =====================================
            // PULL REQUEST
            // =====================================

            case "PullRequestEvent": {

                const action =
                    event.payload
                        ?.action ||
                    "updated";


                const number =
                    event.payload
                        ?.number;


                return {

                    type:
                        "PULL",

                    title:
                        `${capitalize(action)} pull request`,

                    detail:
                        number
                            ? `${repo} • #${number}`
                            : repo

                };

            }



            // =====================================
            // ISSUE
            // =====================================

            case "IssuesEvent": {

                const action =
                    event.payload
                        ?.action ||
                    "updated";


                const number =
                    event.payload
                        ?.issue
                        ?.number;


                return {

                    type:
                        "ISSUE",

                    title:
                        `${capitalize(action)} issue`,

                    detail:
                        number
                            ? `${repo} • #${number}`
                            : repo

                };

            }



            // =====================================
            // RELEASE
            // =====================================

            case "ReleaseEvent": {

                const action =
                    event.payload
                        ?.action ||
                    "published";


                const tag =
                    event.payload
                        ?.release
                        ?.tag_name;


                return {

                    type:
                        "RELEASE",

                    title:
                        `${capitalize(action)} release`,

                    detail:
                        tag
                            ? `${repo} • ${tag}`
                            : repo

                };

            }



            // =====================================
            // DELETE
            // =====================================

            case "DeleteEvent": {

                const refType =
                    event.payload
                        ?.ref_type ||
                    "ref";


                const ref =
                    event.payload
                        ?.ref;


                return {

                    type:
                        "DELETE",

                    title:
                        `Deleted ${refType}`,

                    detail:
                        ref
                            ? `${repo} • ${ref}`
                            : repo

                };

            }



            // =====================================
            // FALLBACK
            // =====================================

            default:

                return {

                    type:
                        "EVENT",

                    title:
                        "GitHub activity",

                    detail:
                        repo

                };

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


            const result =
                await fetchGitHubCached(

                    apiURL,

                    `github-repos-${GITHUB_USERNAME}`

                );


            const repositories =
                Array.isArray(
                    result.data
                )
                    ? result.data
                    : [];


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

                        ${escapeHTML(
                            name
                        )}

                    </h3>


                    <p>

                        ${escapeHTML(
                            description
                        )}

                    </p>


                    <div class="project-tech">

                        <span>

                            ${escapeHTML(
                                language
                            )}

                        </span>

                        <span>

                            ★ ${stars}

                        </span>

                        <span>

                            Forks ${forks}

                        </span>

                        <span>

                            Updated ${escapeHTML(
                                updatedDate
                            )}

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
    // FORMAT REPOSITORY NAME
    // =========================================

    function formatRepositoryName(
        name
    ) {

        return String(name)
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



    // =========================================
    // SHORTEN REPOSITORY NAME
    // =========================================

    function shortenName(
        name
    ) {

        const cleanName =
            String(name)
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



    // =========================================
    // FORMAT DATE
    // =========================================

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



    // =========================================
    // RELATIVE TIME
    // =========================================

    function relativeTime(
        dateValue
    ) {

        const date =
            new Date(
                dateValue
            );


        const difference =
            Date.now() -
            date.getTime();


        if (
            Number.isNaN(
                difference
            )
        ) {

            return "recently";

        }


        const seconds =
            Math.max(

                0,

                Math.floor(
                    difference /
                    1000
                )

            );


        if (
            seconds <
            10
        ) {

            return "just now";

        }


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


        const days =
            Math.floor(
                hours /
                24
            );


        if (
            days <
            30
        ) {

            return `${days}d ago`;

        }


        const months =
            Math.floor(
                days /
                30
            );


        if (
            months <
            12
        ) {

            return `${months}mo ago`;

        }


        const years =
            Math.floor(
                months /
                12
            );


        return `${years}y ago`;

    }



    // =========================================
    // CAPITALIZE
    // =========================================

    function capitalize(
        value
    ) {

        const text =
            String(
                value ||
                ""
            );


        if (!text) {
            return "";
        }


        return (
            text
                .charAt(0)
                .toUpperCase() +
            text.slice(1)
        );

    }



    // =========================================
    // FIRST LINE
    // =========================================

    function firstLine(
        value
    ) {

        return String(
            value
        )
            .split(
                "\n"
            )[0]
            .trim();

    }



    // =========================================
    // HTML ESCAPE
    // =========================================

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
    // NO PROJECTS
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
    // CARD MOUSE GLOW
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


    loadGitHubActivity();


    loadGitHubProjects();

});