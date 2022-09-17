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
    const CloudAm = [
        [15, 11, 10, 9, 19, 22, 17, 21, 25, 15, 17, 19],
        [16, 23, 35, 35, 25, 29, 20, 21, 15, 14, 7, 9],
    ];
    const CloudPm = [
        [20, 21, 15, 15, 22, 20, 15, 12, 6, 8, 13, 13],
        [11, 18, 29, 31, 30, 43, 58, 62, 65, 69, 62, 62],
    ];

    /* === VERIABLES ========================== */
    const curUnits = "%";

    /* === REACTIVE DECLARATIONS ============== */
    $: curCloudAm = CloudAm[0];
    $: curCloudPm = CloudPm[0];
    $: curCloud = $period === "AM" ? curCloudAm : curCloudPm;
    $: selectedCloud = $selectedPeriod === "AM" ? curCloudAm : curCloudPm;
</script>

<div class="twoCol">
    <div id="dial__col">
        <Dial
            title="Cloud Cover"
            dataPoints={selectedCloud}
            units={curUnits}
        />
    </div>

    <div id='text__col'>
        <h1>Cloud Cover: {curCloud[$hours]}{curUnits}</h1>

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