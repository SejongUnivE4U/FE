import { atom } from 'jotai';

export const imagesAtom = atom<File[]>([]);

//이미지 추가
export const addImageAtom = atom(null, (get, set, newImage: File) => {
  const currentImages = get(imagesAtom);
  set(imagesAtom, [...currentImages, newImage]);
});

// 이미지 배열 초기화
export const clearImagesAtom = atom(null, (_, set) => {
  set(imagesAtom, []);
});
