import { StyleSheet, Text, View } from 'react-native';

// Phase 1: Shared values and animations
// Do the Phase 1 exercises from ../../../LEARNING_PATH.md here.
// The matching reference example is in ../examples/Phase1Example.tsx.
export default function Phase1() {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Phase 1: Shared values and animations</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  hint: { color: '#888' },
});
