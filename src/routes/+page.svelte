<script lang="ts">
    import URLActions from '$lib/components/URLActions.svelte';
    import StatusCard from "$lib/components/StatusCard.svelte";
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import Card from '$lib/components/Card.svelte';

    let url = $state("");
    let short = $state("");
    let error = $state("");
    let loading = $state(false);

    async function shorten() {
        short = "";
        error = "";
        loading = true;

        if (!url) {
            error = "Please enter a URL";
            loading = false;
            return;
        }

        try {
            const response = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (response.ok) {
                short = data.short;
            } else {
                error = data.error || "Unknown error";
            }

            loading = false;

        } catch (err) {
            error = "Request failed";
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Home | BlinkLink</title>
</svelte:head>

<div class="page-container">
    <Card>
        <div class="url-shortener-card-content">
            <h1>Shorten URL</h1>
            <input class="main-url-input" onkeydown={(e) => e.key.toLowerCase() === "enter" && shorten()} bind:value={url} placeholder="Paste your URL..." />
            <button onclick={shorten}>Shorten!</button>

            {#if loading}
                <LoadingSpinner />
            {:else if short}
                <StatusCard title="Your URL is ready!">
                    Short URL:
                    <input class="short-url-input-display" readonly={true} onclick={event => event?.currentTarget?.select()} bind:value={short} />
                    <URLActions url={short} />
                </StatusCard>
            {:else if error}
                <StatusCard error>{error}</StatusCard>
            {/if}
        </div>
    </Card>
</div>

<style lang="scss">
    .page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-block: 1rem;

        h1 {
            font-size: 2.5rem;
        }

        input {
            padding: 0.5rem;
            font-size: 1rem;
            border: none;
            border-radius: 4px;
            margin: 0;

            &.short-url-input-display {
                width: 100%;
            }

            &.main-url-input {
                width: 100%;
                max-width: 440px;
            }
        }

        button {
            padding: 0.5rem 1rem;
            font-size: 1.2rem;
            background-color: var(--primary);
            border: none;
            color: var(--light);
            border-radius: 8px;
            cursor: pointer;
            font-family: var(--stack);
            transition: background-color 0.2s ease-in-out;

            &:hover {
                background-color: var(--primary-darker);
            }
        }
    }

    .url-shortener-card-content {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        & > * {
            margin-block: 1.2rem;
        }

        h1 {
            text-align: center;
        }
    }
</style>