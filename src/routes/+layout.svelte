<script lang="ts">
    import BubbleBackground from "$lib/components/BubbleBackground.svelte";
    import Notification from "$lib/components/Notification.svelte";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let { children } = $props();
</script>

<Notification />

<Header />

<main>
    <BubbleBackground>
        {@render children()}
    </BubbleBackground>
</main>

<Footer />

<style>
    main {
        margin-inline: 1rem;
        flex: 1;
    }
</style>