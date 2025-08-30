<script lang="ts">
    import { onMount } from "svelte";

    let { children } = $props();

    let amountOfBalls = 20;

    function getBallsArray(): Array<{ x: number; y: number }> {
        const randomNumber = ((): number => {
            return Math.round(Math.random() * 100)
        });

        return Array.from({ length: amountOfBalls }, () => ({x: randomNumber(), y: randomNumber()}));
    }

    let balls = $state(getBallsArray());
    onMount(() => {
        function setBalls() {
            balls = getBallsArray();
        }

        setTimeout(setBalls, 100);
        setInterval(setBalls, 15000);
    });
</script>

<div class="balls">
    <div class="circles">
        {#each balls as { x, y }}
            <div
                class="bubble"
                style="width: {Math.max(Math.random(), 0.3) * 25}vw; opacity: {Math.random() * 0.08}; top:{y}%; left:{x}%;"
            ></div>
        {/each}
    </div>
    <div class="main">
        {@render children()}
    </div>
</div>

<style>
    .bubble {
        transition: all 15s linear;
        aspect-ratio: 1;
        position: absolute;
        width: 100%;
        background-color: rgb(0, 123, 250);
        border-radius: 100%;
        opacity: 0.02;
        z-index: 0;
    }

    .circles {
        pointer-events: none;
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .balls {
        width: 100%;
        height: 100%;
    }
</style>