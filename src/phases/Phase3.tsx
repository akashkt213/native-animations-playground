import { StyleSheet, Text, View } from 'react-native';

// Phase 3: Your first gestures
// Do the Phase 3 exercises from ../../../LEARNING_PATH.md here.
// The matching reference example is in ../examples/Phase3Example.tsx.
export default function Phase3() {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Phase 3: Your first gestures</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  hint: { color: '#888' },
});
