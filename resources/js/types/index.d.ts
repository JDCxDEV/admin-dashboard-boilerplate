export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    two_factor_confirmed_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
