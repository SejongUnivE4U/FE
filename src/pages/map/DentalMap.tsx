import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseButton from '../../components/CloseButton';

declare global {
  interface Window {
    kakao: any; // Kakao Maps API를 사용하기 위해 선언
  }
}

const DentalMap: React.FC = () => {
  const [places, setPlaces] = useState<any[]>([]); // 검색된 장소 데이터를 저장

  useEffect(() => {
    // Kakao 지도 스크립트 로드
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=e715d889c4b0b78b31ac11397f6d93c2&libraries=services';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;
      if (!kakao) return;

      // 사용자 위치 가져오기
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // 지도 생성
          const mapContainer = document.getElementById('map') as HTMLElement;
          const mapOption = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
          };
          const map = new kakao.maps.Map(mapContainer, mapOption);

          // 사용자의 현재 위치 표시
          const userMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(lat, lng),
          });
          userMarker.setMap(map);

          // 장소 검색 서비스
          const ps = new kakao.maps.services.Places();

          // 기본 검색 실행
          searchPlaces(ps, map, lat, lng);
        },
        (error) => {
          console.error('사용자 위치를 가져올 수 없습니다.', error);
        },
      );
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 장소 검색 함수
  const searchPlaces = (ps: any, map: any, lat: number, lng: number) => {
    const options = {
      location: new window.kakao.maps.LatLng(lat, lng),
      radius: 5000, // 반경 5km
    };

    ps.keywordSearch(
      '치과',
      (data: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data); // 검색된 장소 데이터 저장
          displayMarkers(data, map); // 마커 표시
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 없습니다.');
        } else {
          alert('검색 중 오류가 발생했습니다.');
        }
      },
      options,
    );
  };

  // 마커 표시 함수
  const displayMarkers = (places: any[], map: any) => {
    const { kakao } = window;
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const bounds = new kakao.maps.LatLngBounds();

    places.forEach((place) => {
      const position = new kakao.maps.LatLng(Number(place.y), Number(place.x));
      const marker = new kakao.maps.Marker({
        position,
      });

      marker.setMap(map);
      bounds.extend(position);

      // 마커에 이벤트 추가
      kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(
          `<div style="padding:10px;font-size:14px;">
            <strong>${place.place_name}</strong><br>
            ${place.road_address_name || place.address_name}<br>
            ${place.phone || '전화번호 정보 없음'}
          </div>`,
        );
        infowindow.open(map, marker);
      });
    });

    // 검색된 장소로 지도 범위 조정
    map.setBounds(bounds);
  };

  return (
    <Container>
      <TopBar>
        <CloseButton to="/home" />
      </TopBar>
      <Title>내 주변 치과</Title>
      <MapContainer id="map" />
      <PlaceList>
        {places.map((place, index) => (
          <PlaceItem key={index}>
            <strong>{place.place_name}</strong>
            <p>
              {place.road_address_name || place.address_name}
              <br />
              {place.phone || '전화번호 정보 없음'}
            </p>
          </PlaceItem>
        ))}
      </PlaceList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 30px;
`;

const TopBar = styled.div`
  width: 100%;
  height: 30px;
`;

const Title = styled.h1`
  color: #474d66;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 20px;
  text-align: center;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const PlaceList = styled.ul`
  width: 100%;
  max-width: 600px;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px; /* 각 카드 간격 추가 */
`;

const PlaceItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;

  strong {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    margin: 0;
  }

  /* 추가 정보 텍스트 색상 */
  span {
    color: #999;
    font-size: 12px;
  }
`;

export default DentalMap;
