<script lang="ts">
    import { page } from "$app/state";

    let status = page?.status;
    let errorMessage = page?.error?.message || "Unknown Error";

    let linkNotFound = errorMessage.toLowerCase() === "link not found";
</script>

<svelte:head>
    <title>{linkNotFound ? 'Link Not Found!' : 'Error ' + status}</title>
</svelte:head>

<div class="error-container">
    {#if linkNotFound}
        <h1>Link Not Found</h1>
        <p>This shortened link doesn't exist! (Did you type it properly?)</p>
    {:else}
        <h1>Error {status}: {errorMessage}</h1>
    {/if}
    <a href="/">Click here to go home</a>
</div>

<style lang="scss">
    .error-container {
        margin-inline: auto;
        text-align: center;

        h1 {
            font-size: 2.2rem;
        }

        p, a {
            font-size: 1.5rem;
        }
    }
</style>