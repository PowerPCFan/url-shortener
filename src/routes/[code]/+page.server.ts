import type { PageServerLoad } from "./$types";
import { redirect, error } from "@sveltejs/kit";
import { get } from "$lib/redis";

export const load: PageServerLoad = async ({ params }) => {
    const code = params.code;
    const url = await get(code);

    if (url) {
        throw redirect(301, url);
    } else {
        console.error("Link not found for code:", code);
        throw error(404, "Link not found");
    }
};
