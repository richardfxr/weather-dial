<script>
    /* === IMPORTS ============================ */
    import Dial from "$lib/dial.svelte";
    import Radios from "$lib/radios.svelte";
    import { period, hours, hasSelectedPeriod, selectedPeriod, units } from '../../store/store.js';

    /* === HANDLERS =========================== */
    function handlePeriod(event) {
        hasSelectedPeriod.set(true);
        selectedPeriod.set(event.detail.value);
    }

    function handleUnits(event) {
        units.set(event.detail.value);
    }

    /* === TEST DATA ========================== */
    const WindAmKm = [
        [9, 9, 9, 8, 8, 7, 7, 7, 7, 8, 8, 7],
        [10, 9, 10, 11, 11, 11, 12, 13, 15, 19, 21, 21],
        [8, 7, 8, 8, 6, 5, 4, 4, 5, 9, 10, 10],
        [5, 5, 6, 5, 5, 4, 4 ,5, 5, 9, 10, 8],
    ];

    const WindAmM = [
        [6, 5, 5, 5, 5, 4, 4, 4, 4, 5, 5, 4],
        [6, 5, 5, 5, 7, 7, 8, 8, 10, 12, 13, 13],
        [5, 5, 5, 5, 4, 3, 3, 2, 3, 6, 7, 6],
        [3, 3, 4, 3, 3, 2, 2, 3, 3, 6, 6, 5],
    ];

    const WindPmKm = [
        [5, 6, 8, 9, 11, 14, 15, 13, 11, 10, 11, 11],
        [22, 22, 23, 21, 19, 19, 17, 15, 13, 10, 10, 10],
        [10, 11, 12, 10, 11, 11, 9, 7, 6, 6, 6, 6],
        [8, 10, 12, 13, 14, 14, 16, 15, 13, 12, 13, 15],
    ];

    const WindPmM = [
        [3, 4, 5, 6, 7, 9, 9, 8, 7, 6, 6, 7],
        [14, 14, 14, 13, 12, 11, 10, 9, 8, 6, 6, 6],
        [6, 7, 8, 6, 7, 7, 6, 5, 4, 4, 4, 4],
        [5, 6, 8, 8, 9, 9, 10, 9, 8, 8, 8, 9],
    ];

    /* === REACTIVE DECLARATIONS ============== */
    $: curWindAm = $units === "met" ? WindAmKm[0] : WindAmM[0];
    $: curWindPm = $units === "met" ? WindPmKm[0] : WindPmM[0];
    $: curWind = $period === "AM" ? curWindAm : curWindPm;
    $: selectedWind = $selectedPeriod === "AM" ? curWindAm : curWindPm;
    $: curUnits = $units === "met" ? "km/h" : "mph";
</script>

<div class="twoCol">
    <div id="dial__col">
        <Dial
            title="Wind Speed"
            dataPoints={selectedWind}
            units={curUnits}
        />
    </div>

    <div id='text__col'>
        <h1>Wind Speed: {curWind[$hours]}{curUnits}</h1>

        <Radios
            groupName = "Period"
            bind:selected = {$selectedPeriod}
            options = {[
                { name: "AM", value: "AM"},
                { name: "PM", value: "PM"},
            ]}
            on:select={handlePeriod} />

        <Radios
            groupName = "Units"
            bind:selected = {$units}
            options = {[
                { name: "km/h", value: "met"},
                { name: "mph", value: "imp"},
            ]}
            on:select={handleUnits} />
    </div>
</div>

<style lang="scss">

</style>
