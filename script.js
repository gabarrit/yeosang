/* =========================================
   НАСТРОЙКИ
   ========================================= */

const BIRTHDAY_MONTH = 7;
const BIRTHDAY_DAY = 29;

const TEST_MODE = false;


/* =========================================
   ЭЛЕМЕНТЫ
   ========================================= */

const mainPage =
    document.getElementById("mainPage");

const birthdayPage =
    document.getElementById("birthdayPage");

const giftPage =
    document.getElementById("giftPage");

const giftButton =
    document.getElementById("giftButton");

const backButton =
    document.getElementById("backButton");

const currentDate =
    document.getElementById("currentDate");

const calendar =
    document.getElementById("calendar");

const calendarMonth =
    document.getElementById("calendarMonth");

const calendarYear =
    document.getElementById("calendarYear");

const kinichVideo =
    document.getElementById("kinichVideo");

const soundButton =
    document.getElementById("soundButton");


/* =========================================
   КОНВЕРТ
   ========================================= */

const envelope =
    document.getElementById("envelope");

const letter =
    envelope
        ? envelope.querySelector(".letter")
        : null;

const openText =
    document.getElementById("openText");

const letterMessage =
    document.getElementById("letterMessage");


/* =========================================
   🌕 ЛУНА
   ========================================= */

const moon =
    document.querySelector(".birthday-moon");

const moonCanvas =
    document.getElementById("moonCanvas");

const moonGlow =
    document.querySelector(".moon-glow");

const ctx =
    moonCanvas
        ? moonCanvas.getContext("2d")
        : null;


/* =========================================
   ✦ ПЕРЕХОДЫ
   ========================================= */

let currentPage =
    null;

let pageTransitioning =
    false;


function showPage(page) {

    if (!page) {
        return;
    }


    if (pageTransitioning) {
        return;
    }


    if (
        currentPage === page &&
        !page.classList.contains("hidden")
    ) {
        return;
    }


    const pages = [
        mainPage,
        birthdayPage,
        giftPage
    ];


    /* =====================================
       ПЕРВЫЙ ПОКАЗ
       ===================================== */

    if (!currentPage) {

        pages.forEach(item => {

            item.classList.remove(
                "page-entering",
                "page-leaving"
            );

            item.classList.add(
                "hidden"
            );
        });


        page.classList.remove(
            "hidden"
        );


        page.classList.add(
            "page-entering"
        );


        currentPage =
            page;


        setTimeout(
            () => {

                page.classList.remove(
                    "page-entering"
                );

            },
            800
        );


        if (
            page === birthdayPage
        ) {

            setTimeout(
                () => {

                    setupMoon();
                    drawMoon();
                    startKinich();

                },
                80
            );
        }


        return;
    }


    /* =====================================
       НАЧАЛО ПЕРЕХОДА
       ===================================== */

    pageTransitioning =
        true;


    const oldPage =
        currentPage;


    oldPage.classList.remove(
        "page-entering"
    );


    oldPage.classList.add(
        "page-leaving"
    );


    setTimeout(
        () => {

            oldPage.classList.add(
                "hidden"
            );


            oldPage.classList.remove(
                "page-leaving"
            );


            page.classList.remove(
                "hidden"
            );


            page.classList.add(
                "page-entering"
            );


            currentPage =
                page;


            setTimeout(
                () => {

                    page.classList.remove(
                        "page-entering"
                    );


                    pageTransitioning =
                        false;

                },
                800
            );


            if (
                page === birthdayPage
            ) {

                setTimeout(
                    () => {

                        setupMoon();
                        drawMoon();
                        startKinich();

                    },
                    80
                );
            }

        },
        700
    );
}


/* =========================================
   МЕСЯЦЫ
   ========================================= */

const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];


const monthNamesGenitive = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
];


/* =========================================
   ДАТА
   ========================================= */

function updateCurrentDate() {

    if (!currentDate) {
        return;
    }


    const today =
        new Date();


    currentDate.textContent =
        `${today.getDate()} ${
            monthNamesGenitive[
                today.getMonth()
            ]
        } ${today.getFullYear()}`;
}


/* =========================================
   🔊 КИНИЧ
   ========================================= */

let kinichSoundStarted =
    false;


function startKinich() {

    if (!kinichVideo) {
        return;
    }


    kinichVideo
        .play()
        .catch(() => {});
}


