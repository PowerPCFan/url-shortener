import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
    const code = params.code;

    throw redirect(308, `/${code}`);
};
