import { IMessageSender } from "./message-sender.model";

export interface IAdminDashboard {
    id: number;
    number: string;
    status: string;
    messages: number;
}