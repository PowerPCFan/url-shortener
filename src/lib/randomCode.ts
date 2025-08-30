// New Base62 generation method
export function generateRandomCode(length: number = 6): string {
    const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
        code += charset[array[i] % charset.length];
    }
    return code;
}
