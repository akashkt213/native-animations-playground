import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

export default function Phase3Example() {
  const [drops, setDrops] = useState(0);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const pressed = useSharedValue(false);

  // A normal JS function. It must be defined out here, on the RN runtime.
  const countDrop = () => setDrops((n) => n + 1);

  // Inline callbacks are turned into worklets automatically and run on the UI thread.
  const pan = usePanGesture({
    onBegin: () => {
      pressed.value = true;
    },
    onUpdate: (e) => {
      x.value = e.translationX;
      y.value = e.translationY;
    },
    onDeactivate: () => {
      x.value = withSpring(0);
      y.value = withSpring(0);
      // React state lives on the JS thread, so hop back to it.
      scheduleOnRN(countDrop);
    },
    onFinalize: () => {
      pressed.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: withSpring(pressed.value ? 1.15 : 1) },
    ],
  }));

  return (
    <View style={styles.container}>
      <Text>Dropped {drops} times</Text>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 },
  ball: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#7c3aed' },
});