function enableKinichSound() {

    if (
        !kinichVideo ||
        kinichSoundStarted
    ) {
        return;
    }


    /*
       Звук разрешаем только после
       осознанного действия пользователя
       на праздничном экране.
    */

    kinichVideo.muted =
        false;

    kinichVideo.volume =
        1;


    kinichVideo
        .play()
        .then(() => {

            kinichSoundStarted =
                true;


            updateSoundButton();

        })
        .catch(() => {

            kinichVideo.muted =
                true;


            updateSoundButton();
        });
}


/* =========================================
   🔊 КНОПКА МУЗЫКИ
   ========================================= */

function updateSoundButton() {

    if (
        !soundButton ||
        !kinichVideo
    ) {
        return;
    }


    if (kinichVideo.muted) {

        soundButton.textContent =
            "🔇";


        soundButton.setAttribute(
            "aria-label",
            "Включить музыку"
        );

    } else {

        soundButton.textContent =
            "🔊";


        soundButton.setAttribute(
            "aria-label",
            "Выключить музыку"
        );
    }
}


if (soundButton) {

    soundButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();


            if (!kinichVideo) {
                return;
            }


            kinichVideo.muted =
                !kinichVideo.muted;


            if (
                !kinichVideo.muted
            ) {

                kinichVideo
                    .play()
                    .catch(() => {});
            }


            updateSoundButton();
        }
    );


    updateSoundButton();
}


/* =========================================
   📅 КАЛЕНДАРЬ
   ========================================= */

function createCalendar(
    year,
    month
) {

    if (
        !calendar ||
        !calendarMonth ||
        !calendarYear
    ) {
        return;
    }


    calendar.innerHTML =
        "";


    calendarMonth.textContent =
        monthNames[
            month
        ].toUpperCase();


    calendarYear.textContent =
        year;


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const startingDay =
        firstDay === 0
            ? 7
            : firstDay;


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /* Пустые клетки */

    for (
        let i = 1;
        i < startingDay;
        i++
    ) {

        const emptyDay =
            document.createElement(
                "div"
            );


        emptyDay.classList.add(
            "calendar-day",
            "empty"
        );


        calendar.appendChild(
            emptyDay
        );
    }


    /* Дни месяца */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dayElement =
            document.createElement(
                "div"
            );


        dayElement.classList.add(
            "calendar-day"
        );


        dayElement.textContent =
            day;


        if (
            month === BIRTHDAY_MONTH &&
            day === BIRTHDAY_DAY
        ) {

            dayElement.classList.add(
                "birthday"
            );


            /*
               ✦ Главное исправление:
               29 июля теперь кликабельно.
            */

            dayElement.setAttribute(
                "title",
                "Open birthday page"
            );


            dayElement.addEventListener(
                "click",
                () => {

                    enableKinichSound();

                    showPage(
                        birthdayPage
                    );
                }
            );
        }


        calendar.appendChild(
            dayElement
        );
    }
}


/* =========================================
   ПРОВЕРКА ДАТЫ
   ========================================= */

function checkDate() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    let month =
        today.getMonth();


    let day =
        today.getDate();


    updateCurrentDate();


    /*
       Всегда показываем календарь июля,
       потому что именно там находится
       день рождения.
    */

    createCalendar(
        year,
        BIRTHDAY_MONTH
    );


    /*
       TEST_MODE = false:
       праздничный экран открывается
       автоматически только 29 июля.

       TEST_MODE = true:
       праздничный экран открывается
       сразу для тестирования.
    */

    if (TEST_MODE) {

        month =
            BIRTHDAY_MONTH;

        day =
            BIRTHDAY_DAY;
    }


    if (
        month === BIRTHDAY_MONTH &&
        day === BIRTHDAY_DAY
    ) {

        currentPage =
            null;


        showPage(
            birthdayPage
        );


        return;
    }


    currentPage =
        null;


    showPage(
        mainPage
    );
}


/* =========================================
   🎁 КНОПКА ПОДАРКА
   ========================================= */

if (giftButton) {

    giftButton.addEventListener(
        "click",
        () => {

            /*
               К этому моменту пользователь
               уже находится на праздничном
               экране и явно нажал кнопку.
            */

            enableKinichSound();


            showPage(
                giftPage
            );
        }
    );
}


