<script lang="ts">
    import { notifications } from '$lib/stores/notificationStore';
    import { browser } from '$app/environment';

    let { url } = $props();

    async function onCopy() {
        try {
            await navigator.clipboard.writeText(url);
            notifications.info("URL copied to clipboard", { title: "Success" });
        } catch (err) {
            notifications.error("Failed to copy URL.", { title: "Copy Error" });
        }
    }

    function goToUrl() {
        window.open(url, "_blank");
    }

    function shortenNewUrl() {
        if (browser) {
            window.location.href = "/";
        }
    }
</script>

<div>
    <button onclick={onCopy}><i class="fa-solid fa-copy"></i> Copy</button>
    <button onclick={goToUrl}><i class="fa-solid fa-globe"></i> Open</button>
    <button onclick={shortenNewUrl}><i class="fa-solid fa-arrows-rotate"></i> Shorten another</button>
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.5rem;
        gap: 0.5rem;
    }

    button {
        border-radius: 0.5rem;
        background-color: var(--primary);
        color: var(--light);
        font-family: var(--stack);
        border: none;
        padding: 0.4rem 0.8rem;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;

        &:hover {
            background-color: var(--primary-darker);
        }
    }
</style>
