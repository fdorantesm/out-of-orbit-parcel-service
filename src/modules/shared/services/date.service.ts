import { Injectable } from '@nestjs/common';
import { DateTime, DurationUnit } from 'luxon';

// TODO: Resolve dependency

@Injectable()
export class DateService {
  public create(date?: Date): Date {
    const instance = (
      date ? DateTime.fromJSDate(date) : DateTime.now()
    ).toUTC();

    return instance.toJSDate();
  }

  private createDateTime(date: Date): DateTime {
    const instance = DateTime.fromJSDate(date).toUTC();
    return instance;
  }

  public withinRange(value: number, unit: string): { from: Date; to: Date } {
    const from = this.create();
    const to = DateTime.fromJSDate(this.create())
      .plus({ [unit]: value })
      .toJSDate();
    return { from, to };
  }

  public in(value: number, unit: string): Date {
    const now = DateTime.fromJSDate(this.create());
    return now.plus({ [unit]: value }).toJSDate();
  }

  public diff(start: Date, end: Date, unit: DurationUnit): number {
    const startAt = this.createDateTime(start);
    const endAt = this.createDateTime(end);
    const diff = startAt.diff(endAt).as(unit);
    return diff;
  }
}
