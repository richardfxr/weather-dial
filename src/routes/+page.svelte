<script>
    /* === IMPORTS ============================ */
    import Dial from "$lib/dial.svelte";
    import Radios from "$lib/radios.svelte";
    import { period, hours, hasSelectedPeriod, selectedPeriod, units } from '../store/store.js';

    /* === HANDLERS =========================== */
    function handlePeriod(event) {
        hasSelectedPeriod.set(true);
        selectedPeriod.set(event.detail.value);
    }

    function handleUnits(event) {
        units.set(event.detail.value);
    }

    /* === TEST DATA ========================== */
    const TempAmC = [
        [14, 13, 12, 12, 11, 11, 10, 10, 12, 15, 17, 18],
        [16, 16, 16, 17, 17, 17, 17, 18, 20, 22, 24, 25],
    ];
    const TempAmF = [
        [57, 56, 54, 53, 52, 51, 50, 50, 54, 58, 62, 65],
        [61, 61, 61, 62, 62, 63, 63, 64, 68, 71, 74, 78],
    ];
    const TempPmC = [
        [20, 21, 21, 22, 22, 21, 20, 19, 17, 17, 17, 16],
    ];
    const TempPmF = [
        [67, 69, 70, 71, 71, 70, 68, 65, 63, 62, 62, 61],
    ];

    /* === REACTIVE DECLARATIONS ============== */
    $: curTempAm = $units === "met" ? TempAmC[0] : TempAmF[0];
    $: curTempPm = $units === "met" ? TempPmC[0] : TempPmF[0];
    $: curTemp = $period === "AM" ? curTempAm : curTempPm;
    $: selectedTemp = $selectedPeriod === "AM" ? curTempAm : curTempPm;
    $: curUnits = $units === "met" ? "°C" : "°F";
</script>

<div class="twoCol">
    <div id="dial__col">
        <Dial
            title="Temperature"
            dataPoints={selectedTemp}
            units={curUnits}
        />
    </div>

    <div id='text__col'>
        <h1>Temperature: {curTemp[$hours]}{curUnits}</h1>

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
                { name: "°C", value: "met"},
                { name: "°F", value: "imp"},
            ]}
            on:select={handleUnits} />
    </div>
</div>

<style lang="scss">

</style>
