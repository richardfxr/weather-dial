<script>
    /* === IMPROTS ============================ */
    import { createEventDispatcher } from 'svelte';

    /* === PROPS ============================== */
    export let groupName;
    export let selected;
    export let options;

    /* === VARIABLES ========================== */
    // let selected = initial;

    /* === DISPATCHER ========================= */
    const dispatch = createEventDispatcher();
	// function handleSelect(value) {
	// 	dispatch('select', {
	// 		value: value
	// 	});
	// }
</script>

<div class="radios__container" role="radiogroup" aria-labelledby="{groupName}__label">
    <h2 id="{groupName}__label">{groupName}</h2>
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

<style lang="scss">
    .radios__container {
        display: flex;
        flex-direction: column;
        gap: var(--pad-xxs);

        h2 {
            color: var(--clr-700);
            font-size: var(--fontSize-md);
            font-weight: 500;
        }
    }

    .radios {
        --_accnet-pad: calc(var(--pad-xs) + var(--border-thin));

        display: flex;
        flex-flow: row wrap;

        // padding for accent line
        padding-bottom: var(--_accnet-pad);

        label span {
            display: block;
            position: relative;
            cursor: pointer;

            color: var(--clr-900);
            font-size: var(--fontSize-lg);
            font-weight: 700;

            padding: 6px 17px;
            border-bottom: solid var(--border-thin) var(--clr-0);

            &::before {
                // gradient background
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: -1;

                background: linear-gradient(
                    180deg,
                    var(--clr-50) 40%,
                    var(--clr-20)
                );

                opacity: 0;
                transition: opacity var(--trans-normal);
            }

            &::after {
                // accent line below
                content: '';
                position: absolute;
                right: 0;
                bottom: calc(-1 * var(--_accnet-pad));
                left: 0;
                height: var(--border-thin);

                background-color: var(--clr-accent-800);

                opacity: 0;
                transition: opacity var(--trans-normal);
            }
        }

        input:checked ~ span {
            color: var(--clr-1000);

            &::before, &::after {
                opacity: 1;
            }
        }
    }

    /* === BREAKPOINTS ======================== */
    @media (orientation: portrait) {
        .radios__container {
            align-items: center;
        }
    }
</style>