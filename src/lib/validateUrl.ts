export function urlIsValid(inputString: string): boolean {
    try {
        let url: URL;
        url = new URL(inputString);
        return true;
    } catch (e) {
        return false;
    }
}
