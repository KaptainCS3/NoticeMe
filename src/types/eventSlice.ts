export default interface eventType {
  title: string;
  description: string;
  startTime: object | null | Date;
  endTime: object | null | Date;
  startDate: object | null | Date | string | number;
  endDate: object | null | Date | string | number;
};
