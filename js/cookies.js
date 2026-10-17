/* ==========================================================
   ISAAC GALLO — COOKIE CONSENT MANAGER
   Google Analytics 4 + Basic Consent Mode
========================================================== */


(() => {

    "use strict";


    /* ======================================================
       01. CONFIG
    ====================================================== */

    const STORAGE_KEY =
        "isaac_cookie_consent";


    /*
       Subimos la versión porque ahora
       activamos Google Analytics realmente.
    */

    const CONSENT_VERSION =
        2;


    const GA_MEASUREMENT_ID =
        "G-XLW6LY4FLD";


    const GA_SCRIPT_ID =
        "isaac-google-analytics";


    let analyticsConfigured =
        false;


    let analyticsActive =
        false;



    /* ======================================================
       02. GOOGLE CONSENT — DEFAULT DENIED
    ====================================================== */

    /*
       Creamos dataLayer y gtag SIN cargar todavía
       ningún script de Google.

       Así podemos definir el consentimiento por defecto
       como denegado antes de cargar Analytics.
    */

    window.dataLayer =
        window.dataLayer
        ||
        [];


    window.gtag =
        window.gtag
        ||
        function () {

            window.dataLayer.push(
                arguments
            );

        };


    /*
       Consent Mode v2.

       No usamos publicidad, por lo que todo
       lo relacionado con Ads queda denegado.
    */

    window.gtag(
        "consent",
        "default",
        {

            analytics_storage:
                "denied",

            ad_storage:
                "denied",

            ad_user_data:
                "denied",

            ad_personalization:
                "denied",

            wait_for_update:
                500

        }
    );



    /* ======================================================
       03. DEFAULT PREFERENCES
    ====================================================== */

    const DEFAULT_PREFERENCES = {

        version:
            CONSENT_VERSION,

        necessary:
            true,

        analytics:
            false,

        timestamp:
            null

    };



    /* ======================================================
       04. STATE
    ====================================================== */

    let preferences =
        loadPreferences()
        ||
        {
            ...DEFAULT_PREFERENCES
        };


    let lastFocusedElement =
        null;



    /* ======================================================
       05. CREATE INTERFACE
    ====================================================== */

    function createCookieInterface() {


        const wrapper =
            document.createElement(
                "div"
            );


        wrapper.innerHTML = `

            <!-- ==========================================
                 COOKIE BANNER
            =========================================== -->

            <section
                class="cookie-banner"
                id="cookieBanner"
                aria-labelledby="cookieBannerTitle"
            >

                <div
                    class="cookie-banner-content"
                >

                    <p
                        class="cookie-banner-label"
                    >
                        Privacidad
                    </p>


                    <h2
                        id="cookieBannerTitle"
                    >
                        Tú decides sobre tus cookies.
                    </h2>


                    <p>

                        Utilizamos tecnologías necesarias para
                        el funcionamiento de la web y, si nos das
                        permiso, cookies analíticas para entender
                        cómo se utiliza y poder mejorarla.

                        Puedes aceptar, rechazar o configurar
                        tus preferencias.

                        <a href="/cookies/">
                            Más información
                        </a>.

                    </p>

                </div>


                <div
                    class="cookie-banner-actions"
                >

                    <button
                        type="button"
                        class="
                            cookie-button
                            cookie-button-reject
                        "
                        id="cookieRejectAll"
                    >
                        Rechazar
                    </button>


                    <button
                        type="button"
                        class="
                            cookie-button
                            cookie-button-settings
                        "
                        id="cookieOpenSettings"
                    >
                        Configurar
                    </button>


                    <button
                        type="button"
                        class="
                            cookie-button
                            cookie-button-accept
                        "
                        id="cookieAcceptAll"
                    >
                        Aceptar
                    </button>

                </div>

            </section>



            <!-- ==========================================
                 COOKIE SETTINGS MODAL
            =========================================== -->

            <div
                class="cookie-modal-overlay"
                id="cookieModalOverlay"
                aria-hidden="true"
            >

                <div
                    class="cookie-modal"
                    id="cookieModal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cookieModalTitle"
                    tabindex="-1"
                >


                    <!-- HEADER -->

                    <div
                        class="cookie-modal-header"
                    >

                        <div
                            class="cookie-modal-header-text"
                        >

                            <p
                                class="cookie-modal-label"
                            >
                                Privacidad
                            </p>


                            <h2
                                id="cookieModalTitle"
                            >
                                Configura tus cookies
                            </h2>

                        </div>


                        <button
                            type="button"
                            class="cookie-modal-close"
                            id="cookieModalClose"
                            aria-label="Cerrar configuración de cookies"
                        >
                            ×
                        </button>

                    </div>



                    <!-- INTRO -->

                    <p
                        class="cookie-modal-intro"
                    >

                        Puedes decidir qué tecnologías opcionales
                        quieres permitir. Las necesarias siempre
                        permanecen activas porque permiten gestionar
                        funciones esenciales de la web.

                    </p>



                    <!-- PREFERENCES -->

                    <div
                        class="cookie-preferences"
                    >


                        <!-- NECESSARY -->

                        <div
                            class="cookie-preference"
                        >

                            <div
                                class="cookie-preference-info"
                            >

                                <h3>
                                    Necesarias
                                </h3>


                                <p>

                                    Permiten funciones esenciales
                                    como recordar tu elección
                                    de privacidad.

                                </p>

                            </div>


                            <span
                                class="cookie-required"
                            >
                                Siempre activas
                            </span>

                        </div>



                        <!-- ANALYTICS -->

                        <div
                            class="cookie-preference"
                        >

                            <div
                                class="cookie-preference-info"
                            >

                                <h3>
                                    Analíticas
                                </h3>


                                <p>

                                    Utilizamos Google Analytics 4
                                    para obtener estadísticas sobre
                                    el uso de la web y mejorar
                                    progresivamente la experiencia.

                                </p>

                            </div>


                            <label
                                class="cookie-switch"
                                aria-label="Permitir cookies analíticas"
                            >

                                <input
                                    type="checkbox"
                                    id="cookieAnalyticsToggle"
                                >

                                <span
                                    class="cookie-switch-track"
                                ></span>

                            </label>

                        </div>


                    </div>



                    <!-- LINKS -->

                    <div
                        class="cookie-modal-links"
                    >

                        <a href="/cookies/">
                            Política de Cookies
                        </a>

                        ·

                        <a href="/privacidad/">
                            Política de Privacidad
                        </a>

                    </div>



                    <!-- ACTIONS -->

                    <div
                        class="cookie-modal-footer"
                    >

                        <button
                            type="button"
                            class="
                                cookie-button
                                cookie-button-reject
                            "
                            id="cookieModalReject"
                        >
                            Rechazar
                        </button>


                        <button
                            type="button"
                            class="
                                cookie-button
                                cookie-button-settings
                            "
                            id="cookieSavePreferences"
                        >
                            Guardar preferencias
                        </button>


                        <button
                            type="button"
                            class="
                                cookie-button
                                cookie-button-accept
                            "
                            id="cookieModalAccept"
                        >
                            Aceptar
                        </button>

                    </div>


                </div>

            </div>

        `;


        document.body.appendChild(
            wrapper
        );

    }



    /* ======================================================
       06. CREATE INTERFACE
    ====================================================== */

    createCookieInterface();



    /* ======================================================
       07. DOM REFERENCES
    ====================================================== */

    const cookieBanner =
        document.getElementById(
            "cookieBanner"
        );


    const modalOverlay =
        document.getElementById(
            "cookieModalOverlay"
        );


    const cookieModal =
        document.getElementById(
            "cookieModal"
        );


    const analyticsToggle =
        document.getElementById(
            "cookieAnalyticsToggle"
        );


    const rejectAllButton =
        document.getElementById(
            "cookieRejectAll"
        );


    const acceptAllButton =
        document.getElementById(
            "cookieAcceptAll"
        );


    const settingsButton =
        document.getElementById(
            "cookieOpenSettings"
        );


    const modalCloseButton =
        document.getElementById(
            "cookieModalClose"
        );


    const modalRejectButton =
        document.getElementById(
            "cookieModalReject"
        );


    const modalAcceptButton =
        document.getElementById(
            "cookieModalAccept"
        );


    const savePreferencesButton =
        document.getElementById(
            "cookieSavePreferences"
        );



    /* ======================================================
       08. STORAGE
    ====================================================== */

    function loadPreferences() {

        try {


            const stored =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (
                !stored
            ) {

                return null;

            }


            const parsed =
                JSON.parse(
                    stored
                );


            /*
               Si la versión es antigua,
               pedimos consentimiento otra vez.
            */

            if (
                parsed.version
                !==
                CONSENT_VERSION
            ) {

                localStorage.removeItem(
                    STORAGE_KEY
                );


                return null;

            }


            return {

                version:
                    CONSENT_VERSION,

                necessary:
                    true,

                analytics:
                    Boolean(
                        parsed.analytics
                    ),

                timestamp:
                    parsed.timestamp
                    ||
                    null

            };


        } catch (
            error
        ) {


            return null;

        }

    }



    function savePreferences(
        newPreferences
    ) {


        preferences = {

            version:
                CONSENT_VERSION,

            necessary:
                true,

            analytics:
                Boolean(
                    newPreferences.analytics
                ),

            timestamp:
                new Date()
                    .toISOString()

        };


        try {


            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    preferences
                )
            );


        } catch (
            error
        ) {


            console.warn(
                "No se pudieron guardar las preferencias de cookies."
            );

        }


        /*
           Aplicamos inmediatamente
           el nuevo estado.
        */

        applyConsentState();


        notifyConsentUpdate();


        return preferences;

    }



    /* ======================================================
       09. GOOGLE ANALYTICS — LOAD SCRIPT
    ====================================================== */

    function loadGoogleAnalyticsScript() {


        /*
           Evitamos insertar Google dos veces.
        */

        if (
            document.getElementById(
                GA_SCRIPT_ID
            )
        ) {

            return;

        }


        const script =
            document.createElement(
                "script"
            );


        script.id =
            GA_SCRIPT_ID;


        script.async =
            true;


        script.src =
            `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;


        document.head.appendChild(
            script
        );

    }



    /* ======================================================
       10. ENABLE GOOGLE ANALYTICS
    ====================================================== */

    function enableAnalytics() {


        /*
           Reactivamos Analytics en caso
           de que hubiera sido desactivado
           anteriormente durante esta sesión.
        */

        window[
            `ga-disable-${GA_MEASUREMENT_ID}`
        ] =
            false;



        /*
           Actualizamos Consent Mode.
        */

        window.gtag(
            "consent",
            "update",
            {

                analytics_storage:
                    "granted",

                ad_storage:
                    "denied",

                ad_user_data:
                    "denied",

                ad_personalization:
                    "denied"

            }
        );



        /*
           Cargamos la librería de Google
           únicamente después del consentimiento.
        */

        loadGoogleAnalyticsScript();



        /*
           Primera configuración de GA4.
        */

        if (
            !analyticsConfigured
        ) {


            window.gtag(
                "js",
                new Date()
            );


            window.gtag(
                "config",
                GA_MEASUREMENT_ID
            );


            analyticsConfigured =
                true;


            analyticsActive =
                true;


            return;

        }



        /*
           Caso especial:

           El usuario había aceptado,
           luego rechazó,
           y vuelve a aceptar sin recargar.

           Enviamos una nueva vista
           para comenzar de nuevo la medición.
        */

        if (
            !analyticsActive
        ) {


            window.gtag(
                "event",
                "page_view",
                {

                    send_to:
                        GA_MEASUREMENT_ID,

                    page_location:
                        window.location.href,

                    page_title:
                        document.title

                }
            );


        }


        analyticsActive =
            true;

    }



    /* ======================================================
       11. DELETE GOOGLE ANALYTICS COOKIES
    ====================================================== */

    function deleteAnalyticsCookies() {


        const cookies =
            document.cookie
                .split(";");


        const hostname =
            window.location.hostname
                .replace(
                    /^www\./,
                    ""
                );


        cookies.forEach(
            cookie => {


                const name =
                    cookie
                        .split("=")[0]
                        .trim();


                const isAnalyticsCookie =

                    name === "_ga"

                    ||

                    name.startsWith(
                        "_ga_"
                    );


                if (
                    !isAnalyticsCookie
                ) {

                    return;

                }



                /*
                   Eliminamos para el host actual.
                */

                document.cookie =

                    `${name}=;` +
                    `expires=Thu, 01 Jan 1970 00:00:00 UTC;` +
                    `path=/;`;



                /*
                   Eliminamos también por dominio
                   para cubrir cookies establecidas
                   en .isaacgallo.com.
                */

                document.cookie =

                    `${name}=;` +
                    `expires=Thu, 01 Jan 1970 00:00:00 UTC;` +
                    `path=/;` +
                    `domain=.${hostname};`;

            }
        );

    }



    /* ======================================================
       12. DISABLE GOOGLE ANALYTICS
    ====================================================== */

    function disableAnalytics() {


        /*
           Evita que GA continúe enviando
           datos si ya estaba cargado.
        */

        window[
            `ga-disable-${GA_MEASUREMENT_ID}`
        ] =
            true;



        window.gtag(
            "consent",
            "update",
            {

                analytics_storage:
                    "denied",

                ad_storage:
                    "denied",

                ad_user_data:
                    "denied",

                ad_personalization:
                    "denied"

            }
        );


        analyticsActive =
            false;


        /*
           Si ya se habían creado cookies,
           las eliminamos al retirar consentimiento.
        */

        deleteAnalyticsCookies();

    }



    /* ======================================================
       13. APPLY CONSENT STATE
    ====================================================== */

    function applyConsentState() {


        if (
            preferences.analytics
        ) {


            enableAnalytics();


        } else {


            disableAnalytics();

        }

    }



    /* ======================================================
       14. CONSENT EVENT
    ====================================================== */

    function notifyConsentUpdate() {


        window.dispatchEvent(

            new CustomEvent(
                "isaac:consent-updated",
                {

                    detail:
                        {
                            ...preferences
                        }

                }
            )

        );

    }



    /* ======================================================
       15. BANNER
    ====================================================== */

    function showBanner() {


        requestAnimationFrame(
            () => {


                cookieBanner
                    ?.classList
                    .add(
                        "is-visible"
                    );


            }
        );

    }



    function hideBanner() {


        cookieBanner
            ?.classList
            .remove(
                "is-visible"
            );

    }



    /* ======================================================
       16. MODAL
    ====================================================== */

    function openSettings() {


        lastFocusedElement =
            document.activeElement;


        if (
            analyticsToggle
        ) {


            analyticsToggle.checked =
                Boolean(
                    preferences.analytics
                );

        }


        modalOverlay
            ?.classList
            .add(
                "is-visible"
            );


        modalOverlay
            ?.setAttribute(
                "aria-hidden",
                "false"
            );


        document.body
            .classList
            .add(
                "cookie-modal-open"
            );


        setTimeout(
            () => {


                cookieModal
                    ?.focus();


            },
            30
        );

    }



    function closeSettings() {


        modalOverlay
            ?.classList
            .remove(
                "is-visible"
            );


        modalOverlay
            ?.setAttribute(
                "aria-hidden",
                "true"
            );


        document.body
            .classList
            .remove(
                "cookie-modal-open"
            );


        if (
            lastFocusedElement
            instanceof HTMLElement
        ) {


            lastFocusedElement
                .focus();

        }

    }



    /* ======================================================
       17. ACCEPT ALL
    ====================================================== */

    function acceptAll() {


        savePreferences(
            {

                analytics:
                    true

            }
        );


        hideBanner();

        closeSettings();

    }



    /* ======================================================
       18. REJECT ALL
    ====================================================== */

    function rejectAll() {


        savePreferences(
            {

                analytics:
                    false

            }
        );


        hideBanner();

        closeSettings();

    }



    /* ======================================================
       19. SAVE CUSTOM PREFERENCES
    ====================================================== */

    function saveCustomPreferences() {


        savePreferences(
            {

                analytics:
                    Boolean(
                        analyticsToggle
                            ?.checked
                    )

            }
        );


        hideBanner();

        closeSettings();

    }



    /* ======================================================
       20. EXTERNAL SETTINGS BUTTONS
    ====================================================== */

    function initialiseExternalSettingsButtons() {


        document
            .querySelectorAll(
                "#openCookieSettings, [data-cookie-settings]"
            )
            .forEach(
                button => {


                    button
                        .addEventListener(
                            "click",
                            openSettings
                        );


                }
            );

    }



    /* ======================================================
       21. KEYBOARD / ACCESSIBILITY
    ====================================================== */

    function handleKeyboard(
        event
    ) {


        if (
            event.key
            ===
            "Escape"

            &&

            modalOverlay
                ?.classList
                .contains(
                    "is-visible"
                )
        ) {


            closeSettings();


            return;

        }



        if (
            event.key
            !==
            "Tab"

            ||

            !modalOverlay
                ?.classList
                .contains(
                    "is-visible"
                )
        ) {


            return;

        }



        const focusableElements =
            cookieModal
                ?.querySelectorAll(
                    `
                        button:not([disabled]),
                        input:not([disabled]),
                        a[href],
                        [tabindex]:not([tabindex="-1"])
                    `
                );


        if (
            !focusableElements
            ||
            !focusableElements.length
        ) {


            return;

        }


        const first =
            focusableElements[0];


        const last =
            focusableElements[
                focusableElements.length
                -
                1
            ];



        if (
            event.shiftKey
            &&
            document.activeElement
            ===
            first
        ) {


            event.preventDefault();


            last.focus();


        } else if (
            !event.shiftKey
            &&
            document.activeElement
            ===
            last
        ) {


            event.preventDefault();


            first.focus();

        }

    }



    /* ======================================================
       22. CLICK OUTSIDE MODAL
    ====================================================== */

    modalOverlay
        ?.addEventListener(
            "click",
            event => {


                if (
                    event.target
                    ===
                    modalOverlay
                ) {


                    closeSettings();

                }

            }
        );



    /* ======================================================
       23. BUTTON EVENTS
    ====================================================== */

    rejectAllButton
        ?.addEventListener(
            "click",
            rejectAll
        );


    acceptAllButton
        ?.addEventListener(
            "click",
            acceptAll
        );


    settingsButton
        ?.addEventListener(
            "click",
            openSettings
        );


    modalCloseButton
        ?.addEventListener(
            "click",
            closeSettings
        );


    modalRejectButton
        ?.addEventListener(
            "click",
            rejectAll
        );


    modalAcceptButton
        ?.addEventListener(
            "click",
            acceptAll
        );


    savePreferencesButton
        ?.addEventListener(
            "click",
            saveCustomPreferences
        );


    document
        .addEventListener(
            "keydown",
            handleKeyboard
        );



    /* ======================================================
       24. PUBLIC API
    ====================================================== */

    window.IsaacConsent = {


        getPreferences() {


            return {

                ...preferences

            };

        },


        hasAnalyticsConsent() {


            return Boolean(
                preferences.analytics
            );

        },


        openSettings,

        acceptAll,

        rejectAll

    };



    /* ======================================================
       25. INITIALISE
    ====================================================== */

    initialiseExternalSettingsButtons();


    const storedPreferences =
        loadPreferences();



    if (
        storedPreferences
    ) {


        preferences =
            storedPreferences;


        /*
           Ya existe una decisión válida.

           Aplicamos directamente
           el estado correspondiente.
        */

        applyConsentState();


        notifyConsentUpdate();


    } else {


        /*
           Primera visita o consentimiento antiguo.

           Google permanece bloqueado.
        */

        preferences = {

            ...DEFAULT_PREFERENCES

        };


        disableAnalytics();


        showBanner();

    }

})()