// ======================================
// SELECT ELEMENTS
// ======================================

const ageForm = document.querySelector("#age-form");

const birthDateInput = document.querySelector("#birth-date");

const resetButton = document.querySelector("#reset-btn");

const errorMessage = document.querySelector("#error-message");

const yearsElement = document.querySelector("#years");

const monthsElement = document.querySelector("#months");

const daysElement = document.querySelector("#days");

const totalMonthsElement =
    document.querySelector("#total-months");

const totalDaysElement =
    document.querySelector("#total-days");

const nextBirthdayElement =
    document.querySelector("#next-birthday");

const birthdayCard =
    document.querySelector(".birthday-card");

const themeToggle =
    document.querySelector("#theme-toggle");


// ======================================
// GET TODAY
// ======================================

function getToday() {

    const now = new Date();

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );
}


const today = getToday();


// ======================================
// SET MAXIMUM DATE
// ======================================

function formatDateForInput(date) {

    const year = date.getFullYear();

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const day =
        String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


birthDateInput.max =
    formatDateForInput(today);


// ======================================
// AGE CALCULATION
// ======================================

function calculateAge(birthDate, currentDate) {

    let years =
        currentDate.getFullYear() -
        birthDate.getFullYear();

    let months =
        currentDate.getMonth() -
        birthDate.getMonth();

    let days =
        currentDate.getDate() -
        birthDate.getDate();


    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
            );

        days += previousMonth.getDate();
    }


    if (months < 0) {

        years--;

        months += 12;
    }


    return {
        years,
        months,
        days
    };
}


// ======================================
// NEXT BIRTHDAY
// ======================================

function calculateNextBirthday(
    birthDate,
    currentDate
) {

    // Remove previous birthday styling

    birthdayCard.classList.remove(
        "birthday-today"
    );


    const currentYear =
        currentDate.getFullYear();

    const currentMonth =
        currentDate.getMonth();

    const currentDay =
        currentDate.getDate();


    const birthMonth =
        birthDate.getMonth();

    const birthDay =
        birthDate.getDate();


    // ==================================
    // BIRTHDAY TODAY
    // ==================================

    if (
        currentMonth === birthMonth &&
        currentDay === birthDay
    ) {

        birthdayCard.classList.add(
            "birthday-today"
        );

        return "🎉 Happy Birthday!";
    }


    // ==================================
    // NEXT BIRTHDAY
    // ==================================

    let nextBirthday =
        new Date(
            currentYear,
            birthMonth,
            birthDay
        );


    // Date representing today only

    const todayOnly =
        new Date(
            currentYear,
            currentMonth,
            currentDay
        );


    // If birthday has passed,
    // use next year

    if (nextBirthday < todayOnly) {

        nextBirthday =
            new Date(
                currentYear + 1,
                birthMonth,
                birthDay
            );
    }


    // ==================================
    // DAYS REMAINING
    // ==================================

    const difference =
        nextBirthday.getTime() -
        todayOnly.getTime();


    const daysRemaining =
        Math.round(
            difference /
            (1000 * 60 * 60 * 24)
        );


    // ==================================
    // BIRTHDAY TOMORROW
    // ==================================

    if (daysRemaining === 1) {

        return "Tomorrow 🎂";
    }


    // ==================================
    // NORMAL COUNTDOWN
    // ==================================

    return `${daysRemaining} days`;
}


// ======================================
// CALCULATE BUTTON
// ======================================

ageForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Clear previous error

        errorMessage.textContent = "";


        // Check empty input

        if (!birthDateInput.value) {

            errorMessage.textContent =
                "Please select your date of birth.";

            return;
        }


        // Create birth date

        const birthDate =
            new Date(
                birthDateInput.value + "T00:00:00"
            );


        // Check invalid date

        if (
            Number.isNaN(
                birthDate.getTime()
            )
        ) {

            errorMessage.textContent =
                "Please enter a valid date.";

            return;
        }


        // Check future date

        if (birthDate > today) {

            errorMessage.textContent =
                "Date of birth cannot be in the future.";

            return;
        }


        // ==================================
        // CALCULATE AGE
        // ==================================

        const age =
            calculateAge(
                birthDate,
                today
            );


        yearsElement.textContent =
            age.years;

        monthsElement.textContent =
            age.months;

        daysElement.textContent =
            age.days;


        // ==================================
        // TOTAL MONTHS
        // ==================================

        const totalMonths =
            (age.years * 12) +
            age.months;


        totalMonthsElement.textContent =
            totalMonths.toLocaleString();


        // ==================================
        // TOTAL DAYS
        // ==================================

        const totalDays =
            Math.floor(
                (
                    today.getTime() -
                    birthDate.getTime()
                ) /
                (1000 * 60 * 60 * 24)
            );


        totalDaysElement.textContent =
            totalDays.toLocaleString();


        // ==================================
        // NEXT BIRTHDAY
        // ==================================

        const birthdayMessage =
            calculateNextBirthday(
                birthDate,
                today
            );


        nextBirthdayElement.textContent =
            birthdayMessage;

    }
);


// ======================================
// RESET
// ======================================

resetButton.addEventListener(
    "click",
    function () {

        birthDateInput.value = "";

        errorMessage.textContent = "";

        yearsElement.textContent = "0";

        monthsElement.textContent = "0";

        daysElement.textContent = "0";

        totalMonthsElement.textContent = "0";

        totalDaysElement.textContent = "0";

        nextBirthdayElement.textContent = "—";


        birthdayCard.classList.remove(
            "birthday-today"
        );

    }
);


// ======================================
// DARK MODE
// ======================================

const savedTheme =
    localStorage.getItem(
        "ageCalculatorTheme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    themeToggle.textContent = "☀️";

    themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
    );
}


// ======================================
// THEME TOGGLE
// ======================================

themeToggle.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDarkMode =
            document.body.classList.contains(
                "dark-mode"
            );


        if (isDarkMode) {

            themeToggle.textContent = "☀️";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            localStorage.setItem(
                "ageCalculatorTheme",
                "dark"
            );

        } else {

            themeToggle.textContent = "🌙";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            localStorage.setItem(
                "ageCalculatorTheme",
                "light"
            );
        }

    }
);