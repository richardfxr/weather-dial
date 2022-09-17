<script>
    /* === IMPORTS ============================ */
    import { page } from '$app/stores';

    /* === REACTIVE DECLARATIONS ============== */
    $: isHome = $page.url.pathname === "/";
    $: isPercipitation = $page.url.pathname === "/percipitation";
    $: isCloudcover = $page.url.pathname === "/cloudcover";
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
                <span class="visuallyHidden">Temp</span>
                <div class="iconPH"></div>
            </a>
        </li>
        <li>
            <a
                href="/percipitation"
                id="link__percipitation"
                class:active={isPercipitation}
                aria-current={isPercipitation}>
                <span class="visuallyHidden">Percipitation</span>
                <div class="iconPH"></div>
            </a>
        </li>
        <li>
            <a
                href="/cloud"
                id="link__cloudcover"
                class:active={isCloudcover}
                aria-current={isCloudcover}>
                <span class="visuallyHidden">Cloud Cover</span>
                <div class="iconPH"></div>
            </a>
        </li>
        <li>
            <a
                href="/humidity"
                id="link__humidity"
                class:active={isHumidity}
                aria-current={isHumidity}>
                <span class="visuallyHidden">Humidity</span>
                <div class="iconPH"></div>
            </a>
        </li>
        <li>
            <a
                href="/wind"
                id="link__wind"
                class:active={isWind}
                aria-current={isWind}>
                <span class="visuallyHidden">Wind Speed</span>
                <div class="iconPH"></div>
            </a>
        </li>
        <li>
            <a
                href="/uv"
                id="link__uv"
                class:active={isUv}
                aria-current={isUv}>
                <span class="visuallyHidden">UV Index</span>
                <div class="iconPH"></div>
            </a>
        </li>
    </ul>
</nav>

<style lang="scss">
    #nav {
        --_pad-right: calc(var(--pad-hrz) / 2);

        display: flex;
        position: fixed;
        top: 0;
        bottom: 0;
        left: max(calc((100vw - var(--maxWidth)) / 2), 0px);
        z-index: 1000;
        width: var(--nav-size);

        padding:
            0
            var(--_pad-right)
            0
            var(--pad-hrz);

        overflow-x: hidden;
        overflow-y: auto;

        ul {
            display: flex;
            flex-direction: column;
            gap: var(--pad-sm);

            padding: var(--pad-sm) 0;
            margin: auto;

            // background-color: pink;

            a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: var(--nav-a-size);

                padding: var(--pad-xs) var(--pad-sm);

                border: solid var(--border-thin) var(--clr-0);
                border-radius: var(--bradius-circle);

                &#link__home, &#link__uv {
                    margin-left: var(--nav-margin-1);
                }

                &#link__percipitation, &#link__wind {
                    margin-left: var(--nav-margin-2);
                }

                .iconPH {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }

    /* === BREAKPOINTS ======================== */
    @media (orientation: portrait) {
        #nav {
            position: static;
            width: 100%;

            padding: 0 var(--pad-hrz);

            overflow-x: auto;
            overflow-y: hidden;

            ul {
                flex-direction: row;

                a {
                    width: unset;
                    height: var(--nav-a-size);

                    padding: var(--pad-sm) var(--pad-xs);

                    &#link__home, &#link__uv {
                        margin-top: var(--nav-margin-1);
                        margin-left: 0;
                    }

                    &#link__percipitation, &#link__wind {
                        margin-top: var(--nav-margin-2);
                        margin-left: 0;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: $breakpoint-tablet) {
        #nav {
            --_pad-right: calc(var(--pad-hrz) / 4);
        }
    }
</style>