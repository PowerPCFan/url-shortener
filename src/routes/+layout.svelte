<script lang="ts">
    import Notification from "$lib/components/Notification.svelte";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { page } from "$app/state";
    import { onMount } from "svelte";

    let { children } = $props();

    // variable initializations
    let _origin: string = $state("");
    let _pathname: string = $state("");
    let _queryParams: string = $state("");
    let _hash: string = $state("");

    let fullUrl: string = $state("");
    let canonicalUrl: string = $state("");
    let favicon = $state("");

    // constants
    const description = "BlinkLink is a simple URL shortener with a modern and user-friendly interface.";

    onMount(() => {
        _origin = page.url.origin;
        _pathname = page.url.pathname;
        _queryParams = page.url.search;
        _hash = page.url.hash;

        fullUrl = _origin + _pathname + _queryParams + _hash;
        canonicalUrl = _origin + _pathname;
        favicon = _origin + "/favicon.png";
    });
</script>

<svelte:head>
    <!-- Open Graph -->
    <meta property="og:title" content="BlinkLink" />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={favicon} />
    <meta property="og:url" content={fullUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="BlinkLink" />

    <!-- SEO -->
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
</svelte:head>

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