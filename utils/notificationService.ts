import { Platform, Alert } from "react-native";

// OPTIONAL: if using real notifications later
// import PushNotification from "react-native-push-notification";

export const initNotifications = () => {
  console.log("Notifications initialized");

  // Future: configure push notifications here
  // PushNotification.configure({...});
};

export const showNotification = (title: string, message: string) => {
  if (Platform.OS === "android" || Platform.OS === "ios") {
    // Simple fallback (WORKING ALWAYS)
    Alert.alert(title, message);
  } else {
    console.log(`${title}: ${message}`);
  }

  // Future (advanced real notification):
  /*
  PushNotification.localNotification({
    title,
    message,
  });
  */
};