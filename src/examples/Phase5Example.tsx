import { StyleSheet, View } from 'react-native';
import {
  GestureDetector,
  useExclusiveGestures,
  usePanGesture,
  usePinchGesture,
  useRotationGesture,
  useSimultaneousGestures,
  useTapGesture,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function Phase5Example() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  // `change*` values are the delta since the previous event, so accumulating
  // them keeps the view where the last gesture left it.
  const pan = usePanGesture({
    onUpdate: (e) => {
      x.value += e.changeX;
      y.value += e.changeY;
    },
  });

  const pinch = usePinchGesture({
    onUpdate: (e) => {
      scale.value *= e.scaleChange;
    },
  });

  const rotate = useRotationGesture({
    onUpdate: (e) => {
      rotation.value += e.rotationChange;
    },
  });

  const doubleTap = useTapGesture({
    numberOfTaps: 2,
    onActivate: () => {
      x.value = withSpring(0);
      y.value = withSpring(0);
      scale.value = withSpring(1);
      rotation.value = withSpring(0);
    },
  });

  // All three can be active at once (two fingers drag, pinch and twist together).
  const manipulate = useSimultaneousGestures(pan, pinch, rotate);
  // Double tap gets priority; manipulation only starts once it has failed.
  const gesture = useExclusiveGestures(doubleTap, manipulate);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, animatedStyle]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { width: 200, height: 260, borderRadius: 24, backgroundColor: '#7c3aed' },
});
