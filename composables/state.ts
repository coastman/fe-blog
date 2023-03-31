
export const useTheme = () => useState<string>('theme', () => useCookie('theme', { maxAge: 2626560 }));
