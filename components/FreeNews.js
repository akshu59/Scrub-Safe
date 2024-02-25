// Import React and React Native components
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Dimensions, Linking } from "react-native";
import stylesheet from "../Stylesheet/stylesheet";
import { Card } from "react-native-paper";
import moment from "moment";

// Define the NewsItem component that renders a single news article
const NewsItem = ({ title, snippet, source, time, url }) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <Card style={{ ...stylesheet.card, width: screenWidth * 0.95 }}>
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
        }}
      >
        <Text style={stylesheet.title}>{title}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...stylesheet.title, fontSize: 10 }}>
            {moment(time, "YYYY-MM-DDTHH:mm:ssZ").format("MMM DD, YYYY")} |
          </Text>
          <Text style={{ ...stylesheet.title, fontSize: 10 }}>{source}</Text>
        </View>
        <Text style={stylesheet.text}>{snippet}</Text>
        <Text
          style={{ color: "blue", fontSize: 12 }}
          onPress={() => Linking.openURL(url)}
        >
          Read more
        </Text>
      </View>
    </Card>
  );
};

// Define the NewsList component that fetches and displays the news articles
const NewsList = () => {
  // Define a state variable to store the news data
  const [newsData, setNewsData] = useState([]);
  const startDate = new Date(new Date().setDate(new Date().getDate() - 30)); // Set the default start date to one month ago
  const endDate = new Date();
  // Use the useEffect hook to fetch the news data when the component mounts
  useEffect(() => {
    // Define a function that fetches the news data from Bing News Search API
    const fetchNewsData = async () => {
      const apiKey = "fa936b2eeea745cf9a4aad2c504ae9d1"; // Replace with your own API key

      // Define the request options
      const options = {
        method: "GET",
      };

      // Define the request URL
      const url = `https://newsapi.org/v2/everything?q=scrub-typhus&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${apiKey}`;

      // Make the request and handle the response
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        // Extract the relevant fields from the data
        const newsData = await data.articles.map((item) => ({
          title: item.title,
          source: item.source.name,
          time: item.publishedAt,
          snippet: item.description,
          url: item.url,
        }));
        // Update the state variable with the news data
        setNewsData(newsData);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchNewsData function
    fetchNewsData();
  }, []); // Add an empty dependency array to run the effect only once

  // Return a view that displays the news data using a FlatList component
  return (
    <View style={{ flex: 1 }}>
      <Text style={stylesheet.title2}>News related to scrub typhus</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={newsData}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <NewsItem {...item} />}
      />
    </View>
  );
};

// Export the NewsList component
export default NewsList;
