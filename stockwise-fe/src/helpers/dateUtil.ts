import * as dateFns from 'date-fns';

class DateUtil {
  private readonly DEFAULT_DATE_FORMAT_LONG: string = 'PPPppp';

  private readonly DEFAULT_DATE_FORMAT_SHORT: string = 'dd/MM/yyyy';

  private readonly DATE_FORMAT_PAYLOAD: string = `yyyy-MM-dd'T'HH:mm:ss.SSS'Z`;

  private readonly ISO_DATE_FORMAT_LONG: string = "yyyy-MM-dd'T'HH:mm:ssxxx";

  private static instance: DateUtil;

  private constructor() {}

  public static getInstance(): DateUtil {
    if (!DateUtil.instance) {
      DateUtil.instance = new DateUtil();
    }

    return DateUtil.instance;
  }

  /**
   * Formats a date
   *
   * @param {Date} date - Date data
   * @param {string} dateFormat - Date format string
   * @returns {string} - Formatted date string
   */
  public formatDate(date: Date, dateFormat: string = this.DEFAULT_DATE_FORMAT_SHORT): string {
    return dateFns.format(date, dateFormat);
  }

  /**
   * Formats a date to be used in a payload
   *
   * @param {Date} date - Date data
   * @returns {string} - Formatted date string
   */
  public formatDatePayload(date: Date): string {
    return dateFns.format(date, this.DATE_FORMAT_PAYLOAD);
  }

  /**
   * Sets a date with midnight time
   *
   * @param {Date} date - Date data
   * @returns {Date} - Date with time set to midnight time({hours: 0, minutes: 0, seconds: 0, milliseconds: 0})
   */
  public setDateWithMidnightTime(date: Date): Date {
    return dateFns.set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  }

  /**
   * Sets a date with time right before midnight
   *
   * @param {Date} date - Date data
   * @returns {Date} - Date with time set to before midnight time({hours: 23, minutes: 59, seconds: 59})
   */
  public setDateWithEndOfDayTime(date: Date): Date {
    return dateFns.endOfDay(date);
  }

  /**
   * Removes time/timezone related data from date string, leaving date only data
   *
   * @returns {string} - Date string in 'yyyy-MM-dd' format
   */
  public getDatePartFromISODateString(dateString: string): string {
    return dateString.substring(0, 10);
  }

  /**
   * Converts the provided date value or the current date to ISO formatted date string
   *
   * @param {string | number | Date} value - Optional date value
   * @returns {string} - Converted date string in 'yyyy-MM-dd'T'HH:mm:ssxxx' format
   */
  public getISODateString(value?: string | number | Date): string {
    const date = value ? new Date(value) : new Date();
    return dateFns.format(date, this.ISO_DATE_FORMAT_LONG);
  }

  /**
   * Parse the given string in ISO 8601 format and return an instance of Date.
   *
   * This method for date creation is prefered over the default Date() implementation as it behaves more predictably.
   * For instance if we provide 'yyyy-MM-dd' date string to the default Date constructor, this will create a date with the
   * user current timezone(leading to timezone-related issues), while dateFns.parseISO will create the date using UTC timezone.
   *
   * @param {string} dateString - Valid date string format
   * @returns {Date} - Date data
   */
  public parseToISODate(dateString: string): Date {
    return dateFns.parseISO(dateString);
  }

  /**
   * Converts a Date to string in 'May 29th, 1453 at 12:34:56' format
   *
   * @param {Date} date
   * @returns {string}
   */
  public formatDateToTime = (date: Date): string => dateFns.format(date, this.DEFAULT_DATE_FORMAT_LONG);
}

export default DateUtil;
