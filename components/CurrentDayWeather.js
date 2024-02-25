import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import stylesheet from "../Stylesheet/stylesheet";
import { Card } from "react-native-paper";

const CurrentDayWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);

  const apiKey = "9e41119efa3331cba52e88180be86426";

  useEffect(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}`
      )
      .then((response) => {
        setCurrentWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching current weather data:", error);
      });
  }, []);

  if (!currentWeather) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const weatherIconName = (weatherDescription, size) => {
    const weatherMapping = {
      "clear sky": "sun",
      "few clouds": "cloud",
      "scattered clouds": "cloud",
      "broken clouds": "cloud",
      "shower rain": "cloud-rain",
      rain: "cloud-rain",
      thunderstorm: "cloud-lightning",
      snow: "cloud-snow",
      mist: "cloud-drizzle",
    };

    const iconName =
      weatherMapping[weatherDescription.toLowerCase()] || "cloud";

    return <Feather name={iconName} size={size} color="orange" />;
  };

  return (
    <Card style={stylesheet.card}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View>
            <Text style={stylesheet.feather}>
              {weatherIconName(currentWeather.weather[0].description, 90)}
            </Text>
          </View>
          <View>
            <Text style={stylesheet.weatherDesc}>
              {"    "}
              {currentWeather.weather[0].description}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={styles.city}>{currentWeather.name}</Text>
              <Text style={styles.temperature}>
                {Math.round(currentWeather.main.temp - 273.15)}°C
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: "center",
    // alignItems: "center",
  },
  city: {
    fontSize: 30,
    alignItems: "baseline",
    marginBottom: 4,
    marginHorizontal: 5,
  },
  temperature: {
    textAlignVertical: "bottom",
    fontSize: 40,
    marginHorizontal: 5,
  },
  dailyForecast: {
    //flexDirection: "row",
    //alignItems: "center",
    justifyContent: "space-between",
    //padding: 10,
  },
});

export default CurrentDayWeather;
