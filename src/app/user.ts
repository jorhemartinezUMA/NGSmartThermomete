export interface User {
    id: string;
    user: {
        ID: String;
        admin: boolean;
        email: String;
        name: String;
        password: String
    }
}