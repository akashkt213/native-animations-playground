import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ColorToggle = () => {
  // This will only log ONCE when the component mounts
  console.log("ColorToggle component body executed!");

  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,[0,1,2],['red', 'green','yellow']
    ),
  }));

  const handlePress = () => {
    // If progress is 0, animate to 1. If it's 1, animate back to 0.
    progress.value = withTiming(progress.value === 0 ? 1 : 0, {
      duration: 300, // Optional: duration in milliseconds
    });
  };

  return (
    <View style={styles.container}>
      <AnimatedPressable 
        style={[styles.box, animatedStyle]} 
        onPress={handlePress}
      />
    </View>
  );
};

export default ColorToggle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },
  // Removed your fallback color (#7c3aed) so the animated style isn't overridden
  box: { width: 80, height: 80, borderRadius: 16 },
});
