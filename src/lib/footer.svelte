<script>
    /* === IMPORTS ============================ */
    import Radios from "$lib/radios.svelte";
    import Logo from "$lib/SVGs/logo.svelte";
    import { hasSelectedTheme, selectedTheme } from '../store/store.js';

    /* === PROPS ============================== */
    export let index;

    /* === HANDLERS =========================== */
    function handleTheme(event) {
        hasSelectedTheme.set(true);
        selectedTheme.set(event.detail.value);
    }
</script>

<footer id="footer" style="--index: {index};">
    <Radios
        groupName="Theme"
        bind:selected={$selectedTheme}
        options={[
            { name: "Light theme", value: "light"},
            { name: "Dark theme", value: "dark"},
        ]}
        {index}
        hideLabel={true}
        on:select={handleTheme} />

    <div class="credits">
        <Logo />
        <div>
            <span class="name">Weather Dial</span>
            <span class="copyright">© 2022 <a href="https://www.richardfxr.com/" target="_blank" rel="noreferrer">Xiangrui Fu</a></span>
        </div>
    </div>
</footer>

<style lang="scss">
    #footer {
        --_logo-size: 2.6rem;

        display: flex;
        flex-flow: row wrap;
        gap: var(--pad-lg);
        width: 100%;

        padding-top: var(--pad-md);
        border-top: solid var(--border-thin) var(--clr-0);
        margin-top: var(--pad-lg);

        animation: delayedFade calc(1.2s + 0.2s * var(--index)) ease 1;

        :global(.radios__container) {
            margin-right: auto;
        }

        .credits {
            display: flex;
            flex-flow: row nowrap;
            gap: calc(var(--pad-md) - var(--pad-xxs));

            animation: delayedFade calc(1.6s + 0.2s * var(--index)) ease 1;

            :global(.logo) {
                width: var(--_logo-size);
                fill: var(--clr-700);
            }

            div {
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                gap: var(--pad-xxs);
            }

            span {
                color: var(--clr-700);
                font-size: var(--fontSize-md);
                font-weight: 500;
                line-height: 1em;

                &.name {
                    font-weight: 600;
                }

                a {
                    text-decoration: underline;
                    text-underline-offset: 0.15em;
                }
            }
        }
    }

    /* === BREAKPOINTS ======================== */
    @media (orientation: portrait) {
        #footer {
            flex-direction: column;
            align-items: center;
            gap: var(--pad-md);

            :global(.radios__container) {
                margin-right: unset;
            }
        }
    }

    @media only screen and (max-width: $breakpoint-smdesktop) {
        #footer {
            --_logo-size: 2.5rem;
        }
    }

    @media only screen and (max-width: $breakpoint-tablet) {
        #footer {
            --_logo-size: 2.4rem;
        }
    }
</style>
