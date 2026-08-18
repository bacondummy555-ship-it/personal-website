// =========================================================
// JL PERSONAL PORTFOLIO
// PERFORMANCE OPTIMIZED
// =========================================================

const GITHUB_USERNAME = "bacondummy555-ship-it";

const GITHUB_REPOSITORY_LIMIT = 6;
const GITHUB_ACTIVITY_LIMIT = 6;

const GITHUB_CACHE_DURATION =
    5 * 60 * 1000;


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


const hasFinePointer =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;


// =========================================================
// FAST LOADING SCREEN
// =========================================================

const loaderStartTime =
    performance.now();


function finishLoader() {

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


    const isMobile =
        window.matchMedia(
            "(max-width: 760px)"
        ).matches;


    const minimumDuration =
        prefersReducedMotion
            ? 0
            : isMobile
                ? 320
                : 650;


    const fadeDuration =
        prefersReducedMotion
            ? 0
            : 160;


    const elapsed =
        performance.now() -
        loaderStartTime;


    const remainingTime =
        Math.max(
            0,
            minimumDuration -
            elapsed
        );


    function animateProgress() {

        if (prefersReducedMotion) {
            return;
        }


        const duration =
            Math.max(
                minimumDuration,
                1
            );


        const progress =
            Math.min(
                1,
                (
                    performance.now() -
                    loaderStartTime
                ) /
                duration
            );


        const percentage =
            Math.round(
                12 +
                progress *
                88
            );


        if (progressBar) {

            progressBar.style.width =
                `${percentage}%`;

        }


        if (percentText) {

            percentText.textContent =
                `${percentage}%`;

        }


        if (progress < 1) {

            requestAnimationFrame(
                animateProgress
            );

        }

    }


    requestAnimationFrame(
        animateProgress
    );


    window.setTimeout(
        () => {

            if (progressBar) {

                progressBar.style.width =
                    "100%";

            }


            if (percentText) {

                percentText.textContent =
                    "100%";

            }


            loader.classList.add(
                "loader-hidden"
            );


            document.body.classList.remove(
                "loading"
            );


            window.setTimeout(
                () => {

                    loader.setAttribute(
                        "hidden",
                        ""
                    );

                },
                fadeDuration +
                50
            );

        },
        remainingTime
    );

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        finishLoader,
        {
            once: true
        }
    );

} else {

    finishLoader();

}


