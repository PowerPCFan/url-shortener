<script>
    let isMenuOpen = $state(false);

    function toggleMenu() {isMenuOpen = !isMenuOpen}
    function closeMenu() {isMenuOpen = false}
    function openMenu() {isMenuOpen = true}
</script>

<header>
    <div class="left-side">
        <h1>BlinkLink</h1>
    </div>
    <div class="right-side">
        <button class="hamburger" class:open={isMenuOpen} onclick={toggleMenu} aria-label="Toggle menu">
        <div class="hamburger-icon">
            <div class="icon-1" class:a={isMenuOpen}></div>
            <div class="icon-2" class:b={isMenuOpen}></div>
            <div class="icon-3" class:c={isMenuOpen}></div>
            <div class="clear"></div>
        </div>
        </button>

        <nav class:open={isMenuOpen}>
            <a class="navbar-item" href="/" onclick={closeMenu}>Home</a>
            <a class="navbar-item" href="/terms-of-service" onclick={closeMenu}>Terms of Service</a>
        </nav>
    </div>
</header>

{#if isMenuOpen}
    <div onkeydown={void(0)} onclick={closeMenu} class="overlay" tabindex="-1" role="dialog" aria-modal="true"></div>
{/if}

<style lang="scss">
    header {
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-inline: 1.5rem;
        padding-block: 0;
        margin-inline: 0;
        margin-block: 0;
        height: fit-content;
        width: 100%;
        background-color: var(--dark-darker);
    }

    .left-side {
        h1 {
            font-size: 1.8rem;
            margin: 0;
            padding-block: 0.7rem;
        }
    }

    .right-side {
        display: flex;
        align-items: center;

        .hamburger {
            display: none;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            width: 2rem;
            height: 2rem;
            z-index: 1001;

            .hamburger-icon {
                position: relative;
                height: 100%;
                width: 100%;
                cursor: pointer;
                border-radius: 50%;
                transition: all 0.2s ease-in-out;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    transform: scale(1.2);
                }
            }

            .icon-1, .icon-2, .icon-3 {
                position: absolute;
                width: 1.1rem;
                height: 0.120rem;
                background-color: var(--light);
                transition: all 400ms cubic-bezier(.84, .06, .52, 1.8);
            }

            .icon-1 {
                transform: translateY(-8px);
                animation-delay: 100ms;

                &.a {
                    transform: rotate(40deg);
                }
            }

            .icon-2 {
                &.b {
                    transform: rotate(-40deg);
                }
            }

            .icon-3 {
                transform: translateY(8px);
                animation-delay: 250ms;

                &.c {
                    opacity: 0;
                }
            }
        }

        nav {
            display: flex;

            .navbar-item {
                display: inline-block;
                max-width: 200px;
                height: 100%;

                font-weight: bold;
                text-decoration: none !important;

                color: inherit;

                border-radius: 4px;

                padding-left: 1.2rem;
                padding-right: 1.2rem;

                padding-top: 0.7rem;
                padding-bottom: 0.7rem;

                transition: background-color 0.3s ease, color 0.3s ease;

                &:hover {
                    background-color: color-mix(in srgb, var(--primary), white 25%);
                    color: var(--dark);
                }
            }
        }
    }

    .overlay {
        display: none;
    }

    @media (max-width: 768px) {
        .right-side {
            .hamburger {
                display: flex;
            }
            
            nav {
                display: none;
                position: fixed;
                top: 0;
                right: 0;
                height: 100vh;
                width: 250px;
                background-color: var(--dark-darker);
                flex-direction: column;
                padding: 4rem 0 2rem 0;
                box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                
                &.open {
                    display: flex;
                    transform: translateX(0);
                }
                
                .navbar-item {
                    width: 100%;
                    max-width: none;
                    text-align: left;
                    padding: 0.8rem 1.5rem;
                    height: auto;
                    border-radius: 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    
                    &:hover {
                        background-color: color-mix(in srgb, var(--primary), white 25%);
                        color: var(--dark);
                    }
                }
            }
        }
        
        .overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }

        .left-side h1 {
            font-size: 1.5rem;
        }
    }
</style>
