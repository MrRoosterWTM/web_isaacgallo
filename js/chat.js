/* ==========================================================
   ISAAC GALLO — LICO CHAT
   VERSIÓN 1 — FRONTEND DEMO
========================================================== */


/* ==========================================================
   01. ELEMENTS
========================================================== */

const licoChat =
    document.getElementById(
        "licoChat"
    );


const licoChatLauncher =
    document.getElementById(
        "licoChatLauncher"
    );


const licoChatPanel =
    document.getElementById(
        "licoChatPanel"
    );


const licoChatClose =
    document.getElementById(
        "licoChatClose"
    );


const licoChatMessages =
    document.getElementById(
        "licoChatMessages"
    );


const licoChatForm =
    document.getElementById(
        "licoChatForm"
    );


const licoChatInput =
    document.getElementById(
        "licoChatInput"
    );


const licoQuickReplies =
    document.getElementById(
        "licoQuickReplies"
    );


const licoWhatsapp =
    document.getElementById(
        "licoWhatsapp"
    );


const licoWhatsappLink =
    document.getElementById(
        "licoWhatsappLink"
    );



/* ==========================================================
   02. CONFIG
========================================================== */

const LICO_STORAGE_KEY =
    "lico_chat_messages_v1";


/*
   IMPORTANTE:

   Más adelante sustituiremos esto
   por tu número real.

   Formato:
   código país + número, sin + ni espacios.

   Ejemplo:

   34600000000
*/

const LICO_WHATSAPP_NUMBER =
    "34XXXXXXXXX";


const LICO_WHATSAPP_TEXT =
    "Hola Isaac, vengo desde el asistente Lico de tu web. Quería consultarte sobre un proyecto.";



/* ==========================================================
   03. DEFAULT MESSAGE
========================================================== */

const licoDefaultMessages = [

    {

        role:
            "assistant",

        content:
            "Hola 👋 Soy Lico, el asistente de Isaac. Puedo ayudarte a conocer sus servicios, orientarte sobre tu proyecto o resolver algunas dudas antes de hablar con él."

    }

];



/* ==========================================================
   04. STATE
========================================================== */

let licoMessages =
    loadLicoMessages();


let licoIsTyping =
    false;



/* ==========================================================
   05. STORAGE
========================================================== */

function loadLicoMessages() {

    try {

        const stored =
            sessionStorage.getItem(
                LICO_STORAGE_KEY
            );


        if (
            !stored
        ) {

            return [
                ...licoDefaultMessages
            ];

        }


        const parsed =
            JSON.parse(
                stored
            );


        if (
            !Array.isArray(
                parsed
            )
        ) {

            return [
                ...licoDefaultMessages
            ];

        }


        return parsed;

    }

    catch (
        error
    ) {

        return [
            ...licoDefaultMessages
        ];

    }

}



function saveLicoMessages() {

    try {

        sessionStorage.setItem(

            LICO_STORAGE_KEY,

            JSON.stringify(
                licoMessages
            )

        );

    }

    catch (
        error
    ) {

        /*
           Si sessionStorage fallase,
           el chat sigue funcionando.
        */

    }

}



/* ==========================================================
   06. OPEN / CLOSE
========================================================== */

function openLicoChat() {

    if (
        !licoChat ||
        !licoChatLauncher ||
        !licoChatPanel
    ) {

        return;

    }


    licoChat.classList.add(
        "is-open"
    );


    licoChatLauncher.setAttribute(
        "aria-expanded",
        "true"
    );


    licoChatPanel.setAttribute(
        "aria-hidden",
        "false"
    );


    window.setTimeout(
        () => {

            licoChatInput
                ?.focus();

        },

        180
    );

}



function closeLicoChat() {

    if (
        !licoChat ||
        !licoChatLauncher ||
        !licoChatPanel
    ) {

        return;

    }


    licoChat.classList.remove(
        "is-open"
    );


    licoChatLauncher.setAttribute(
        "aria-expanded",
        "false"
    );


    licoChatPanel.setAttribute(
        "aria-hidden",
        "true"
    );


    licoChatLauncher.focus();

}



licoChatLauncher
    ?.addEventListener(
        "click",
        () => {

            if (
                licoChat
                    ?.classList
                    .contains(
                        "is-open"
                    )
            ) {

                closeLicoChat();

            }

            else {

                openLicoChat();

            }

        }
    );


licoChatClose
    ?.addEventListener(
        "click",
        closeLicoChat
    );


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeLicoChat();

        }

    }
);



/* ==========================================================
   07. CREATE MESSAGE
========================================================== */

