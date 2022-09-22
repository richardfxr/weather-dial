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
    const HumidityAm = [
        [66, 67, 70, 73, 74, 75, 77, 78, 69, 62, 54, 48],
        [84, 88, 90, 91, 91, 92, 92, 88, 79, 71, 63, 59],
        [93, 95, 93, 95, 95, 94, 95, 97, 91, 87, 80, 76],
        [91, 93, 91, 93, 92, 92, 92, 95, 89, 83, 73, 66],
    ];
    const HumidityPm = [
        [44, 43, 42, 43, 45, 49, 55, 62, 68, 73, 77, 80],
        [57, 54, 52, 50, 50, 52, 58, 65, 70, 75, 80, 83],
        [73, 70, 69, 70, 69, 73, 77, 82, 86, 88, 89, 89],
        [62, 58, 57, 57, 58, 59, 64, 71, 78, 84, 87, 87],
    ];

    /* === VERIABLES ========================== */
    const curUnits = "%";

    /* === REACTIVE DECLARATIONS ============== */
    $: curHumidityAm = HumidityAm[$selectedDate];
    $: curHumidityPm = HumidityPm[$selectedDate];
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

        <TimeSelect />
    </div>
</div>

<style lang="scss">
    
</style>