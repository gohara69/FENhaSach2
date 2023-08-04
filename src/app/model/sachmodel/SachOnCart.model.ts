import { SachForCard } from "./SachForCard.model";

export class SachOnCart extends SachForCard{
    public quantity!: number;
    constructor(sach: SachForCard){
        super();
        this.id = sach.id;
        this.tenSach = sach.tenSach;
        this.giaBan = sach.giaBan;
        this.giaBanDau = sach.giaBanDau;
        this.tacGia = sach.tacGia;
        this.thumbnail = sach.thumbnail;
        this.quantity = 1;
    }
} 