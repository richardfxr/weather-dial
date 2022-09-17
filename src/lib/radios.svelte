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
                    type="radio"
                    bind:group={selected}
                    on:click={()=> {dispatch('select', { value: selected })}}
                    name={groupName}
                    {value} />
                {name}
            </label>
        {/each}
    </div>
</div>

<style lang="scss">
    .radios__container {
        display: flex;
        flex-direction: column;
    }

    /* === BREAKPOINTS ======================== */
    @media (orientation: portrait) {
        .radios__container {
            align-items: center;
        }
    }
</style>