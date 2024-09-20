import { StatusList } from "@/interface/users";
import { find } from "lodash";

// 设置数据
export function setLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// 获取数据
export function getLocalStorage<T>(key: string): T | null {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

// 删除数据
export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

export function getToken() {
  const token = getLocalStorage<string>('token');
  return token;
}

export function getgDigitalPersonStatus(status: number) {
  const obj = find(StatusList, (item) => item.value === status);
  if (obj) return obj.label;
  return '--'
}

export function empty(v?: any) {
  if (typeof v === 'number') return v;
  return v ? v : '--';
}


export function formatDateTime(value: string) {
  if (!value) return empty();
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

