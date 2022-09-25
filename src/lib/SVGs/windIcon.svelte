<script>
    /* === PROPS ============================== */
    export let active = false;
</script>

<svg
    class="temperature navIcon"
    class:active={active}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28">
    <path class="clr-secondary" d="M4,23.62c0,.6,.53,1.06,1.12,1,5.37-.56,9.55-5.1,9.55-10.62S10.49,3.95,5.12,3.38c-.6-.06-1.12,.4-1.12,1V23.62Z"/>
    <path class="stroke" style="--length: 26.9638; --length-ani: -18.9638;" d="M9,2.36c.73-.83,1.81-1.36,3-1.36,2.21,0,4,1.79,4,4s-1.79,4-4,4H1"/>
    <path class="stroke delayed" style="--length: 32.709; --length-ani: -24.709;" d="M20,3c2.76,0,5,2.24,5,5s-2.24,5-5,5H3"/>
    <path class="stroke" style="--length: 26.2589; --length-ani: -18.2589;" d="M17.69,25c2.21,0,4-1.79,4-4s-1.79-4-4-4H4"/>
    <path class="stroke delayed" style="--length: 18.9188; --length-ani: -10.9188;" d="M10.49,27c1.66,0,3-1.34,3-3s-1.34-3-3-3H1"/>
    <circle class="clr-main circle" style="--offset: 0;" cx="20" cy="8" r="1.5"/>
    <circle class="clr-main circle" style="--offset: 2;" cx="26.5" cy="16.45" r="1.5"/>
    <circle class="clr-main circle" style="--offset: 1;" cx="24.5" cy="26.5" r="1.5"/>
</svg>

<style lang="scss">
    .stroke {
        fill: none;
        stroke: var(--clr-navIcon-tertiary);
        stroke-width: 2px;
        stroke-linecap: round;
        stroke-linejoin: round;

        stroke-dasharray: var(--length);

        transition: stroke var(--trans-fast);
    }

    .active {
        .stroke {
            stroke: var(--clr-navIcon-tertiary-active);
            animation: strokeDraw 0.35s ease-out 1;

            &.delayed {
                animation: strokeDrawDelayed 0.45s ease-out 1;
            }
        }

        .circle {
            animation: circleMove calc(0.35s + 0.05s * var(--offset)) ease-out 1;
        }
    }

    /* === ANIMATIONS ========================= */
    @keyframes strokeDraw {
        from {
            stroke-dashoffset: var(--length-ani);
        }

        to {
            stroke-dashoffset: 0;
        }
    }

    @keyframes strokeDrawDelayed {
        from {
            stroke-dashoffset: var(--length-ani);
        }

        20% {
            stroke-dashoffset: var(--length-ani);
        }

        to {
            stroke-dashoffset: 0;
        }
    }

    @keyframes circleMove {
        from {
            transform: translateX(0px);
        }

        20% {
            transform: translateX(calc(-2px - 2px * var(--offset)));
        }

        to {
            transform: translateX(0px);
        }
    }
</style>