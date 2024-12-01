import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import * as Progress from 'react-native-progress';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Font loading
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const spinValue = new Animated.Value(0);

  // Animation for spinning the image
  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Effect to start spinning the image and update progress
  useEffect(() => {
    const fastFillDuration = 600; // Duration to fill progress quickly
    const pauseDuration = 500; // Pause duration in ms
    const intervalDuration = 30; // Interval duration to fill the progress bar

    let interval: NodeJS.Timeout;
    let pauseTimer: NodeJS.Timeout;
    let isFilling = true; // Flag to control the filling and pausing state
    let progressIncrement = 0;
    let pauseCount = 0; // Counter to track the number of pauses

    // Function to handle fast fill and pause
    const updateProgress = () => {
      if (isFilling) {
        // Fill progress bar quickly
        if (progressIncrement < 1) {
          setProgress(progressIncrement);
          progressIncrement += 0.05; // Adjust this value for faster or slower filling
        } else {
          clearInterval(interval);
        }
      } else {
        // Pause mode
        clearInterval(interval);
        pauseTimer = setTimeout(() => {
          isFilling = true; // Switch back to filling mode
          interval = setInterval(updateProgress, intervalDuration); // Start filling again
        }, pauseDuration); // Pause for a while before starting again
      }
    };

    const triggerPause = () => {
      if (pauseCount < 3) {
        const pauseThreshold = (pauseCount + 1) * 0.25; // 0.25, 0.5, 0.75 for even pause distribution
        if (progressIncrement >= pauseThreshold) {
          pauseCount += 1;
          isFilling = false; // Switch to pause mode
          setProgress(progressIncrement);
          clearInterval(interval);
          updateProgress();
        }
      }
    };

    // Start filling the progress bar
    interval = setInterval(() => {
      updateProgress();
      triggerPause(); // Check if it's time for a pause
    }, intervalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(pauseTimer);
    };
  }, []);

  if (!fontsLoaded) {
    return null; // Loading fonts
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Highway Guardian</Text>
      <Animated.Image
        source={require('../../assets/images/preloader.gif')}
        style={[styles.image, { transform: [{ rotate }] }]}
      />
      <Text style={styles.loadingText}>Please wait while we load your data...</Text>
      <Progress.Bar
        progress={progress}
        width={240} // Increased by 20% from 200
        height={12} // Increased height for better visibility
        color="white"
        unfilledColor="gray"
        borderWidth={1}
        borderRadius={5}
        style={styles.progressBar}
      />
      <Text style={styles.copyright}>
        © 2024 Highway Guardian. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(to bottom, #1f1f1f, #2f2f2f)', // Gradient background
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 50,
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  image: {
    width: 250, // Increased width
    height: 250, // Increased height
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgb(47,47,47)',
    borderRadius: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressBar: {
    marginTop: 10,
    marginBottom: 20,
  },
  copyright: {
    position: 'absolute',
    bottom: 40, // Adjusted position for better visibility
    color: 'white',
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
});

export default Preloader;