function createLicoMessageElement(
    role,
    content
) {

    const message =
        document.createElement(
            "div"
        );


    message.className =
        `
            lico-message
            lico-message-${role}
        `;


    const bubble =
        document.createElement(
            "div"
        );


    bubble.className =
        "lico-message-bubble";


    bubble.textContent =
        content;


    const label =
        document.createElement(
            "span"
        );


    label.className =
        "lico-message-label";


    label.textContent =
        role ===
        "assistant"

            ? "Lico"

            : "Tú";


    message.appendChild(
        bubble
    );


    message.appendChild(
        label
    );


    return message;

}



/* ==========================================================
   08. RENDER
========================================================== */

function renderLicoMessages() {

    if (
        !licoChatMessages
    ) {

        return;

    }


    licoChatMessages.innerHTML =
        "";


    licoMessages.forEach(
        message => {

            const element =
                createLicoMessageElement(
                    message.role,
                    message.content
                );


            licoChatMessages.appendChild(
                element
            );

        }
    );


    scrollLicoToBottom();


    updateWhatsappVisibility();

}



/* ==========================================================
   09. SCROLL
========================================================== */

function scrollLicoToBottom() {

    if (
        !licoChatMessages
    ) {

        return;

    }


    licoChatMessages.scrollTop =
        licoChatMessages.scrollHeight;

}



/* ==========================================================
   10. ADD MESSAGE
========================================================== */

function addLicoMessage(
    role,
    content
) {

    licoMessages.push(
        {
            role,
            content
        }
    );


    saveLicoMessages();


    const element =
        createLicoMessageElement(
            role,
            content
        );


    licoChatMessages
        ?.appendChild(
            element
        );


    scrollLicoToBottom();


    updateWhatsappVisibility();

}



/* ==========================================================
   11. TYPING
========================================================== */

function showLicoTyping() {

    if (
        !licoChatMessages ||
        licoIsTyping
    ) {

        return;

    }


    licoIsTyping =
        true;


    const typing =
        document.createElement(
            "div"
        );


    typing.className =
        "lico-typing";


    typing.id =
        "licoTyping";


    typing.innerHTML =
        `
            <span></span>
            <span></span>
            <span></span>
        `;


    licoChatMessages.appendChild(
        typing
    );


    scrollLicoToBottom();

}



function hideLicoTyping() {

    const typing =
        document.getElementById(
            "licoTyping"
        );


    typing?.remove();


    licoIsTyping =
        false;

}



/* ==========================================================
   12. TEMPORARY DEMO RESPONSE
========================================================== */

function getLicoDemoResponse(
    message
) {

    const normalized =
        message
            .toLowerCase()
            .normalize(
                "NFD"
            )
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );


    /*
       TIENDA / E-COMMERCE
    */

    if (
        normalized.includes(
            "tienda"
        ) ||
        normalized.includes(
            "ecommerce"
        ) ||
        normalized.includes(
            "e-commerce"
        ) ||
        normalized.includes(
            "woocommerce"
        )
    ) {

        return "Para una tienda online, WordPress con WooCommerce puede ser una opción muy interesante dependiendo del catálogo y de las funcionalidades que necesites. Isaac también ha trabajado con configuración de pagos y TPV. Si me cuentas qué quieres vender, puedo orientarte un poco mejor.";

    }



    /*
       WORDPRESS
    */

    if (
        normalized.includes(
            "wordpress"
        )
    ) {

        return "Isaac desarrolla páginas con WordPress desde 400 €. Es una buena opción para webs corporativas, pequeños negocios y proyectos que necesitan gestionar contenido fácilmente.";

    }



    /*
       DESARROLLO A MEDIDA
    */

    if (
        normalized.includes(
            "codigo"
        ) ||
        normalized.includes(
            "medida"
        ) ||
        normalized.includes(
            "html"
        )
    ) {

        return "El desarrollo a medida parte desde 800 €. Está pensado para proyectos que necesitan más control sobre diseño, rendimiento, integraciones o funcionalidades específicas.";

    }



    /*
       MANTENIMIENTO
    */

    if (
        normalized.includes(
            "mantenimiento"
        )
    ) {

        return "Isaac ofrece mantenimiento web desde 200 € al mes. Puede incluir mantenimiento técnico, actualizaciones, copias de seguridad, revisión de seguridad, rendimiento y pequeñas modificaciones.";

    }



    /*
       PRECIOS
    */

    if (
        normalized.includes(
            "precio"
        ) ||
        normalized.includes(
            "cuanto"
        ) ||
        normalized.includes(
            "coste"
        ) ||
        normalized.includes(
            "cuesta"
        )
    ) {

        return "Como orientación: WordPress parte desde 400 €, desarrollo web a medida desde 800 € y mantenimiento desde 200 € al mes. El precio final depende del alcance real del proyecto.";

    }



    /*
       SERVICIOS
    */

    if (
        normalized.includes(
            "servicio"
        )
    ) {

        return "Actualmente Isaac trabaja principalmente con desarrollo web en WordPress, desarrollo web a medida y mantenimiento. También realiza integraciones, APIs y automatizaciones cuando el proyecto lo necesita.";

    }



    /*
       PROYECTOS
    */

    if (
        normalized.includes(
            "proyecto"
        ) ||
        normalized.includes(
            "portfolio"
        )
    ) {

        return "Puedes encontrar proyectos como Deportes Stars, Stars Volleyball y Wonders Voley. Incluyen e-commerce, WordPress, formularios, automatización, pagos online y desarrollo con código.";

    }



    /*
       CONTACTO
    */

    if (
        normalized.includes(
            "isaac"
        ) ||
        normalized.includes(
            "whatsapp"
        ) ||
        normalized.includes(
            "hablar"
        ) ||
        normalized.includes(
            "contactar"
        )
    ) {

        revealLicoWhatsapp();


        return "Claro. Si prefieres hablar directamente con Isaac, te he dejado una opción para continuar por WhatsApp.";

    }



    /*
       DEFAULT
    */

    return "Puedo ayudarte con información sobre los servicios de Isaac, precios orientativos, proyectos o qué tipo de solución puede encajar con tu idea. Cuéntame un poco más sobre lo que necesitas.";

}



