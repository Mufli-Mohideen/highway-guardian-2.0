import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Preloader from '@/components/preloader/preloader'; // Make sure the import path is correct
import Login from './screens/login'; // Import the login page component

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 6 seconds to match the Preloader's duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Match this to the duration of the Preloader

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Preloader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Show LoginPage after Preloader */}
      <Login/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default App;
