export const snakeCaseToWords = (input: string): string => {
    const words = input.split('_');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}