import { Button, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function Phase1Example() {
  // Lives on both threads. Writing to it does NOT re-render the component.
  const offset = useSharedValue(0);

  // This function is a worklet: it runs on the UI thread whenever `offset` changes.
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button
        title="Move"
        onPress={() => {
          // Assigning an animation object starts the animation on the UI thread.
          offset.value = withSpring(offset.value === 0 ? 150 : 0);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 24 },
  box: { width: 80, height: 80, borderRadius: 16, backgroundColor: '#7c3aed' },
});
