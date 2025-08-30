<script>
    let { title = "Error", children } = $props();
</script>

<div class="error-card">
    <div class="error-icon">&#10071;</div>
    <div class="error-content">
        <h2>{title}</h2>
        <p>{@render children()}</p>
    </div>
</div>

<style lang="scss">
    .error-card {
        display: flex;
        align-items: center;
        max-width: 400px;
        background-color: var(--dark);
        border-left: 0.75rem solid var(--red);
        border-radius: 10px;
        outline: 2px rgba(0, 0, 0, 0.3) solid;
        padding: 16px 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        gap: 16px;
        animation: fadeIn 0.3s ease-out;
    }

    .error-icon {
        font-size: 2rem;
        margin-inline: -0.5rem;
    }

    .error-content {
        h2 {
            margin: 0;
            font-size: 1.2rem;
            color: var(--red);
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
