/* ==========================================================
   ISAAC GALLO — SERVICIOS JAVASCRIPT
========================================================== */


/* ==========================================================
   01. CONFIGURACIÓN
========================================================== */

const servicesReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


const servicesTouchDevice =
    window.matchMedia(
        "(hover: none), (pointer: coarse)"
    ).matches;



/* ==========================================================
   02. IMÁGENES DE SERVICIOS
   Movimiento muy ligero en escritorio
========================================================== */

const serviceMediaElements =
    document.querySelectorAll(
        ".service-feature-media"
    );


function initialiseServiceMediaMotion() {

    if (
        servicesReducedMotion ||
        servicesTouchDevice
    ) {

        return;

    }


    serviceMediaElements.forEach(
        media => {

            const image =
                media.querySelector(
                    "img"
                );


            if (!image) {

                return;

            }


            media.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        media.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        )
                        /
                        rect.width;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        )
                        /
                        rect.height;


                    const rotateY =
                        (
                            x -
                            0.5
                        )
                        *
                        2.4;


                    const rotateX =
                        (
                            0.5 -
                            y
                        )
                        *
                        2.4;


                    image.style.transform =
                        `
                        scale(1.025)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        `;

                }
            );


            media.addEventListener(
                "pointerleave",
                () => {

                    image.style.transform =
                        "";

                }
            );

        }
    );

}



/* ==========================================================
   03. CARRUSEL INFINITO
========================================================== */

const technologyMarquee =
    document.querySelector(
        ".technology-marquee"
    );


const technologyTrack =
    document.querySelector(
        ".technology-track"
    );


function createInfiniteTechnologyTrack() {

    if (
        !technologyTrack
    ) {

        return;

    }


    const groups =
        technologyTrack.querySelectorAll(
            ".technology-group"
        );


    /*
       Si ya existen dos grupos,
       no volvemos a duplicar.
    */

    if (
        groups.length >= 2
    ) {

        return;

    }


    const originalGroup =
        groups[0];


    if (
        !originalGroup
    ) {

        return;

    }


    const clone =
        originalGroup.cloneNode(
            true
        );


    clone.setAttribute(
        "aria-hidden",
        "true"
    );


    technologyTrack.appendChild(
        clone
    );

}



/* ==========================================================
   04. PAUSAR CARRUSEL
========================================================== */

function pauseTechnologyMarquee() {

    technologyMarquee
        ?.classList
        .add(
            "is-paused"
        );

}


function resumeTechnologyMarquee() {

    technologyMarquee
        ?.classList
        .remove(
            "is-paused"
        );

}


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
   05. PROCESO
========================================================== */

function initialiseProcessHighlight() {

    const processItems =
        document.querySelectorAll(
            ".services-process-item"
        );


    if (
        !processItems.length
    ) {

        return;

    }


    if (
        servicesReducedMotion
    ) {

        processItems.forEach(
            item => {

                item.classList.add(
                    "is-process-active"
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-process-active"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold:
                    0.35,

                rootMargin:
                    "0px 0px -5% 0px"
            }

        );


    processItems.forEach(
        item => {

            observer.observe(
                item
            );

        }
    );

}



/* ==========================================================
   06. LINKS DE SERVICIO
========================================================== */

function initialiseServiceLinks() {

    if (
        servicesReducedMotion ||
        servicesTouchDevice
    ) {

        return;

    }


    const links =
        document.querySelectorAll(
            ".service-feature-link"
        );


    links.forEach(
        link => {

            const icon =
                link.querySelector(
                    "svg"
                );


            if (
                !icon
            ) {

                return;

            }


            link.addEventListener(
                "mouseenter",
                () => {

                    icon.style.transform =
                        "translate(3px, -3px)";

                }
            );


            link.addEventListener(
                "mouseleave",
                () => {

                    icon.style.transform =
                        "";

                }
            );

        }
    );

}



/* ==========================================================
   07. SCROLL SUAVE A CONTACTO
========================================================== */

function initialiseContactScroll() {

    const contactLinks =
        document.querySelectorAll(
            'a[href="#contacto"]'
        );


    const contactSection =
        document.getElementById(
            "contacto"
        );


    if (
        !contactSection
    ) {

        return;

    }


    contactLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    contactSection.scrollIntoView(
                        {
                            behavior:
                                servicesReducedMotion
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

}



/* ==========================================================
   08. SCROLL SUAVE A SERVICIOS
========================================================== */

function initialiseServicesScroll() {

    const links =
        document.querySelectorAll(
            'a[href="#servicios-listado"]'
        );


    const section =
        document.getElementById(
            "servicios-listado"
        );


    if (
        !section
    ) {

        return;

    }


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    section.scrollIntoView(
                        {
                            behavior:
                                servicesReducedMotion
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

}



/* ==========================================================
   09. INITIALISE
========================================================== */

createInfiniteTechnologyTrack();

initialiseServiceMediaMotion();

initialiseProcessHighlight();

initialiseServiceLinks();

initialiseContactScroll();

initialiseServicesScroll();