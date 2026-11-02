/* ==========================================================
   ISAAC GALLO — SERVICIOS JAVASCRIPT
========================================================== */


/* ==========================================================
   01. CONFIGURACIÓN
========================================================== */

const prefersReducedMotion =
    window
        .matchMedia(
            "(prefers-reduced-motion: reduce)"
        )
        .matches;


const isTouchDevice =
    window
        .matchMedia(
            "(hover: none), (pointer: coarse)"
        )
        .matches;



/* ==========================================================
   02. SERVICE MEDIA — MOVIMIENTO SUAVE
========================================================== */

const serviceMediaElements =
    document
        .querySelectorAll(
            ".service-feature-media"
        );


function initialiseServiceMediaMotion() {

    if (
        prefersReducedMotion
        ||
        isTouchDevice
    ) {

        return;

    }


    serviceMediaElements
        .forEach(
            media => {


                const image =
                    media
                        .querySelector(
                            "img"
                        );


                if (
                    !image
                ) {

                    return;

                }


                media
                    .addEventListener(
                        "pointermove",
                        event => {


                            const rect =
                                media
                                    .getBoundingClientRect();


                            const mouseX =
                                event.clientX
                                -
                                rect.left;


                            const mouseY =
                                event.clientY
                                -
                                rect.top;


                            const percentX =
                                mouseX
                                /
                                rect.width;


                            const percentY =
                                mouseY
                                /
                                rect.height;


                            const rotateY =
                                (
                                    percentX
                                    -
                                    0.5
                                )
                                *
                                3;


                            const rotateX =
                                (
                                    0.5
                                    -
                                    percentY
                                )
                                *
                                3;


                            image
                                .style
                                .transform =
                                    `
                                    scale(1.025)
                                    rotateX(${rotateX}deg)
                                    rotateY(${rotateY}deg)
                                    `;

                        }
                    );


                media
                    .addEventListener(
                        "pointerleave",
                        () => {

                            image
                                .style
                                .transform =
                                    "";

                        }
                    );


            }
        );

}



/* ==========================================================
   03. CARRUSEL DE TECNOLOGÍAS
========================================================== */

const technologyMarquee =
    document
        .querySelector(
            ".technology-marquee"
        );


function pauseTechnologyMarquee() {

    if (
        !technologyMarquee
    ) {

        return;

    }


    technologyMarquee
        .classList
        .add(
            "is-paused"
        );

}


function resumeTechnologyMarquee() {

    if (
        !technologyMarquee
    ) {

        return;

    }


    technologyMarquee
        .classList
        .remove(
            "is-paused"
        );

}



/*
   En escritorio paramos el carrusel
   al pasar el ratón por encima.

   Esto permite mirar tranquilamente
   cada tecnología.
*/

technologyMarquee
    ?.addEventListener(
        "mouseenter",
        pauseTechnologyMarquee
    );


technologyMarquee
    ?.addEventListener(
        "mouseleave",
        resumeTechnologyMarquee
    );



/*
   También se pausa si algún elemento
   interior recibe foco mediante teclado.
*/

technologyMarquee
    ?.addEventListener(
        "focusin",
        pauseTechnologyMarquee
    );


technologyMarquee
    ?.addEventListener(
        "focusout",
        resumeTechnologyMarquee
    );



/* ==========================================================
   04. TECNOLOGÍAS — ENTRADA EN VIEWPORT
========================================================== */

function initialiseTechnologyReveal() {

    const technologyItems =
        document
            .querySelectorAll(
                ".technology-item"
            );


    if (
        !technologyItems.length
    ) {

        return;

    }


    if (
        prefersReducedMotion
    ) {

        technologyItems
            .forEach(
                item => {

                    item
                        .classList
                        .add(
                            "is-tech-visible"
                        );

                }
            );


        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries
                    .forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const group =
                                entry
                                    .target
                                    .querySelectorAll(
                                        ".technology-item"
                                    );


                            group
                                .forEach(
                                    (
                                        item,
                                        index
                                    ) => {

                                        window
                                            .setTimeout(
                                                () => {

                                                    item
                                                        .classList
                                                        .add(
                                                            "is-tech-visible"
                                                        );

                                                },

                                                index
                                                *
                                                45
                                            );

                                    }
                                );


                            observer
                                .unobserve(
                                    entry.target
                                );

                        }
                    );

            },

            {
                threshold:
                    0.15
            }

        );


    if (
        technologyMarquee
    ) {

        observer
            .observe(
                technologyMarquee
            );

    }

}



/* ==========================================================
   05. PROCESS — ITEM ACTIVO
========================================================== */

function initialiseProcessHighlight() {

    const processItems =
        document
            .querySelectorAll(
                ".services-process-item"
            );


    if (
        !processItems.length
    ) {

        return;

    }


    if (
        prefersReducedMotion
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries
                    .forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry
                                    .target
                                    .classList
                                    .add(
                                        "is-process-active"
                                    );

                            }

                        }
                    );

            },

            {
                threshold:
                    0.55
            }

        );


    processItems
        .forEach(
            item => {

                observer
                    .observe(
                        item
                    );

            }
        );

}



/* ==========================================================
   06. SERVICE LINKS — ICON MOTION
========================================================== */

const serviceLinks =
    document
        .querySelectorAll(
            ".service-feature-link"
        );


function initialiseServiceLinks() {

    if (
        prefersReducedMotion
    ) {

        return;

    }


    serviceLinks
        .forEach(
            link => {


                const icon =
                    link
                        .querySelector(
                            "svg"
                        );


                if (
                    !icon
                ) {

                    return;

                }


                link
                    .addEventListener(
                        "mouseenter",
                        () => {

                            icon
                                .style
                                .transform =
                                    "translate(3px, -3px)";

                        }
                    );


                link
                    .addEventListener(
                        "mouseleave",
                        () => {

                            icon
                                .style
                                .transform =
                                    "";

                        }
                    );


            }
        );

}



/* ==========================================================
   07. SCROLL A CONTACTO
========================================================== */

const contactLinks =
    document
        .querySelectorAll(
            'a[href="#contacto"]'
        );


contactLinks
    .forEach(
        link => {

            link
                .addEventListener(
                    "click",
                    event => {


                        const contactSection =
                            document
                                .getElementById(
                                    "contacto"
                                );


                        if (
                            !contactSection
                        ) {

                            return;

                        }


                        event
                            .preventDefault();


                        contactSection
                            .scrollIntoView(
                                {
                                    behavior:
                                        prefersReducedMotion
                                            ? "auto"
                                            : "smooth",

                                    block:
                                        "start"
                                }
                            );

                    }
                );

        }
    );



/* ==========================================================
   08. INITIALISE
========================================================== */

initialiseServiceMediaMotion();

initialiseTechnologyReveal();

initialiseProcessHighlight();

initialiseServiceLinks();