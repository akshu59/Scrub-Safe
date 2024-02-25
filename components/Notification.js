// import PushNotification from "react-native-push-notification";
// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import * as Notifications from "expo-notifications";

// const Notification = () => {
//   async function requestUserPermission() {
//     const { status } = await Notifications.requestPermissionsAsync();
//     if (status === "granted") {
//       console.log("Permission granted");
//     } else {
//       console.log("Permission denied");
//     }
//   }
//   function sendNotification() {
//     // Define a function that generates a random message
//     function getRandomMessage() {
//       const messages = [
//         "Hello, world!",
//         "This is a test notification",
//         "You are awesome!",
//         "Have a nice day!",
//         "Don't forget to drink water",
//       ];
//       // Return a random message from the array
//       return messages[Math.floor(Math.random() * messages.length)];
//     }

//     // Define a date for the notification
//     // You can use moment.js to manipulate dates easily
//     let date = moment().add(10, "seconds").toDate(); // Add 10 seconds to the current time
//     PushNotification.createChannel(
//       {
//         channelId: "my-channel", // required
//         channelName: "My Channel", // required
//         channelDescription: "A channel to test local notifications", // optional
//         importance: 4, // optional
//         vibrate: true, // optional
//       },
//       (created) => console.log(`createChannel returned '${created}'`) // optional callback
//     );

//     // Schedule a notification with the message and the date
//     if (PushNotification) {
//       PushNotification.localNotificationSchedule({
//         channelId: "my-channel",
//         id: "123",
//         message: getRandomMessage(),
//         date: date,
//         repeatType: "time", // Repeat the notification every time interval
//         repeatTime: 10000, // Repeat every 10 seconds (10000 milliseconds)
//       });
//     }
//   }
//   useEffect(() => {
//     // Request permission for notifications
//     requestUserPermission();
//     // Send a notification every 10 seconds
//     sendNotification();
//   }, []); // Run the effect only once when the component mounts
// };

// export default Notification;
