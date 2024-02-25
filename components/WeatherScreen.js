// import React from "react";
// import { View, Text } from "react-native";

// export default function WeatherScreen() {
//   // Fetch and display the weather data here

//   return (
//     <View className="flex-1 p-4">
//       <Text className="text-lg font-Comfortaa font-bold mb-4">Weather</Text>
//       {/* Display the weather data here */}
//     </View>
//   );
// }

// Weather.js

import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
//import { GeoPosition } from "react-native-geolocation-service";
//import { WEATHER_API_KEY } from '@env';
//import Geolocation from "react-native-geolocation-service";
import * as Location from "expo-location";
import moment from "moment";
import stylesheet from "../Stylesheet/stylesheet";
import { Card } from "react-native-paper";

const WeatherScreen = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);

  // Replace with your own API key
  const apiKey = "9e41119efa3331cba52e88180be86426";
  const city = "New York"; // Replace with the desired city

  useEffect(async () => {
    // Fetch current weather data from a weather API
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    axios
      .get(
        //`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}`
      )
      .then((response) => {
        setCurrentWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching current weather data:", error);
      });

    // Fetch 5-day forecast data
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        // Filter the data to get daily forecasts
        const dailyData = response.data.list.filter((item, index) => {
          return index % 8 === 0; // Data for every 24 hours (8 data points per day)
        });

        setDailyForecast(dailyData);
      })
      .catch((error) => {
        console.error("Error fetching 5-day forecast data:", error);
      });
  }, []);

  if (!currentWeather || dailyForecast.length === 0) {
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
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={stylesheet.feather}>
            {weatherIconName(currentWeather.weather[0].description, 70)}
          </Text>
          <Text style={styles.temperature}>
            {Math.round(currentWeather.main.temp - 273.15)}°C
          </Text>
        </View>
        <View>
          <Text style={stylesheet.weatherDesc}>
            {"    "}
            {currentWeather.weather[0].description}
          </Text>
          <Text style={styles.city}>{currentWeather.name}</Text>
        </View>
      </View>
      <FlatList
        data={dailyForecast}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.dailyForecast}>
            <Card style={stylesheet.card}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={stylesheet.feather}>
                    {weatherIconName(item.weather[0].description, 50)}
                  </Text>
                  <Text style={stylesheet.label}>
                    {moment.unix(item.dt).format("dddd")}
                  </Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={stylesheet.weatherDesc}>
                    {item.weather[0].description}{" "}
                  </Text>
                  <Text style={stylesheet.weatherTemp}>
                    {Math.round(item.main.temp_max)}
                    °C / {item.main.temp_min}
                    °C
                  </Text>
                </View>
              </View>
              {/* Replace with appropriate icon */}
            </Card>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: "center",
    // alignItems: "center",
  },
  city: {
    fontSize: 40,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  temperature: {
    fontSize: 30,
    marginHorizontal: 15,
  },
  dailyForecast: {
    //flexDirection: "row",
    //alignItems: "center",
    justifyContent: "space-between",
    //padding: 10,
  },
});

export default WeatherScreen;
