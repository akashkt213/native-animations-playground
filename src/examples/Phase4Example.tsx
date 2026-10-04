import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const HEADER_MAX = 180;
const HEADER_MIN = 72;
const RANGE = HEADER_MAX - HEADER_MIN;

export default function Phase4Example() {
  const scrollY = useSharedValue(0);

  // Scroll events are delivered straight to the UI thread.
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => ({
    // Map scroll distance [0, RANGE] onto header height [MAX, MIN].
    height: interpolate(
      scrollY.value,
      [0, RANGE],
      [HEADER_MAX, HEADER_MIN],
      Extrapolation.CLAMP
    ),
    backgroundColor: interpolateColor(
      scrollY.value,
      [0, RANGE],
      ['#7c3aed', '#1e1b4b']
    ),
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scrollY.value, [0, RANGE], [1.6, 1], Extrapolation.CLAMP),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.Text style={[styles.title, titleStyle]}>Header</Animated.Text>
      </Animated.View>
      <Animated.ScrollView
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: HEADER_MAX }}
      >
        {Array.from({ length: 30 }, (_, i) => (
          <Text key={i} style={styles.row}>
            Row {i + 1}
          </Text>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: 'white', fontSize: 20, fontWeight: '600' },
  row: { padding: 20, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
});
