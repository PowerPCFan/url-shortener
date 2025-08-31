<script lang="ts">
    import BubbleBackground from "$lib/components/BubbleBackground.svelte";
    import Notification from "$lib/components/Notification.svelte";

    let { children } = $props();
</script>

<Notification />

<BubbleBackground>
    {@render children()}
</BubbleBackground>
