<script>
    /* === IMPORTS ============================ */
    import Nav from "../lib/nav.svelte";
    import { fade } from 'svelte/transition';
    import { selectedPeriod, hasSelectedTheme, selectedTheme, units, contrast } from '../store/store.js';

    /* === PROP =============================== */
    export let data;

    /* === VARIABLES ========================== */
    const pageTransDuration = 200;

    /* === CONSOLE LOGS ======================= */
    console.log("Weather Dial v1.0.1");
    console.log('\n');
    console.log("Designed and developed by Richard Fu.");
    console.log("Code available on GitHub:");
    console.log("https://github.com/richardfxr/weather-dial");
</script>


<svelte:head>
    <meta name="theme-color" content={
        $selectedTheme === "light" ? 
            $contrast === "more" ? "#FFFFFF" : "#E2D9D4" : 
            "#000000"
    } />
</svelte:head>


<div 
    id="root"
    class:pm={$selectedPeriod === "PM"}
    class:light={$hasSelectedTheme && $selectedTheme === "light"}
    class:dark={$hasSelectedTheme && $selectedTheme === "dark"}
    class:imp={$units === "imp"}>
    <Nav />

    <!-- page transition -->
    <div class="pageTransition__wrapper">
        {#key data.url.pathname}
            <main id="main" in:fade={{ duration: 0, delay: pageTransDuration }} out:fade={{ duration: pageTransDuration }}>
                <slot></slot>
            </main>
        {/key}
    </div>
</div>

<style lang="scss">
    .pageTransition__wrapper {
        // wrapper grid to prevent scrollbar from appearing during page transitions
        display: grid;
        grid-template: 1fr / 1fr;
    }

    #main {
        --_portrait-width: 50%; 

        // forces #main into wrapper grid to prevent scrollbar
        grid-row: 1;
        grid-column: 1;
        width: 100%;
        max-width: var(--maxWidth);

        padding: 
            0
            var(--pad-hrz)
            0
            var(--nav-size);
        margin: 0 auto;
    }

    /* === BREAKPOINTS ======================== */
    @media (orientation: portrait) {
        #main {
            gap: var(--pad-lg);
            width: var(--_portrait-width);
            max-width: calc(var(--maxWidth) * var(--_portrait-width));

            padding: var(--pad-sm) var(--pad-hrz) 0 var(--pad-hrz);
            margin: 0 auto;
        }
    }

    @media only screen and (max-width: $breakpoint-smdesktop) {
        #main {
            --_portrait-width: 60%; 
        }
    }

    @media only screen and (max-width: $breakpoint-tablet) {
        #main {
            --_portrait-width: 70%; 
        }
    }

    @media only screen and (max-width: $breakpoint-mobile) {
        #main {
            --_portrait-width: 100%; 
        }
    }
</style>