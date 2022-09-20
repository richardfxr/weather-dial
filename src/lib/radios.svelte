<script>
    /* === IMPROTS ============================ */
    import { createEventDispatcher } from 'svelte';

    /* === PROPS ============================== */
    export let groupName;
    export let selected;
    export let options;
    export let index;

    /* === VARIABLES ========================== */
    // let selected = initial;

    /* === DISPATCHER ========================= */
    const dispatch = createEventDispatcher();
</script>

<div
    class="radios__container"
    class:accent={groupName === "Period"}
    role="radiogroup"
    aria-labelledby="{groupName}__label"
    style="--index: {index};">
    <h2 id="{groupName}__label">{groupName}</h2>
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
                    <span>{name}</span>
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

            animation: firstFade calc(0.8s + 0.2s * var(--index)) ease 1;
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

        animation: firstFade calc(0.9s + 0.2s * var(--index)) ease 1;

        label {
            --_input-pad-vertical: 6px;
            --_input-pad-horizontal: 17px;
            --_inpit-pad-end: 20px;
            --_bradius-end: calc(var(--fontSize-lg) * 1.63 / 2 + var(--_input-pad-vertical));

            span {
                display: block;
                position: relative;
                cursor: pointer;

                color: var(--clr-900);
                font-size: var(--fontSize-lg);
                font-weight: 700;

                padding:
                    var(--_input-pad-vertical)
                    var(--_input-pad-horizontal)
                    calc(var(--_input-pad-vertical) + var(--border-thin))
                    var(--_input-pad-horizontal);
                border-radius: var(--bradius-sm);
                background-color: transparent;

                transition: background-color var(--trans-normal);

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
            
            &:first-child span {
                padding-left: var(--_inpit-pad-end);
                border-radius: var(--_bradius-end) var(--bradius-sm) var(--bradius-sm) var(--_bradius-end);

                &::before{
                    // shift indicator to offset larger padding-left
                    left: var(--_inpit-pad-end);
                }
            }

            &:last-child span {
                padding-right: var(--_inpit-pad-end);
                border-radius: var(--bradius-sm) var(--_bradius-end) var(--_bradius-end) var(--bradius-sm);

                &::before{
                    // shift indicator to offset larger padding-right
                    right: var(--_inpit-pad-end);
                }
            }
        }

        input:checked ~ span {
            color: var(--clr-1000);
            background-color: var(--clr-20);
            
            &::before {
                background-color: var(--clr-accent-800);
            }
        }
    }

    .accent {
        .radios label input:checked ~ span {
            color: var(--clr-0);
            background-color: var(--clr-accent-700);

            &::before {
                background-color: var(--clr-0);
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

    /* === ANIMATIONS ========================= */
    @keyframes firstFade {
        from { opacity: 0; }
        50% { opacity: 0; }
        to { opacity: 1; }
    }
</style>