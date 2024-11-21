import { useState, useEffect } from 'react';
import { uploadImage } from '../api/reportApis';

interface PhotoValidationResult {
  isPhotoValid: boolean | null;
  isLoading: boolean;
}

export const usePhotoValidation = (
  image: File | null,
): PhotoValidationResult => {
  const [isPhotoValid, setIsPhotoValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const validatePhoto = async () => {
      if (!image) {
        setIsPhotoValid(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const result = await uploadImage(image);
        if (result?.message === 'All images are valid oral images') {
          setIsPhotoValid(true);
        } else {
          setIsPhotoValid(false);
        }
      } catch (error: any) {
        console.error('Error validating photo:', error);
        if (error.response?.data?.errorCode === 'INVALID_IMAGE_TYPE') {
          setIsPhotoValid(false);
        } else {
          console.error('Unexpected error:', error);
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

  return { isPhotoValid, isLoading };
};
