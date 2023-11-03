import React, { useState, useRef, useEffect } from 'react';
import Header from '../../common/Header/Header';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import { imgUpload } from '../../../api/image';
import { feedEditApi } from '../../../api/feed';
import { useRecoilState } from 'recoil';
import { feedState } from '../../../recoil/feedEditAtom';
import {
  UploadContainer,
  UploadImg,
  UploadImgDiv,
  UploadImgInput,
  UploadImgWrapper,
  CloseImgBtn,
} from '../../Feed/ImgPrev/StyledFeedImgPrev';
import {
  StyledContainer,
  StyledFeed,
  SocialSVG,
  H3,
  TextContainer,
} from './StyledFeedCreate';
import Carousel from '../../Carousels/Carousel';

export default function FeedCreate() {
  // eslint-disable-next-line no-unused-vars
  const [imgFile, setImgFile] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [feed, setFeed] = useRecoilState(feedState);
  const [uploadPreview, setUploadPreview] = useState(
    feed.type === 'edit' ? feed.images : [],
  );
  const [content, setContent] = useState(feed.type === 'edit' ? feed.text : '');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('accountname');
  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef();
  const fileInputRef = useRef(null);
  const maxSize = 10 * 1024 * 1024;
  const navigate = useNavigate();

  function moveProfile(accountname) {
    setFeed({ type: 'new', id: null, images: [], text: '' });
    const where = localStorage.getItem('accountname');
    if (accountname === where) {
      navigate('/myprofile', {
        state: {
          accountname: accountname,
        },
      });
    } else {
      navigate(`/profile/${accountname}`, {
        state: {
          accountname: accountname,
        },
      });
    }
  }

  const uploadFeed = async (url, content) => {
    try {
      const uploadedImageUrls = [];
      for (const image of imgUrl) {
        const formData = new FormData();
        formData.append('image', image);
        const uploadResponse = await imgUpload(formData);
        // axios.post(
        //   'https://api.mandarin.weniv.co.kr/image/uploadfile',
        //   formData,
        //   {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   },
        // );
        let imageUrl = '';
        if (uploadResponse.data.filename) {
          imageUrl =
            'https://api.mandarin.weniv.co.kr/' + uploadResponse.data.filename;
        }

        uploadedImageUrls.push(imageUrl); // 결과를 배열에 추가
      }
      await axios.post(
        'https://api.mandarin.weniv.co.kr/post',
        {
          post: {
            content: content,
            image: uploadedImageUrls.join(', '),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      navigate('/myprofile');
    } catch (error) {}
  };

  const handleUpload = () => {
    if (isValid) {
      uploadFeed(imgUrl, content);
    } else {
      alert('게시글이 작성되지 않았습니다.');
    }
  };

  const feedEditUpload = async () => {
    try {
      const newUploadPreview = [...uploadPreview];
      if (imgUrl) {
        const uploadedImageUrls = [];
        for (const image of imgUrl) {
          const formData = new FormData();
          formData.append('image', image);
          const uploadResponse = await imgUpload(formData);

          let imageUrl = '';
          if (uploadResponse.data.filename) {
            imageUrl =
              'https://api.mandarin.weniv.co.kr/' +
              uploadResponse.data.filename;
          }
          uploadedImageUrls.push(imageUrl);

          newUploadPreview.push(imageUrl);
        }
      }

      setUploadPreview(newUploadPreview);
      await feedEditApi(feed.id, token, content, newUploadPreview.join(', '));
      // const updatedFeed = res.data.post;
      moveProfile(username);
    } catch (error) {
      console.error(error);
      navigate('/error');
      return false;
    }
  };

  const handleEdit = () => {
    if (isValid) {
      feedEditUpload();
    } else {
      alert('게시글이 수정되지 않았습니다.');
    }
  };

  const checkContent = () => {
    if (
      (!content || content.trim().length === 0) &&
      (!imgUrl || imgUrl.length === 0)
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  useEffect(() => {
    checkContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, imgUrl]);

  const onChangeInput = (event) => {
    setContent(event.target.value);
    checkContent();
  };

  const handleUploadImg = async (e) => {
    if (!e.target?.files) {
      return;
    }

    const fileList = Array.from(e.target.files);

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
              resolve();
            };
          }),
        );
      } catch (error) {
        console.error(error);
      }
    };

    for (const file of fileList) {
      await processFile(file);
    }

    // 모든 이미지 업로드가 완료된 후
    await Promise.all(imageUploadPromises);
    setImgUrl((prevImgUrl) => [...prevImgUrl, ...uploadedFileUrls]);
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
    return file;
  };
  const removeImg = (index) => {
    const updatedUploadPreview = uploadPreview.filter(
      (_imageData, currentIndex) => currentIndex !== index,
    );
    const updatedImageUrls = imgUrl.filter(
      (_imageUrl, currentIndex) => currentIndex !== index,
    );

    setUploadPreview(updatedUploadPreview);
    setImgUrl(updatedImageUrls);
  };
  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  // 드래그중인 대상이 위로 포개졌을 때
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  // 드랍 (커서 뗐을 때)
  const drop = () => {
    const newPreviewList = [...uploadPreview];
    const newFileList = [...imgFile]; // imgFile 리스트도 변경되야 해서 복사합니다.
    const newUrlList = [...imgUrl]; // imgUrl 리스트도 변경되야 해서 복사합니다.

    const dragItemValue = newPreviewList[dragItem.current];
    newPreviewList.splice(dragItem.current, 1);
    newPreviewList.splice(dragOverItem.current, 0, dragItemValue);

    // imgUrl 순서도 바꿔줍니다.
    const dragItemUrl = newUrlList[dragItem.current];
    newUrlList.splice(dragItem.current, 1);
    newUrlList.splice(dragOverItem.current, 0, dragItemUrl);

    const dragItemFile = newFileList[dragItem.current];
    newFileList.splice(dragItem.current, 1);
    newFileList.splice(dragOverItem.current, 0, dragItemFile);

    dragItem.current = null;
    dragOverItem.current = null;

    setUploadPreview(newPreviewList);
    setImgUrl(newUrlList); // 변경된 순서의 imgUrl을 설정합니다.
  };

  return (
    <>
      <Header
        // type='followings'
        type='upload'
        handleUploadBtn={isValid}
        uploadHandler={feed.type === 'edit' ? handleEdit : handleUpload}
        edit={feed.type === 'edit' ? true : false}
      />
      <StyledContainer>
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
            <SocialSVG id='camera-btn-1' previews={uploadPreview} />
          </UploadImgWrapper>
          {uploadPreview?.map((preview, index) => (
            <UploadImgDiv key={index}>
              <CloseImgBtn
                onClick={(event) => {
                  event.preventDefault();
                  removeImg(index);
                }}
              />
              <UploadImg
                draggable
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                onDragOver={(e) => e.preventDefault()}
                key={index}
                src={preview}
                alt='업로드된 이미지'
              />
            </UploadImgDiv>
          ))}
        </UploadContainer>
        <TextContainer>
          <StyledFeed
            rows='10'
            placeholder='사진과 함께 게시글 입력을 해볼까요?'
            value={content}
            onChange={onChangeInput}
          />
        </TextContainer>
        <H3>이미지 미리보기</H3>
        <Carousel previews={uploadPreview} userInfo={username} />
      </StyledContainer>
    </>
  );
}
