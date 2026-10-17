/* ==========================================================
   ISAAC GALLO — COOKIE CONSENT MANAGER
========================================================== */


(() => {

    "use strict";


    /* ======================================================
       01. CONFIG
    ====================================================== */

    const STORAGE_KEY =
        "isaac_cookie_consent";


    const CONSENT_VERSION =
        1;



    /* ======================================================
       02. DEFAULT PREFERENCES
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
       03. STATE
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
       04. CREATE INTERFACE
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

                                    Permiten obtener estadísticas
                                    sobre el uso de la web para
                                    entender qué funciona y mejorar
                                    la experiencia.

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
       05. DOM REFERENCES
    ====================================================== */

    createCookieInterface();


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
       06. STORAGE
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


            if (
                parsed.version
                !==
                CONSENT_VERSION
            ) {

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


        notifyConsentUpdate();


        return preferences;

    }



    /* ======================================================
       07. EVENT FOR FUTURE ANALYTICS
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
       08. BANNER
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
       09. MODAL
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
       10. ACCEPT
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
       11. REJECT
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
       12. SAVE CUSTOM
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
       13. EXTERNAL SETTINGS BUTTON
       /cookies/ → #openCookieSettings
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
       14. KEYBOARD
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
       15. CLICK OUTSIDE MODAL
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
       16. BUTTON EVENTS
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
       17. PUBLIC API
       La usaremos con Google Analytics
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
       18. INITIALISE
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
           Ya existe una decisión.

           No mostramos el banner.
           Informamos al resto de scripts
           del estado actual.
        */

        notifyConsentUpdate();


    } else {

        /*
           Primera visita.

           No hay consentimiento.
           Analytics sigue desactivado
           y mostramos el banner.
        */

        showBanner();

    }

})();