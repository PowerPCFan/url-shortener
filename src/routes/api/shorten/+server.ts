import type { RequestHandler } from "@sveltejs/kit";
import { generateRandomCode } from "$lib/randomCode";
import { urlAllowed } from "$lib/urlChecker";
import { urlIsValid } from "$lib/validateUrl";
import { set, get } from "$lib/redis";

function formatUrl(url: string): string {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    
    try {
        const urlObj = new URL(url);
        return urlObj.href;
    } catch {
        return url;
    }
}

function response(data: object, status: number): Response {
    return new Response(JSON.stringify(data), {status: status});
}

export const POST: RequestHandler = async ({ request }) => {
    let { url } = await request.json();

    url = formatUrl(url);

    if (!url || typeof url !== "string") {
        return response({ error: "URL is invalid." }, 400);
    }

    if (!urlIsValid(url)) {
        return response({ error: "URL is invalid." }, 400);
    }

    if (!(await urlAllowed(url))) {
        return response({ error: `The URL ${url} is blocked.` }, 403);
    }

    // Check if the URL is already shortened using the reverse lookup k/v pair that has the URL as the key
    const existingCode = await get(url);

    if (existingCode) {
        return response({ short: `https://sl.powerpcfan.xyz/l/${existingCode}` }, 200);
    }

    const code = generateRandomCode(6);
    await set(code, url);
    await set(url, code); // Add a 2nd K/V pair for reverse lookup

    return response({ short: `https://sl.powerpcfan.xyz/l/${code}` }, 200);
};
