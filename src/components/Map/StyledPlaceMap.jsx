import styled from 'styled-components';

const ContainerWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: inline-block;
  padding: 48px 0 61px 0;
  box-sizing: border-box;
  position: relative;
`;

const Container = styled.div`
  overflow: hidden;
  height: 100%;
  position: relative;
  &.view_roadview {
    #mapWrapper {
      height: 50%;
    }
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const RvWrapper = styled.div`
  width: 100%;
  height: 50%;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: 0;
`;

const Roadview = styled.div`
  width: 100%;
  height: 100%;
`;

const RoadviewControl = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 42px;
  height: 42px;
  z-index: 1;
  cursor: pointer;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/2018/pc/common/img_search.png)
    0 -450px no-repeat;
  &.active {
    background-position: 0 -350px;
  }
`;

const Close = styled.div`
  position: absolute;
  padding: 4px;
  top: 5px;
  left: 5px;
  cursor: pointer;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #c8c8c8;
  box-shadow: 0px 1px #888;
  > .img {
    display: block;
    background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/rv_close.png)
      no-repeat;
    width: 14px;
    height: 14px;
  }
`;

export {
  ContainerWrap,
  Container,
  MapWrapper,
  Map,
  RvWrapper,
  Roadview,
  RoadviewControl,
  Close,
};
