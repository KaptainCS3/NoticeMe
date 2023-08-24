export default interface eventType {
  title: string;
  description: string;
  startTime: object | null | Date | string;
  endTime: object | null | Date | string;
  startDate: object | null | Date | string | number;
  endDate: object | null | Date | string | number;
};
