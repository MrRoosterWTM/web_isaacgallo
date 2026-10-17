/* ==========================================================
   ISAAC GALLO — MAIN JAVASCRIPT
========================================================== */


/* ==========================================================
   01. BLOG DATA
========================================================== */

const blogPosts = [

    {
        title:
            "Cómo mejorar el SEO técnico de una web",

        date:
            "2026-10-13",

        category:
            "SEO",

        excerpt:
            "Una introducción práctica a los aspectos técnicos que ayudan a mejorar el posicionamiento y rendimiento de una página web.",

        image:
            "",

        url:
            "#"
    },


    {
        title:
            "WordPress o desarrollo a medida: ¿qué necesita tu negocio?",

        date:
            "2026-10-08",

        category:
            "Desarrollo web",

        excerpt:
            "No todos los proyectos necesitan la misma tecnología. Analizamos cuándo tiene sentido utilizar WordPress y cuándo desarrollar desde cero.",

        image:
            "",

        url:
            "#"
    },


    {
        title:
            "Automatizar procesos utilizando APIs",

        date:
            "2026-10-02",

        category:
            "Automatización",

        excerpt:
            "Las APIs permiten conectar herramientas, reducir trabajo manual y construir procesos digitales mucho más eficientes.",

        image:
            "",

        url:
            "#"
    },


    {
        title:
            "Por qué la velocidad de una web importa para el SEO",

        date:
            "2026-09-25",

        category:
            "SEO",

        excerpt:
            "Rendimiento, experiencia de usuario y posicionamiento están mucho más relacionados de lo que parece.",

        image:
            "",

        url:
            "#"
    },


    {
        title:
            "Cómo pensar una web antes de empezar a diseñarla",

        date:
            "2026-09-18",

        category:
            "Estrategia digital",

        excerpt:
            "Una buena página web empieza entendiendo el negocio, sus clientes y los objetivos que debe cumplir.",

        image:
            "",

        url:
            "#"
    }

];



/* ==========================================================
   02. ELEMENTOS BLOG
========================================================== */

const blogTrack =
    document.getElementById(
        "blogTrack"
    );


const blogPrev =
    document.getElementById(
        "blogPrev"
    );


const blogNext =
    document.getElementById(
        "blogNext"
    );



/* ==========================================================
   03. FECHAS
========================================================== */

function parseLocalDate(
    dateString
) {

    const [
        year,
        month,
        day
    ] =
        dateString
            .split("-")
            .map(Number);


    return new Date(
        year,
        month - 1,
        day
    );

}



function formatDate(
    dateString
) {

    return new Intl.DateTimeFormat(
        "es-ES",
        {
            day:
                "numeric",

            month:
                "short",

            year:
                "numeric"
        }
    ).format(
        parseLocalDate(
            dateString
        )
    );

}



/* ==========================================================
   04. ORDENAR BLOG
========================================================== */

const orderedPosts =
    [
        ...blogPosts
    ]
    .sort(
        (
            a,
            b
        ) => {

            return (
                parseLocalDate(
                    b.date
                )
                -
                parseLocalDate(
                    a.date
                )
            );

        }
    );



/* ==========================================================
   05. GENERAR BLOG
========================================================== */

function renderBlogPosts() {

    if (
        !blogTrack
    ) {

        return;

    }


    blogTrack.innerHTML =

        orderedPosts

            .map(
                post => {


                    const imageHTML =

                        post.image

                            ? `
                                <img
                                    src="${post.image}"
                                    alt="${post.title}"
                                    loading="lazy"
                                >
                            `

                            : `
                                <div
                                    class="blog-card-image-placeholder"
                                >
                                    Imagen del artículo
                                </div>
                            `;


                    /*
                       IMPORTANTE:

                       Las tarjetas del blog NO llevan
                       data-reveal ni data-delay.

                       De esta forma aparecen directamente
                       y no tienen animación de entrada.
                    */

                    return `

                        <a
                            href="${post.url}"
                            class="blog-card"
                        >

                            <div
                                class="blog-card-image"
                            >

                                ${imageHTML}

                            </div>


                            <div
                                class="blog-card-content"
                            >


                                <div
                                    class="blog-meta"
                                >

                                    <span
                                        class="blog-category"
                                    >
                                        ${post.category}
                                    </span>


                                    <span>
                                        ·
                                    </span>


                                    <time
                                        datetime="${post.date}"
                                    >
                                        ${formatDate(
                                            post.date
                                        )}
                                    </time>

                                </div>


                                <h3>
                                    ${post.title}
                                </h3>


                                <p>
                                    ${post.excerpt}
                                </p>


                                <span
                                    class="blog-read-more"
                                >
                                    Leer artículo →
                                </span>


                            </div>

                        </a>

                    `;

                }
            )
            .join("");

}



/* ==========================================================
   06. BLOG SLIDER
========================================================== */

function getScrollAmount() {

    const card =
        blogTrack
            ?.querySelector(
                ".blog-card"
            );


    if (
        !card
    ) {

        return 0;

    }


    const styles =
        window
            .getComputedStyle(
                blogTrack
            );


    const gap =
        parseFloat(
            styles.columnGap
        )
        ||
        0;


    return (
        card.offsetWidth
        +
        gap
    );

}



/* ==========================================================
   07. BLOG — SIGUIENTE
========================================================== */

