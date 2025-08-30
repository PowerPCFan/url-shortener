<script lang="ts">
    import { page } from "$app/state";

    let status = page?.status;
    let error = page?.error;

    let fourZeroFour: boolean = $state(false);
    if (status === 404) {
        fourZeroFour = true;
    }
</script>

<svelte:head>
    <title>Error {status}</title>
</svelte:head>

<div class="error-container">
    <h1>{status}</h1>
    <p>{error?.message}</p>
    <a href="/">Go back home</a>
</div>
