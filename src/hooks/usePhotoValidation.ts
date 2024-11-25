import { useState, useEffect } from 'react';
import { uploadImage } from '../api/reportApis';

interface PhotoValidationResult {
  isPhotoValid: boolean | null;
  isLoading: boolean;
  error?: string;
}

export const usePhotoValidation = (
  image: File | null,
): PhotoValidationResult => {
  const [isPhotoValid, setIsPhotoValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const validatePhoto = async () => {
      if (!image) {
        setIsPhotoValid(false);
        setIsLoading(false);
        setError('No image provided');
        return;
      }

      setIsLoading(true);
      setError(undefined);
      try {
        const result = await uploadImage(image);
        if (result?.message === 'All images are valid oral images') {
          setIsPhotoValid(true);
        } else {
          setIsPhotoValid(false);
          setError('Invalid oral image');
        }
      } catch (error: any) {
        console.error('Error validating photo:', error);
        setError(error);
        if (error.response?.data?.message) {
          // 정확한 에러 메시지를 `setError`에 저장
          setError(error);
        } else if (error.response?.data?.errorCode === 'INVALID_IMAGE_TYPE') {
          setIsPhotoValid(false);
          setError(error);
        } else {
          console.error('Unexpected error:', error);
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (image) {
      validatePhoto();
    } else {
      setIsPhotoValid(false);
      setIsLoading(false);
    }
  }, [image]);

  return { isPhotoValid, isLoading, error };
};
