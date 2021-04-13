export interface Users {
    id: string;
    users: [
        {
            user: {
                ID: String;
                admin: boolean;
                email: String;
                name: String,
                password: String
            }
        }
    ]
        
}