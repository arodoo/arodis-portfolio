export function typeTextContent(content: string, callback: (char: string) => void, delay: number) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < content.length) {
            callback(content.charAt(i));
            i++;
        } else {
            clearInterval(interval);
        }
    }, delay);
}
