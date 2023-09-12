import { SachForCard } from "./../sachmodel/SachForCard.model"

export interface PageSachForCard{
    content: SachForCard[],
    page: number,
    pageSize: number,
    total: number
}