import type { RequestHandler } from "@sveltejs/kit";
import { generateRandomCode } from "$lib/randomCode";
import { urlAllowed } from "$lib/urlChecker";
import { urlIsValid } from "$lib/validateUrl";
import { set, get } from "$lib/redis";

export const POST: RequestHandler = async ({ request }) => {
    const { url } = await request.json();

    if (!urlIsValid(url)) {
        return new Response(JSON.stringify({ error: "URL is invalid." }), {
            status: 400,
        });
    }

    if (!url || typeof url !== "string") {
        return new Response(JSON.stringify({ error: "URL is invalid." }), {
            status: 400,
        });
    }

    if (!(await urlAllowed(url))) {
        return new Response(JSON.stringify({ error: `The URL ${url} is blocked.` }), {
            status: 403,
        });
    }

    // Check if the URL is already shortened using the reverse lookup k/v pair that has the URL as the key
    const existingCode = await get(url);

    if (existingCode) {
        return new Response(JSON.stringify({ short: `/l/${existingCode}` }));
    }

    const code = generateRandomCode(6);
    await set(code, url);
    await set(url, code); // Add a 2nd K/V pair for reverse lookup

    return new Response(JSON.stringify({ short: `/l/${code}` }));
};
