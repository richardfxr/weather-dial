<script>
    /* === IMPORTS ============================ */
    import TemperatureIcon from '$lib/SVGs/temperatureIcon.svelte';
    import PercipitationIcon from '$lib/SVGs/percipitationIcon.svelte';
    import CloudIcon from '$lib/SVGs/cloudIcon.svelte';
    import HumidityIcon from '$lib/SVGs/humidityIcon.svelte';
    import WindIcon from '$lib/SVGs/windIcon.svelte';
    import UvIcon from './SVGs/uvIcon.svelte';
    import { page } from '$app/stores';

    /* === REACTIVE DECLARATIONS ============== */
    $: isHome = $page.url.pathname === "/";
    $: isPercipitation = $page.url.pathname === "/percipitation";
    $: isCloudcover = $page.url.pathname === "/cloud";
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
                <span class="visuallyHidden">Temperature</span>
                <div class="iconPH">
                    <TemperatureIcon active={isHome} />
                </div>
            </a>
        </li>
        <li>
            <a
                href="/percipitation"
                id="link__percipitation"
                class:active={isPercipitation}
                aria-current={isPercipitation}>
                <span class="visuallyHidden">Percipitation</span>
                <div class="iconPH">
                    <PercipitationIcon active={isPercipitation} />
                </div>
            </a>
        </li>
        <li>
            <a
                href="/cloud"
                id="link__cloudcover"
                class:active={isCloudcover}
                aria-current={isCloudcover}>
                <span class="visuallyHidden">Cloud Cover</span>
                <div class="iconPH">
                    <CloudIcon active={isCloudcover} />
                </div>
            </a>
        </li>
        <li>
            <a
                href="/humidity"
                id="link__humidity"
                class:active={isHumidity}
                aria-current={isHumidity}>
                <span class="visuallyHidden">Humidity</span>
                <div class="iconPH">
                    <HumidityIcon active={isHumidity} />
                </div>
            </a>
        </li>
        <li>
            <a
                href="/wind"
                id="link__wind"
                class:active={isWind}
                aria-current={isWind}>
                <span class="visuallyHidden">Wind Speed</span>
                <div class="iconPH">
                    <WindIcon active={isWind} />
                </div>
            </a>
        </li>
        <li>
            <a
                href="/uv"
                id="link__uv"
                class:active={isUv}
                aria-current={isUv}>
                <span class="visuallyHidden">UV Index</span>
                <div class="iconPH">
                    <UvIcon active={isUv} />
                </div>
            </a>
        </li>
    </ul>
</nav>

<style lang="scss">
    #nav {
        --_icon-size: min(1.75rem, 45px);

        display: flex;
        position: fixed;
        top: 0;
        bottom: 0;
        left: max(calc((100vw - var(--maxWidth)) / 2), 0px);
        z-index: 1000;
        width: var(--nav-size);

        padding: 0 var(--pad-hrz);

        overflow-x: hidden;
        overflow-y: auto;

        ul {
            display: flex;
            flex-direction: column;
            gap: var(--pad-xs);

            padding: var(--pad-sm) 0;
            margin: auto;

            // background-color: pink;

            a {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                width: var(--nav-a-size);
                height: var(--nav-a-size);

                border: solid var(--border-thin) var(--clr-0);
                border-radius: var(--bradius-circle);

                transition: border-color var(--trans-fast);

                &:hover, &:focus {
                    :global {
                        .navIcon {
                            .clr {
                                &-main {
                                    fill: var(--clr-700);
                                }

                                &-tertiary {
                                    fill: var(--clr-1000);
                                }
                            }

                            .stroke {
                                stroke: var(--clr-1000);
                            }
                        }
                    }
                }

                &:focus-visible {
                    outline: var(--outline);
                    outline-offset: calc(-1 * var(--border-thin));

                    &.active {
                        :global(.navIcon .clr-main) {
                            fill: var(--clr-outline);
                        }
                    }
                }

                &.active {
                    border-color: var(--clr-accent-800);

                    :global(.navIcon .clr-main) {
                        fill: var(--clr-navIcon-main-active);
                    }

                    &:hover, &:focus {
                        :global {
                            .navIcon .clr {
                                &-main {
                                    fill: var(--clr-navIcon-main-active);
                                }

                                &-tertiary {
                                    fill: var(--clr-navIcon-tertiary-active);
                                }
                            }
                        }
                    }
                }

                .iconPH {
                    width: var(--_icon-size);
                    height: var(--_icon-size);
                }
            }
        }
    }

    /* === BREAKPOINTS ======================== */
    @media (orientation: portrait) {
        #nav {
            position: relative;
            width: 100%;

            padding: 0 var(--pad-hrz);

            overflow-x: auto;
            overflow-y: hidden;

            ul {
                flex-direction: row;

                padding: var(--pad-md) 0;

                a {
                    height: var(--nav-a-size);

                    padding: var(--pad-sm) var(--pad-xs);
                }
            }
        }
    }

    /* === A11Y =============================== */
    @media (prefers-contrast: more) {
        #nav ul a {
            &::before {
                // active background circle
                content: '';
                position: absolute;
                top: var(--pad-xxxs);
                right: var(--pad-xxxs);
                bottom: var(--pad-xxxs);
                left: var(--pad-xxxs);
                z-index: -1;

                background-color: var(--clr-20);
                border-radius: var(--bradius-circle);

                opacity: 0;
                transition: opacity var(--trans-normal);
            }
            
            &.active {
                &:hover, &:focus {
                    :global {
                        .navIcon .clr {
                            &-main {
                                fill: var(--clr-100);
                            }

                            &-tertiary {
                                fill: var(--clr-100);
                            }
                        }

                        .stroke {
                            stroke: var(--clr-100);
                        }
                    }
                }

                &::before {
                    opacity: 1;
                }

                :global(.navIcon .clr-main) {
                    fill: var(--clr-100);
                }
            }
        }
    }
</style>