
export const useTheme = () => useState<string>('theme', () => useCookie('theme'));
