import {BadRequest} from '@feathersjs/errors';
import {Storage} from '../../database/Storage';
import {DateHelper} from '../../helpers/DateHelper';
import {Place} from '../Place';
import {Filter} from './Filter';

export class PlaceRepository {
  constructor(private storage: Storage<Place>) {}
  
  public async get(id: number) {
    return this.storage.data[String(id)];
  }

  public async find(filter: Filter) {
    if (filter.coordinates[0] !== 59.9386 || filter.coordinates[1] !== 30.3141) {
      return [];
    }

    let places = Object.values(this.storage.data);

    if (filter.maxPrice !== 0) {
      places = places.filter((place) => {
        return place.price <= filter.maxPrice
      })
    }

    const dateRange = DateHelper.generateDateRange(filter.startDate, filter.endDate);
    places = places.filter((place) => {
      return this.checkIfPlaceAreAvailableForDates(place, dateRange);
    });

    return places;
  }

  public async book(place: Place, dateRange: Date[]): Promise<Place> {
    if (!this.checkIfPlaceAreAvailableForDates(place, dateRange)) {
      throw new BadRequest(`Place ${place.id} is not available for dates ${dateRange.join(",")}.`);
    }

    const bookedDates = dateRange.map((date) => {
      return date.getTime();
    });

    place.bookedDates = bookedDates;
    this.storage.data[String(place.bookedDates)] = place;
    await this.storage.write();
    return place;
  }

  private checkIfPlaceAreAvailableForDates(place: Place, dateRange: Date[]): boolean {
    return dateRange.every((date) => {
      return !place.bookedDates.includes(date.getTime());
    });
  }
}
