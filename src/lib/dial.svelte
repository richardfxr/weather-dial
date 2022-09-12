<script>
    /* === PROPS ============================== */
    export let title;
    export let dataPoints;
    export let units;

    /* === VARIABLES ========================== */
    let largestData = dataPoints[0];
    let smallestData = dataPoints[0];
    let range = 0;

    // loop through dataPoints to get largest and smallest
    dataPoints.forEach(dataPoint => {
        if (largestData < dataPoint) largestData = dataPoint
        if (smallestData > dataPoint) smallestData = dataPoint
    });
    range = largestData - smallestData

    $: period = 'AM';
</script>

<div id="dial__container">
    <div id="dial">
        <div aria-hidden="true" id="cross"></div>
        <div aria-hidden="true" id="outerCircle"></div>
        <div aria-hidden="true" id="clock"></div>
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
                    <tr style="--hour: {index}">
                        <td class="hour">{index === 0 ? '12' : index}<span class="visuallyHidden">{period}</span></td>
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
        align-items: center;
        position: sticky;
        top: 0;

        // background-color: beige;
        height: 100vh;
        overflow: auto;
    }

    #dial {
        position: relative;
        width: 100%;
        height: 0;
        
        padding-top: 100%;
        // background: coral;
        overflow: hidden;

        #cross {
            position: absolute;
            top: var(--pad-dial);
            right: var(--pad-dial);
            bottom: var(--pad-dial);
            left: var(--pad-dial);

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

            transform: rotate(-15deg);

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
            }

            &::after {
                // gradient to block outline between 11 and 12
                --_width: 30%;

                content: '';
                position: absolute;
                top: 0;
                left: calc(50% - (var(--_width) / 2));
                width: var(--_width);
                height: 10%;

                background: linear-gradient(
                    90deg,
                    var(--clr-100trans),
                    var(--clr-100) 40%,
                    var(--clr-100) 60%,
                    var(--clr-100trans)
                );
            }
        }

        #clock {
            // conic gradient clock
            --_pad: 8%;

            position: absolute;
            top: calc(var(--pad-dial) + var(--_pad));
            right: calc(var(--pad-dial) + var(--_pad));
            bottom: calc(var(--pad-dial) + var(--_pad));
            left: calc(var(--pad-dial) + var(--_pad));

            background: conic-gradient(
                var(--clr-accent-shadow) 0deg,
                var(--clr-accent-700) 45deg,
                var(--clr-accent-700) 315deg,
                var(--clr-accent-highlight) 360deg
            );

            border: solid var(--border-thin) var(--clr-0);
            border-radius: var(--bradius-circle);

            // transform: rotate(239deg);

            &::before {
                // circle time indicator on outer cirlce
                --_size: 2%;

                content: '';
                position: absolute;
                top: 0;
                left: calc(50% - (var(--_size) / 2 ));
                z-index: 500;
                width: var(--_size);
                height: var(--_size);

                background-color: var(--clr-accent-700);
                border-radius: var(--bradius-circle);

                transform: translateY(-150%);
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
            }

            tbody tr {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;

                transform: rotate(calc(var(--hour) * 30deg));

                td.hour {
                    // clock hour text
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;

                    margin-bottom: 93%;

                    color: var(--clr-accent-800);
                    font-size: 1.3rem;
                    font-weight: 500;
                    text-align: center;

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
                        margin-bottom: -2%;
                        
                        background-color: var(--clr-0);
                    }
                }

                td.data {
                    // data text
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    position: absolute;
                    top:0;
                    right: 0;
                    bottom: 0;
                    left: 0;

                    padding-bottom: calc(68% + (12% / var(--range) * var(--absValue)));

                    color: var(--clr-0);
                    font-size: 1.4rem;
                    font-weight: 600;
                    text-align: center;
                    clip-path: polygon(50% 50%, 36.60254% 0, 63.39746% 0);

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

                        background-image: url('/light-amBarBG.png');
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center center;
                        border: solid var(--border-thin) var(--clr-0);
                        border-radius: var(--bradius-circle);
                    }

                    &::after {
                        // separator
                        --_pad-top: 10%;

                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;

                        height: calc(100% - 2 * var(--_pad-top));
                        width: var(--border-thin);

                        margin: var(--_pad-top) auto;

                        background-color: var(--clr-accent-separator);

                        transform: rotate(15deg);
                    }
                }
            }
        }
    }
</style>