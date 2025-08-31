export function urlIsValid(inputString: string): boolean {
    try {
        let url;
        url = new URL(inputString);
        return true;
    } catch (e) {
        return false;
    }
}
