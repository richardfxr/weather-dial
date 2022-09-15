import { browser } from '$app/environment';
import { writable } from 'svelte/store';

/* === STORES ============================= */
export const period = writable("AM");
export const hours = writable(12);
export const minutes = writable(0);
export const hasSelectedPeriod = writable(false);
export const selectedPeriod = writable("AM");

/* === LOCAL STORAGE ====================== */
if (browser) {
    
}

/* === UPDATES ============================ */
const dateInterval = setInterval(() => {
    // update data every second
    let date = new Date();
    let hours24 = date.toLocaleString("en-US", { timeZone: "America/New_York", hour: 'numeric', hour12: false });
    hours24 < 12 ? period.set('AM') : period.set('PM');
    hours.set(hours24 % 12);
    minutes.set(date.toLocaleString("en-US", { timeZone: "America/New_York", minute: 'numeric', hour12: false }));
}, 1000);

selectedPeriod.subscribe((value) => {
    // prevent code from running on server
    if (!browser) return

    // set localStorage
    localStorage.selectedPeriod = value;
});