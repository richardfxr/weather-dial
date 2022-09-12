<script>
    /* === IMPORTS ============================ */
    import Dial from "../lib/dial.svelte";

    // test data
    const TempAmC = [18, 17, 17, 17, 17, 16, 16, 17, 20, 23, 25, 27];
    const TempAmF = [64, 63, 63, 62, 62, 60, 60, 61, 68, 73, 78, 81];
    const TempPmC = [29, 29, 30, 30, 30, 29, 28, 24, 22, 21, 19, 19];
    const TempPmF = [84, 85, 86, 86, 86, 84, 83, 76, 72, 70, 67, 66];
</script>

<main id="main" class="twoCol">
    <div id="dial__col">
        <Dial
            title="Temperature"
            dataPoints={TempAmC}
            units="°C"
        />
    </div>

    <div id='text__col'>
        <h1>Temperature</h1>
    </div>
</main>

<style lang="scss">
    #dial__col {
        // background-color: Aquamarine;
    }

    #text__col {
        display: flex;
        flex-direction: row;
        align-items: center;

        // background-color: aqua;
    }
</style>
