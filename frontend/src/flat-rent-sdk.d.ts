declare module "flat-rent-sdk" {
  export interface IFlat {
    id: string;
    title: string;
    details: string;
    photos: string[];
    coordinates: number[];
    booked: any[];
    price: number;
  }

  interface IParams {
    city: string;
    checkInDate: Date;
    checkOutDate: Date;
    priceLimit: number;
  }

  export class FlatRentSdk {
    get(id: string): Promise<IFlat | null>;

    search(params: IParams): IFlat[];

    book(flatId: number, checkInDate: Date, checkOutDate: Date): number;
  }
}
