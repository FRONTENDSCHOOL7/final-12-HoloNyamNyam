import React, { useRef, useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import uploadPhoto from '../../../images/camera-btn.svg';
import {
  UploadContainer,
  UploadImg,
  UploadImgDiv,
  UploadImgIcon,
  UploadImgInput,
  UploadImgWrapper,
  CloseImgBtn,
} from './StyledFeedImgPrev';
// import { imgUpload } from '../../../api/image';

export default function PostEditPrev({
  onRecommendImageUrlChange,
  hasImage,
  initialImage,
  iconStyle,
  wrapperStyle,
}) {
  const [imgUrl, setImgUrl] = useState([]);
  // const [boardImage, setBoardImage] = useState(null);
  const [uploadPreview, setUploadPreview] = useState([]);

  const fileInputRef = useRef(null);
  const maxSize = 10 * 1024 * 1024;

  useEffect(() => {
    if (hasImage && initialImage) {
      setUploadPreview(initialImage);
    }
  }, [hasImage, initialImage]);
  window.window.console.log('prev', hasImage, uploadPreview);

  const handleUploadImg = async (e) => {
    if (!e.target?.files) {
      return;
    }

    const fileList = Array.from(e.target.files);

    // 이미 업로드된 이미지와 선택된 이미지의 합이 3개를 초과할 경우 주의 메시지를 표시합니다
    if (uploadPreview.length + fileList.length > 3) {
      alert('최대 3개의 이미지만 업로드 가능합니다.');
      return;
    }

    const uploadedFileObjects = [];
    const uploadedFileUrls = [];
    const imageUploadPromises = [];

    const processFile = async (file) => {
      // 파일 크기 및 형식 확인
      if (file.size > maxSize) {
        alert('파일 사이즈는 10MB 이하만 가능합니다');
        return;
      } else if (
        !/^(image\/jpeg|image\/png|image\/jpg|image\/gif)$/.test(file.type)
      ) {
        alert('파일 포맷은 */jpeg,*/png,*/jpg만 가능합니다');
        return;
      }

      // 이미지 압축
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 700,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        uploadedFileObjects.push(compressedFile);

        // 미리보기 업데이트
        const promise = imageCompression.getDataUrlFromFile(compressedFile);
        promise.then((result) => {
          setUploadPreview((prevUploadPreview) => [
            ...prevUploadPreview,
            result,
          ]);
        });

        // 이미지를 base64로 변환
        const reader = new FileReader();
        imageUploadPromises.push(
          new Promise((resolve) => {
            reader.readAsDataURL(compressedFile);
            reader.onloadend = async () => {
              const base64data = reader.result;
              const imageUrl = await formDataHandler(base64data);
              uploadedFileUrls.push(imageUrl);
              window.console.log('check', uploadedFileUrls);
              resolve();
            };
          }),
        );
      } catch (error) {
        window.console.log(error);
      }
    };

    for (const file of fileList) {
      await processFile(file);
    }

    // 모든 이미지 업로드가 완료된 후
    await Promise.all(imageUploadPromises);
    onRecommendImageUrlChange(uploadedFileObjects, uploadedFileUrls);
    setImgUrl((prevImgUrl) => [...prevImgUrl, ...uploadedFileUrls]);
    window.console.log('!!!', imgUrl);
  };

  const formDataHandler = async (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/jpeg' });
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    window.console.log('File object:', file); // 이 부분을 추가합니다.
    return file;
  };
  const removeImg = (index) => {
    window.console.log(
      'remove',
      index,
      imgUrl,
      uploadPreview,
      onRecommendImageUrlChange,
    );
    const updatedUploadPreview = uploadPreview.filter(
      (_imageData, currentIndex) => currentIndex !== index,
    );
    const updatedImageUrls = imgUrl.filter(
      (_imageUrl, currentIndex) => currentIndex !== index,
    );
    window.console.log(updatedUploadPreview, updatedImageUrls);
    setUploadPreview(updatedUploadPreview);
    onRecommendImageUrlChange(null, updatedImageUrls);
    setImgUrl(updatedImageUrls);
  };
  return (
    <UploadContainer>
      <UploadImgWrapper htmlFor='file-input'>
        <UploadImgInput
          type='file'
          id='file-input'
          accept='image/jpeg,image/jpg,image/png,image/gif'
          multiple
          onChange={handleUploadImg}
          ref={fileInputRef}
        />
        <UploadImgIcon src={uploadPhoto} alt='사진을 올리는 버튼 이미지' />
      </UploadImgWrapper>
      {uploadPreview?.map((preview, index) => (
        <UploadImgDiv key={index}>
          <CloseImgBtn
            onClick={(event) => {
              event.preventDefault(); // 기본 동작 취소
              removeImg(index);
            }}
          />
          <UploadImg src={preview} alt='업로드된 이미지' />
        </UploadImgDiv>
      ))}
    </UploadContainer>
  );
}
