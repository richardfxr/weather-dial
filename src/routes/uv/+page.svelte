<script>
    /* === IMPORTS ============================ */
    import Dial from "$lib/dial.svelte";
    import TimeSelect from "$lib/timeSelect.svelte";
    import { period, hours, hasSelectedPeriod, selectedPeriod, selectedDate } from '../../store/store.js';

    /* === HANDLERS =========================== */
    function handlePeriod(event) {
        hasSelectedPeriod.set(true);
        selectedPeriod.set(event.detail.value);
    }

    /* === TEST DATA ========================== */
    const UvAm = [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 5],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 5],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 5],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 5],
    ];
    const UvPm = [
        [6, 6, 5, 4, 2, 1, 0, 0, 0, 0, 0, 0],
        [6, 6, 5, 4, 2, 1, 0, 0, 0, 0, 0, 0],
        [5, 5, 5, 3, 2, 1, 0, 0, 0, 0, 0, 0],
        [6, 6, 5, 4, 2, 1, 0, 0, 0, 0, 0, 0],
    ];

    /* === VERIABLES ========================== */
    const curUnits = "/10";

    /* === REACTIVE DECLARATIONS ============== */
    $: curUvAm = UvAm[$selectedDate];
    $: curUvPm = UvPm[$selectedDate];
    $: curUv = $period === "AM" ? curUvAm : curUvPm;
    $: selectedUv = $selectedPeriod === "AM" ? curUvAm : curUvPm;
</script>

<div class="twoCol">
    <div id="dial__col">
        <Dial
            title="UV Index"
            dataPoints={selectedUv}
            units={curUnits}
        />
    </div>

    <div id='text__col'>
        <h1>UV Index: {curUv[$hours]} of 10</h1>

        <TimeSelect />
    </div>
</div>

<style lang="scss">
    
</style>