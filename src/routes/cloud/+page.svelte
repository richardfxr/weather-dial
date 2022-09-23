<script>
    /* === IMPORTS ============================ */
    import Dial from "$lib/dial.svelte";
    import TimeSelect from "$lib/timeSelect.svelte";
    import Footer from "$lib/footer.svelte";
    import { period, hours, hasSelectedPeriod, selectedPeriod, selectedDate } from '../../store/store.js';

    /* === TEST DATA ========================== */
    const CloudAm = [
        [15, 11, 10, 9, 19, 22, 17, 21, 25, 15, 17, 19],
        [16, 23, 35, 35, 25, 29, 20, 21, 15, 14, 7, 9],
        [18, 22, 33, 30, 36, 34, 31, 35, 34, 39, 47, 47],
        [75, 78, 81, 82, 82, 79, 77, 69, 53, 52, 45, 43],
        [28, 14, 15, 18, 16, 10, 11, 18, 39, 52, 55, 60],
    ];
    const CloudPm = [
        [20, 21, 15, 15, 22, 20, 15, 12, 6, 8, 13, 13],
        [11, 18, 29, 31, 30, 43, 58, 62, 65, 69, 62, 62],
        [63, 70, 60, 71, 72, 73, 70, 71, 71, 65, 65, 68],
        [42, 40, 43, 39, 41, 38, 34, 28, 29, 37, 25, 51],
        [59, 54, 48, 44, 40, 36, 21, 16, 14, 10, 11, 6],
    ];

    /* === VERIABLES ========================== */
    const curUnits = "%";

    /* === REACTIVE DECLARATIONS ============== */
    $: curCloudAm = CloudAm[0];
    $: curCloudPm = CloudPm[0];
    $: curCloud = $period === "AM" ? curCloudAm : curCloudPm;
    $: selectedCloudAm = CloudAm[$selectedDate];
    $: selectedCloudPm = CloudPm[$selectedDate];
    $: selectedCloud = $selectedPeriod === "AM" ? selectedCloudAm : selectedCloudPm;
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

        <TimeSelect />

        <Footer index={0} />
    </div>
</div>

<style lang="scss">
    
</style>