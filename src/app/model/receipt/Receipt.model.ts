import { SuperEntity } from "../SuperEntity";

export class Receipt extends SuperEntity {
    public firstname!: string;
    public lastname!: string;
    public ward!: string;
    public district!: string;
    public address!: string;
    public status!: boolean;
    public userid!: number;
    public total!: number;
}