<script>
    /* === IMPORTS ============================ */
    import Dial from "$lib/dial.svelte";
    import TimeSelect from "$lib/timeSelect.svelte";
    import Footer from "$lib/footer.svelte";
    import { period, hours, hasSelectedPeriod, selectedPeriod, selectedDate } from '../../store/store.js';

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
        [2, 10, 2, 2, 2, 4, 4, 3, 3, 2, 1, 0],
    ];
    const PerPm = [
        [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 5, 5],
        [1, 1, 0, 1, 0, 3, 4, 6, 23, 19, 21, 20],
        [20, 21, 32, 38, 45, 24, 33, 35, 21, 24, 21, 20],
        [1, 1, 0, 0 ,0, 0, 2, 4, 5, 6, 6, 10],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    /* === VERIABLES ========================== */
    const curUnits = "%";

    /* === REACTIVE DECLARATIONS ============== */
    $: curPerAm = PerAm[0];
    $: curPerPm = PerPm[0];
    $: curPer = $period === "AM" ? curPerAm : curPerPm;
    $: selectedPerAm = PerAm[$selectedDate];
    $: selectedPerPm = PerPm[$selectedDate];
    $: selectedPer = $selectedPeriod === "AM" ? selectedPerAm : selectedPerPm;
</script>

<svelte:head>
    <title>Precipitation | Weather Dial</title>
</svelte:head>

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

        <TimeSelect />

        <Footer index={0} />
    </div>
</div>

<style lang="scss">
    
</style>