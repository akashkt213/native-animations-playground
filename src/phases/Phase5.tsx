import { StyleSheet, Text, View } from 'react-native';

// Phase 5: Composing gestures
// Do the Phase 5 exercises from ../../../LEARNING_PATH.md here.
// The matching reference example is in ../examples/Phase5Example.tsx.
export default function Phase5() {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Phase 5: Composing gestures</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  hint: { color: '#888' },
});
