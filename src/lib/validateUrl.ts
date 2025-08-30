export function urlIsValid(inputString: string): boolean {
    try {
        let url;
        url = new URL(inputString);
        return true;
    } catch (_) {
        return false;
    }
}
