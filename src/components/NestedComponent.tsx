import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useState, createContext, useContext, ReactNode } from "react";

const CountContext = createContext<
  { count: number; increment: () => void } | undefined
>(undefined);

// Custom hook to use context
function useCount() {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

// Provider component
function CountProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);

  return (
    <CountContext.Provider value={{ count, increment }}>
      {children}
    </CountContext.Provider>
  );
}

function DeepChild() {
  const { count, increment } = useCount();
  return (
    <Box p={4} bg="red.100" borderRadius="md">
      <Text>Child Level 4 Count: {count}</Text>
      <Button mt={2} colorScheme="red" onClick={increment}>
        Increment Deep
      </Button>
    </Box>
  );
}

function ChildLevel3({ children }: { children: ReactNode }) {
  return (
    <VStack border="2px" borderColor="green.600" p={4} borderRadius="md">
      <Text>Child Level 3 Count</Text>
      {children}
    </VStack>
  );
}

function ChildLevel2({ children }: { children: ReactNode }) {
  return (
    <VStack border="2px" borderColor="green.200" p={4} borderRadius="md">
      <Text>Child Level 2</Text>
      {children}
    </VStack>
  );
}

function ChildLevel1({ children }: { children: ReactNode }) {
  return (
    <VStack border="2px" borderColor="blue.200" p={4} borderRadius="md">
      <Text>Child Level 1</Text>
      {children}
    </VStack>
  );
}

// Main tree
export function NestedTree() {
  return (
    <CountProvider>
      <Box p={8} bg="gray.100" minH="100vh" border="2px" borderColor="blue.500">
        <ChildLevel1>
          <ChildLevel2>
            <ChildLevel3>
              <DeepChild />
            </ChildLevel3>
          </ChildLevel2>
        </ChildLevel1>
      </Box>
    </CountProvider>
  );
}
