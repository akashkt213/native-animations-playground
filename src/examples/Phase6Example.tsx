import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
  createWorkletRuntime,
  runOnUISync,
  scheduleOnRN,
  scheduleOnRuntime,
  scheduleOnUI,
} from 'react-native-worklets';

// A third JS runtime on its own background thread. Create it once, not per render.
const background = createWorkletRuntime({ name: 'background' });

// The directive makes this function callable from any runtime.
function countPrimes(limit: number): number {
  'worklet';
  let count = 0;
  for (let n = 2; n <= limit; n++) {
    let isPrime = true;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) count++;
  }
  return count;
}

export default function Phase6Example() {
  const [log, setLog] = useState<string[]>([]);
  // Defined on the RN runtime so worklets can schedule it back here.
  const addLine = (line: string) => setLog((lines) => [...lines, line]);

  return (
    <View style={styles.container}>
      <Button
        title="scheduleOnUI (async, no return value)"
        onPress={() => {
          scheduleOnUI(() => {
            scheduleOnRN(addLine, `UI runtime: ${countPrimes(1000)} primes below 1000`);
          });
        }}
      />
      <Button
        title="runOnUISync (blocks JS until done)"
        onPress={() => {
          const result = runOnUISync(countPrimes, 1000);
          addLine(`sync result: ${result}`);
        }}
      />
      <Button
        title="Heavy work on a background runtime"
        onPress={() => {
          scheduleOnRuntime(background, () => {
            const result = countPrimes(3_000_000); // slow, but blocks neither JS nor UI
            scheduleOnRN(addLine, `background runtime: ${result} primes below 3M`);
          });
        }}
      />
      {log.map((line, i) => (
        <Text key={i}>{line}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
});
