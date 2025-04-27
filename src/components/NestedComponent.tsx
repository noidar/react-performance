// MyComponent.tsx
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

function DeepChild({
  count,
  increment,
}: {
  count: number;
  increment: () => void;
}) {
  return (
    <Box p={4} bg="red.100" borderRadius="md">
      <Text>Child Level 4 Count: {count}</Text>
      <Button mt={2} colorScheme="red" onClick={increment}>
        Increment Deep
      </Button>
    </Box>
  );
}

function ChildLevel3({
  count,
  increment,
}: {
  count: number;
  increment: () => void;
}) {
  return (
    <VStack border="2px" borderColor="green.600" p={4} borderRadius="md">
      <Text>Child Level 3 Count</Text>
      <DeepChild count={count} increment={increment} />
    </VStack>
  );
}

function ChildLevel2({
  count,
  increment,
}: {
  count: number;
  increment: () => void;
}) {
  return (
    <VStack border="2px" borderColor="green.200" p={4} borderRadius="md">
      <Text>Child Level 2</Text>
      <ChildLevel3 count={count} increment={increment} />
    </VStack>
  );
}

function ChildLevel1({
  count,
  increment,
}: {
  count: number;
  increment: () => void;
}) {
  return (
    <VStack border="2px" borderColor="blue.200" p={4} borderRadius="md">
      <Text>Child Level 1</Text>
      <ChildLevel2 count={count} increment={increment} />
    </VStack>
  );
}

export function NestedTree() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);

  return (
    <Box p={8} bg="gray.100" minH="100vh" border="2px" borderColor="blue.500">
      <Text fontSize="2xl" mb={4}>
        Root Count: {count}
      </Text>
      <ChildLevel1 count={count} increment={increment} />
    </Box>
  );
}
