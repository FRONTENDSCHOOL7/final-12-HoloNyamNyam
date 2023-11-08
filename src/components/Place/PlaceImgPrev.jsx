/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import uploadPhoto from '../../images/upload-file.svg';
import imageCompression from 'browser-image-compression';
import {
  PlaceIconWrapper,
  PlaceImg,
  PlaceImgIcon,
  PlaceImgInput,
  PlaceImgWrapper,
  ImgWrapper,
  EmptyBox,
} from './PlaceImgPrevStyle';

export default function PlaceImgPrev({
  onPlaceImageUrlChange,
  hasImage,
  initialImage,
  iconStyle,
  wrapperStyle,
}) {
  const fileInputRef = useRef(null);
  const [boardImage, setBoardImage] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(initialImage || []);

  const maxSize = 10 * 1024 * 1024;

  useEffect(() => {
    if (hasImage && initialImage) {
      setUploadPreview(initialImage);
    }
  }, [hasImage, initialImage]);

  const handleUploadImg = async (e) => {
    let file = e.target?.files[0];
    if (file === undefined) {
      return;
    } else if (file.size > maxSize) {
      alert('파일 사이즈는 10MB 이하만 가능합니다');
      return;
    } else if (
      !/^(image\/jpeg|image\/png|image\/jpg|image\/gif)$/.test(file.type)
    ) {
      alert('파일 포맷은 */jpeg,*/png,*/jpg 만 가능합니다');
      return;
    }

    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setBoardImage(compressedFile);

      const result = await imageCompression.getDataUrlFromFile(compressedFile);
      setUploadPreview(result);

      onPlaceImageUrlChange(compressedFile, result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PlaceImgWrapper>
      <PlaceIconWrapper
        wrapperStyle={wrapperStyle}
        title='클릭하면 이미지를 불러올 수 있어요.'
      >
        <PlaceImgInput
          type='file'
          accept='image/jpeg,image/jpg,image/png'
          onChange={handleUploadImg}
          ref={fileInputRef}
        />
        <PlaceImgIcon
          src={uploadPhoto}
          iconStyle={iconStyle}
          alt='사진을 올리는 버튼 이미지'
        />
      </PlaceIconWrapper>
      {uploadPreview.length > 0 ? (
        <ImgWrapper>
          <PlaceImg src={uploadPreview} alt='업로드된 이미지' />
        </ImgWrapper>
      ) : (
        <EmptyBox />
      )}
    </PlaceImgWrapper>
  );
}
