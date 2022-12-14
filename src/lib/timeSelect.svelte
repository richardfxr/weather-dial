<script>
    /* === IMPORTS ============================ */
    import Radios from "$lib/radios.svelte";
    import {
        date,
        hasSelectedPeriod,
        selectedPeriod,
        selectedDate,
        month,
        day,
    } from '../store/store.js';

    /* === HANDLERS =========================== */
    function handlePeriod(event) {
        hasSelectedPeriod.set(true);
        selectedPeriod.set(event.detail.value);
    }

    /* === FUNCTIONS ========================== */
    function convertToTwoDigits(num) {
        return String(num).padStart(2, '0');
    }

    /* === REACTIVE DECLARATIONS ============== */
    $: date1 = new Date(new Date().setDate($date.getDate() + 1));
    $: month1 = date1.toLocaleString("en-US", { timeZone: "America/New_York", month: 'short' });
    $: day1 = date1.toLocaleString("en-US", { timeZone: "America/New_York", day: 'numeric' });

    $: date2 = new Date(new Date().setDate($date.getDate() + 2));
    $: month2 = date2.toLocaleString("en-US", { timeZone: "America/New_York", month: 'short' });
    $: day2 = date2.toLocaleString("en-US", { timeZone: "America/New_York", day: 'numeric' });

    $: date3 = new Date(new Date().setDate($date.getDate() + 3));
    $: month3 = date3.toLocaleString("en-US", { timeZone: "America/New_York", month: 'short' });
    $: day3 = date3.toLocaleString("en-US", { timeZone: "America/New_York", day: 'numeric' });

    $: date4 = new Date(new Date().setDate($date.getDate() + 4));
    $: month4 = date4.toLocaleString("en-US", { timeZone: "America/New_York", month: 'short' });
    $: day4 = date4.toLocaleString("en-US", { timeZone: "America/New_York", day: 'numeric' });
</script>

<div class="timeSelect">
    <h2>Date & Time</h2>

    <Radios
        groupName="Period"
        bind:selected={$selectedPeriod}
        options={[
            { name: "AM", value: "AM"},
            { name: "PM", value: "PM"},
        ]}
        index="-2"
        hideLabel={true}
        on:select={handlePeriod} />

    <div
        class="dateSelect__container"
        role="radiogroup"
        aria-labelledby="dateSelect__label">
        <h2 id="dateSelect__label" class="visuallyHidden">Date</h2>
        <div class="dateSelect">
            <label>
                <input
                    class="visuallyHidden"
                    type="radio"
                    bind:group={$selectedDate}
                    name="Date"
                    value={0} />
                <div class="date">
                    <span class="month">{$month}</span>
                    <span class="day">{convertToTwoDigits($day)}</span>
                </div>
            </label>
            <label>
                <input
                    class="visuallyHidden"
                    type="radio"
                    bind:group={$selectedDate}
                    name="Date"
                    value={1} />
                <div class="date">
                    <span class="month">{month1}</span>
                    <span class="day">{convertToTwoDigits(day1)}</span>
                </div>
            </label>
            <label>
                <input
                    class="visuallyHidden"
                    type="radio"
                    bind:group={$selectedDate}
                    name="Date"
                    value={2} />
                <div class="date">
                    <span class="month">{month2}</span>
                    <span class="day">{convertToTwoDigits(day2)}</span>
                </div>
            </label>
            <label>
                <input
                    class="visuallyHidden"
                    type="radio"
                    bind:group={$selectedDate}
                    name="Date"
                    value={3} />
                <div class="date">
                    <span class="month">{month3}</span>
                    <span class="day">{convertToTwoDigits(day3)}</span>
                </div>
            </label>
            <label>
                <input
                    class="visuallyHidden"
                    type="radio"
                    bind:group={$selectedDate}
                    name="Date"
                    value={4} />
                <div class="date">
                    <span class="month">{month4}</span>
                    <span class="day">{convertToTwoDigits(day4)}</span>
                </div>
            </label>
        </div>
    </div>
</div>


<style lang="scss">
    .timeSelect {
        display: flex;
        flex-flow: column nowrap;
        gap: var(--pad-xxs);

        h2 {
            color: var(--clr-700);
            font-size: var(--fontSize-md);
            font-weight: 500;

            padding-left: 5px;

            animation: delayedFade 0.8s ease 1;
        }
    }

    .dateSelect {        
        display: flex;
        flex-direction: row wrap;
        gap: var(--pad-xxs);

        padding-top: calc(var(--pad-xs) - var(--pad-xxs));

        animation: delayedFade 1.1s ease 1;

        label {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            cursor: pointer;

            div {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                justify-content: center;
                gap: var(--pad-xxs);
                position: relative;
                width: calc(1.92rem + 34px);

                padding: 1.375rem 0;
                border: solid var(--border-thin) var(--clr-0);
                border-radius: var(--bradius-circle);

                transition: border-color var(--trans-fast);

                &::before {
                    // active background circle (hidden by default)
                    content: '';
                    position: absolute;
                    top: var(--pad-xxxs);
                    right: var(--pad-xxxs);
                    bottom: var(--pad-xxxs);
                    left: var(--pad-xxxs);
                    z-index: -1;

                    background-color: var(--clr-20);
                    border-radius: var(--bradius-circle);

                    opacity: 0;
                    transition: opacity var(--trans-normal);
                }

                span {
                    transition: color var(--trans-fast);

                    &.day {
                        color: var(--clr-900);
                        font-size: var(--fontSize-lg);
                        font-weight: 600;
                        line-height: 1em;
                    }

                    &.month {
                        color: var(--clr-700);
                        font-size: var(--fontSize-sm);
                        font-weight: 600;
                        line-height: 1em;
                        text-transform: uppercase;
                    }
                }
            }
        }

        input {
            &:focus-visible ~ div {
                outline: var(--outline);
                outline-offset: calc(-1 * var(--border-thin));
            }

            &:checked ~ div {
                border-color: var(--clr-accent-800);

                span.month, span.day {
                    color: var(--clr-1000);
                }
            }
        }
    }

    /* === BREAKPOINTS ======================== */
    @media (orientation: portrait) {
        .timeSelect h2 {
            text-align: center;
            padding-left: 0;
        }

        .dateSelect {
            justify-content: center;
        }
    }

    /* === A11Y =============================== */    
    @media (prefers-contrast: more) {
        .dateSelect input:checked ~ div {
            &::before {
                opacity: 1;
            }

            span.day, span.month {
                color: var(--clr-100);
            }
        }
    }

    @media (forced-colors: active) {
        .dateSelect input:checked ~ div {
            &::before {
                background-color: SelectedItem;
                opacity: 1;
            }

            span.day, span.month {
                color: SelectedItemText;
                // prevent text background from being set to Canvas
                forced-color-adjust: none;
            }
        }
    }
</style>