import StorageKey from './types/StorageKey';

export function getItem(key: StorageKey) {
  if (localStorage) {
    return localStorage.getItem(key) || '';
  } else {
    console.log('localStorage not supported!');
    return '';
  }
}

export function setItem(key: StorageKey, value: string) {
  if (localStorage) {
    localStorage.setItem(key, value);
  } else {
    console.log('localStorage not supported!');
  }
}
