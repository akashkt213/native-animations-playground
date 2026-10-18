import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const Heartbeat = () => {
  const progress = useSharedValue(1);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        // First, stronger beat
        withTiming(1.25, { duration: 150 }),
        withTiming(1, { duration: 150 }),

        // Second, smaller beat
        withTiming(1.15, { duration: 150 }),
        withTiming(1, { duration: 150 }),

        // Rest for 1 second
        withDelay(1000, withTiming(1, { duration: 0 }))
      ),
      -1,
      false
    );

    return () => cancelAnimation(progress);
  }, []);

  const heartBeatAnimated = useAnimatedStyle(() => ({
    transform: [{ scale: progress.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, heartBeatAnimated]} />
    </View>
  );
};

export default Heartbeat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "#7c3aed",
  },
});
