import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
  const gitUsername = navigation.getParam('git_username');
  return <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${gitUsername}` }} />
}

export default Profile;