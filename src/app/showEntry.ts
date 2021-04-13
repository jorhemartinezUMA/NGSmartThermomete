import { Alert } from './alert';
export interface ShowEntry {
    id: string;
    state: {
        ID: String;
        name: String;
        seconds: number;
        temperature: number;
        timestamp: String
    };
    alert: Alert;

}