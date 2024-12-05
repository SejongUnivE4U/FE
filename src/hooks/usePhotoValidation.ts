import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { uploadImage } from '../api/reportApis';
import { addImageAtom, clearImagesAtom } from '../state/imageAtoms';

interface PhotoValidationResult {
  isPhotoValid: boolean | null;
  isLoading: boolean;
  error?: string;
}

export const usePhotoValidation = (
  image: File | null,
  isFirstImage: boolean = false,
): PhotoValidationResult => {
  const [isPhotoValid, setIsPhotoValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [, addImage] = useAtom(addImageAtom);
  const [, clearImages] = useAtom(clearImagesAtom);

  let isRequesting = false; // 중복 요청 방지 플래그

  useEffect(() => {
    const validatePhoto = async () => {
      if (isRequesting) return; // 중복 요청 방지
      isRequesting = true;

      if (!image) {
        setIsPhotoValid(false);
        setIsLoading(false);
        setError('No image provided');
        isRequesting = false;
        return;
      }

      if (isFirstImage) {
        // 첫 번째 이미지일 경우 아톰 초기화
        clearImages();
      }

      setIsLoading(true);
      setError(undefined);
      try {
        const result = await uploadImage(image);

        console.log(result);
        if (result?.message === 'All images are valid oral images') {
          setIsPhotoValid(true);
          addImage(image); // 유효한 이미지를 Jotai 상태에 추가
        } else {
          setIsPhotoValid(false);
          setError('Invalid oral image');
        }
      } catch (error: any) {
        console.error('Error validating photo:', error);
        setError(error?.response?.data?.message || 'Unexpected error occurred');
        setIsPhotoValid(false);
      } finally {
        setIsLoading(false);
        isRequesting = false;
      }
    };

    validatePhoto();
  }, [image, isFirstImage]);

  return { isPhotoValid, isLoading, error };
};