/* =========================================
   ← BACK
   ========================================= */

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            showPage(
                birthdayPage
            );
        }
    );
}


/* =========================================
   ✉️ ПЕРЕТАСКИВАНИЕ ПИСЬМА
   ========================================= */

let dragging =
    false;

let startY =
    0;

let letterPosition =
    0;


const CLOSED_POSITION =
    0;

const OPEN_POSITION =
    -140;

const OPEN_THRESHOLD =
    -70;


function updateLetterTransform() {

    if (!letter) {
        return;
    }


    letter.style.transform =
        `translateY(${letterPosition}px)`;
}


if (
    letter &&
    envelope
) {

    letter.addEventListener(
        "pointerdown",
        (event) => {

            dragging =
                true;


            startY =
                event.clientY;


            letter.setPointerCapture(
                event.pointerId
            );


            envelope.classList.add(
                "dragging"
            );


            event.preventDefault();
        }
    );


    letter.addEventListener(
        "pointermove",
        (event) => {

            if (!dragging) {
                return;
            }


            const movement =
                event.clientY -
                startY;


            if (
                !envelope.classList.contains(
                    "open"
                )
            ) {

                letterPosition =
                    Math.min(
                        CLOSED_POSITION,

                        Math.max(
                            OPEN_POSITION,
                            movement
                        )
                    );

            } else {

                letterPosition =
                    Math.min(
                        CLOSED_POSITION,

                        Math.max(
                            OPEN_POSITION,

                            OPEN_POSITION +
                            movement
                        )
                    );
            }


            updateLetterTransform();
        }
    );


    letter.addEventListener(
        "pointerup",
        () => {

            if (!dragging) {
                return;
            }


            dragging =
                false;


            envelope.classList.remove(
                "dragging"
            );


            /*
               Открываем письмо.
            */

            if (
                !envelope.classList.contains(
                    "open"
                ) &&

                letterPosition <=
                OPEN_THRESHOLD
            ) {

                envelope.classList.add(
                    "open"
                );


                letterPosition =
                    OPEN_POSITION;


                updateLetterTransform();


                if (openText) {

                    openText.classList.add(
                        "hidden"
                    );
                }


                if (letterMessage) {

                    setTimeout(
                        () => {

                            letterMessage.classList.remove(
                                "hidden"
                            );

                        },
                        500
                    );
                }


                return;
            }


            /*
               Закрытый конверт.
            */

            if (
                !envelope.classList.contains(
                    "open"
                )
            ) {

                letterPosition =
                    CLOSED_POSITION;


                updateLetterTransform();


                return;
            }


            /*
               Закрываем.
            */

            if (
                letterPosition >
                OPEN_THRESHOLD
            ) {

                envelope.classList.remove(
                    "open"
                );


                letterPosition =
                    CLOSED_POSITION;


                updateLetterTransform();


                if (openText) {

                    openText.classList.remove(
                        "hidden"
                    );
                }


                if (letterMessage) {

                    letterMessage.classList.add(
                        "hidden"
                    );
                }


                return;
            }


            letterPosition =
                OPEN_POSITION;


            updateLetterTransform();
        }
    );


    letter.addEventListener(
        "pointercancel",
        () => {

            dragging =
                false;


            envelope.classList.remove(
                "dragging"
            );


            if (
                envelope.classList.contains(
                    "open"
                )
            ) {

                letterPosition =
                    OPEN_POSITION;

            } else {

                letterPosition =
                    CLOSED_POSITION;
            }


            updateLetterTransform();
        }
    );
}


/* =========================================
   ✉️ 3D-НАКЛОН КОНВЕРТА
   ========================================= */

if (
    giftPage &&
    envelope
) {

    giftPage.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                envelope.getBoundingClientRect();


            if (
                rect.width === 0 ||
                rect.height === 0
            ) {
                return;
            }


            const centerX =
                rect.left +
                rect.width / 2;


            const centerY =
                rect.top +
                rect.height / 2;


            const mouseX =
                event.clientX -
                centerX;


            const mouseY =
                event.clientY -
                centerY;


            let rotateY =
                (
                    mouseX /
                    (rect.width / 2)
                ) * 12;


            let rotateX =
                -(
                    mouseY /
                    (rect.height / 2)
                ) * 9;


            rotateY =
                Math.max(
                    -12,
                    Math.min(
                        12,
                        rotateY
                    )
                );


            rotateX =
                Math.max(
                    -9,
                    Math.min(
                        9,
                        rotateX
                    )
                );


            envelope.style.transform =
                `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(0)
                `;
        }
    );


    giftPage.addEventListener(
        "mouseleave",
        () => {

            envelope.style.transform =
                `
                perspective(900px)
                rotateX(0deg)
                rotateY(0deg)
                translateZ(0)
                `;
        }
    );
}


