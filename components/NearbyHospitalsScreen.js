import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Linking, Platform } from "react-native";
import * as Location from "expo-location";
import { Card } from "react-native-paper";
import stylesheet from "../Stylesheet/stylesheet";

export default function NearbyHospitalsScreen() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [location]);

  const openMapsApp = (lat, lon) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLon = `${lat},${lon}`;
    const label = "Hospitals";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLon}`,
      android: `${scheme}${latLon}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
    <Card style={stylesheet.card}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ ...stylesheet.label, marginTop: 10 }}>
          Looking for nearby Hospitals?
        </Text>
        {location ? (
          <View>
            {/* <Text>
            Latitude: {location.coords.latitude}, Longitude:{" "}
            {location.coords.longitude}
          </Text> */}
            <TouchableOpacity
              onPress={() =>
                openMapsApp(location.coords.latitude, location.coords.longitude)
              }
              style={{ ...stylesheet.button, marginVertical: 10 }}
            >
              <Text style={stylesheet.buttonText}>Open in Maps</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Retrieving location...</Text>
        )}
      </View>
    </Card>
  );
}
