// =========================================================
// JL PERSONAL PORTFOLIO
// =========================================================

const GITHUB_USERNAME = "bacondummy555-ship-it";

const GITHUB_REPOSITORY_LIMIT = 6;

const GITHUB_ACTIVITY_LIMIT = 6;

const GITHUB_CACHE_DURATION =
    5 * 60 * 1000;


// =========================================================
// LOADING SCREEN
// =========================================================

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


        const interval =
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


                    if (percentage >= 100) {

                        clearInterval(
                            interval
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


        // =================================================
        // HEADER
        // =================================================

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


        // =================================================
        // MOBILE MENU
        // =================================================

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


        // =================================================
        // CURSOR GLOW
        // =================================================

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
                    characterIndex === 0
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


        // =================================================
        // REVEAL
        // =================================================

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


        // =================================================
        // ACTIVE NAV
        // =================================================

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


            target =
                Number(target) ||
                0;


            const start =
                performance.now();


            const duration =
                900;


            function frame(now) {

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
                        target *
                        eased
                    );


                if (
                    progress < 1
                ) {

                    requestAnimationFrame(
                        frame
                    );

                } else {

                    element.textContent =
                        target;

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


        const statObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                if (
                                    entry.target.id !==
                                    "githubRepoCount"
                                ) {

                                    animateCounter(
                                        entry.target,
                                        entry.target.dataset.count
                                    );

                                }


                                statObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        statNumbers.forEach(
            (stat) => {

                statObserver.observe(
                    stat
                );

            }
        );


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

            } catch (error) {

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


                    avatar.alt =
                        `${profile.login} GitHub profile picture`;

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


                const profileLink =
                    document.getElementById(
                        "githubProfileLink"
                    );


                if (profileLink) {

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

            } catch (error) {

                console.error(
                    "GitHub profile failed:",
                    error
                );

            }

        }


        // =================================================
        // GITHUB ACTIVITY
        // =================================================

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
                    Array.isArray(
                        result.data
                    )
                        ? result.data
                        : [];


                const supported =
                    events
                        .filter(
                            (event) => {

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
                        .join("");

            } catch (error) {

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
                    payload.size > 0
                ) {

                    count =
                        payload.size;

                } else if (
                    Number.isFinite(
                        payload.distinct_size
                    ) &&
                    payload.distinct_size > 0
                ) {

                    count =
                        payload.distinct_size;

                } else if (
                    commits.length > 0
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
                repo.includes("/")
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

                        ${escapeHTML(
                            relativeTime(
                                event.created_at
                            )
                        )}

                    </div>

                </a>

            `;

        }


        // =================================================
        // PROJECTS
        // =================================================

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
                        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100&type=owner`,
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

                                                    ${escapeHTML(
                                                        repo.name
                                                    )}

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
                        .join("");


                observeRevealElements();

            } catch (error) {

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
                    Date.now().toString();

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
                        messageField.value.length;

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

            if (contactSubmit) {

                contactSubmit.disabled =
                    submitting;


                contactSubmit.classList.toggle(
                    "sending",
                    submitting
                );

            }


            if (contactSubmitText) {

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


                        let result = {};


                        try {

                            result =
                                await response.json();

                        } catch {}


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


                    } catch (error) {

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
                        "smooth"

                });

            }
        );


        // =================================================
        // HELPERS
        // =================================================

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
                value
            );

        }


        function formatName(
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
                    .charAt(0)
                    .toUpperCase() +
                    text.slice(1)
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


            if (seconds < 10) {
                return "just now";
            }


            if (seconds < 60) {
                return `${seconds}s ago`;
            }


            const minutes =
                Math.floor(
                    seconds /
                    60
                );


            if (minutes < 60) {
                return `${minutes}m ago`;
            }


            const hours =
                Math.floor(
                    minutes /
                    60
                );


            if (hours < 24) {
                return `${hours}h ago`;
            }


            const days =
                Math.floor(
                    hours /
                    24
                );


            return `${days}d ago`;

        }


        // =================================================
        // START
        // =================================================

        loadGitHubProfile();

        loadGitHubActivity();

        loadGitHubProjects();

    }
);