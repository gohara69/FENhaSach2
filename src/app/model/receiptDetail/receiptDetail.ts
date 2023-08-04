import { SuperEntity } from "../SuperEntity";

export class ReceiptDetail extends SuperEntity{
    public quantity!: number;
    public itemId!: number;
    public receiptId!: number;
}