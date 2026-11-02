/* ==========================================================
   ISAAC GALLO — PROYECTOS
========================================================== */


/* ==========================================================
   01. ELEMENTS
========================================================== */

const bugGameArea =
    document.getElementById(
        "bugGameArea"
    );


const bugGameStart =
    document.getElementById(
        "bugGameStart"
    );


const bugGameButton =
    document.getElementById(
        "bugGameButton"
    );


const bugScoreElement =
    document.getElementById(
        "bugScore"
    );


const bugTimeElement =
    document.getElementById(
        "bugTime"
    );


const bugGameResult =
    document.getElementById(
        "bugGameResult"
    );



/* ==========================================================
   02. GAME SETTINGS
========================================================== */

const GAME_DURATION =
    15;


const BUG_LIFETIME =
    1300;


const BUG_INTERVAL =
    650;



/* ==========================================================
   03. STATE
========================================================== */

let bugScore =
    0;


let bugTime =
    GAME_DURATION;


let gameRunning =
    false;


let bugSpawner =
    null;


let gameTimer =
    null;



/* ==========================================================
   04. SCORE
========================================================== */

function updateBugScore() {

    if (
        !bugScoreElement
    ) {

        return;

    }


    bugScoreElement.textContent =
        String(
            bugScore
        ).padStart(
            2,
            "0"
        );

}



/* ==========================================================
   05. TIME
========================================================== */

function updateBugTime() {

    if (
        !bugTimeElement
    ) {

        return;

    }


    bugTimeElement.textContent =
        String(
            bugTime
        ).padStart(
            2,
            "0"
        );

}



/* ==========================================================
   06. REMOVE BUGS
========================================================== */

function removeAllBugs() {

    if (
        !bugGameArea
    ) {

        return;

    }


    const bugs =
        bugGameArea.querySelectorAll(
            ".game-bug"
        );


    bugs.forEach(
        bug => {

            bug.remove();

        }
    );

}



/* ==========================================================
   07. CREATE BUG
========================================================== */

function createBug() {

    if (
        !gameRunning ||
        !bugGameArea
    ) {

        return;

    }


    const bug =
        document.createElement(
            "button"
        );


    bug.type =
        "button";


    bug.className =
        "game-bug";


    bug.setAttribute(
        "aria-label",
        "Eliminar bug"
    );


    bug.innerHTML =
        `
            <i data-lucide="bug"></i>
        `;


    const areaWidth =
        bugGameArea.clientWidth;


    const areaHeight =
        bugGameArea.clientHeight;


    const bugSize =
        50;


    const maxX =
        Math.max(
            areaWidth -
            bugSize,
            0
        );


    const maxY =
        Math.max(
            areaHeight -
            bugSize,
            0
        );


    const x =
        Math.random()
        *
        maxX;


    const y =
        Math.random()
        *
        maxY;


    bug.style.left =
        `${x}px`;


    bug.style.top =
        `${y}px`;


    bugGameArea.appendChild(
        bug
    );


    /*
       Como el icono se crea dinámicamente,
       volvemos a ejecutar Lucide.
    */

    if (
        typeof lucide !==
        "undefined"
    ) {

        lucide.createIcons();

    }


    /*
       Si pulsamos el bug:
       +1 punto y desaparece.
    */

    bug.addEventListener(
        "click",
        () => {

            if (
                !gameRunning
            ) {

                return;

            }


            bugScore++;


            updateBugScore();


            bug.remove();

        }
    );


    /*
       Si no se pulsa, desaparece
       después de un tiempo.
    */

    window.setTimeout(
        () => {

            if (
                bug.isConnected
            ) {

                bug.remove();

            }

        },

        BUG_LIFETIME
    );

}



/* ==========================================================
   08. RESULT
========================================================== */

function showGameResult() {

    if (
        !bugGameResult
    ) {

        return;

    }


    let message;


    if (
        bugScore >= 16
    ) {

        message =
            `Deploy aprobado ✓ — ${bugScore} bugs eliminados.`;

    }

    else if (
        bugScore >= 10
    ) {

        message =
            `${bugScore} bugs eliminados. Bastante limpio para producción.`;

    }

    else {

        message =
            `${bugScore} bugs eliminados. Todavía quedan algunos por ahí...`;

    }


    bugGameResult.textContent =
        message;

}



/* ==========================================================
   09. END GAME
========================================================== */

function endBugGame() {

    gameRunning =
        false;


    clearInterval(
        bugSpawner
    );


    clearInterval(
        gameTimer
    );


    removeAllBugs();


    showGameResult();


    /*
       Recuperamos el panel inicial
       después de terminar.
    */

    if (
        bugGameStart
    ) {

        bugGameStart.style.display =
            "flex";

    }


    if (
        bugGameButton
    ) {

        bugGameButton.innerHTML =
            `
                Jugar otra vez

                <i data-lucide="rotate-cw"></i>
            `;


        if (
            typeof lucide !==
            "undefined"
        ) {

            lucide.createIcons();

        }

    }

}



/* ==========================================================
   10. START GAME
========================================================== */

function startBugGame() {

    if (
        gameRunning ||
        !bugGameArea
    ) {

        return;

    }


    bugScore =
        0;


    bugTime =
        GAME_DURATION;


    gameRunning =
        true;


    updateBugScore();

    updateBugTime();


    if (
        bugGameResult
    ) {

        bugGameResult.textContent =
            "Debug en ejecución...";

    }


    if (
        bugGameStart
    ) {

        bugGameStart.style.display =
            "none";

    }


    removeAllBugs();


    /*
       Primer bug inmediato.
    */

    createBug();


    /*
       Nuevos bugs.
    */

    bugSpawner =
        window.setInterval(
            createBug,
            BUG_INTERVAL
        );


    /*
       Temporizador.
    */

    gameTimer =
        window.setInterval(
            () => {

                bugTime--;


                updateBugTime();


                if (
                    bugTime <= 0
                ) {

                    endBugGame();

                }

            },

            1000
        );

}



/* ==========================================================
   11. EVENT
========================================================== */

bugGameButton
    ?.addEventListener(
        "click",
        startBugGame
    );