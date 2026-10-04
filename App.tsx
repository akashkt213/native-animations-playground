import { StatusBar } from 'expo-status-bar';
import { type ComponentType, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Phase1Example from './src/examples/Phase1Example';
import Phase2Example from './src/examples/Phase2Example';
import Phase3Example from './src/examples/Phase3Example';
import Phase4Example from './src/examples/Phase4Example';
import Phase5Example from './src/examples/Phase5Example';
import Phase6Example from './src/examples/Phase6Example';
import Phase1 from './src/phases/Phase1';
import Phase2 from './src/phases/Phase2';
import Phase3 from './src/phases/Phase3';
import Phase4 from './src/phases/Phase4';
import Phase5 from './src/phases/Phase5';
import Phase6 from './src/phases/Phase6';

type Screen = { title: string; component: ComponentType };

const SCREENS: Screen[] = [
  { title: 'Phase 1: Shared values and animations', component: Phase1 },
  { title: 'Phase 1: reference example', component: Phase1Example },
  { title: 'Phase 2: Declarative animations', component: Phase2 },
  { title: 'Phase 2: reference example', component: Phase2Example },
  { title: 'Phase 3: Your first gestures', component: Phase3 },
  { title: 'Phase 3: reference example', component: Phase3Example },
  { title: 'Phase 4: Interpolation, derived values and scroll', component: Phase4 },
  { title: 'Phase 4: reference example', component: Phase4Example },
  { title: 'Phase 5: Composing gestures', component: Phase5 },
  { title: 'Phase 5: reference example', component: Phase5Example },
  { title: 'Phase 6: Worklets and threading', component: Phase6 },
  { title: 'Phase 6: reference example', component: Phase6Example },
];

export default function App() {
  const [current, setCurrent] = useState<Screen | null>(null);
  const Current = current?.component;

  return (
    // Must wrap the whole app: gestures are only recognized inside this view.
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.root}>
        <StatusBar style="auto" />
        {Current ? (
          <View style={styles.root}>
            <Pressable onPress={() => setCurrent(null)} style={styles.back}>
              <Text style={styles.backText}>‹ Back</Text>
            </Pressable>
            <Current />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.menu}>
            <Text style={styles.heading}>Playground</Text>
            {SCREENS.map((screen) => (
              <Pressable
                key={screen.title}
                onPress={() => setCurrent(screen)}
                style={styles.item}
              >
                <Text>{screen.title}</Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  menu: { padding: 24, paddingTop: 56, gap: 8 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  item: { padding: 16, borderRadius: 12, backgroundColor: '#f3f4f6' },
  back: { paddingHorizontal: 16, paddingTop: 48, paddingBottom: 8 },
  backText: { fontSize: 16, color: '#7c3aed' },
});
