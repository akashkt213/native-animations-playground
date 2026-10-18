import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const Bouncingball = () => {
  const progress = useSharedValue(0);
  const squash = useSharedValue(1);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        // First bounce: rise high, return to the floor
        withTiming(-180, {
          duration: 400,
          easing: Easing.out(Easing.quad),
        }),
        withTiming(0, {
          duration: 400,
          easing: Easing.in(Easing.quad),
        }),

        // Second bounce: lower
        withTiming(-100, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        }),
        withTiming(0, {
          duration: 300,
          easing: Easing.in(Easing.quad),
        }),

        // Third bounce: lower again
        withTiming(-45, {
          duration: 200,
          easing: Easing.out(Easing.quad),
        }),
        withTiming(0, {
          duration: 200,
          easing: Easing.in(Easing.quad),
        }),

        // Final tiny bounce
        withTiming(-15, {
          duration: 120,
          easing: Easing.out(Easing.quad),
        }),
        withTiming(0, {
          duration: 120,
          easing: Easing.in(Easing.quad),
        }),

        // Rest at the bottom
        withDelay(1000, withTiming(0, { duration: 0 })),
      ),
      -1,
      false,
    );

    return () => cancelAnimation(progress);
  }, []);

  const ballAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value }, { scaleY: squash.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, ballAnimatedStyle]} />
    </View>
  );
};

export default Bouncingball;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 200,
  },
  ball: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#7c3aed",
  },
});
