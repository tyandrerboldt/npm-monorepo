export class DateUtils {
  static newDate() {
    return new Date();
  }

  static now() {
    return new Date(Date.now());
  }

  static from(value: string | number | Date) {
    return new Date(value);
  }

  static toIso(date: Date) {
    return date.toISOString();
  }
}