/* =========================================
   🌕 ЛУНА
   ========================================= */

let lightX =
    0.30;

let lightY =
    0.28;

let targetLightX =
    0.30;

let targetLightY =
    0.28;

let moonRotation =
    0;

let targetMoonRotation =
    0;

let moonTilt =
    0;

let targetMoonTilt =
    0;

let moonTime =
    0;


function setupMoon() {

    if (
        !moonCanvas ||
        !ctx ||
        !moon
    ) {
        return;
    }


    const size =
        380;


    const ratio =
        window.devicePixelRatio ||
        1;


    moonCanvas.width =
        size * ratio;


    moonCanvas.height =
        size * ratio;


    moonCanvas.style.width =
        `${size}px`;


    moonCanvas.style.height =
        `${size}px`;


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}


function drawMoon() {

    if (
        !ctx ||
        !moonCanvas
    ) {
        return;
    }


    const size =
        380;


    const center =
        size / 2;


    const radius =
        145;


    ctx.clearRect(
        0,
        0,
        size,
        size
    );


    /* Свечение */

    const ambientGlow =
        ctx.createRadialGradient(
            center,
            center,
            radius * 0.6,
            center,
            center,
            radius * 1.55
        );


    ambientGlow.addColorStop(
        0,
        "rgba(230,240,220,0.16)"
    );

    ambientGlow.addColorStop(
        0.5,
        "rgba(200,220,190,0.05)"
    );

    ambientGlow.addColorStop(
        1,
        "rgba(200,220,190,0)"
    );


    ctx.fillStyle =
        ambientGlow;


    ctx.beginPath();

    ctx.arc(
        center,
        center,
        radius * 1.55,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* Свет */

    const lx =
        center +

        (
            lightX -
            0.5
        ) *

        radius *
        1.15;


    const ly =
        center +

        (
            lightY -
            0.5
        ) *

        radius *
        1.15;


    /* Сфера */

    const sphere =
        ctx.createRadialGradient(
            lx,
            ly,
            3,
            center,
            center,
            radius
        );


    sphere.addColorStop(
        0,
        "rgba(255,255,245,1)"
    );

    sphere.addColorStop(
        0.18,
        "rgba(239,240,229,0.96)"
    );

    sphere.addColorStop(
        0.40,
        "rgba(204,207,196,0.92)"
    );

    sphere.addColorStop(
        0.62,
        "rgba(150,156,148,0.84)"
    );

    sphere.addColorStop(
        0.78,
        "rgba(82,90,83,0.78)"
    );

    sphere.addColorStop(
        0.92,
        "rgba(38,44,40,0.84)"
    );

    sphere.addColorStop(
        1,
        "rgba(7,11,9,0.96)"
    );


    ctx.beginPath();

    ctx.arc(
        center,
        center,
        radius,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        sphere;

    ctx.fill();


    /* Кратеры */

    const craters = [

        [-0.32, -0.24, 0.075],
        [0.24, -0.29, 0.055],
        [0.43, -0.03, 0.085],
        [-0.10, 0.19, 0.09],
        [0.28, 0.36, 0.07],
        [-0.38, 0.40, 0.055],
        [-0.04, -0.46, 0.04],
        [0.03, 0.02, 0.05]

    ];


    for (
        const crater of craters
    ) {

        const shift =
            moonRotation /
            38 *
            0.18;


        const craterX =
            center +

            (
                crater[0] -
                shift
            ) *

            radius;


        const craterY =
            center +
            crater[1] *
            radius;


        const craterRadius =
            crater[2] *
            radius;


        const distance =
            Math.sqrt(

                (
                    craterX -
                    center
                ) ** 2 +

                (
                    craterY -
                    center
                ) ** 2
            );


        if (
            distance >
            radius * 0.88
        ) {
            continue;
        }


        const craterGradient =
            ctx.createRadialGradient(

                craterX -
                    craterRadius * 0.25,

                craterY -
                    craterRadius * 0.25,

                craterRadius * 0.05,

                craterX,
                craterY,

                craterRadius
            );


        craterGradient.addColorStop(
            0,
            "rgba(45,52,47,0.26)"
        );

        craterGradient.addColorStop(
            0.5,
            "rgba(55,62,57,0.14)"
        );

        craterGradient.addColorStop(
            1,
            "rgba(20,25,22,0)"
        );


        ctx.beginPath();

        ctx.arc(
            craterX,
            craterY,
            craterRadius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            craterGradient;

        ctx.fill();
    }


    /* Блик */

    const highlight =
        ctx.createRadialGradient(

            lx,
            ly,
            0,

            lx,
            ly,

            radius * 0.58
        );


    highlight.addColorStop(
        0,
        "rgba(255,255,255,0.22)"
    );

    highlight.addColorStop(
        0.25,
        "rgba(255,255,255,0.08)"
    );

    highlight.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );


    ctx.beginPath();

    ctx.arc(
        center,
        center,
        radius,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        highlight;

    ctx.fill();


    /* Краевая тень */

    const edgeShadow =
        ctx.createRadialGradient(

            center -
                radius * 0.25,

            center -
                radius * 0.20,

            radius * 0.35,

            center,
            center,

            radius * 1.10
        );


    edgeShadow.addColorStop(
        0,
        "rgba(0,0,0,0)"
    );

    edgeShadow.addColorStop(
        0.68,
        "rgba(0,0,0,0)"
    );

    edgeShadow.addColorStop(
        0.86,
        "rgba(0,3,1,0.24)"
    );

    edgeShadow.addColorStop(
        0.96,
        "rgba(0,3,1,0.55)"
    );

    edgeShadow.addColorStop(
        1,
        "rgba(0,1,0,0.85)"
    );


    ctx.beginPath();

    ctx.arc(
        center,
        center,
        radius,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        edgeShadow;

    ctx.fill();


    /* Контур */

    ctx.beginPath();

    ctx.arc(
        center,
        center,
        radius,
        0,
        Math.PI * 2
    );


    ctx.strokeStyle =
        "rgba(245,245,235,0.18)";

    ctx.lineWidth =
        1;

    ctx.stroke();
}


/* =========================================
   🌕 АНИМАЦИЯ ЛУНЫ
   ========================================= */

function animateMoon() {

    if (!moon) {
        return;
    }


    lightX +=
        (
            targetLightX -
            lightX
        ) * 0.08;


    lightY +=
        (
            targetLightY -
            lightY
        ) * 0.08;


    moonRotation +=
        (
            targetMoonRotation -
            moonRotation
        ) * 0.08;


    moonTilt +=
        (
            targetMoonTilt -
            moonTilt
        ) * 0.08;


    moonTime +=
        0.012;


    const floatY =
        Math.sin(
            moonTime
        ) * 10;


    moon.style.transform =
        `
        translate(-50%, -50%)
        translateY(${floatY}px)
        rotateX(${moonTilt}deg)
        rotateY(${moonRotation}deg)
        `;


    drawMoon();


    requestAnimationFrame(
        animateMoon
    );
}


/* =========================================
   🌕 КУРСОР ЛУНЫ
   ========================================= */

if (
    birthdayPage &&
    moon
) {

    birthdayPage.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                moon.getBoundingClientRect();


            if (
                rect.width === 0 ||
                rect.height === 0
            ) {
                return;
            }


            const x =
                event.clientX -
                (
                    rect.left +
                    rect.width / 2
                );


            const y =
                event.clientY -
                (
                    rect.top +
                    rect.height / 2
                );


            targetLightX =
                Math.max(
                    0.05,

                    Math.min(
                        0.95,

                        0.5 +
                        x /
                        rect.width
                    )
                );


            targetLightY =
                Math.max(
                    0.05,

                    Math.min(
                        0.95,

                        0.5 +
                        y /
                        rect.height
                    )
                );


            targetMoonRotation =
                Math.max(
                    -28,

                    Math.min(
                        28,

                        x /
                        rect.width *
                        56
                    )
                );


            targetMoonTilt =
                Math.max(
                    -14,

                    Math.min(
                        14,

                        -(
                            y /
                            rect.height
                        ) *
                        28
                    )
                );


            if (moonGlow) {

                moonGlow.style.opacity =
                    "1";


                moonGlow.style.transform =
                    "scale(1.15)";
            }
        }
    );


    birthdayPage.addEventListener(
        "mouseleave",
        () => {

            targetLightX =
                0.30;


            targetLightY =
                0.28;


            targetMoonRotation =
                0;


            targetMoonTilt =
                0;


            if (moonGlow) {

                moonGlow.style.opacity =
                    "0.8";


                moonGlow.style.transform =
                    "scale(1)";
            }
        }
    );
}


/* =========================================
   🌌 ЗВЁЗДНОЕ ПОЛЕ
   ========================================= */

(function createStarField() {

    const oldField =
        document.querySelector(
            ".star-field"
        );


    if (oldField) {
        oldField.remove();
    }


    const starField =
        document.createElement(
            "div"
        );


    starField.className =
        "star-field";


    document.body.prepend(
        starField
    );


    const STAR_COUNT =
        110;


    const stars = [];


    for (
        let i = 0;
        i < STAR_COUNT;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );


        star.className =
            "background-star";


        const randomSize =
            Math.random();


        if (
            randomSize > 0.84
        ) {

            star.classList.add(
                "large"
            );

        } else if (
            randomSize < 0.30
        ) {

            star.classList.add(
                "small"
            );
        }


        const x =
            Math.random() *
            window.innerWidth;


        const y =
            Math.random() *
            window.innerHeight;


        const duration =
            2.4 +
            Math.random() *
            4.6;


        const delay =
            -Math.random() *
            6;


        const minOpacity =
            0.18 +
            Math.random() *
            0.18;


        const maxOpacity =
            0.65 +
            Math.random() *
            0.35;


        star.style.left =
            `${x}px`;


        star.style.top =
            `${y}px`;


        star.style.setProperty(
            "--twinkle-duration",
            `${duration.toFixed(2)}s`
        );


        star.style.setProperty(
            "--twinkle-delay",
            `${delay.toFixed(2)}s`
        );


        star.style.setProperty(
            "--star-min-opacity",
            minOpacity.toFixed(2)
        );


        star.style.setProperty(
            "--star-max-opacity",
            maxOpacity.toFixed(2)
        );


        starField.appendChild(
            star
        );


        stars.push({

            element:
                star,

            x:
                x,

            y:
                y,

            offsetX:
                0,

            offsetY:
                0,

            targetX:
                0,

            targetY:
                0
        });
    }


    /* =====================================
       🖱️ КУРСОР ЗВЁЗД
       ===================================== */

    let cursorX =
        window.innerWidth / 2;


    let cursorY =
        window.innerHeight / 2;


    let mouseActive =
        false;


    window.addEventListener(
        "pointermove",
        (event) => {

            cursorX =
                event.clientX;


            cursorY =
                event.clientY;


            mouseActive =
                true;


            starField.style.setProperty(
                "--cursor-x",
                `${cursorX}px`
            );


            starField.style.setProperty(
                "--cursor-y",
                `${cursorY}px`
            );
        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "pointerleave",
        () => {

            mouseActive =
                false;
        }
    );


    /* =====================================
       🌌 АНИМАЦИЯ
       ===================================== */

    function animateStars() {

        const forceRadius =
            170;


        for (
            const star of stars
        ) {

            let targetX =
                0;


            let targetY =
                0;


            if (
                mouseActive
            ) {

                const currentX =
                    star.x +
                    star.offsetX;


                const currentY =
                    star.y +
                    star.offsetY;


                const dx =
                    currentX -
                    cursorX;


                const dy =
                    currentY -
                    cursorY;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    forceRadius
                ) {

                    const strength =
                        1 -
                        (
                            distance /
                            forceRadius
                        );


                    const angle =
                        Math.atan2(
                            dy,
                            dx
                        );


                    const force =
                        strength *
                        42;


                    targetX =
                        Math.cos(angle) *
                        force;


                    targetY =
                        Math.sin(angle) *
                        force;


                    star.element.classList.add(
                        "near-cursor"
                    );

                } else {

                    star.element.classList.remove(
                        "near-cursor"
                    );
                }
            }


            star.targetX =
                targetX;


            star.targetY =
                targetY;


            star.offsetX +=
                (
                    star.targetX -
                    star.offsetX
                ) * 0.09;


            star.offsetY +=
                (
                    star.targetY -
                    star.offsetY
                ) * 0.09;


            star.element.style.transform =
                `
                translate3d(
                    ${star.offsetX}px,
                    ${star.offsetY}px,
                    0
                )
                `;
        }


        requestAnimationFrame(
            animateStars
        );
    }


    /* =====================================
       RESIZE
       ===================================== */

    window.addEventListener(
        "resize",
        () => {

            for (
                const star of stars
            ) {

                star.x =
                    Math.min(
                        star.x,
                        window.innerWidth
                    );


                star.y =
                    Math.min(
                        star.y,
                        window.innerHeight
                    );
            }
        if (
                moon &&
                moonCanvas &&
                ctx
            ) {

                setupMoon();

                drawMoon();
            }
        }
    );


    animateStars();

})();


/* =========================================
   🌕 ЗАПУСК ЛУНЫ
   ========================================= */

if (
    moon &&
    moonCanvas &&
    ctx
) {

    setupMoon();

    drawMoon();

    requestAnimationFrame(
        animateMoon
    );
}


/* =========================================
   ЗАПУСК САЙТА
   ========================================= */

checkDate();


/* =========================================
   ПОЛНАЯ ЗАГРУЗКА
   ========================================= */

window.addEventListener(
    "load",
    () => {

        if (
            moon &&
            moonCanvas &&
            ctx
        ) {

            setupMoon();

            drawMoon();
        }


        if (
            currentPage ===
            birthdayPage
        ) {

            startKinich();
        }
    }
);
/* =========================================
   ← HOME — ОБРАТНО НА ОБЫЧНЫЙ ЭКРАН
   ========================================= */

const homeButton =
    document.getElementById("homeButton");


if (homeButton) {

    homeButton.addEventListener(
        "click",
        () => {

            showPage(
                mainPage
            );
        }
    );
}
// Логика вызова Яндекс Плеера
document.addEventListener('DOMContentLoaded', () => {
    const musicBtn = document.getElementById('musicToggle');
    const musicModal = document.getElementById('musicModal');
    const closeMusic = document.getElementById('closeMusic');

    if (musicBtn && musicModal) {
        // Открытие плеера
        musicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            musicModal.classList.remove('hidden');
        });

        // Закрытие на крестик
        if (closeMusic) {
            closeMusic.addEventListener('click', () => {
                musicModal.classList.add('hidden');
            });
        }

        // Закрытие при клике мимо окна
        musicModal.addEventListener('click', (e) => {
            if (e.target === musicModal) {
                musicModal.classList.add('hidden');
            }
        });
    }
});
// Логика работы видео-модалки
document.addEventListener('DOMContentLoaded', () => {
    const openVideoBtn = document.getElementById('openVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideo = document.getElementById('closeVideo');
    const giftVideo = document.getElementById('giftVideo');

    if (openVideoBtn && videoModal) {
        openVideoBtn.addEventListener('click', () => {
            videoModal.classList.remove('hidden');
            if (giftVideo) giftVideo.play();
        });

        const stopAndCloseVideo = () => {
            videoModal.classList.add('hidden');
            if (giftVideo) {
                giftVideo.pause();
                giftVideo.currentTime = 0;
            }
        };

        if (closeVideo) closeVideo.addEventListener('click', stopAndCloseVideo);

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) stopAndCloseVideo();
        });
    }
});
    // =========================================
// 🎬 ЛОГИКА МОДАЛЬНОГО ОКНА С ВИДЕО
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const openVideoBtn = document.getElementById('openVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideo = document.getElementById('closeVideo');
    const giftVideo = document.getElementById('giftVideo');

    if (openVideoBtn && videoModal) {
        // Открытие модалки и запуск видео
        openVideoBtn.addEventListener('click', () => {
            videoModal.classList.remove('hidden');
            if (giftVideo) {
                giftVideo.currentTime = 0;
                giftVideo.play().catch(err => console.log("Ждем клика пользователя:", err));
            }
        });

        // Закрытие и пауза
        const stopAndCloseVideo = () => {
            videoModal.classList.add('hidden');
            if (giftVideo) {
                giftVideo.pause();
            }
        };

        if (closeVideo) {
            closeVideo.addEventListener('click', stopAndCloseVideo);
        }

        // Закрытие по клику на тёмный фон
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                stopAndCloseVideo();
            }
        });
    }
});
