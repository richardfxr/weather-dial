<script>
    /* === IMPORTS ============================ */
    import Dial from "$lib/dial.svelte";
    import { hasSelectedPeriod, selectedPeriod } from '../../store/store.js';

    /* === FUNCTIONS ========================== */
    function changePeriod(period) {
        hasSelectedPeriod.set(true);
        selectedPeriod.set(period);
    }

    // test data
    const TempAmC = [18, 17, 17, 17, 17, 16, 16, 17, 20, 23, 25, 27];
    const TempAmF = [64, 63, 63, 62, 62, 60, 60, 61, 68, 73, 78, 81];
    const TempPmC = [29, 29, 30, 30, 30, 29, 28, 24, 22, 21, 19, 19];
    const TempPmF = [84, 85, 86, 86, 86, 84, 83, 76, 72, 70, 67, 66];
</script>

<div class="twoCol">
    <div id="dial__col">
        <Dial
            title="Temperature"
            dataPoints={$selectedPeriod === "AM" ? TempAmC : TempPmC}
            units="°C"
        />
    </div>

    <div id='text__col'>
        <h1>Percipitation</h1>
        <button on:click={() => changePeriod("AM")}>AM</button>
        <button on:click={() => changePeriod("PM")}>PM</button>
    </div>
</div>

<style lang="scss">
    
</style>