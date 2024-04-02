export interface User {
    Id: number;
    Name: string;
    ScooterId: number | null;
    Account: string;
    Password: string;
    Salt: string;
}