import { SachForCard } from "../model/sachmodel/SachForCard.model";
import { SachOnCart } from "../model/sachmodel/SachOnCart.model";

export class SachConverter{
    static toSachOnCart(sach: SachForCard){
        return new SachOnCart(sach);
    }
}