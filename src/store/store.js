import { browser } from '$app/environment';
import { writable } from 'svelte/store';

/* === STORES ============================= */
export const date = writable(new Date());
export const period = writable("AM");
export const hours = writable(12);
export const minutes = writable(0);
export const hasSelectedPeriod = writable(false);
export const selectedPeriod = writable("AM");
export const hasSelectedDate = writable(false);
export const selectedDate = writable(0);
export const month = writable("Jan");
export const day =  writable(1);
export const units = writable("met");
export const tempType = writable("actual");

/* === INTERNAL VARIABLES ================= */
let _hasSelectedPeriod = false;
let _hasSelectedDate = false;

updateDate(); // update all date stores immedietly

/* === LOCAL STORAGE ====================== */
if (browser) {
    if (localStorage.units) units.set(localStorage.units);
    if (localStorage.tempType) tempType.set(localStorage.tempType);
}

/* === UPDATES ============================ */
function updateDate() {
    // create new Date() and get NY time in 24 hour format (0-23)
    date.set(new Date());
    let _date = new Date();
    let hours24 = _date.toLocaleString("en-US", { timeZone: "America/New_York", hour: 'numeric', hour12: false });

    // set period
    hours24 < 12 || hours24 == 24 ? period.set('AM') : period.set('PM');
    if (!_hasSelectedPeriod) hours24 < 12 || hours24 == 24 ? selectedPeriod.set('AM') : selectedPeriod.set('PM');

    // set hours and minutes (NY time)
    hours.set(hours24 % 12);
    minutes.set(_date.toLocaleString("en-US", { timeZone: "America/New_York", minute: 'numeric' }));

    // set month and day
    month.set(_date.toLocaleString("en-US", { timeZone: "America/New_York", month: 'short' }));
    day.set(_date.toLocaleString("en-US", { timeZone: "America/New_York", day: 'numeric' }));
}

const dateInterval = setInterval(() => {
    // update data every second
    updateDate();
}, 1000);

hasSelectedPeriod.subscribe((value) => {
    // update internal variable
    _hasSelectedPeriod = value;
});

hasSelectedDate.subscribe((value) => {
    // update internal variable
    _hasSelectedDate = value;
})

units.subscribe((value) => {
    // prevent code from running on server
    if (!browser) return

    // set localStorage
    localStorage.units = value;
});

tempType.subscribe((value) => {
    // prevent code from running on server
    if (!browser) return

    // set localStorage
    localStorage.tempType = value;
});