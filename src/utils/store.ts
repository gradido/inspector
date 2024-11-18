import { getEnumValue } from './utils'

export function getItem<T extends string | number>(key: string, defaultValue: T): T
{
  return getEnumValue<T>(localStorage.getItem(key), defaultValue);
}