<script>
    /* === IMPORTS ============================ */
    import Dial from "$lib/dial.svelte";
    import Radios from "$lib/radios.svelte";
    import { period, hours, hasSelectedPeriod, selectedPeriod } from '../../store/store.js';

    /* === HANDLERS =========================== */
    function handlePeriod(event) {
        hasSelectedPeriod.set(true);
        selectedPeriod.set(event.detail.value);
    }

    /* === TEST DATA ========================== */
    const PerAm = [
        [1, 2, 2, 3, 3, 4, 4, 4, 2, 1, 0, 0],
        [6, 7, 7, 7, 7, 7, 7, 6, 4, 2, 1, 1],
        [15, 15, 15, 15, 6, 7, 7, 7, 9, 10, 10, 19],
        [17, 19, 14, 12, 9, 8, 11, 9, 10, 6, 4, 2],
    ];
    const PerPm = [
        [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 5, 5],
        [1, 1, 0, 1, 0, 3, 4, 6, 23, 19, 21, 20],
        [20, 21, 32, 38, 45, 24, 33, 35, 21, 24, 21, 20],
        [1, 1, 0, 0 ,0, 0, 2, 4, 5, 6, 6, 10],
    ];

    /* === VERIABLES ========================== */
    const curUnits = "%";

    /* === REACTIVE DECLARATIONS ============== */
    $: curPerAm = PerAm[0];
    $: curPerPm = PerPm[0];
    $: curPer = $period === "AM" ? curPerAm : curPerPm;
    $: selectedPer = $selectedPeriod === "AM" ? curPerAm : curPerPm;
</script>

<div class="twoCol">
    <div id="dial__col">
        <Dial
            title="Precipitation"
            dataPoints={selectedPer}
            units={curUnits}
        />
    </div>

    <div id='text__col'>
        <h1>Precipitation: {curPer[$hours]}{curUnits}</h1>

        <Radios
            groupName="Period"
            bind:selected={$selectedPeriod}
            options={[
                { name: "AM", value: "AM"},
                { name: "PM", value: "PM"},
            ]}
            index=0
            on:select={handlePeriod} />
    </div>
</div>

<style lang="scss">
    
</style>