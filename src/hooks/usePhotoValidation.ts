import { useState, useEffect } from 'react';
import { uploadImage, uploadInitialImage } from '../api/reportApis';

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

      setIsLoading(true);
      setError(undefined);
      try {
        const result = isFirstImage
          ? await uploadInitialImage(image)
          : await uploadImage(image);

        console.log(result);
        if (result?.message === 'All images are valid oral images') {
          setIsPhotoValid(true);
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
