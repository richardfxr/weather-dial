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
        return num.toLocaleString(undefined, { minimumIntegerDigits: 2 });
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
    $: month4 = date1.toLocaleString("en-US", { timeZone: "America/New_York", month: 'short' });
    $: day4 = date1.toLocaleString("en-US", { timeZone: "America/New_York", day: 'numeric' });
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
        flex-flow: row wrap;

        animation: delayedFade 1.1s ease 1;
    }

    .dateSelect {
        display: flex;
        flex-direction: row wrap;
        gap: var(--pad-xxs);

        padding-top: calc(var(--pad-xs) - var(--pad-xxs));

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

                padding: 22px 17px;
                border: solid var(--border-thin) var(--clr-0);
                border-radius: var(--bradius-circle);

                transition: border-color var(--trans-fast);

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

        input:checked ~ div {
            border-color: var(--clr-accent-800);

            span.month, span.day {
                color: var(--clr-1000);
            }
        }
    }

    /* === BREAKPOINTS ======================== */
    @media (orientation: portrait) {
        .timeSelect h2 {
            text-align: center;
            padding-left: 0;
        }
    }
</style>