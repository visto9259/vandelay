import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import isBetween from "dayjs/plugin/isBetween";
import utc from  'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(LocalizedFormat);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Los_Angeles');

export default dayjs;
