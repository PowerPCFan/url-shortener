<script lang="ts">
    let { xs = false, s = false, m = false, l = false, xl = false, transparent = true } = $props();

    const sizes = [xs, s, m, l, xl];

    // if multiple sizes are specified, use medium
    if (sizes.filter((size) => size === true).length > 1) {
        m = true;
    }

    // if no size is specified, default to medium
    if (!!!sizes.includes(true)) {
        m = true;
    }

    const prefix = "height: "
    let style = $state(prefix);

    if (xs) {
        style = `${prefix}32px`;
    } else if (s) {
        style = `${prefix}48px`;
    } else if (m) {
        style = `${prefix}64px`;
    } else if (l) {
        style = `${prefix}128px`;
    } else if (xl) {
        style = `${prefix}256px`;
    }

    const src = transparent ? "/logo-transparent.png" : "/logo.png";
</script>


<img {src} {style} alt="BlinkLink Logo" />


<style lang="scss">
    img {
        width: auto; // height is set in inline styles
        aspect-ratio: 1;
        display: block;
    }
</style>
