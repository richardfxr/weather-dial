<script>
    /* === IMPORTS ============================ */
    import { page } from '$app/stores';

    /* === REACTIVE DECLARATIONS ============== */
    $: isHome = $page.url.pathname === "/";
    $: isPercipitation = $page.url.pathname === "/percipitation";
    $: isHumidity = $page.url.pathname === "/humidity";
    $: isUv = $page.url.pathname === "/uv";
    $: isWind = $page.url.pathname === "/wind";
</script>

<nav id="nav">
    <ul>
        <li>
            <a
                href="/"
                id="link__home"
                class:active={isHome}
                aria-current={isHome}>
                <span>Temp</span>
            </a>
        </li>
        <li>
            <a
                href="/percipitation"
                id="link__percipitation"
                class:active={isPercipitation}
                aria-current={isPercipitation}>
                <span>Percipitation</span>
            </a>
        </li>
        <li>
            <a
                href="/humidity"
                id="link__humidity"
                class:active={isHumidity}
                aria-current={isHumidity}>
                <span>Humidity</span>
            </a>
        </li>
        <li>
            <a
                href="/uv"
                id="link__uv"
                class:active={isUv}
                aria-current={isUv}>
                <span>UV Index</span>
            </a>
        </li>
        <li>
            <a
                href="/wind"
                id="link__wind"
                class:active={isWind}
                aria-current={isWind}>
                <span>Wind Speed</span>
            </a>
        </li>
    </ul>
</nav>

<style lang="scss">
    #nav {
        position: fixed;
        top: 0;
        bottom: 0;
        left: max(calc((100vw - var(--maxWidth)) / 2), 0px);
        z-index: 1000;
        width: var(--nav-size);

        padding:
            0
            calc(var(--pad-hrz) / 2)
            0
            var(--pad-hrz);

        overflow: auto;

        ul {
            display: flex;
            flex-direction: column;

            // background-color: pink;
        }
    }
</style>