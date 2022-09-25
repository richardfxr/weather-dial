<script>
    /* === PROPS ============================== */
    export let active = false;
</script>

<svg
    class="temperature navIcon"
    class:active={active}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28">
    <circle class="clr-tertiary" cx="14" cy="21.5" r="6.5"/>
    <rect class="clr-tertiary" x="9.5" y="0" width="9" height="24.15" rx="4.5" ry="4.5"/>
    <rect class="clr-secondary" x="11.5" y="2" width="5" height="22.15" rx="2.5" ry="2.5"/>
    <circle class="clr-secondary" cx="14" cy="21.5" r="4.5"/>
    <circle class="clr-tertiary dot__right" style="--index: 2;" cx="23" cy="3.5" r="1.5"/>
    <circle class="clr-tertiary dot__right" style="--index: 1;" cx="23" cy="9.5" r="1.5"/>
    <circle class="clr-tertiary dot__right" style="--index: 0;" cx="23" cy="15.5" r="1.5"/>
    <circle class="clr-tertiary dot__left" style="--index: 2;" cx="5" cy="3.5" r="1.5"/>
    <circle class="clr-tertiary dot__left" style="--index: 1;" cx="5" cy="9.5" r="1.5"/>
    <circle class="clr-tertiary dot__left" style="--index: 0;" cx="5" cy="15.5" r="1.5"/>
    <circle class="clr-main" cx="14" cy="21.5" r="3.5"/>
    <rect id="bar" class="clr-main" x="12.5" y="7" width="3" height="14" rx="1.5" ry="1.5"/>
</svg>

<style lang="scss">
    .active {
        #bar {
            animation: barMove 0.35s ease-out 1;
        }

        .dot {
            &__right {
                animation: dotRightMove calc(0.38s + 0.075s * var(--index)) ease 1;
            }

            &__left {
                animation: dotLeftMove calc(0.38s + 0.075s * var(--index)) ease 1;
            }
        }
    } 

    /* === ANIMATIONS ========================= */
    @keyframes barMove {
        from {
            transform: translateY(9px);
            clip-path: polygon(0 0, 100% 0%, 100% 47%, 0% 47%);
        }

        to {
            transform: translateY(0px);
            clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
        }
    }

    @keyframes dotRightMove {
        from {
            transform: translateX(0px);
        }

        50% {
            transform: translateX(3px);
        }

        to {
            transform: translateX(0px);
        }
    }

    @keyframes dotLeftMove {
        from {
            transform: translateX(0px);
        }

        50% {
            transform: translateX(-3px);
        }

        to {
            transform: translateX(0px);
        }
    }
</style>