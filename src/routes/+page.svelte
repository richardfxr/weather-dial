<script>
    /* === IMPORTS ============================ */
    import Dial from "$lib/dial.svelte";
    import TimeSelect from "../lib/timeSelect.svelte";
    import Radios from "$lib/radios.svelte";
    import Footer from "$lib/footer.svelte";
    import {
        period,
        hours,
        selectedPeriod,
        selectedDate,
        units,
        tempType,
    } from '../store/store.js';

    /* === HANDLERS =========================== */
    function handleUnits(event) {
        units.set(event.detail.value);
    }

    function handleTempType(event) {
        tempType.set(event.detail.value);
    }

    /* === TEST DATA ========================== */
    const TempAmC = [
        [14, 13, 12, 12, 11, 11, 10, 10, 12, 15, 17, 18],
        [16, 16, 16, 17, 17, 17, 17, 18, 20, 22, 24, 25],
        [18, 18, 18, 18, 18, 18, 18, 17, 18, 19, 20, 21],
        [16, 15, 15, 15, 15, 14, 14, 14, 15, 17, 18, 20],
        [12, 12, 11, 10, 10, 10, 9, 9, 10, 11, 12, 12],
    ];

    const TempAmF = [
        [57, 56, 54, 53, 52, 51, 50, 50, 54, 58, 62, 65],
        [61, 61, 61, 62, 62, 63, 63, 64, 68, 71, 74, 78],
        [65, 65, 65, 64, 65, 64, 64, 63, 65, 67, 69, 71],
        [61, 60, 60, 59, 59, 58, 58, 58, 60, 63, 65, 68],
        [54, 53, 52, 51, 50, 49, 48, 48, 50, 51, 53, 54],
    ];

    const TempPmC = [
        [20, 21, 21, 22, 22, 21, 20, 19, 17, 17, 17, 16],
        [26, 27, 28, 28, 28, 27, 26, 25, 23, 23, 22, 21],
        [22, 22, 22, 22, 21, 21, 20, 19, 18, 17, 17, 16],
        [21, 22, 23, 23, 23, 23, 22, 20, 19, 18, 18, 18],
        [13, 14, 14, 14, 14, 14, 13, 12, 11, 10, 9, 9],
    ];

    const TempPmF = [
        [67, 69, 70, 71, 71, 70, 68, 65, 63, 62, 62, 61],
        [79, 81, 82, 83, 83, 81, 79, 76, 74, 72, 71, 70],
        [72, 72, 72, 71, 71, 70, 68, 66, 64, 63, 63, 62],
        [70, 72, 73, 73, 73, 73, 71, 68, 66, 65, 65, 65],
        [55, 56, 57, 57, 57, 56, 55, 52, 51, 50, 48, 48],
    ];

    const TempFlAmC = [
        [14, 14, 13, 12, 10, 10, 9, 9, 12, 15, 17, 18],
        [16, 16, 16, 17, 17, 17, 17, 18, 20, 22, 24, 25],
        [18, 18, 18, 18, 18, 18, 18, 17, 18, 20, 21, 22],
        [16, 15, 15, 15, 15, 14, 14, 14, 15, 17, 18, 20],
        [11, 10, 9, 8, 7, 7, 7, 6, 7, 8, 9, 9],
    ];

    const TempFlAmF = [
        [58, 57, 55, 53, 50, 49, 48, 49, 53, 58, 62, 65],
        [61, 61, 62, 62, 63, 63, 63, 64, 68, 72, 75, 80],
        [65, 65, 65, 64, 65, 64, 64, 63, 66, 68, 70, 71],
        [61, 60, 60, 59, 59, 58, 58, 58, 60, 63, 65, 68],
        [51, 49, 48, 46, 45, 44, 43, 43, 44, 46, 47, 49],
    ];

    const TempFlPmC = [
        [19, 20, 21, 21, 22, 21, 20, 18, 17, 17, 16, 16],
        [28, 28, 29, 29, 29, 29, 28, 26, 24, 23, 22, 22],
        [22, 22, 22, 22, 21, 21, 20, 19, 18, 17, 17, 16],
        [21, 22, 23, 23, 23, 23, 22, 20, 19, 18, 18, 18],
        [10, 11, 12, 12, 12, 11, 11, 9, 8, 7, 6, 6],
    ];

    const TempFlPmF = [
        [67, 68, 70, 71, 71, 69, 68, 65, 63, 62, 62, 61],
        [82, 83, 84, 84, 84, 83, 81, 79, 75, 73, 72, 71],
        [72, 72, 72, 71, 71, 70, 69, 67, 64, 63, 63, 62],
        [70, 72, 73, 73, 73, 73, 71, 68, 66, 65, 65, 66],
        [50, 52, 53, 53, 53, 52, 51, 48, 46, 44, 43, 42],
    ];

    /* === REACTIVE DECLARATIONS ============== */
    $: curTempAm = $units === "met" ?
        $tempType === "actual" ? TempAmC[0] : TempFlAmC[0] :
        $tempType === "actual" ? TempAmF[0] : TempFlAmF[0];
    $: curTempPm = $units === "met" ?
        $tempType === "actual" ? TempPmC[0] : TempFlPmC[0] :
        $tempType === "actual" ? TempPmF[0] : TempFlPmF[0];
    $: curTemp = $period === "AM" ? curTempAm : curTempPm;
    $: selectedTempAm = $units === "met" ?
        $tempType === "actual" ? TempAmC[$selectedDate] : TempFlAmC[$selectedDate] :
        $tempType === "actual" ? TempAmF[$selectedDate] : TempFlAmF[$selectedDate];
    $: selectedTempPm = $units === "met" ?
        $tempType === "actual" ? TempPmC[$selectedDate] : TempFlPmC[$selectedDate] :
        $tempType === "actual" ? TempPmF[$selectedDate] : TempFlPmF[$selectedDate];
    $: selectedTemp = $selectedPeriod === "AM" ? selectedTempAm : selectedTempPm;
    $: curUnits = $units === "met" ? "°C" : "°F";
</script>

<svelte:head>
    <title>Temperature | Weather Dial</title>
</svelte:head>

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

        <TimeSelect />

        <Radios
            groupName="Units"
            bind:selected={$units}
            options={[
                { name: "°C", value: "met"},
                { name: "°F", value: "imp"},
            ]}
            index={1}
            on:select={handleUnits} />

        <Radios
            groupName="Temperature Type"
            bind:selected={$tempType}
            options={[
                { name: "Actual", value: "actual"},
                { name: "Feels Like", value: "feelsLike"},
            ]}
            index={2}
            on:select={handleTempType} />

        <Footer index={3} />
    </div>
</div>

<style lang="scss">

</style>
