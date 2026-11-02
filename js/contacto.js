/* ==========================================================
   ISAAC GALLO — FORMULARIO DE CONTACTO
========================================================== */


const contactForm =
    document.getElementById("contactForm");


if (contactForm) {


    const submitButton =
        document.getElementById("contactSubmit");


    const submitText =
        submitButton.querySelector(".submit-text");


    const formStatus =
        document.getElementById("formStatus");


    const messageField =
        document.getElementById("message");


    const messageCounter =
        document.getElementById("messageCounter");



    /* ======================================================
       CONTADOR
    ====================================================== */

    messageField.addEventListener(
        "input",

        () => {

            messageCounter.textContent =
                messageField.value.length;

        }
    );



    /* ======================================================
       STATUS
    ====================================================== */

    function setStatus(
        message,
        type = ""
    ) {

        formStatus.textContent =
            message;


        formStatus.classList.remove(
            "is-success",
            "is-error"
        );


        if (type) {

            formStatus.classList.add(
                `is-${type}`
            );

        }

    }



    /* ======================================================
       SUBMIT
    ====================================================== */

    contactForm.addEventListener(
        "submit",

        async (event) => {

            event.preventDefault();


            setStatus("");


            /* ----------------------------------------------
               VALIDACIÓN HTML
            ---------------------------------------------- */

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }



            /* ----------------------------------------------
               TURNSTILE TOKEN
            ---------------------------------------------- */

            const turnstileToken =
                contactForm.querySelector(
                    '[name="cf-turnstile-response"]'
                )?.value;


            if (!turnstileToken) {

                setStatus(
                    "Completa la verificación antes de enviar el mensaje.",
                    "error"
                );

                return;

            }



            /* ----------------------------------------------
               PAYLOAD
            ---------------------------------------------- */

            const payload = {

                name:
                    document
                        .getElementById("name")
                        .value
                        .trim(),

                email:
                    document
                        .getElementById("email")
                        .value
                        .trim(),

                company:
                    document
                        .getElementById("company")
                        .value
                        .trim(),

                subject:
                    document
                        .getElementById("subject")
                        .value
                        .trim(),

                message:
                    document
                        .getElementById("message")
                        .value
                        .trim(),

                website:
                    document
                        .getElementById("website")
                        .value
                        .trim(),

                turnstileToken:
                    turnstileToken

            };



            /* ----------------------------------------------
               LOADING
            ---------------------------------------------- */

            submitButton.disabled =
                true;


            submitText.textContent =
                "Enviando...";


            setStatus(
                "Enviando mensaje..."
            );



            /* ----------------------------------------------
               API
            ---------------------------------------------- */

            try {


                const response =
                    await fetch(
                        "https://api.isaacgallo.com/api/contact",
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



                const data =
                    await response.json();



                if (!response.ok) {

                    throw new Error(

                        data.message ||
                        "No se pudo enviar el mensaje."

                    );

                }



                /* ------------------------------------------
                   SUCCESS
                ------------------------------------------ */

                setStatus(
                    "Mensaje enviado correctamente. Gracias por contactar conmigo.",
                    "success"
                );


                contactForm.reset();


                messageCounter.textContent =
                    "0";


                if (
                    typeof turnstile !==
                    "undefined"
                ) {

                    turnstile.reset();

                }


            } catch (error) {


                /* ------------------------------------------
                   ERROR
                ------------------------------------------ */

                console.error(
                    "Error enviando formulario:",
                    error
                );


                setStatus(
                    error.message ||
                    "Ha ocurrido un error. Inténtalo de nuevo.",
                    "error"
                );


                if (
                    typeof turnstile !==
                    "undefined"
                ) {

                    turnstile.reset();

                }


            } finally {


                /* ------------------------------------------
                   RESET BOTÓN
                ------------------------------------------ */

                submitButton.disabled =
                    false;


                submitText.textContent =
                    "Enviar mensaje";

            }

        }
    );

}