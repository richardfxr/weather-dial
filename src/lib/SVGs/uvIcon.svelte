<script>
    /* === PROPS ============================== */
    export let active = false;
</script>

<svg
    class="temperature navIcon"
    class:active={active}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28">
    <circle class="clr-tertiary circle" style="--index: 0;" cx="14" cy="1.5" r="1.5"/>
    <circle class="clr-tertiary circle" style="--index: 1;" cx="21.35" cy="3.89" r="1.5"/>
    <circle class="clr-tertiary circle" style="--index: 2;" cx="25.89" cy="10.14" r="1.5"/>
    <circle class="clr-tertiary circle" style="--index: 3;" cx="25.89" cy="17.86" r="1.5"/>
    <circle class="clr-tertiary circle" style="--index: 4;" cx="21.35" cy="24.11" r="1.5"/>
    <circle class="clr-tertiary circle" style="--index: 5;" cx="14" cy="26.5" r="1.5"/>
    <circle class="clr-tertiary circle" style="--index: 6;" cx="6.65" cy="24.11" r="1.5"/>
    <circle class="clr-tertiary circle" style="--index: 7;" cx="2.11" cy="17.86" r="1.5"/>
    <circle class="clr-tertiary circle" style="--index: 8;" cx="2.11" cy="10.14" r="1.5"/>
    <circle class="clr-tertiary circle" style="--index: 9;" cx="6.65" cy="3.89" r="1.5"/>
    <circle class="clr-tertiary" cx="14" cy="14" r="9"/>
    <circle class="clr-secondary" cx="14" cy="14" r="7"/>
    <circle class="clr-main" cx="14" cy="14" r="5"/>
</svg>

<style lang="scss">
    .active {
        @for $i from 1 through 10 {
            circle:nth-child(#{$i}) {
                animation: circleFade-#{$i} 0.65s ease-out 1;
            }
        }
    }

    /* === ANIMATIONS ========================= */
    @for $i from 1 through 10 {
        $start: calc(10% + 5% * $i);
        $end: calc(50% + 5% * $i);

        @keyframes circleFade-#{$i} {
            from { opacity: 0; }
            #{$start} {opacity: 0; }
            #{$end} {opacity: 1; }
        }
    }

    /* === A11Y =============================== */
    @media (prefers-reduced-motion) {
        .active {
            @for $i from 1 through 10 {
                circle:nth-child(#{$i}) {
                    animation: loMoFade var(--loMo-ani);
                }
            }
        }
    }
</style>