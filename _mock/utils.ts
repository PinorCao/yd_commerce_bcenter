import { Random } from 'mockjs';
import * as addDays from 'date-fns/add_days';
import * as format from 'date-fns/format';

export const COLOR_NAMES = [
  'red',
  'volcano',
  'orange',
  'gold',
  'yellow',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
  'magenta',
];

export function genName() {
  return genArr(['asdf', 'cipchk', '卡色']);
}

export function genArr(arr: any[], count = 1) {
  if (count === 1) {
    return arr[Random.natural(0, arr.length - 1)];
  }
  return new Array(count <= -1 ? Random.natural(0, -count) : count)
    .fill({})
    .map(() => {
      return arr[Random.natural(0, arr.length - 1)];
    });
}

export function genColorName() {
  return genArr(COLOR_NAMES);
}

export function genLabel() {
  return genArr([
    {
      color: 'green',
      text: 'Clients',
    },
    {
      color: 'red',
      text: 'Important',
    },
    {
      color: 'blue',
      text: 'Other',
    },
  ]);
}

export function genMp() {
  return `https://randomuser.me/api/portraits/lego/${Random.natural(0, 8)}.jpg`;
}

export function genBigMp() {
  return `./assets/tmp/img-big/${Random.natural(1, 8)}.jpg`;
}

export function genTag(num = -3) {
  return genArr(
    ['Angular', 'Node', 'HTML5', 'Less', 'Db', 'Python', 'Go'],
    num,
  );
}

export function genData(days: number, dateFormat = 'YYYY-MM-DD') {
  return format(addDays(new Date(), days), dateFormat);
}
