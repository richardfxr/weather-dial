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
    const HumidityAm = [
        [66, 67, 70, 73, 74, 75, 77, 78, 69, 62, 54, 48],
        [84, 88, 90, 91, 91, 92, 92, 88, 79, 71, 63, 59],
    ];
    const HumidityPm = [
        [44, 43, 42, 43, 45, 49, 55, 62, 68, 73, 77, 80],
        [57, 54, 52, 50, 50, 52, 58, 65, 70, 75, 80, 83],
    ];

    /* === VERIABLES ========================== */
    const curUnits = "%";

    /* === REACTIVE DECLARATIONS ============== */
    $: curHumidityAm = HumidityAm[0];
    $: curHumidityPm = HumidityPm[0];
    $: curHumidity = $period === "AM" ? curHumidityAm : curHumidityPm;
    $: selectedHumidity = $selectedPeriod === "AM" ? curHumidityAm : curHumidityPm;
</script>

<div class="twoCol">
    <div id="dial__col">
        <Dial
            title="Humidity"
            dataPoints={selectedHumidity}
            units={curUnits}
        />
    </div>

    <div id='text__col'>
        <h1>Humidity: {curHumidity[$hours]}{curUnits}</h1>

        <Radios
            groupName = "Period"
            bind:selected = {$selectedPeriod}
            options = {[
                { name: "AM", value: "AM"},
                { name: "PM", value: "PM"},
            ]}
            on:select={handlePeriod} />
    </div>
</div>

<style lang="scss">
    
</style>