/* ==========================================================
   13. SEND MESSAGE
========================================================== */

function sendLicoMessage(
    rawMessage
) {

    const message =
        rawMessage.trim();


    if (
        !message ||
        licoIsTyping
    ) {

        return;

    }


    addLicoMessage(
        "user",
        message
    );


    if (
        licoChatInput
    ) {

        licoChatInput.value =
            "";


        resizeLicoTextarea();

    }


    showLicoTyping();


    window.setTimeout(
        () => {

            hideLicoTyping();


            const response =
                getLicoDemoResponse(
                    message
                );


            addLicoMessage(
                "assistant",
                response
            );

        },

        650
        +
        Math.random()
        *
        450

    );

}



/* ==========================================================
   14. FORM
========================================================== */

licoChatForm
    ?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            sendLicoMessage(
                licoChatInput
                    ?.value
                    ??
                    ""
            );

        }
    );



/* ==========================================================
   15. ENTER TO SEND
========================================================== */

licoChatInput
    ?.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
                &&
                !event.shiftKey
            ) {

                event.preventDefault();


                licoChatForm
                    ?.requestSubmit();

            }

        }
    );



/* ==========================================================
   16. TEXTAREA AUTO RESIZE
========================================================== */

function resizeLicoTextarea() {

    if (
        !licoChatInput
    ) {

        return;

    }


    licoChatInput.style.height =
        "auto";


    licoChatInput.style.height =
        `${Math.min(
            licoChatInput.scrollHeight,
            110
        )}px`;

}


licoChatInput
    ?.addEventListener(
        "input",
        resizeLicoTextarea
    );



/* ==========================================================
   17. QUICK REPLIES
========================================================== */

licoQuickReplies
    ?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-lico-message]"
                );


            if (
                !button
            ) {

                return;

            }


            const message =
                button.dataset
                    .licoMessage;


            if (
                !message
            ) {

                return;

            }


            sendLicoMessage(
                message
            );

        }
    );



/* ==========================================================
   18. WHATSAPP
========================================================== */

function revealLicoWhatsapp() {

    if (
        !licoWhatsapp
    ) {

        return;

    }


    licoWhatsapp.hidden =
        false;

}



function updateWhatsappVisibility() {

    const userMessages =
        licoMessages.filter(
            message =>
                message.role ===
                "user"
        );


    /*
       De momento aparece automáticamente
       después de dos mensajes del visitante.

       Más adelante será la IA quien
       decida cuándo ofrecerlo.
    */

    if (
        userMessages.length >= 2
    ) {

        revealLicoWhatsapp();

    }

}



/* ==========================================================
   19. WHATSAPP LINK
========================================================== */

function initialiseLicoWhatsapp() {

    if (
        !licoWhatsappLink
    ) {

        return;

    }


    const encodedText =
        encodeURIComponent(
            LICO_WHATSAPP_TEXT
        );


    licoWhatsappLink.href =
        `
        https://api.whatsapp.com/send
        ?phone=${LICO_WHATSAPP_NUMBER}
        &text=${encodedText}
        `
        .replace(
            /\s+/g,
            ""
        );

}



/* ==========================================================
   20. INITIALISE
========================================================== */

function initialiseLicoChat() {

    renderLicoMessages();

    initialiseLicoWhatsapp();

    resizeLicoTextarea();

}



initialiseLicoChat();