// =========================================================
// MAIN WEBSITE
// =========================================================

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
            Array.from(
                document.querySelectorAll(
                    ".nav-link"
                )
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


        // =================================================
        // HEADER
        // =================================================

        let scrollFramePending =
            false;


        function updateHeader() {

            if (!header) {
                return;
            }


            header.classList.toggle(
                "scrolled",
                window.scrollY >
                20
            );

        }


        function handleScroll() {

            if (scrollFramePending) {
                return;
            }


            scrollFramePending =
                true;


            requestAnimationFrame(
                () => {

                    updateHeader();

                    scrollFramePending =
                        false;

                }
            );

        }


        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true
            }
        );


        updateHeader();


        // =================================================
        // MOBILE MENU
        // =================================================

        function closeMenu() {

            navLinks?.classList.remove(
                "open"
            );


            document.body.classList.remove(
                "menu-open"
            );


            menuButton?.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (
            menuButton &&
            navLinks
        ) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            menuButton.addEventListener(
                "click",
                () => {

                    const isOpen =
                        navLinks.classList.toggle(
                            "open"
                        );


                    document.body.classList.toggle(
                        "menu-open",
                        isOpen
                    );


                    menuButton.setAttribute(
                        "aria-expanded",
                        String(
                            isOpen
                        )
                    );

                }
            );

        }


        navItems.forEach(
            (item) => {

                item.addEventListener(
                    "click",
                    closeMenu
                );

            }
        );


        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth >
                    760
                ) {

                    closeMenu();

                }

            },
            {
                passive: true
            }
        );


        // =================================================
        // CURSOR GLOW
        // =================================================

        if (
            cursorGlow &&
            hasFinePointer &&
            !prefersReducedMotion
        ) {

            cursorGlow.style.left =
                "0";


            cursorGlow.style.top =
                "0";


            let pointerX =
                0;


            let pointerY =
                0;


            let pointerFramePending =
                false;


            document.addEventListener(
                "pointermove",
                (event) => {

                    pointerX =
                        event.clientX;


                    pointerY =
                        event.clientY;


                    if (
                        pointerFramePending
                    ) {

                        return;

                    }


                    pointerFramePending =
                        true;


                    requestAnimationFrame(
                        () => {

                            cursorGlow.style.transform =
                                `translate3d(calc(${pointerX}px - 50%), calc(${pointerY}px - 50%), 0)`;


                            cursorGlow.style.opacity =
                                "1";


                            pointerFramePending =
                                false;

                        }
                    );

                },
                {
                    passive: true
                }
            );


            document.addEventListener(
                "mouseleave",
                () => {

                    cursorGlow.style.opacity =
                        "0";

                }
            );

        } else if (cursorGlow) {

            cursorGlow.style.display =
                "none";

        }


        // =================================================
        // TYPEWRITER
        // =================================================

        const words = [

            "modern websites.",

            "creative experiences.",

            "useful applications.",

            "cool projects.",

            "the future."

        ];


        let wordIndex =
            0;


        let characterIndex =
            0;


        let deleting =
            false;


        let typingTimer =
            null;


        function scheduleTyping(
            delay
        ) {

            window.clearTimeout(
                typingTimer
            );


            typingTimer =
                window.setTimeout(
                    typeWriter,
                    delay
                );

        }


        function typeWriter() {

            if (!typingText) {
                return;
            }


            if (document.hidden) {

                scheduleTyping(
                    500
                );

                return;

            }


            const word =
                words[
                    wordIndex
                ];


            if (!deleting) {

                typingText.textContent =
                    word.substring(
                        0,
                        characterIndex +
                        1
                    );


                characterIndex++;


                if (
                    characterIndex ===
                    word.length
                ) {

                    deleting =
                        true;


                    scheduleTyping(
                        1500
                    );


                    return;

                }


                scheduleTyping(
                    70
                );


                return;

            }


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

                deleting =
                    false;


                wordIndex =
                    (
                        wordIndex +
                        1
                    ) %
                    words.length;


                scheduleTyping(
                    300
                );


                return;

            }


            scheduleTyping(
                35
            );

        }


        if (typingText) {

            if (
                prefersReducedMotion
            ) {

                typingText.textContent =
                    words[0];

            } else {

                typeWriter();

            }

        }


        // =================================================
        // REVEAL
        // =================================================

        let revealObserver =
            null;


        if (
            "IntersectionObserver"
            in window
        ) {

            revealObserver =
                new IntersectionObserver(
                    (
                        entries
                    ) => {

                        entries.forEach(
                            (
                                entry
                            ) => {

                                if (
                                    !entry.isIntersecting
                                ) {

                                    return;

                                }


                                entry.target.classList.add(
                                    "visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {

                        threshold:
                            0.08,

                        rootMargin:
                            "0px 0px -40px 0px"

                    }
                );

        }


        function observeRevealElements() {

            const elements =
                document.querySelectorAll(
                    ".reveal:not(.visible)"
                );


            elements.forEach(
                (
                    element
                ) => {

                    if (
                        prefersReducedMotion ||
                        !revealObserver
                    ) {

                        element.classList.add(
                            "visible"
                        );


                        return;

                    }


                    revealObserver.observe(
                        element
                    );

                }
            );

        }


        observeRevealElements();


        // =================================================
        // ACTIVE NAV
        // =================================================

        const sections =
            Array.from(
                document.querySelectorAll(
                    "section[id]"
                )
            );


        function setActiveNavigation(
            sectionId
        ) {

            navItems.forEach(
                (
                    item
                ) => {

                    item.classList.toggle(
                        "active",
                        item.getAttribute(
                            "href"
                        ) ===
                        `#${sectionId}`
                    );

                }
            );

        }


        if (
            "IntersectionObserver"
            in window &&
            sections.length >
            0
        ) {

            const sectionObserver =
                new IntersectionObserver(
                    (
                        entries
                    ) => {

                        const visibleSections =
                            entries
                                .filter(
                                    (
                                        entry
                                    ) =>
                                        entry.isIntersecting
                                )
                                .sort(
                                    (
                                        a,
                                        b
                                    ) =>
                                        b.intersectionRatio -
                                        a.intersectionRatio
                                );


                        if (
                            visibleSections[0]
                        ) {

                            setActiveNavigation(
                                visibleSections[0]
                                    .target
                                    .id
                            );

                        }

                    },
                    {

                        rootMargin:
                            "-28% 0px -55% 0px",

                        threshold: [
                            0.01,
                            0.15,
                            0.35
                        ]

                    }
                );


            sections.forEach(
                (
                    section
                ) => {

                    sectionObserver.observe(
                        section
                    );

                }
            );

        } else {

            setActiveNavigation(
                "home"
            );

        }


        // =================================================
        // COUNTER
        // =================================================

        function animateCounter(
            element,
            target
        ) {

            if (!element) {
                return;
            }


            const finalTarget =
                Number(
                    target
                ) ||
                0;


            if (
                prefersReducedMotion
            ) {

                element.textContent =
                    finalTarget;


                return;

            }


            const start =
                performance.now();


            const duration =
                700;


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


                const eased =
                    1 -
                    Math.pow(
                        1 -
                        progress,
                        3
                    );


                element.textContent =
                    Math.floor(
                        finalTarget *
                        eased
                    );


                if (
                    progress <
                    1
                ) {

                    requestAnimationFrame(
                        frame
                    );

                } else {

                    element.textContent =
                        finalTarget;

                }

            }


            requestAnimationFrame(
                frame
            );

        }


        const statNumbers =
            document.querySelectorAll(
                "[data-count]"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const statObserver =
                new IntersectionObserver(
                    (
                        entries
                    ) => {

                        entries.forEach(
                            (
                                entry
                            ) => {

                                if (
                                    !entry.isIntersecting
                                ) {

                                    return;

                                }


                                if (
                                    entry.target.id !==
                                    "githubRepoCount"
                                ) {

                                    animateCounter(
                                        entry.target,
                                        entry.target
                                            .dataset
                                            .count
                                    );

                                }


                                statObserver.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {

                        threshold:
                            0.35

                    }
                );


            statNumbers.forEach(
                (
                    stat
                ) => {

                    statObserver.observe(
                        stat
                    );

                }
            );

        }


        // =================================================
        // GITHUB CACHE
        // =================================================

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
                        parsed &&
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

            } catch (
                error
            ) {

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


            if (
                !response.ok
            ) {

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

            } catch (
                error
            ) {

                console.warn(
                    "GitHub cache write failed:",
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


        // =================================================
        // GITHUB PROFILE
        // =================================================

        let profileLoaded =
            false;


        async function loadGitHubProfile() {

            if (profileLoaded) {
                return;
            }


            profileLoaded =
                true;


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


                    avatar.alt =
                        `${profile.login} GitHub profile picture`;


                    avatar.loading =
                        "lazy";


                    avatar.decoding =
                        "async";

                }


                const displayName =
                    document.getElementById(
                        "githubDisplayName"
                    );


                if (
                    displayName
                ) {

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


                const profileLink =
                    document.getElementById(
                        "githubProfileLink"
                    );


                if (
                    profileLink
                ) {

                    profileLink.href =
                        profile.html_url;

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

            } catch (
                error
            ) {

                profileLoaded =
                    false;


                console.error(
                    "GitHub profile failed:",
                    error
                );

            }

        }


        // =================================================
        // GITHUB ACTIVITY
        // =================================================

        let activityLoaded =
            false;


        async function loadGitHubActivity() {

            if (activityLoaded) {
                return;
            }


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


            activityLoaded =
                true;


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
                    Array.isArray(
                        result.data
                    )
                        ? result.data
                        : [];


                const supported =
                    events
                        .filter(
                            (
                                event
                            ) => {

                                return [

                                    "PushEvent",

                                    "CreateEvent",

                                    "WatchEvent",

                                    "ForkEvent",

                                    "PullRequestEvent"

                                ].includes(
                                    event.type
                                );

                            }
                        )
                        .slice(
                            0,
                            GITHUB_ACTIVITY_LIMIT
                        );


                if (
                    supported.length ===
                    0
                ) {

                    container.innerHTML = `

                        <div class="activity-loading">

                            No recent supported public activity.

                        </div>

                    `;


                    return;

                }


                container.innerHTML =
                    supported
                        .map(
                            createActivityItem
                        )
                        .join(
                            ""
                        );

            } catch (
                error
            ) {

                activityLoaded =
                    false;


                console.error(
                    "Activity failed:",
                    error
                );


                container.innerHTML = `

                    <div class="activity-loading">

                        GitHub activity is temporarily unavailable.

                    </div>

                `;

            }

        }


        function createActivityItem(
            event
        ) {

            const repo =
                event.repo?.name ||
                "repository";


            let type =
                "EVENT";


            let title =
                "GitHub activity";


            let detail =
                repo;


            if (
                event.type ===
                "PushEvent"
            ) {

                type =
                    "PUSH";


                const payload =
                    event.payload ||
                    {};


                const commits =
                    Array.isArray(
                        payload.commits
                    )
                        ? payload.commits
                        : [];


                let count =
                    null;


                if (
                    Number.isFinite(
                        payload.size
                    ) &&
                    payload.size >
                    0
                ) {

                    count =
                        payload.size;

                } else if (
                    Number.isFinite(
                        payload.distinct_size
                    ) &&
                    payload.distinct_size >
                    0
                ) {

                    count =
                        payload.distinct_size;

                } else if (
                    commits.length >
                    0
                ) {

                    count =
                        commits.length;

                }


                title =
                    count
                        ? `Pushed ${count} commit${count === 1 ? "" : "s"}`
                        : "Pushed updates";


                const branch =
                    payload.ref
                        ?.replace(
                            "refs/heads/",
                            ""
                        ) ||
                    "main";


                detail =
                    `${repo} • ${branch}`;

            }


            if (
                event.type ===
                "CreateEvent"
            ) {

                type =
                    "CREATE";


                title =
                    `Created ${event.payload?.ref_type || "repository"}`;


                detail =
                    repo;

            }


            if (
                event.type ===
                "WatchEvent"
            ) {

                type =
                    "STAR";


                title =
                    "Starred repository";


                detail =
                    repo;

            }


            if (
                event.type ===
                "ForkEvent"
            ) {

                type =
                    "FORK";


                title =
                    "Forked repository";


                detail =
                    repo;

            }


            if (
                event.type ===
                "PullRequestEvent"
            ) {

                type =
                    "PULL";


                title =
                    `${
                        capitalize(
                            event.payload?.action ||
                            "Updated"
                        )
                    } pull request`;


                detail =
                    repo;

            }


            const repoURL =
                repo.includes(
                    "/"
                )
                    ? `https://github.com/${repo}`
                    : `https://github.com/${GITHUB_USERNAME}`;


            return `

                <a
                    class="activity-item"
                    href="${escapeAttribute(repoURL)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >

                    <div class="activity-type">

                        ${escapeHTML(type)}

                    </div>


                    <div>

                        <div class="activity-title">

                            ${escapeHTML(title)}

                        </div>


                        <div class="activity-detail">

                            ${escapeHTML(detail)}

                        </div>

                    </div>


                    <div class="activity-time">

                        ${
                            escapeHTML(
                                relativeTime(
                                    event.created_at
                                )
                            )
                        }

                    </div>

                </a>

            `;

        }


        // =================================================
        // PROJECTS
        // =================================================

        let projectsLoaded =
            false;


        async function loadGitHubProjects() {

            if (projectsLoaded) {
                return;
            }


            const container =
                document.getElementById(
                    "githubProjects"
                );


            if (!container) {
                return;
            }


            projectsLoaded =
                true;


            try {

                const result =
                    await fetchGitHubCached(

                        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100&type=owner`,

                        `github-repos-${GITHUB_USERNAME}`

                    );


                const repos =
                    Array.isArray(
                        result.data
                    )
                        ? result.data
                            .filter(
                                (
                                    repo
                                ) =>
                                    !repo.fork
                            )
                            .slice(
                                0,
                                GITHUB_REPOSITORY_LIMIT
                            )
                        : [];


                container.innerHTML =
                    repos
                        .map(
                            (
                                repo,
                                index
                            ) => {


                                const number =
                                    String(
                                        index +
                                        1
                                    )
                                        .padStart(
                                            2,
                                            "0"
                                        );


                                const homepage =

                                    repo.homepage &&

                                    repo.homepage.trim()

                                        ? repo.homepage

                                        : null;


                                return `

                                    <article class="project-card reveal">

                                        <div class="project-image">

                                            <div class="project-screen">

                                                <span class="screen-small">

                                                    GITHUB REPOSITORY

                                                </span>


                                                <strong>

                                                    ${
                                                        escapeHTML(
                                                            repo.name
                                                        )
                                                    }

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

                                                ${
                                                    escapeHTML(
                                                        formatName(
                                                            repo.name
                                                        )
                                                    )
                                                }

                                            </h3>


                                            <p>

                                                ${
                                                    escapeHTML(

                                                        repo.description ||

                                                        "A project from my GitHub portfolio."

                                                    )
                                                }

                                            </p>


                                            <div class="project-tech">

                                                <span>

                                                    ${
                                                        escapeHTML(
                                                            repo.language ||
                                                            "Code"
                                                        )
                                                    }

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
                                                    href="${escapeAttribute(repo.html_url)}"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >

                                                    View Code ↗

                                                </a>


                                                ${
                                                    homepage
                                                        ? `

                                                            <a
                                                                class="project-link"
                                                                href="${escapeAttribute(homepage)}"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
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
                        )
                        .join(
                            ""
                        );


                observeRevealElements();

            } catch (
                error
            ) {

                projectsLoaded =
                    false;


                console.error(
                    "Projects failed:",
                    error
                );


                container.innerHTML = `

                    <article class="project-card">

                        <div class="project-content">

                            <h3>

                                GitHub unavailable

                            </h3>


                            <p>

                                Projects could not be loaded right now.

                            </p>

                        </div>

                    </article>

                `;

            }

        }


        // =================================================
        // LAZY GITHUB LOADING
        // =================================================

        function observeSectionOnce(
            selector,
            callback,
            rootMargin =
                "500px 0px"
        ) {

            const section =
                document.querySelector(
                    selector
                );


            if (!section) {
                return;
            }


            if (
                !(
                    "IntersectionObserver"
                    in window
                )
            ) {

                callback();

                return;

            }


            const observer =
                new IntersectionObserver(
                    (
                        entries
                    ) => {

                        const visible =
                            entries.some(
                                (
                                    entry
                                ) =>
                                    entry.isIntersecting
                            );


                        if (!visible) {
                            return;
                        }


                        observer.disconnect();


                        callback();

                    },
                    {

                        rootMargin,

                        threshold:
                            0.01

                    }
                );


            observer.observe(
                section
            );

        }


        observeSectionOnce(

            "#about",

            loadGitHubProfile,

            "450px 0px"

        );


        observeSectionOnce(

            "#activity",

            loadGitHubActivity,

            "500px 0px"

        );


        observeSectionOnce(

            "#projects",

            loadGitHubProjects,

            "550px 0px"

        );


        // =================================================
        // CONTACT FORM
        // =================================================

        const contactForm =
            document.getElementById(
                "contactForm"
            );


        const contactSubmit =
            document.getElementById(
                "contactSubmit"
            );


        const contactSubmitText =
            document.getElementById(
                "contactSubmitText"
            );


        const formResponse =
            document.getElementById(
                "formResponse"
            );


        const messageField =
            document.getElementById(
                "contactMessage"
            );


        const messageCounter =
            document.getElementById(
                "messageCharacterCount"
            );


        const startedAt =
            document.getElementById(
                "formStartedAt"
            );


        function resetFormTimer() {

            if (startedAt) {

                startedAt.value =
                    Date.now()
                        .toString();

            }

        }


        resetFormTimer();


        if (
            messageField &&
            messageCounter
        ) {

            messageField.addEventListener(
                "input",
                () => {

                    messageCounter.textContent =
                        messageField
                            .value
                            .length;

                }
            );

        }


        function setFormResponse(
            type,
            message
        ) {

            if (!formResponse) {
                return;
            }


            formResponse.className =
                `form-response visible ${type}`;


            formResponse.textContent =
                message;

        }


        function clearFormResponse() {

            if (!formResponse) {
                return;
            }


            formResponse.className =
                "form-response";


            formResponse.textContent =
                "";

        }


        function setSubmitting(
            submitting
        ) {

            if (
                contactSubmit
            ) {

                contactSubmit.disabled =
                    submitting;


                contactSubmit.classList.toggle(
                    "sending",
                    submitting
                );

            }


            if (
                contactSubmitText
            ) {

                contactSubmitText.textContent =
                    submitting
                        ? "Sending..."
                        : "Send Message";

            }

        }


        if (contactForm) {

            contactForm.addEventListener(
                "submit",
                async (
                    event
                ) => {

                    event.preventDefault();


                    clearFormResponse();


                    if (
                        !contactForm.checkValidity()
                    ) {

                        contactForm.reportValidity();


                        return;

                    }


                    const formData =
                        new FormData(
                            contactForm
                        );


                    const payload = {

                        name:
                            String(
                                formData.get(
                                    "name"
                                ) ||
                                ""
                            ).trim(),

                        email:
                            String(
                                formData.get(
                                    "email"
                                ) ||
                                ""
                            ).trim(),

                        subject:
                            String(
                                formData.get(
                                    "subject"
                                ) ||
                                ""
                            ).trim(),

                        message:
                            String(
                                formData.get(
                                    "message"
                                ) ||
                                ""
                            ).trim(),

                        company:
                            String(
                                formData.get(
                                    "company"
                                ) ||
                                ""
                            ).trim(),

                        startedAt:
                            Number(
                                formData.get(
                                    "startedAt"
                                )
                            )

                    };


                    setSubmitting(
                        true
                    );


                    try {

                        const response =
                            await fetch(
                                "/api/contact",
                                {

                                    method:
                                        "POST",

                                    headers: {

                                        "Content-Type":
                                            "application/json"

                                    },

                                    body:
                                        JSON.stringify(
                                            payload
                                        )

                                }
                            );


                        let result =
                            {};


                        try {

                            result =
                                await response.json();

                        } catch {

                            result =
                                {};

                        }


                        if (
                            !response.ok
                        ) {

                            throw new Error(

                                result.message ||

                                "Message could not be sent."

                            );

                        }


                        setFormResponse(

                            "success",

                            "✓ Message sent successfully. Thanks for reaching out!"

                        );


                        contactForm.reset();


                        if (
                            messageCounter
                        ) {

                            messageCounter.textContent =
                                "0";

                        }


                        resetFormTimer();

                    } catch (
                        error
                    ) {

                        console.error(

                            "Contact form error:",

                            error

                        );


                        setFormResponse(

                            "error",

                            error.message ||

                            "Something went wrong. Please try again."

                        );

                    } finally {

                        setSubmitting(
                            false
                        );

                    }

                }
            );

        }


        // =================================================
        // BACK TO TOP
        // =================================================

        backTop?.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top:
                        0,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );


        // =================================================
        // HELPERS
        // =================================================

        function escapeHTML(
            value
        ) {

            return String(
                value
            )

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
                value
            );

        }


        function formatName(
            name
        ) {

            return String(
                name
            )

                .replace(
                    /[-_]+/g,
                    " "
                )

                .replace(
                    /\b\w/g,
                    (
                        letter
                    ) =>
                        letter.toUpperCase()
                );

        }


        function capitalize(
            value
        ) {

            const text =
                String(
                    value ||
                    ""
                );


            return text

                ? text
                    .charAt(
                        0
                    )
                    .toUpperCase() +

                    text.slice(
                        1
                    )

                : "";

        }


        function relativeTime(
            date
        ) {

            const seconds =
                Math.max(
                    0,
                    Math.floor(
                        (
                            Date.now() -
                            new Date(
                                date
                            ).getTime()
                        ) /
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


            return `${days}d ago`;

        }

    }
);