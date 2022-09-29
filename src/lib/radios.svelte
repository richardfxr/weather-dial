<script>
    /* === IMPROTS ============================ */
    import { createEventDispatcher } from 'svelte';
    import SunIcon from '$lib/SVGs/sunIcon.svelte';
    import MoonIcon from '$lib/SVGs/moonIcon.svelte';

    /* === PROPS ============================== */
    export let groupName;
    export let selected;
    export let options;
    export let index;
    export let hideLabel = false;

    /* === VARIABLES ========================== */
    // let selected = initial;

    /* === DISPATCHER ========================= */
    const dispatch = createEventDispatcher();
</script>

<div
    class="radios__container"
    class:accent={groupName === "Period"}
    class:icon={groupName === "Theme"}
    role="radiogroup"
    aria-labelledby="{groupName}__label"
    style="--index: {index};">
    <h2
        id="{groupName}__label"
        class:visuallyHidden={hideLabel}>
        {groupName}
    </h2>
    <div class="scroll__container">
        <div class="radios">
            {#each options as {name, value}}
                <label key={value}>
                    <input
                        class="visuallyHidden"
                        type="radio"
                        bind:group={selected}
                        on:click={()=> {dispatch('select', { value: selected })}}
                        name={groupName}
                        {value} />
                    {#if groupName === "Theme"}
                        {#if value === "light"}
                            <div>
                                <span class="visuallyHidden">{name}</span>
                                <SunIcon active={selected === value} />
                            </div>
                        {:else if value === "dark"}
                            <div>
                                <span class="visuallyHidden">{name}</span>
                                <MoonIcon active={selected === value} />
                            </div>
                        {/if}
                    {:else}
                        <div>{name}</div>
                    {/if}
                </label>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .radios__container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--pad-xxs);

        h2 {
            color: var(--clr-700);
            font-size: var(--fontSize-md);
            font-weight: 500;

            padding-left: 5px;

            animation: delayedFade calc(1.2s + 0.2s * var(--index)) ease 1;
        }
    }

    .scroll__container {
        // max-width: 100%;
        overflow-x: auto;
    }

    .radios {
        display: flex;
        flex-flow: row nowrap;

        padding: var(--pad-xxxs);
        border: solid var(--border-thin) var(--clr-0);
        border-radius: var(--bradius-circle);

        transition: border-color var(--trans-normal);
        animation: delayedFade calc(1.3s + 0.2s * var(--index)) ease 1;

        label {
            --_input-pad-vertical: 7px;
            --_input-pad-horizontal: 1.0625rem;
            --_inpit-pad-end: 1.25rem;
            --_bradius-end: calc(var(--fontSize-lg) * 1.3 / 2 + var(--_input-pad-vertical));

            div {
                display: block;
                position: relative;
                cursor: pointer;

                color: var(--clr-900);
                font-size: var(--fontSize-lg);
                font-weight: 600;
                line-height: 1.3em;

                padding:
                    var(--_input-pad-vertical)
                    var(--_input-pad-horizontal)
                    calc(var(--_input-pad-vertical) + var(--border-thin))
                    var(--_input-pad-horizontal);
                border-radius: var(--bradius-sm);
                background-color: transparent;

                transition: background-color var(--trans-normal),
                            color var(--trans-normal);

                &::before {
                    // indicator line
                    content: '';
                    position: absolute;
                    right: var(--_input-pad-horizontal);
                    bottom: calc(var(--_input-pad-vertical) + var(--border-thin));
                    left: var(--_input-pad-horizontal);
                    height: var(--border-thin);

                    border-radius: var(--bradius-circle);
                    background-color: transparent;
                }
            }
            
            &:first-child div {
                padding-left: var(--_inpit-pad-end);
                border-radius: var(--_bradius-end) var(--bradius-sm) var(--bradius-sm) var(--_bradius-end);

                &::before{
                    // shift indicator to offset larger padding-left
                    left: var(--_inpit-pad-end);
                }
            }

            &:last-child div {
                padding-right: var(--_inpit-pad-end);
                border-radius: var(--bradius-sm) var(--_bradius-end) var(--_bradius-end) var(--bradius-sm);

                &::before{
                    // shift indicator to offset larger padding-right
                    right: var(--_inpit-pad-end);
                }
            }

            &:hover, &:focus {
                div {
                    color: var(--clr-1000);
                }
            }
        }

        input {
            &:focus-visible ~ div {
                outline: var(--outline);
                outline-offset: var(--pad-xxxs);
            }

            &:checked ~ div {
                color: var(--clr-1000);
                background-color: var(--clr-20);
                
                &::before {
                    background-color: var(--clr-accent-800);
                }
            }
        }
    }

    .accent {
        .radios label input:checked ~ div {
            color: var(--clr-white);
            background-color: var(--clr-accent-700);

            &::before {
                background-color: var(--clr-white);
            }
        }
    }

    .icon {
        .radios label {
            --_icon-size: 1.5rem;
            --_input-pad-vertical: 9px;
            --_inpit-pad-end: 19px;
            --_bradius-end: calc(var(--_icon-size) / 2 + var(--_input-pad-vertical));

            div {
                // remove additional bottom padding
                padding-bottom: var(--_input-pad-vertical);

                &::before {
                    display: none;
                }

                :global(.icon) {
                    display: block;
                    width: var(--_icon-size);
                    height: var(--_icon-size);
                }
            }
        } 
    }

    /* === BREAKPOINTS ======================== */
    @media (orientation: portrait) {
        .radios__container {
            align-items: center;

            h2 {
                padding-left: 0;
            }
        }

        .radios {
            justify-content: center;
        }
    }

    /* === A11Y =============================== */
    @media (prefers-contrast: more) {
        .radios {
            input {
                &:checked ~ div {
                    color: var(--clr-100);
                    
                    &::before {
                        background-color: var(--clr-100);
                    }
                }
            }
        }

        .accent {
            .radios label input:checked ~ div {
                color: var(--clr-100);

                &::before {
                    background-color: var(--clr-100);
                }
            }
        }
    }
</style>