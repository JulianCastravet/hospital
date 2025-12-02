import { useEffect, useRef, useState } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import env from "../../environment";

type Props = {
  value?: string;
  onChange?: (val: string) => void;
};

export const AddressMap = (props: Props) => {
  Radar.initialize(env.RADAR_API_KEY, {
    publishableKey: env.RADAR_API_KEY,
    debug: false,
    live: process.env.NODE_ENV === "production" ? true : false,
  });

  const { value, onChange } = props;

  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<any | null>(null);
  const autocompleteRef = useRef<any | null>(null);

  const [internAddress, setInternAddress] = useState<string>(value ?? "");

  useEffect(() => {
    // 1. Initialize Radar once
    let point: [number, number] = [-73.9911, 40.7342];

    if (internAddress) {
      Radar.forwardGeocode({
        query: internAddress,
      }).then((data) => {
        const info = data.addresses[0];
        point = [info.longitude, info.latitude];
        mapRef.current?.flyTo({ center: point, zoom: 1 });
        markerRef.current.setLngLat(point);
      });
    }
    const map = Radar.ui.map({
      container: "map",
      style: "radar-default-v1",
      center: point,
      zoom: 1,
      doubleClickZoom: false,
    });
    mapRef.current = map;

    map.on("click", (e) => {
      const point = e.lngLat;
      map.jumpTo({ center: point });
      marker.setLngLat(point);
      Radar.reverseGeocode({ latitude: point.lat, longitude: point.lng })
        .then((address) => {
          setInternAddress(address.addresses[0].formattedAddress ?? "");
          onChange?.(address.addresses[0].formattedAddress ?? "");
          Radar.ui.popup({ text: internAddress }).addTo(map);
        })
        .catch((error) => console.error(error));
    });

    // Add a marker to the map
    const marker = Radar.ui
      .popup({ text: internAddress })
      .setLngLat(point) // default example.
      .addTo(map);
    markerRef.current = marker;

    // Initialize Radar autocomplete
    autocompleteRef.current = Radar.ui.autocomplete({
      container: "searchInput",
      width: "400px",
      placeholder: "Input Address",
      onSelection: (address) => {
        const { latitude, longitude, formattedAddress } = address;
        setInternAddress(formattedAddress);
        onChange?.(formattedAddress);

        // Update marker position
        markerRef.current.setLngLat([longitude, latitude]);

        // Center the map on the selected address
        mapRef.current.flyTo({ center: [longitude, latitude], zoom: 16 });
      },
      onError: (error) => {
        console.error(error);
      },
    });
    return () => {
      autocompleteRef.current?.remove();
    };
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e: any) => {
    setInternAddress(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <>
      <Input
        prefix={<SearchOutlined />}
        type="text"
        placeholder="Address"
        id="searchInput"
        className="autocomplete-search-field-component mb-2"
        onChange={handleInputChange}
        value={internAddress}
      />
      <div
        id="map-container"
        style={{ width: "100%", height: "300px", position: "relative" }}
      >
        <div id="map" ref={mapRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </>
  );
};
