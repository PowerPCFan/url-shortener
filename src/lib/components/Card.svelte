<script lang="ts">
    let { error = false, title = undefined, children } = $props();

    title = title ?? (error ? 'Error' : 'Info');

    const icon = error ? '❗' : 'ℹ️'
</script>

<div class="card {error ? 'error' : 'info'}">
    <div class="main-icon {error ? 'error' : 'info'}">{icon}</div>
    <div class="content">
        <h2 class="{error ? 'error' : ''}"><span class="inline-icon">{@html icon + '&nbsp;'}</span>{title}</h2>
        <p>{@render children()}</p>
    </div>
</div>

<style lang="scss">
    .card {
        display: flex;
        align-items: center;
        max-width: 400px;
        background-color: var(--dark);
        border-left: 0.75rem solid var(--primary);
        border-radius: 10px;
        outline: 2px rgba(0, 0, 0, 0.3) solid;
        padding: 16px 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        gap: 16px;
        animation: fadeIn 0.3s ease-out;

        &.error {
            border-left-color: var(--red);
        }
    }

    .main-icon {
        font-size: 2rem;
        margin-inline: -0.1rem;

        &.error {
            margin-inline: -0.5rem;
        }
    }

    .inline-icon {
        display: none;
    }

    @media (max-width: 475px) {
        .main-icon {
            display: none;
        }

        .inline-icon {
            display: inline-block;
        }
    }

    .content {
        h2 {
            margin: 0;
            font-size: 1.2rem;
            color: var(--primary);

            &.error {
                color: var(--red);
            }
        }
        
        p {
            margin: 4px 0 0;
            font-size: 0.95rem;
        }
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
