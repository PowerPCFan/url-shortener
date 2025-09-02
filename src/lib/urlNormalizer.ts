// export function formatUrl(url: string): string {
//     if (url.endsWith('/')) {
//         url = url.slice(0, -1);
//     }

//     try {
//         const urlObj = new URL(url);
//         return urlObj.href;
//     } catch {
//         return url;
//     }
// }

export function normalizeUrl(url: string): string {
    try {
        // trim url
        url = url.trim();

        // add http:// if missing
        if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
            url = 'http://' + url;
        }

        // create url object
        const urlObj = new URL(url);

        // lowercase hostname
        urlObj.hostname = urlObj.hostname.toLowerCase();

        // remove http/https ports since they're unnecessary 99.999% of the time
        urlObj.port = (
            (urlObj.protocol === 'http:' && urlObj.port === '80') ||
            (urlObj.protocol === 'https:' && urlObj.port === '443')
        ) ? '' : urlObj.port;

        if (url.endsWith('/') && urlObj.pathname !== '/') {
            // url ends with / and is not the root path (if root path, it shouldnt be removed)
            urlObj.pathname = urlObj.pathname.slice(0, -1);
        }

        if (urlObj.pathname === '') {
            // i think the url object automatically does this, but add a trailing slash if the path name is empty
            urlObj.pathname = '/';
        }

        return urlObj.href;
    } catch {
        return url.trim();
    }
}
