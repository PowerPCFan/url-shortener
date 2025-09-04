<script lang="ts">
    import Notification from "$lib/components/Notification.svelte";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let { children } = $props();
</script>

<Notification />

<Header />

<main>
    {@render children()}
</main>

<Footer />

<style>
    main {
        margin-inline: 1rem;
        flex: 1;
    }
</style>