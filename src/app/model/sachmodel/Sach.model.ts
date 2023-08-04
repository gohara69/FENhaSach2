import { SuperEntity } from "../SuperEntity";
import { TacGia } from "../TacGia.model";
import { TheLoai } from "../TheLoai.model";

export class Sach extends SuperEntity {
    public tenSach!: string;
    public giaBan!: Number;
    public theLoai!: TheLoai;
    public soLuong!: Number;
    public giaBanDau!: Number;
    public gioiThieu!: string;
    public soTrang!: Number;
    public ngonNgu!: string;
    public tacGia!: TacGia;
    public thumbnail!: string;
}