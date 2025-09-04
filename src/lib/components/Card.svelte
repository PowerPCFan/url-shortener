<script lang="ts">
    import type { Snippet } from "svelte";

    let { error = false, inlineStyles = "", children }: { error?: boolean; inlineStyles?: string; children: Snippet<[]> } = $props();
</script>


<div class="card {error ? 'error' : ''}" style="{inlineStyles}">
    {@render children()}
</div>


<style lang="scss">
    .card {
        background-color: var(--dark-darker-semitransparent);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0.3rem 0.3rem 0.75rem 0 rgba(0, 0, 0, 0.3);
        width: 80vw;
        height: fit-content;
        max-width: 600px;

        &.error {
            border-color: var(--red);
        }
    }

    @media (max-width: 520px) {
        .card {
            max-width: 100%;
        }
    }
</style>
