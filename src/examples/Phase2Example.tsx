import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';

// CSS animation: a keyframes object passed to `animationName`.
const pulse = {
  from: { transform: [{ scale: 0.9 }] },
  to: { transform: [{ scale: 1.1 }] },
};

export default function Phase2Example() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Toggle" onPress={() => setOpen((v) => !v)} />

      {/* CSS transition: plain state in, animation out. No shared values. */}
      <Animated.View
        style={[
          styles.box,
          {
            width: open ? 240 : 120,
            backgroundColor: open ? '#7c3aed' : '#38bdf8',
            transitionProperty: ['width', 'backgroundColor'],
            transitionDuration: 300,
          },
        ]}
      />

      {/* Layout animation: animates mount and unmount. */}
      {open && (
        <Animated.View
          entering={FadeInDown.duration(250)}
          exiting={FadeOutUp.duration(250)}
          style={[styles.box, styles.extra]}
        />
      )}

      {/* `layout` animates this view to its new position when siblings change. */}
      <Animated.View
        layout={LinearTransition}
        style={[
          styles.box,
          {
            animationName: pulse,
            animationDuration: '1s',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
            animationTimingFunction: 'ease-in-out',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 48, gap: 24 },
  box: { width: 120, height: 80, borderRadius: 16, backgroundColor: '#38bdf8' },
  extra: { backgroundColor: '#f59e0b' },
});
