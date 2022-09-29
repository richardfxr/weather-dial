<script>
    /* === PROPS ============================== */
    export let active = false;
</script>

<svg
    class="humidity navIcon"
    class:active={active}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28">
    <path class="clr-secondary drop__top" d="M14.41,8.32c-.85,1.15-1.35,2.57-1.35,4.11,0,3.83,3.1,6.93,6.93,6.93s6.93-3.1,6.93-6.93c0-1.54-.5-2.96-1.35-4.11L20.88,1.53c-.42-.61-1.33-.61-1.75,0l-4.71,6.8Z"/>
    <path class="clr-tertiary drop__top" d="M20,20.43c-4.41,0-8-3.59-8-8,0-1.72,.53-3.35,1.55-4.73L18.25,.92c.4-.57,1.05-.92,1.75-.92s1.36,.34,1.75,.92l4.71,6.8c1,1.36,1.54,2.99,1.54,4.72,0,4.41-3.59,8-8,8Zm0-18.3l-4.73,6.82c-.74,1.01-1.14,2.21-1.14,3.47,0,3.23,2.63,5.87,5.87,5.87s5.87-2.63,5.87-5.87c0-1.26-.39-2.46-1.14-3.47l-4.73-6.82Z"/>
    <circle class="clr-main drop__top" cx="22.67" cy="12.8" r="1.6"/>
    <path class="clr-bg drop__bottom" d="M11.91,6c-.78-1.12-2.05-1.79-3.41-1.79s-2.64,.67-3.41,1.79L.01,13.32s0,.01-.01,.02v12.3c.66,.91,1.45,1.7,2.36,2.36H14.64c2.64-1.91,4.36-5,4.36-8.5,0-2.26-.71-4.41-1.99-6.15l-5.09-7.35Z"/>
    <path class="clr-secondary drop__bottom" d="M2.46,15.06c-.92,1.24-1.46,2.78-1.46,4.44,0,4.14,3.36,7.5,7.5,7.5s7.5-3.36,7.5-7.5c0-1.66-.54-3.2-1.46-4.44l-5.09-7.35c-.46-.66-1.44-.66-1.9,0L2.46,15.06Z"/>
    <path class="clr-tertiary drop__bottom" d="M8.5,28C3.81,28,0,24.19,0,19.5c0-1.82,.57-3.56,1.64-5.02L6.73,7.14c.4-.58,1.06-.93,1.77-.93s1.37,.35,1.77,.93l5.09,7.35c1.06,1.44,1.63,3.19,1.63,5.01,0,4.69-3.81,8.5-8.5,8.5Zm0-19.79c-.05,0-.1,.02-.13,.07L3.26,15.65c-.83,1.12-1.26,2.45-1.26,3.85,0,3.58,2.92,6.5,6.5,6.5s6.5-2.92,6.5-6.5c0-1.4-.44-2.73-1.26-3.85l-5.11-7.38s-.07-.07-.13-.07Z"/>
    <path class="clr-main drop__bottom" d="M12.41,17.95c-.79,.45-1.55-.25-1.7,.65,0,.05-.03,.1-.04,.15-.26,2.21-1.89,4-4.03,4.46-.01,0-.03,.01-.04,.01-.94,.19-.56,.82,.17,1.16,.54,.2,1.12,.32,1.73,.32,2.87,0,5.19-2.32,5.19-5.19,0-.36-.04-.7-.11-1.04-.21-.71-.59-.84-1.17-.52Z"/>
    <circle class="clr-main drop__bottom" cx="10.5" cy="15.5" r="1.5"/>
</svg>

<style lang="scss">
    .active {
        .drop {
            &__top {
                animation: dropTopMove 0.45s ease-out 1;
            }

            &__bottom {
                animation: dropBottomMove 0.45s ease 1;
            }
        }
    }

    /* === ANIMATIONS ========================= */
    @keyframes dropTopMove {
        from {
            opacity: 0;
            transform: translateY(-3px);
        }

        40% {
            opacity: 0;
            transform: translateY(-3px);
        }

        from {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    @keyframes dropBottomMove {
        from {
            transform: translateY(0px);
        }

        30% {
            transform: translateY(-4px);
        }

        from {
            transform: translateY(0px);
        }
    }

    /* === A11Y =============================== */
    @media (prefers-reduced-motion) {
        .active {
            .drop {
                &__top {
                    animation: loMoFade var(--loMo-ani);
                }

                &__bottom {
                    animation: unset;
                }
            }
        }
    }
</style>