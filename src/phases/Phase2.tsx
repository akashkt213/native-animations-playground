import { StyleSheet, Text, View } from 'react-native';

// Phase 2: Declarative animations
// Do the Phase 2 exercises from ../../../LEARNING_PATH.md here.
// The matching reference example is in ../examples/Phase2Example.tsx.
export default function Phase2() {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Phase 2: Declarative animations</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  hint: { color: '#888' },
});
