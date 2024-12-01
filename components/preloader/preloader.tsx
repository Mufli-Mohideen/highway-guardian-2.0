import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          onFinish();
          return 1;
        }
        return prev + 0.01;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Highway Guardian</Text>
      <Image 
        source={require('../../assets/images/preloader.gif')} 
        style={styles.image} 
      />
      <Progress.Bar
        progress={progress}
        width={200}
        height={10}
        color="white"
        unfilledColor="gray"
        borderWidth={1}
        borderRadius={5}
        style={styles.progressBar}
      />
      <Text style={styles.copyright}>© 2024 Highway Guardian. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 50,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  progressBar: {
    marginTop: 10,
  },
  copyright: {
    position: 'absolute',
    bottom: 20,
    color: 'white',
    fontSize: 12,
  },
});

export default Preloader;
