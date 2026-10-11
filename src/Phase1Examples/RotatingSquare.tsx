import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const duration = 2000;
const easing = Easing.bezier(0.25, 0.5, 0.75, 1);

const RotatingSquare = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration, easing }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 360}deg` }],
  }));

  const handlePress = () => {};

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[styles.box, animatedStyle]}
        onPress={handlePress}
      />
    </View>
  );
};

export default RotatingSquare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },
  box: { width: 80, height: 80, borderRadius: 16, backgroundColor: "purple" },
});
