const BLOCKLIST_URLS = [
    'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/nsfw-onlydomains.txt',
];

let blockedDomains: Set<string> | null = null;
let loadingPromise: Promise<Set<string>> | null = null;

async function fetchBlocklist(url: string): Promise<string[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} for ${url}`);
        }
        
        const text = await response.text();
        return text.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
    } catch (error) {
        console.error(`Failed to fetch blocklist from ${url}:`, error);
        return []; // Return empty array on error
    }
}

async function loadBlocklists(): Promise<Set<string>> {
    if (loadingPromise) {
        return loadingPromise;
    }

    loadingPromise = (async () => {
        const allDomains = new Set<string>();
        
        const domainLists = await Promise.all(
            BLOCKLIST_URLS.map(url => fetchBlocklist(url))
        );
        
        domainLists.forEach(domains => {
            domains.forEach(domain => allDomains.add(domain));
        });
        
        return allDomains;
    })();

    return loadingPromise;
}

function isDomainBlocked(hostname: string, blockedDomains: Set<string>): boolean {
    // check for exact domain match 
    if (blockedDomains.has(hostname)) {
        return true;
    }

    // domain stuff
    const parts = hostname.split('.');
    for (let i = 1; i < parts.length - 1; i++) {
        const parentDomain = parts.slice(i).join('.');
        if (blockedDomains.has(parentDomain)) {
            return true;
        }
    }

    return false;
}

function containsUnicodeCharacters(hostname: string): boolean {
    const domainParts = hostname.split('.');
    const unicodeCharacterRegex = /[^\u0000-\u007F]/;

    for (const part of domainParts) {
        if (part.startsWith("xn--") || unicodeCharacterRegex.test(part)) {
            return true;
        }
    }

    return false;
}

export async function urlAllowed(url: string): Promise<boolean> {
    try {
        // load blocklists
        if (!blockedDomains) {
            blockedDomains = await loadBlocklists();
        }

        const hostname = new URL(url).hostname;
        if (!hostname) {
            return false; // Invalid URL is considered "blocked"
        }

        const urlShorteners = ["sl.powerpcfan.xyz", "blinkl.ink", "sl.expect.ovh", "tinyurl.com", "bit.ly", "bitly.com"]; // will expand this later

        for (const shortener of urlShorteners) {
            if (hostname === shortener) {
                return false; // prevent my shortener from shortening already shortened links which is pointless and can cause infinite redirect loops
            }
        }

        if (isDomainBlocked(hostname, blockedDomains)) {
            return false;
        }

        if (containsUnicodeCharacters(hostname)) {
            return false;
        }

        return true; // passed all checks - is allowed
    } catch (error) {
        console.error('Error checking URL allowlist:', error);
        return false; // Treat as "blocked" on error to be safe
    }
}
