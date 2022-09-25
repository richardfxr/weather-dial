<script>
    /* === PROPS ============================== */
    export let active = false;
</script>

<svg
    class="percipitation navIcon"
    class:active={active}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28">
    <circle class="clr-tertiary circle__top" style="--index: 1;" cx="20.36" cy="22" r="1.5"/>
    <circle class="clr-tertiary circle__top" style="--index: 0;" cx="14.36" cy="22" r="1.5"/>
    <circle class="clr-tertiary circle__top" style="--index: 2;" cx="8.36" cy="22" r="1.5"/>
    <circle class="clr-tertiary circle__bottom" style="--index: 0;" cx="17.36" cy="26.5" r="1.5"/>
    <circle class="clr-tertiary circle__bottom" style="--index: 1;" cx="11.36" cy="26.5" r="1.5"/>
    <path class="clr-secondary cloud" d="M22.67,7.57s-.02-.02-.03-.02c-1.06-.19-1.47-.92-1.72-1.45,0,0,0,0,0,0-1.13-2.7-3.8-4.6-6.92-4.6-2.45,0-4.62,1.18-5.99,3,0,0-.02,0-.02,.01-.56,.68-.96,.95-1.94,1.07,0,0-.01,0-.02,0-2.57,.46-4.53,2.7-4.53,5.41,0,3.04,2.46,5.5,5.5,5.5h15c2.49,0,4.5-2.01,4.5-4.5,0-2.26-1.67-4.11-3.83-4.43Z"/>
    <path class="clr-tertiary cloud" d="M22,17.5H7c-3.58,0-6.5-2.92-6.5-6.5,0-3.08,2.15-5.72,5.14-6.35h0l.32-.06c.67-.08,.85-.21,1.25-.71l.13-.16C8.97,1.67,11.39,.5,14,.5c3.43,0,6.51,2.04,7.84,5.21,.17,.37,.35,.63,.69,.77l.33,.09c2.65,.43,4.65,2.75,4.65,5.43,0,3.03-2.47,5.5-5.5,5.5ZM6.27,6.56h-.07c-2.15,.4-3.71,2.26-3.71,4.44,0,2.48,2.02,4.5,4.5,4.5h15c1.93,0,3.5-1.57,3.5-3.5,0-1.64-1.18-3.07-2.78-3.42l-.35-.06c-.36-.07-.66-.19-.92-.34l-.05-.02h0c-.86-.51-1.22-1.29-1.39-1.64-1.03-2.46-3.39-4.02-6.01-4.02-2.05,0-3.95,.95-5.19,2.6l-.13,.14c-.63,.74-1.23,1.16-2.41,1.32Z"/>
    <path class="clr-main cloud" d="M22.52,9.56l-.43-.08c-.39-.09-.76-.22-1.11-.4l-.77-.52c-.28-.24-.53-.53-.75-.85v.03c-.95-1-1.36-.98-2.57-.15-.01,0-.03,.01-.05,.02-1.29,1.07-2.94,1.72-4.75,1.72-.38,0-.76-.04-1.12-.1h0c-.52-.09-1.03,.3-1.27,.59,0,0,0,0-.01,0-1.01,1.27-2.55,2.09-4.3,2.09-.08,0-.15-.02-.22-.02-.02,0-.04,.01-.06,.01-1-.04-1.12,.94-.61,1.54,.63,.65,1.51,1.07,2.49,1.07h15c1.38,0,2.5-1.12,2.5-2.5,0-1.17-.84-2.19-1.98-2.44Z"/>
</svg>

<style lang="scss">
    .active {
        .circle {
            &__top {
                animation: circleTopMove calc(0.3s + 0.1s * var(--index)) ease-out 1;
            }

            &__bottom {
                animation: circleBottomMove calc(0.22s + 0.13s * var(--index)) ease-out 1;
            }
        }

        .cloud {
            animation: cloudMove 0.35s ease 1;
        }
    }

    /* === ANIMATIONS ========================= */
    @keyframes circleTopMove {
        from {
            opacity: 0;
            transform: translateY(-5px);
        }

        30% {
            opacity: 0;
            transform: translateY(-5px);
        }

        to {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    @keyframes circleBottomMove {
        from {
            opacity: 0;
            transform: translateY(-7px);
        }

        to {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    @keyframes cloudMove {
        from {
            transform: translateY(0px);
        }
        
        50% {
            transform: translateY(2px);
        }

        to {
            transform: translateY(0px);
        }
    }
</style>