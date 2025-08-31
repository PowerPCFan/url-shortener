<script>
    let { error = false, title = "aaaaa", children } = $props();

    // absolutely horrific way of doing this
    if (title === "aaaaa") {
        title = error ? 'Error' : 'Info'
    }
</script>

<div class="card{error ? ' error' : ''}">
    <div class="icon{error ? ' error' : ''}">{@html error ? '&#10071;' : 'ℹ️'}</div>
    <div class="content">
        <h2 class="{error ? 'error' : ''}">{title}</h2>
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

    .icon {
        font-size: 2rem;
        margin-inline: -0.1rem;

        &.error {
            margin-inline: -0.5rem;
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