blogNext
    ?.addEventListener(
        "click",
        () => {

            blogTrack
                .scrollBy(
                    {
                        left:
                            getScrollAmount(),

                        behavior:
                            "smooth"
                    }
                );

        }
    );



/* ==========================================================
   08. BLOG — ANTERIOR
========================================================== */

blogPrev
    ?.addEventListener(
        "click",
        () => {

            blogTrack
                .scrollBy(
                    {
                        left:
                            -getScrollAmount(),

                        behavior:
                            "smooth"
                    }
                );

        }
    );



/* ==========================================================
   09. BLOG CONTROLS
========================================================== */

function updateBlogControls() {

    if (
        !blogTrack
        ||
        !blogPrev
        ||
        !blogNext
    ) {

        return;

    }


    const maxScroll =
        blogTrack.scrollWidth
        -
        blogTrack.clientWidth;


    blogPrev.disabled =
        blogTrack.scrollLeft
        <=
        5;


    blogNext.disabled =
        blogTrack.scrollLeft
        >=
        maxScroll
        -
        5;

}



/* ==========================================================
   10. HEADER SCROLL
========================================================== */

const siteHeader =
    document.getElementById(
        "siteHeader"
    );


function updateHeader() {

    if (
        !siteHeader
    ) {

        return;

    }


    if (
        window.scrollY
        >
        20
    ) {

        siteHeader
            .classList
            .add(
                "is-scrolled"
            );

    } else {

        siteHeader
            .classList
            .remove(
                "is-scrolled"
            );

    }

}



/* ==========================================================
   11. MOBILE MENU
========================================================== */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );



function closeMobileMenu() {

    if (
        !siteHeader
        ||
        !menuToggle
    ) {

        return;

    }


    siteHeader
        .classList
        .remove(
            "menu-open"
        );


    menuToggle
        .setAttribute(
            "aria-expanded",
            "false"
        );


    menuToggle
        .setAttribute(
            "aria-label",
            "Abrir menú"
        );

}



function toggleMobileMenu() {

    if (
        !siteHeader
        ||
        !menuToggle
    ) {

        return;

    }


    const isOpen =
        siteHeader
            .classList
            .toggle(
                "menu-open"
            );


    menuToggle
        .setAttribute(
            "aria-expanded",
            String(
                isOpen
            )
        );


    menuToggle
        .setAttribute(
            "aria-label",

            isOpen
                ? "Cerrar menú"
                : "Abrir menú"
        );

}



menuToggle
    ?.addEventListener(
        "click",
        toggleMobileMenu
    );



mobileMenu
    ?.querySelectorAll(
        "a"
    )
    .forEach(
        link => {

            link
                .addEventListener(
                    "click",
                    closeMobileMenu
                );

        }
    );



document
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key
                ===
                "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );



/* ==========================================================
   12. SCROLL REVEAL
========================================================== */

function initialiseRevealAnimations() {

    const elements =
        document
            .querySelectorAll(
                "[data-reveal]"
            );


    if (
        !elements.length
    ) {

        return;

    }


    const reducedMotion =
        window
            .matchMedia(
                "(prefers-reduced-motion: reduce)"
            )
            .matches;


    if (
        reducedMotion
    ) {

        elements
            .forEach(
                element => {

                    element
                        .classList
                        .add(
                            "is-visible"
                        );

                }
            );


        return;

    }


    /*
       Activamos las animaciones
       únicamente si JavaScript funciona.
    */

    document
        .documentElement
        .classList
        .add(
            "reveal-ready"
        );


    /*
       Aplicamos retrasos definidos
       mediante data-delay.
    */

    elements
        .forEach(
            element => {

                const delay =
                    element
                        .dataset
                        .delay;


                if (
                    delay
                ) {

                    element
                        .style
                        .setProperty(
                            "--reveal-delay",
                            `${delay}ms`
                        );

                }

            }
        );



    const observer =
        new IntersectionObserver(

            entries => {

                entries
                    .forEach(
                        entry => {

                            if (
                                entry
                                    .isIntersecting
                            ) {

                                entry
                                    .target
                                    .classList
                                    .add(
                                        "is-visible"
                                    );


                                observer
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

            },

            {
                threshold:
                    0.12,

                rootMargin:
                    "0px 0px -7% 0px"
            }

        );



    elements
        .forEach(
            element => {

                observer
                    .observe(
                        element
                    );

            }
        );

}



/* ==========================================================
   13. RESIZE
========================================================== */

function handleResize() {

    updateBlogControls();


    /*
       Si pasamos de tablet
       a escritorio cerramos
       automáticamente el menú.
    */

    if (
        window.innerWidth
        >
        820
    ) {

        closeMobileMenu();

    }

}



/* ==========================================================
   14. INITIALISE
========================================================== */

/*
   Primero construimos el blog.
*/

renderBlogPosts();


/*
   Después iniciamos las animaciones.

   Las tarjetas del blog no tienen
   data-reveal, por lo que quedan fuera
   automáticamente.
*/

initialiseRevealAnimations();


updateBlogControls();

updateHeader();



/* ==========================================================
   15. EVENTS
========================================================== */

blogTrack
    ?.addEventListener(
        "scroll",
        updateBlogControls,
        {
            passive:
                true
        }
    );


window
    .addEventListener(
        "scroll",
        updateHeader,
        {
            passive:
                true
        }
    );


window
    .addEventListener(
        "resize",
        handleResize
    );


window
    .addEventListener(
        "load",
        updateBlogControls
    );