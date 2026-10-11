import React, { useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewProps,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const duration = 800;
const easing = Easing.inOut(Easing.ease);

export default function Easy() {
  const offset = useSharedValue(0);
  const pressScale = useSharedValue(1);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(offset.value, [0, 1], [1, 1.3]) }],
  }));

  const pressFeedbackAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  useEffect(() => {
    offset.set(
      withRepeat(withTiming(1, { duration, easing }), 10, true, (finished) => {
        console.log("done", finished, offset.value);
      }),
    );
  }, [offset]);

  return (
    <View>
      <Animated.View style={[styles.round, pulseAnimatedStyle]} />

      <View style={styles.separator} />
      <AnimatedPressable
        style={[styles.btn, pressFeedbackAnimatedStyle]}
        onPressIn={() => {
          pressScale.set(withTiming(0.95, { duration: 100 }));
        }}
        onPressOut={() => {
          pressScale.set(withSpring(1));
        }}
      >
        <Text style={styles.btnText}>Press me</Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 24 },
  box: { width: 80, height: 80, borderRadius: 16, backgroundColor: "#7c3aed" },
  round: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "#7c3aed",
  },
  separator: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 4,
  },
  btn: {
    width: 200,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#7c3aed",
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
