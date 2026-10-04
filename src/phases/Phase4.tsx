import { StyleSheet, Text, View } from 'react-native';

// Phase 4: Interpolation, derived values and scroll
// Do the Phase 4 exercises from ../../../LEARNING_PATH.md here.
// The matching reference example is in ../examples/Phase4Example.tsx.
export default function Phase4() {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Phase 4: Interpolation, derived values and scroll</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  hint: { color: '#888' },
});
