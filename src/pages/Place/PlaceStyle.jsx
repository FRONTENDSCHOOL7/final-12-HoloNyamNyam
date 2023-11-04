import styled from 'styled-components';

const PlaceWrapper = styled.section`
  padding: 78px 36px;
  background: #fff;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
`;

const PlaceLabel = styled.label`
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  color: #767676;
`;
const PlaceInfo = styled.input`
  display: block;
  width: 318px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 1px 0 0 #dedede;
  height: 42px;
  font-size: 14px;
  margin: 0 auto 30px auto;
  outline: none;
  background: transparent;
  padding: 6px 70px 0 0;
  &:focus {
    border-bottom: 1px solid #ff644b;
  }
`;
const Restaurant = styled.div`
  position: relative;
`;
const SearchAddressButton = styled.button`
  position: absolute;
  right: 0%;
  bottom: 5px;
  display: inline-block;
  margin-left: 5px;
  background-color: #ff644b;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;
const StyledSelect = styled.select`
  display: block;
  width: 318px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 1px 0 0 #dedede;
  height: 42px;
  font-size: 14px;
  margin: 0 auto 30px auto;
  outline: none;
  background: transparent;
  padding: 6px 0 0;
  cursor: pointer;
`;

export {
  PlaceWrapper,
  PlaceLabel,
  PlaceInfo,
  Restaurant,
  SearchAddressButton,
  StyledSelect,
};
