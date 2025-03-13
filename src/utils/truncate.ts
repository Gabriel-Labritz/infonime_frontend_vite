export function truncate(str: string, num: number) {
    return str?.length > num ? str.substring(0, num - 1) + '...' : str; 
}