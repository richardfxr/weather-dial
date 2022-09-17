<script>
    /* === IMPROTS ============================ */
    import { period, hours, minutes, selectedPeriod } from '../store/store.js';

    /* === PROPS ============================== */
    export let title;
    export let dataPoints;
    export let units;

    /* === REACTIVE DECLARATIONS ============== */
    $: largestData = Math.max(...dataPoints);
    $: smallestData = Math.min(...dataPoints);
    $: range = largestData - smallestData;
</script>

<div id="dial__container">
    <div id="dial">
        <div aria-hidden="true" id="cross"></div>
        <div aria-hidden="true" id="outerCircle"></div>
        <div
            aria-hidden="true"
            id="clock--PM"
            class="clock"
            class:inactive={$period !== "PM"}
            style="--timeRotation: {$hours * 30 + ($minutes * 0.5)}deg">
        </div>
        <div
            aria-hidden="true"
            id="clock--AM"
            class="clock"
            class:inactive={$period !== "AM"}
            style="--timeRotation: {$hours * 30 + ($minutes * 0.5)}deg">
        </div>
        <table style="--range: {range};">
            <caption class="visuallyHidden">{title}</caption>
            <thead>
                <tr>
                    <th class="visuallyHidden">Time</th>
                    <th id="units"><span class="visuallyHidden">{title} in </span>{units}</th>
                </tr>
            </thead>
            <tbody>
                {#each dataPoints as dataPoint, index}
                    <tr 
                        style="--hour: {index}"
                        aria-current={$hours === index && $selectedPeriod === $period}>
                        <td class="hour">
                            {index === 0 ? '12' : index}
                            <span class="visuallyHidden">{$period}</span>
                            {#if $hours === index && $selectedPeriod === $period}
                                <pre class="visuallyHidden"> (current)</pre>
                            {/if}
                        </td>
                        <td
                            class="data"
                            style="--absValue: {dataPoint - smallestData};">
                            {dataPoint}<span class="visuallyHidden">{units}</span>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style lang="scss">
    #dial__container {
        display: flex;
        position: sticky;
        top: 0;

        // background-color: beige;
        min-height: 100vh;
        overflow: auto;
    }

    #dial {
        position: relative;
        width: 100%;
        height: 0;
        
        padding-top: 100%;
        // background: coral;
        margin: auto;
        overflow: hidden;

        #cross {
            position: absolute;
            top: var(--pad-dial);
            right: var(--pad-dial);
            bottom: var(--pad-dial);
            left: var(--pad-dial);

            animation: crossEnlarge 0.4s ease-out 1;

            &::before, &::after {
                content: '';
                position: absolute;
                top: -20%;
                bottom: -20%;
                left: calc(50% - (var(--border-thin) / 2));
                width: var(--border-thin);

                background-color: var(--clr-0);
            }

            &::before {
                transform: rotate(-45deg);
            }

            &::after {
                transform: rotate(45deg);
            }
        }

        #outerCircle {
            // background to block out cross
            position: absolute;
            top: var(--pad-dial);
            right: var(--pad-dial);
            bottom: var(--pad-dial);
            left: var(--pad-dial);

            border-radius: var(--bradius-circle);
            background-color: var(--clr-100);

            animation: outlineCircleEnlarge 0.5s ease-out 1;

            &::before {
                // outlined circle
                content: '';
                position: absolute;
                top: var(--pad-dial);
                right: var(--pad-dial);
                bottom: var(--pad-dial);
                left: var(--pad-dial);

                border: solid var(--border-thin) var(--clr-accent-700);
                border-radius: var(--bradius-circle);

                transition: border-color var(--trans-normal);
            }

            &::after {
                // gradient to block outline between 11 and 12
                content: '';
                position: absolute;
                top: 0;
                right: 50%;
                width: 20%;
                height: 15%;

                background: linear-gradient(
                    90deg,
                    var(--clr-100trans),
                    var(--clr-100) 70%
                );
            }
        }

        .clock {
            // conic gradient clock
            --_pad: 8%;

            position: absolute;
            top: calc(var(--pad-dial) + var(--_pad));
            right: calc(var(--pad-dial) + var(--_pad));
            bottom: calc(var(--pad-dial) + var(--_pad));
            left: calc(var(--pad-dial) + var(--_pad));
            border: solid var(--border-thin) var(--clr-0);
            border-radius: var(--bradius-circle);

            transform: rotate(var(--timeRotation));
            transition: opacity 0.6s ease;
            animation: clockShrink 0.6s ease-out 1;

            &#clock--PM {
                z-index: -1;

                background: conic-gradient(
                    var(--clr-pm-shadow) 0deg,
                    var(--clr-pm-700) 45deg,
                    var(--clr-pm-700) 315deg,
                    var(--clr-pm-highlight) 360deg
                );

                opacity: 0;

                &::before {
                    background-color: var(--clr-pm-700);
                }

                &.inactive {
                    background: var(--clr-pm-700);
                }
            }

            &#clock--AM {
                z-index: 0;

                background: conic-gradient(
                    var(--clr-am-shadow) 0deg,
                    var(--clr-am-700) 45deg,
                    var(--clr-am-700) 315deg,
                    var(--clr-am-highlight) 360deg
                );

                opacity: 1;
                

                &::before {
                    background-color: var(--clr-am-700);
                }

                &.inactive {
                    background: var(--clr-am-700);
                }

                &.hidden {
                    opacity: var(--_opactiy);
                }
            }

            &::before {
                // circle time indicator on outer cirlce
                --_size: 2%;

                content: '';
                position: absolute;
                top: 0;
                left: calc(50% - (var(--_size) / 2 ));
                width: var(--_size);
                height: var(--_size);

                border-radius: var(--bradius-circle);

                transform: translateY(-255%);
            }

            &::after {
                // line to indicate time
                content: '';
                position: absolute;
                top: 0;
                bottom: 50%;
                left: calc(50% - (var(--border-thin) / 2 ));
                width: var(--border-thin);

                // hidden by default
                display: none;

                background-color: var(--clr-0);
            }

            &.inactive{
                &::before, &::after {
                    display: none;
                }
            }
        }

        table {
            display: block;
            position: absolute;
            top: var(--pad-dial);
            right: var(--pad-dial);
            bottom: var(--pad-dial);
            left: var(--pad-dial);

            #units {
                // units circle in the center
                --_size: 110px;
                
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: calc(50% - (var(--_size) / 2));
                left: calc(50% - (var(--_size) / 2));
                z-index: 499;

                width: var(--_size);
                height: var(--_size);

                color: var(--clr-accent-800);
                font-size: 1.8rem;
                font-weight: 600;

                background-color: var(--clr-100);
                border: solid var(--border-thin) var(--clr-0);
                border-radius: var(--bradius-circle);

                transition: color var(--trans-normal);
                animation: unitsShrink 0.6s ease-out 1;
            }

            tbody tr {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;

                transform: rotate(calc(var(--hour) * 30deg));

                &:nth-child(-n+6)::before {
                    // separator (only first 6 td.data have it)
                    --_pad: 9.49%;

                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;

                    height: calc(100% - 2 * var(--_pad));
                    width: var(--border-thin);

                    margin: var(--_pad) auto;

                    background-color: var(--clr-accent-separator);

                    transition: background-color var(--trans-normal);
                    animation: hourFade 0.6s ease 1;
                }

                td.hour {
                    // clock hour text
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;

                    padding-bottom: 95%;

                    color: var(--clr-accent-800);
                    font-size: 1.3rem;
                    font-weight: 500;
                    text-align: center;

                    transition: color var(--trans-normal);
                    animation: hourFade calc(0.6s + (0.05s * var(--hour))) ease 1;

                    &::before {
                        // hour marker
                        content: '';
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        width: var(--border-thin);
                        height: 12px;

                        margin: auto;
                        margin-bottom: 93%;
                        
                        background-color: var(--clr-0);
                    }
                }

                td.data {
                    --_transition: calc(var(--trans-time-normal) + 0.1s) ease;
                    // data text
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    position: absolute;
                    top:0;
                    right: 0;
                    bottom: 0;
                    left: 0;

                    padding-bottom: calc(67.2% + (12.8% / var(--range) * var(--absValue)));

                    color: var(--clr-0);
                    font-size: 1.4rem;
                    font-weight: 600;
                    text-align: center;

                    transform: rotate(15deg);

                    transition: padding var(--_transition);
                    animation: dataEnlarge calc(0.55s + (0.03s * var(--hour))) ease 1;

                    &::before {
                        // data bar
                        --_size: calc(35% + (25% / var(--range) * var(--absValue)));

                        display: block;
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;

                        width: var(--_size);
                        height: var(--_size);
                        

                        margin: auto;

                        background-image: url('/light-barBG.png');
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center center;
                        border: solid var(--border-thin) var(--clr-0);
                        border-radius: var(--bradius-circle);

                        clip-path: polygon(50% 50%, 36.60254% 0, 63.39746% 0);

                        transition:
                            width var(--_transition),
                            height var(--_transition);
                    }
                }
            }
        }
    }

    /* === BREAKPOINTS ======================== */
    :global(.pm) {
        #dial {
            .clock{
                &#clock--PM {
                    z-index: 0;
                    opacity: 1;
                    
                }

                &#clock--AM {
                    z-index: -1;
                    opacity: 0;
                }
            }
        }
    }

    @media (orientation: portrait) {
        #dial__container {
            height: unset;
            overflow: visible;
            min-height: unset;

            margin: 0 calc(-1 * var(--pad-hrz));
        }

        #dial {
            
        }
    }
    @media only screen and (max-width: $breakpoint-smdesktop) {
        #dial {
            .clock::before {
                --_size: 2.2%;
                transform: translateY(-230%);
            }

            table {
                #units {
                    --_size: 95px;

                    font-size: 1.6rem;
                }

                tbody tr {
                    td.hour {
                        font-size: 1.2rem;

                        &::before {
                            margin-bottom: 92.5%;
                        }
                    }

                    td.data {
                        font-size: 1.3rem;
                    }
                }
            }
        }
    }

    @media only screen and (max-width: $breakpoint-tablet) {
        #dial {
            .clock::before {
                --_size: 2.6%;
                transform: translateY(-200%);
            }

            table {
                #units {
                    --_size: 75px;

                    font-size: 1.3rem;
                }

                tbody tr {
                    td.hour {
                        font-size: 1rem;
                    }

                    td.data {
                        font-size: 1.1rem;
                    }
                }
            }
        }
    }

    @media only screen and (max-width: $breakpoint-mobile) {
        #dial {
            .clock::before {
                --_size: 3%;
                transform: translateY(-190%);
            }
        }
    }

    /* === ANIMATIONS ========================= */
    @keyframes crossEnlarge {
        from { transform: scale(0.6); }
        to { transform: scale(1); }
    }

    @keyframes outlineCircleEnlarge {
        from { transform: scale(0.85); }
        to { transform: scale(1); }
    }

    @keyframes clockShrink {
        from {
            opacity: 0;
            transform: scale(1.06) rotate(calc(var(--timeRotation) - 30deg));
        }
        30% {
            opacity: 0;
            transform: scale(1.06) rotate(calc(var(--timeRotation) - 30deg));
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(var(--timeRotation));
        }
    }

    @keyframes clockIndicatorFade {
        from { opacity: 0; }
        60% { opacity: 0 ;}
        to { opacity: 1; }
    }

    @keyframes unitsShrink {
        from { transform: scale(1.4); }
        to { transform: scale(1); }
    }

    @keyframes hourFade {
        from { opacity: 0; }
        50% { opacity: 0 ;}
        to { opacity: 1; }
    }

    @keyframes dataEnlarge {
        from { transform: scale(0.3) rotate(15deg); }
        40% { transform: scale(0.3) rotate(15deg); }
        to { transform: scale(1) rotate(15deg); }
    }
</style>