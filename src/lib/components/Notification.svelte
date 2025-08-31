<script lang="ts">
    import { fly } from 'svelte/transition';
    import { notifications, type NotificationType } from '$lib/stores/notificationStore';

    function getIcon(type: NotificationType): string {
        switch (type) {
            case 'info':
                return 'ℹ️';
            case 'warning':
                return '⚠️';
            case 'error':
                return '❗';
            default:
                return 'ℹ️';
        }
    }

    function getDefaultTitle(type: NotificationType): string {
        switch (type) {
            case 'info':
                return 'Info';
            case 'warning':
                return 'Warning';
            case 'error':
                return 'Error';
            default:
                return 'Info';
        }
    }
</script>

<div class="notification-container">
    {#each $notifications as n (n.id)}
        <div class="notification {n.type}" transition:fly={{ x: -100, y: 20, duration: 300 }}>
            <div class="icon">
                {@html getIcon(n.type)}
            </div>
            <div class="content">
                <h3 class="title {n.type}">
                    {n.title || getDefaultTitle(n.type)}
                </h3>
                <p class="message">{n.message}</p>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    .notification-container {
        position: fixed;
        bottom: 10px;
        left: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 9999;
    }

    .notification {
        display: flex;
        align-items: flex-start;
        max-width: 400px;
        background-color: var(--dark);
        border-radius: 10px;
        border: none;
        padding: 16px 20px;
        box-shadow: 0 0 8px var(--primary);
        gap: 12px;
        animation: slideIn 0.3s ease-out;

        &.warning {
            box-shadow: 0 0 6px var(--yellow);
        }

        &.error {
            box-shadow: 0 0 6px var(--red);
        }

        &.info {
            box-shadow: 0 0 6px var(--primary);
        }
    }

    .icon {
        font-size: 1.5rem;
        flex-shrink: 0;
        margin-top: 2px;
    }

    .content {
        flex: 1;
        min-width: 0;

        .title {
            margin: 0 0 4px 0;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--primary);

            &.warning {
                color: var(--yellow);
            }

            &.error {
                color: var(--red);
            }

            &.info {
                color: var(--primary);
            }
        }
        
        .message {
            margin: 0;
            font-size: 0.9rem;
            color: var(--light);
            line-height: 1.4;
        }
    }

    @keyframes slideIn {
        from { 
            opacity: 0; 
            transform: translateX(-100%) translateY(20px);
        }
        to { 
            opacity: 1; 
            transform: translateX(0) translateY(0);
        }
    }
</style>
