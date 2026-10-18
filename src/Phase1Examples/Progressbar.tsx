
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DURATION = 3000;
const BAR_WIDTH = 200;

const Progressbar = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: DURATION,
      easing: Easing.linear,
    });

    return () => cancelAnimation(progress);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [0, BAR_WIDTH]),
    backgroundColor: interpolateColor(progress.value,[0,1],['#7c3aed','#f636e3'])
  }));

  const pause = () => {
    cancelAnimation(progress);
  };

  const resume = () => {
    const remainingDuration = (1 - progress.value) * DURATION;

    if (remainingDuration <= 0) return;

    progress.value = withTiming(1, {
      duration: remainingDuration,
      easing: Easing.linear,
    });
  };

  const reset = () => {
    cancelAnimation(progress);
    progress.value = 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, animatedStyle]} />
      </View>

      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={pause}>
          <Text style={styles.buttonText}>Pause</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={resume}>
          <Text style={styles.buttonText}>Resume</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Progressbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  track: {
    width: BAR_WIDTH,
    height: 20,
    borderRadius: 6,
    backgroundColor: "#D1D5DB",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "purple",
    borderRadius: 6,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "purple",
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
