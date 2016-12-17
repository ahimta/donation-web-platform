interface IDatetime {
  readonly years: number;
  readonly months: number;
  readonly date: number; // zero-indexed day of month
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;
}

export default IDatetime;
