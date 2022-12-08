import {
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
} from './DateConstants';

function startOfDate (date, unit) {
  const t = new Date(date);
  switch (unit) {
    case 'year':
      t.setMonth(0);
      break;
    case 'month':
      t.setDate(1);
      break;
    case 'day':
      t.setHours(0);
      break;
    case 'hour':
      t.setMinutes(0);
      break;
    case 'minute':
      t.setSeconds(0);
      break;
    case 'second':
      t.setMilliseconds(0);
      break;
  }
  return t;
}

function getDiff (t, sub, interval) {
  return (
    (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)
    - (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)
  ) / interval;
}

const getDateDiff = function (date, subtract, unit) {
  if (unit === undefined) unit = 'days';

  const
    t       = new Date(date);
  const sub = new Date(subtract);

  switch (unit) {
    case 'years':
      return (t.getFullYear() - sub.getFullYear());

    case 'months':
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth();

    case 'days':
      return getDiff(startOfDate(t, 'day'), startOfDate(sub, 'day'), MILLISECONDS_IN_DAY);

    case 'hours':
      return getDiff(startOfDate(t, 'hour'), startOfDate(sub, 'hour'), MILLISECONDS_IN_HOUR);

    case 'minutes':
      return getDiff(startOfDate(t, 'minute'), startOfDate(sub, 'minute'), MILLISECONDS_IN_MINUTE);

    case 'seconds':
      return getDiff(startOfDate(t, 'second'), startOfDate(sub, 'second'), 1000);
  }
};

export default getDateDiff;
