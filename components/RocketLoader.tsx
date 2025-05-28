import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const RocketLoader = () => {
  const flyAnim = useRef(new Animated.Value(height)).current; // Start at bottom

  useEffect(() => {
    const fly = Animated.loop(
      Animated.timing(flyAnim, {
        toValue: -100, // Go above top
        duration: 2000,
        useNativeDriver: true,
      })
    );

    fly.start();
  }, [flyAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.emoji, { transform: [{ translateY: flyAnim }] }]}>
        🚀
      </Animated.Text>
      <Text style={styles.text}>Launching...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  emoji: {
    fontSize: 50,
    position: 'absolute',
    bottom: 0,
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    color: '#666',
  },
});
