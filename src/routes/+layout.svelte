<script lang="ts">
    import BubbleBackground from "$lib/components/BubbleBackground.svelte";
    let { children } = $props();
</script>

<BubbleBackground>
    {@render children()}
</BubbleBackground>
