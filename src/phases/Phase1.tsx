import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Easy from "../Phase1Examples/Easy";
import ColorToggle from "../Phase1Examples/ColorToggle";
import RotatingSquare from "../Phase1Examples/RotatingSquare";
import Progressbar from "../Phase1Examples/Progressbar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Heartbeat from "../Phase1Examples/Heartbeat";
import Bouncingball from "../Phase1Examples/Bouncingball";

// Phase 1: Shared values and animations
// Do the Phase 1 exercises from ../../../LEARNING_PATH.md here.
// The matching reference example is in ../examples/Phase1Example.tsx.
export default function Phase1() {
  const DURATION = 360;
  const STAGGER = 100;

  const opacity = useSharedValue(1);
  const verticalMovement = useSharedValue(0);
  const visible = useSharedValue(true);

  // animated input shared values
  const translateX = useSharedValue(0);

  // loading dots
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleVisibilityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: verticalMovement.value }],
  }));

  const toggle = () => {
    visible.value = !visible.value;
    opacity.value = withTiming(visible.value ? 1 : 0, { duration: 300 });
    verticalMovement.value = withSpring(visible.value ? 0 : 20);
  };

  const inputShakeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleInputSubmit = () => {
    if (!value.trim()) {
      setSubmitted(true);
      cancelAnimation(translateX);

      translateX.value = 0;

      translateX.value = translateX.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
    }
  };

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot1.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot2.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot3.value }],
  }));

  const bounce = () =>
    withRepeat(
      withSequence(
        withTiming(-8, { duration: DURATION }),
        withTiming(0, { duration: DURATION }),
      ),
      -1,
      false,
    );

  useEffect(() => {
    dot1.value = bounce();
    dot2.value = withDelay(STAGGER, bounce());
    dot3.value = withDelay(STAGGER * 2, bounce());

    return () => {
      cancelAnimation(dot1);
      cancelAnimation(dot2);
      cancelAnimation(dot3);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.container}>
          {/* <Text style={styles.hint}>Phase 1: Shared values and animations</Text>
          <View style={styles.section}>
            <Animated.View
              style={[styles.box, toggleVisibilityAnimatedStyle]}
            />
            <Button title="Toggle" onPress={toggle} />
          </View>

          <View style={styles.separator} /> */}

          {/* <View style={styles.section}>
            <Animated.View style={inputShakeAnimatedStyle}>
              <TextInput
                value={value}
                onChangeText={setValue}
                style={[
                  styles.input,
                  !value.trim() && submitted && styles.inputError,
                ]}
              />
            </Animated.View>
            <Button title="submit" onPress={handleInputSubmit} />
          </View>

          <View style={styles.separator} />

          <View style={styles.section}>
            <View style={styles.dotContainer}>
              <Animated.View style={[dot1Style]}>
                <Text>•</Text>
              </Animated.View>
              <Animated.View style={[dot2Style]}>
                <Text>•</Text>
              </Animated.View>
              <Animated.View style={[dot3Style]}>
                <Text>•</Text>
              </Animated.View>
            </View>
          </View> */}
          {/* <View style={styles.separator} />
          <Easy /> */}
          {/* <View style={styles.separator} />
          <ColorToggle />
          <View style={styles.separator} />
          <RotatingSquare /> */}
          <View style={styles.separator} />
          <Progressbar />
          <View style={styles.separator} />

          <Heartbeat />
          <View style={styles.separator} />
          <Bouncingball />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 24,
    gap: 10,
  },
  section: { display: "flex", flexDirection: "column", gap: 4 },
  hint: { color: "#888" },
  box: { width: 80, height: 80, borderRadius: 16, backgroundColor: "#7c3aed" },
  separator: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 4,
  },
  input: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  dotContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
});
