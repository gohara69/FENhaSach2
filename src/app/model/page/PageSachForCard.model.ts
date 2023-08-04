import { SachForCard } from "./../sachmodel/SachForCard.model"

export interface PageSachForCard{
    content: SachForCard[],
    pageable: {
        sort: {
          empty: boolean,
          sorted: boolean,
          unsorted: boolean
        },
        offset: Number,
        pageSize: Number,
        pageNumber: number,
        paged: boolean,
        unpaged: boolean
      },
      totalElements: Number,
      totalPages: number,
      last: boolean,
      size: Number,
      number: Number,
      sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
      },
      first: boolean,
      numberOfElements: Number,
      empty: boolean
}