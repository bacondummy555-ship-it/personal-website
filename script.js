// =========================================
// JL PERSONAL PORTFOLIO
// =========================================


document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const cursorGlow = document.getElementById("cursorGlow");
    const typingText = document.getElementById("typingText");
    const backTop = document.getElementById("backTop");



    // =========================================
    // HEADER SCROLL EFFECT
    // =========================================

    function updateHeader() {

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
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

    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("open");

            document.body.classList.toggle(
                "menu-open"
            );

        }
    );


    navItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "open"
                );

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
    // REVEAL ON SCROLL
    // =========================================

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


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


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );



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
                    item.getAttribute("href") ===
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



    // =========================================
    // ANIMATED STATS
    // =========================================

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
                                entry.target
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

            statsObserver.observe(
                number
            );

        }
    );


    function animateCounter(element) {

        const target =
            Number(
                element.dataset.count
            );


        const duration =
            1200;


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
                progress < 1
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



    // =========================================
    // BACK TO TOP
    // =========================================

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



    // =========================================
    // PROJECT CARD MOUSE EFFECT
    // =========================================

    const cards =
        document.querySelectorAll(
            ".project-card, .skill-card"
        );


    cards.forEach(
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


                    card.style.background =
                        `
                        radial-gradient(
                            circle at ${x}px ${y}px,
                            rgba(0, 132, 255, 0.09),
                            rgba(4, 10, 19, 0.6) 45%
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

});