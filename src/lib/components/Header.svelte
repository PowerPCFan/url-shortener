<header>
    <div class="left-side">
        <h1>BlinkLink</h1>
    </div>
    <div class="right-side">
        <nav>
            <a class="navbar-item" href="/">Home</a>
            <a class="navbar-item" href="/terms-of-service">Terms of Service</a>
            <!-- <div class="navbar-item navbar-dropdown">
                <span class="navbar-dropdown-trigger">Resources <i id="chevron" class="fa-solid fa-circle-chevron-down"></i></span>
                <div class="navbar-dropdown-menu">
                    <a class="navbar-dropdown-item" href="/resources/pc-resource-document/">PC Resource Document</a>
                    <a class="navbar-dropdown-item" href="/resources/pc-resource-document/install-windows">Installing Windows</a>
                    <a class="navbar-dropdown-item" href="/resources/keys/">Product Keys</a>
                </div>
            </div> -->
        </nav>
    </div>
</header>

<style lang="scss">
    header {
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
        nav {
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

            .navbar-dropdown {
                position: relative;

                .navbar-dropdown-trigger {
                    cursor: pointer;
                    display: block;

                    #chevron {
                        transition: transform 0.2s;
                    }
                }

                &:hover {
                    .navbar-dropdown-trigger #chevron {
                        transform: rotate(180deg);
                    }
                }

                .navbar-dropdown-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: var(--primary);
                    border: 1px solid color-mix(in srgb, var(--primary), white 15%);
                    border-radius: 4px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    min-width: 200px;
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-10px);
                    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
                }

                &:hover .navbar-dropdown-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .navbar-dropdown-item {
                    display: block;
                    padding: 0.8rem 1.2rem;
                    color: var(--light);
                    text-decoration: none !important;
                    font-weight: bold;
                    transition: background-color 0.3s ease, color 0.3s ease;
                    border-radius: 0;

                    &:hover {
                        background-color: color-mix(in srgb, var(--primary), white 25%);
                        color: var(--dark);
                    }

                    &:first-child {
                        border-top-left-radius: 4px;
                        border-top-right-radius: 4px;
                    }

                    &:last-child {
                        border-bottom-left-radius: 4px;
                        border-bottom-right-radius: 4px;
                    }
                }
            }
        }
    }
</style>
