/* =====================================================
   ISAAC GALLO — MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   BLOG DATA

   Aquí añadiremos las entradas.

   IMPORTANTE:
   JavaScript las ordena automáticamente
   de más nueva a más antigua.
===================================================== */

const blogPosts = [

    {
        title: "Cómo mejorar el SEO técnico de una web",
        date: "2026-10-13",
        category: "SEO",
        excerpt:
            "Una introducción práctica a los aspectos técnicos que ayudan a mejorar el posicionamiento y rendimiento de una página web.",
        image: "",
        url: "#"
    },

    {
        title: "WordPress o desarrollo a medida: ¿qué necesita tu negocio?",
        date: "2026-10-08",
        category: "Desarrollo web",
        excerpt:
            "No todos los proyectos necesitan la misma tecnología. Analizamos cuándo tiene sentido utilizar WordPress y cuándo desarrollar desde cero.",
        image: "",
        url: "#"
    },

    {
        title: "Automatizar procesos utilizando APIs",
        date: "2026-10-02",
        category: "Automatización",
        excerpt:
            "Las APIs permiten conectar herramientas, reducir trabajo manual y construir procesos digitales mucho más eficientes.",
        image: "",
        url: "#"
    },

    {
        title: "Por qué la velocidad de una web importa para el SEO",
        date: "2026-09-25",
        category: "SEO",
        excerpt:
            "Rendimiento, experiencia de usuario y posicionamiento están mucho más relacionados de lo que parece.",
        image: "",
        url: "#"
    },

    {
        title: "Cómo pensar una web antes de empezar a diseñarla",
        date: "2026-09-18",
        category: "Estrategia digital",
        excerpt:
            "Una buena página web empieza entendiendo el negocio, sus clientes y los objetivos que debe cumplir.",
        image: "",
        url: "#"
    }

];


/* =====================================================
   BLOG RENDER
===================================================== */

const blogTrack =
    document.getElementById("blogTrack");

const blogPrev =
    document.getElementById("blogPrev");

const blogNext =
    document.getElementById("blogNext");


/*
   Ordenamos las publicaciones:

   más reciente
   ↓
   más antigua
*/

const orderedPosts = [
    ...blogPosts
].sort((a, b) => {

    return (
        new Date(b.date)
        -
        new Date(a.date)
    );

});


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(date) {

    const formattedDate =
        new Intl.DateTimeFormat(
            "es-ES",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        ).format(
            new Date(date)
        );

    return formattedDate;
}


/* =====================================================
   CREATE BLOG CARDS
===================================================== */

function renderBlogPosts() {

    if (!blogTrack) {
        return;
    }


    blogTrack.innerHTML =
        orderedPosts
            .map(post => {


                /*
                   Si hay imagen:
                   mostramos la imagen.

                   Si no:
                   mostramos placeholder.
                */

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
                        <div class="blog-card-image-placeholder">
                            Imagen del artículo
                        </div>
                    `;


                return `

                    <a
                        href="${post.url}"
                        class="blog-card"
                    >

                        <div class="blog-card-image">

                            ${imageHTML}

                        </div>


                        <div class="blog-card-content">


                            <div class="blog-meta">

                                <span class="blog-category">
                                    ${post.category}
                                </span>

                                <span>
                                    ·
                                </span>

                                <time datetime="${post.date}">
                                    ${formatDate(post.date)}
                                </time>

                            </div>


                            <h3>
                                ${post.title}
                            </h3>


                            <p>
                                ${post.excerpt}
                            </p>


                            <span class="blog-read-more">
                                Leer artículo →
                            </span>


                        </div>

                    </a>

                `;

            })
            .join("");

}


/* =====================================================
   BLOG SLIDER
===================================================== */

function getScrollAmount() {

    const card =
        blogTrack?.querySelector(
            ".blog-card"
        );


    if (!card) {
        return 0;
    }


    const styles =
        window.getComputedStyle(
            blogTrack
        );


    const gap =
        parseFloat(
            styles.columnGap
        ) || 0;


    return (
        card.offsetWidth
        +
        gap
    );

}


/* =========================
   NEXT
========================= */

blogNext?.addEventListener(
    "click",
    () => {

        blogTrack.scrollBy({
            left:
                getScrollAmount(),

            behavior:
                "smooth"
        });

    }
);


/* =========================
   PREVIOUS
========================= */

blogPrev?.addEventListener(
    "click",
    () => {

        blogTrack.scrollBy({
            left:
                -getScrollAmount(),

            behavior:
                "smooth"
        });

    }
);


/* =====================================================
   UPDATE ARROWS
===================================================== */

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
        blogTrack.scrollLeft <= 5;


    blogNext.disabled =
        blogTrack.scrollLeft
        >=
        maxScroll - 5;

}


/* =====================================================
   INITIALISE
===================================================== */

renderBlogPosts();


updateBlogControls();


blogTrack?.addEventListener(
    "scroll",
    updateBlogControls
);


window.addEventListener(
    "resize",
    updateBlogControls
);