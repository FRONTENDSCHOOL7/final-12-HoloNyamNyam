import React, { useEffect, useRef } from 'react';
import {
  ContainerWrap,
  Container,
  MapWrapper,
  Map,
  RvWrapper,
  Roadview,
  RoadviewControl,
  Close,
} from './StyledPlaceMap';
import { useLocation } from 'react-router-dom';
import Modal from '../Modal/Modal/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/modalAtom';
import './CssPlaceMap.css';
import MarkerImgSvg from '../../images/MarkerImageSrc.svg';

const { kakao } = window;
export default function PlaceMap() {
  const roadviewControlRef = useRef(null);
  const closeRef = useRef(null);
  const [modal] = useRecoilState(modalState);
  const location = useLocation();
  const data = location.state;
  const placeName = data.placeName;
  const placeLink = data.placeLink;

  useEffect(() => {
    let overlayOn = false; // 지도 위에 로드뷰 오버레이가 추가된 상태를 가지고 있을 변수
    let container = document.getElementById('container'); // 지도와 로드뷰를 감싸고 있는 div 입니다
    // let mapWrapper = document.getElementById('mapWrapper'); // 지도를 감싸고 있는 div 입니다
    let mapContainer = document.getElementById('map'); // 지도를 표시할 div 입니다
    let rvContainer = document.getElementById('roadview'); //로드뷰를 표시할 div 입니다

    let mapCenter = new kakao.maps.LatLng(33.45042, 126.57091), // 지도의 중심좌표
      mapOption = {
        center: mapCenter, // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
    let map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();

    let basicMarker = {};
    let customOverlay = {};
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(placeLink, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        let imageSrc = MarkerImgSvg, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        let basicMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
          markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x); // 마커가 표시될 위치입니다

        // 결과값으로 받은 위치를 마커로 표시합니다
        basicMarker = new kakao.maps.Marker({
          map: map,
          position: markerPosition,
          image: basicMarkerImage,
        });

        // 커스텀 오버레이를 생성합니다
        let content = `<div class="customoverlay"><a href="https://map.kakao.com/link/to/${placeName},${coords.Ma},${coords.La}" title="길찾기 버튼"><span class="name">${placeName}</span></a></div>`;

        customOverlay = new kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          yAnchor: 1,
        });

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
        customOverlay.setMap(map);
      }
    });

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    let mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 로드뷰 객체를 생성합니다
    let rv = new kakao.maps.Roadview(rvContainer);

    // 좌표로부터 로드뷰 파노라마 ID를 가져올 로드뷰 클라이언트 객체를 생성합니다
    let rvClient = new kakao.maps.RoadviewClient();

    // 로드뷰에 좌표가 바뀌었을 때 발생하는 이벤트를 등록합니다
    kakao.maps.event.addListener(rv, 'position_changed', function () {
      // 현재 로드뷰의 위치 좌표를 얻어옵니다
      let rvPosition = rv.getPosition();

      // 지도의 중심을 현재 로드뷰의 위치로 설정합니다
      map.setCenter(rvPosition);

      // 지도 위에 로드뷰 도로 오버레이가 추가된 상태이면
      if (overlayOn) {
        // 마커의 위치를 현재 로드뷰의 위치로 설정합니다
        marker.setPosition(rvPosition);
      }
    });

    // 마커 이미지를 생성합니다
    let markImage = new kakao.maps.MarkerImage(
      'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
      new kakao.maps.Size(26, 46),
      {
        // 스프라이트 이미지를 사용합니다.
        // 스프라이트 이미지 전체의 크기를 지정하고
        spriteSize: new kakao.maps.Size(1666, 168),
        // 사용하고 싶은 영역의 좌상단 좌표를 입력합니다.
        // background-position으로 지정하는 값이며 부호는 반대입니다.
        spriteOrigin: new kakao.maps.Point(705, 114),
        offset: new kakao.maps.Point(13, 46),
      },
    );

    // 드래그가 가능한 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      image: markImage,
      position: mapCenter,
      draggable: true,
    });

    // 마커에 dragend 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'dragend', function (mouseEvent) {
      // 현재 마커가 놓인 자리의 좌표입니다
      let position = marker.getPosition();

      // 마커가 놓인 위치를 기준으로 로드뷰를 설정합니다
      toggleRoadview(position);
    });

    //지도에 클릭 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // 지도 위에 로드뷰 도로 오버레이가 추가된 상태가 아니면 클릭이벤트를 무시합니다
      if (!overlayOn) {
        return;
      }

      // 클릭한 위치의 좌표입니다
      let position = mouseEvent.latLng;

      // 마커를 클릭한 위치로 옮깁니다
      marker.setPosition(position);

      // 클락한 위치를 기준으로 로드뷰를 설정합니다
      toggleRoadview(position);
    });

    // 전달받은 좌표(position)에 가까운 로드뷰의 파노라마 ID를 추출하여
    // 로드뷰를 설정하는 함수입니다
    function toggleRoadview(position) {
      rvClient.getNearestPanoId(position, 50, function (panoId) {
        // 파노라마 ID가 null 이면 로드뷰를 숨깁니다
        if (panoId === null) {
          toggleMapWrapper(true, position);
        } else {
          toggleMapWrapper(false, position);

          // panoId로 로드뷰를 설정합니다
          rv.setPanoId(panoId, position);
        }
      });
    }

    // 지도를 감싸고 있는 div의 크기를 조정하는 함수입니다
    function toggleMapWrapper(active, position) {
      if (active) {
        container.classList.remove('view_roadview');
        map.relayout();
        map.setCenter(position);
      } else {
        container.classList.add('view_roadview');
        map.relayout();
        map.setCenter(position);
      }
    }

    // 지도 위의 로드뷰 도로 오버레이를 추가,제거하는 함수입니다
    function toggleOverlay(active) {
      if (active) {
        overlayOn = true;

        // 지도 위에 로드뷰 도로 오버레이를 추가합니다
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

        customOverlay.setMap(null);
        basicMarker.setMap(null);
        // 지도 위에 마커를 표시합니다
        marker.setMap(map);

        // 마커의 위치를 지도 중심으로 설정합니다
        marker.setPosition(map.getCenter());

        // 로드뷰의 위치를 지도 중심으로 설정합니다
        toggleRoadview(map.getCenter());
      } else {
        overlayOn = false;

        // 지도 위의 로드뷰 도로 오버레이를 제거합니다
        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

        customOverlay.setMap(map);
        basicMarker.setMap(map);
        // 지도 위의 마커를 제거합니다
        marker.setMap(null);
      }
    }

    // 지도 위의 로드뷰 버튼을 눌렀을 때 호출되는 함수입니다
    function setRoadviewRoad() {
      let control = roadviewControlRef.current;

      if (!control.classList.contains('active')) {
        control.classList.add('active');
        toggleOverlay(true);
      } else {
        control.classList.remove('active');
        toggleOverlay(false);
      }
    }

    // 로드뷰에서 X버튼을 눌렀을 때 로드뷰를 지도 뒤로 숨기는 함수입니다
    function closeRoadview() {
      let position = marker.getPosition();
      closeRef.current.classList.remove('active');
      toggleMapWrapper(true, position);
    }

    // 현재 참조하고 있는 DOM에 이벤트 핸들러를 추가합니다.
    roadviewControlRef.current.addEventListener('click', setRoadviewRoad);
    closeRef.current.addEventListener('click', closeRoadview);

    // 컴포넌트가 언마운트 될 때 이벤트 핸들러를 제거합니다.
    return () => {
      if (roadviewControlRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        roadviewControlRef.current.removeEventListener(
          'click',
          setRoadviewRoad,
        );
      }
      if (closeRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        closeRef.current.removeEventListener('click', closeRoadview);
      }
    };
  }, [placeLink, placeName]);

  return (
    <>
      <ContainerWrap>
        <Container id='container'>
          <RvWrapper id='rvWrapper'>
            <Roadview id='roadview' />
            <Close id='close' title='로드뷰닫기' ref={closeRef}>
              <span className='img' />
            </Close>
          </RvWrapper>
          <MapWrapper id='mapWrapper'>
            <Map id='map' />
            <RoadviewControl
              id='roadviewControl'
              ref={roadviewControlRef}
              title='로드뷰 버튼'
            />
          </MapWrapper>
        </Container>
      </ContainerWrap>
      {modal.show && <Modal type={modal.type} />}
    </>
  );
}
