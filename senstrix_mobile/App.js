import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

// The URL where your Python Flask app is hosted.
// If testing on the same Wi-Fi, this can be your local IP. 
// For production, use your public URL (e.g. https://senstrix-ai.onrender.com)
const FLASK_SERVER_URL = 'http://10.185.165.135:5050'; 

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1a73e8" />
        </View>
      )}
      <WebView
        source={{ uri: FLASK_SERVER_URL }}
        style={{ flex: 1 }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
           <ActivityIndicator 
              color="#1a73e8" 
              size="large" 
              style={styles.absoluteLoader} 
           />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Ensures top notch matches Google White
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  absoluteLoader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18,
    marginTop: -18,
  }
});
