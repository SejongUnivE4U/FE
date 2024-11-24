declare namespace kakao {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
    }
    class Map {
      constructor(
        container: HTMLElement,
        options: { center: LatLng; level: number },
      );
    }
    class Marker {
      constructor(options: { position: LatLng });
      setMap(map: Map): void;
    }
    class InfoWindow {
      constructor(options: { content: string });
      open(map: Map, marker: Marker): void;
      close(): void;
    }
    namespace event {
      function addListener(
        target: any,
        type: string,
        callback: () => void,
      ): void;
    }
    namespace services {
      class Places {
        keywordSearch(
          query: string,
          callback: (result: any[], status: string) => void,
          options?: any,
        ): void;
      }
      enum Status {
        OK = 'OK',
        ZERO_RESULT = 'ZERO_RESULT',
        ERROR = 'ERROR',
      }
    }
  }
}
