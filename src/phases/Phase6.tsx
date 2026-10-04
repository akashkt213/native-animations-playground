import { StyleSheet, Text, View } from 'react-native';

// Phase 6: Worklets and threading
// Do the Phase 6 exercises from ../../../LEARNING_PATH.md here.
// The matching reference example is in ../examples/Phase6Example.tsx.
export default function Phase6() {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Phase 6: Worklets and threading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  hint: { color: '#888' },
});
