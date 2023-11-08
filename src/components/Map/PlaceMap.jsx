import React, { useEffect, useRef, lazy } from 'react';
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
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/modalAtom';
import './CssPlaceMap.css';
import MarkerImgSvg from '../../images/MarkerImageSrc.svg';
import { Suspense } from 'react';

const Modal = lazy(() => import('../Modal/Modal/Modal'));

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
    let overlayOn = false;
    let container = document.getElementById('container');
    let mapContainer = document.getElementById('map');
    let rvContainer = document.getElementById('roadview');

    let mapCenter = new kakao.maps.LatLng(33.45042, 126.57091),
      mapOption = {
        center: mapCenter,
        level: 3,
      };

    let map = new kakao.maps.Map(mapContainer, mapOption);
    let geocoder = new kakao.maps.services.Geocoder();
    let customOverlay = {};

    geocoder.addressSearch(placeLink, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        let imageSrc = MarkerImgSvg,
          imageSize = new kakao.maps.Size(64, 69);

        let basicMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
          markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x); //

        let basicMarker = new kakao.maps.Marker({
          map: map,
          position: markerPosition,
          image: basicMarkerImage,
        });

        let content = `<div class="customoverlay"><a href="https://map.kakao.com/link/to/${placeName},${coords.Ma},${coords.La}" title="길찾기 버튼"><span class="name">${placeName}</span></a></div>`;

        customOverlay = new kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          yAnchor: 1,
        });

        map.setCenter(coords);
        customOverlay.setMap(map);
        basicMarker.setMap(map);
      }
    });

    let mapTypeControl = new kakao.maps.MapTypeControl();

    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    let rv = new kakao.maps.Roadview(rvContainer);
    let rvClient = new kakao.maps.RoadviewClient();

    kakao.maps.event.addListener(rv, 'position_changed', function () {
      let rvPosition = rv.getPosition();

      map.setCenter(rvPosition);

      if (overlayOn) {
        marker.setPosition(rvPosition);
      }
    });

    let markImage = new kakao.maps.MarkerImage(
      'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
      new kakao.maps.Size(26, 46),
      {
        spriteSize: new kakao.maps.Size(1666, 168),
        spriteOrigin: new kakao.maps.Point(705, 114),
        offset: new kakao.maps.Point(13, 46),
      },
    );

    let marker = new kakao.maps.Marker({
      image: markImage,
      position: mapCenter,
      draggable: true,
    });

    kakao.maps.event.addListener(marker, 'dragend', function (mouseEvent) {
      let position = marker.getPosition();
      toggleRoadview(position);
    });

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      if (!overlayOn) {
        return;
      }

      let position = mouseEvent.latLng;
      marker.setPosition(position);
      toggleRoadview(position);
    });

    function toggleRoadview(position) {
      rvClient.getNearestPanoId(position, 50, function (panoId) {
        if (panoId === null) {
          toggleMapWrapper(true, position);
        } else {
          toggleMapWrapper(false, position);
          rv.setPanoId(panoId, position);
        }
      });
    }

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

    function toggleOverlay(active) {
      if (active) {
        overlayOn = true;
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

        // customOverlay.setMap(null);
        // basicMarker.setMap(null);
        marker.setMap(map);

        marker.setPosition(map.getCenter());

        toggleRoadview(map.getCenter());
      } else {
        overlayOn = false;

        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

        // customOverlay.setMap(map);
        // basicMarker.setMap(map);
        marker.setMap(null);
      }
    }

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

    function closeRoadview() {
      let position = marker.getPosition();
      closeRef.current.classList.remove('active');
      toggleMapWrapper(true, position);
    }

    roadviewControlRef.current.addEventListener('click', setRoadviewRoad);
    closeRef.current.addEventListener('click', closeRoadview);

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
      {modal.show && (
        <Suspense>
          <Modal type={modal.type} />
        </Suspense>
      )}
    </>
  );
}
