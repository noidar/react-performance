import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useState, createContext, useContext, ReactNode, useCallback } from "react";

// --- Split context: count and increment separately ---
const CountContext = createContext<number>(0);
const IncrementContext = createContext<() => void>(() => {});

// --- Custom hooks for selective access ---
function useCount() {
  return useContext(CountContext);
}

function useIncrement() {
  return useContext(IncrementContext);
}

// --- Provider with two contexts ---
function CountProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);


// useIncrement returns a new reference to increment,
// even though the function itself doesn't change,
// React sees the context value (increment) as new every render of the provider.
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <CountContext.Provider value={count}>
      <IncrementContext.Provider value={increment}>
        {children}
      </IncrementContext.Provider>
    </CountContext.Provider>
  );
}

// --- Deep child using only what it needs ---
function DeepChild() {
  const count = useCount();
  const increment = useIncrement();
  return (
    <Box p={4} bg="red.100" borderRadius="md">
      <Text>Child Level 4 Count: {count}</Text>
      <Button mt={2} colorScheme="red" onClick={increment}>
        Increment Deep
      </Button>
    </Box>
  );
}

// --- Child layers composition ---
function ChildLevel4({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);

  return (
    <VStack border="2px" borderColor="red.700" p={4} borderRadius="md">
      <Text>Child Level 4 (Local Count): {count}</Text>
      <Button colorScheme="red" onClick={increment}>
        Increment Local Count
      </Button>
      {children}
    </VStack>
  );
}

function ChildLevel3({ children }: { children: ReactNode }) {
  const count = useCount();
  return (
    <VStack border="2px" borderColor="green.600" p={4} borderRadius="md">
      <Text>Child Level 3 </Text>
      <Text>{count}</Text>
      {children}
    </VStack>
  );
}

function ChildLevel2({ children }: { children: ReactNode }) {

  const increment = useIncrement();
  return (
    <VStack border="2px" borderColor="green.200" p={4} borderRadius="md">
      <Text>Child Level 2</Text>
      {children}
      <Button mt={2} colorScheme="red" onClick={increment}>
        Increment ChildLevel2
      </Button>
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

// --- Main tree ---
export function NestedTree() {
  return (
    <CountProvider>
      <Box p={8} bg="gray.100" minH="100vh" border="2px" borderColor="blue.500">
        <ChildLevel1>
          <ChildLevel2>
            <ChildLevel3>
              <ChildLevel4>
                <DeepChild />
              </ChildLevel4>
            </ChildLevel3>
          </ChildLevel2>
        </ChildLevel1>
      </Box>
    </CountProvider>
  );
}

// DeepChild rerenders only when it needs to (count or increment separately).

// Local state inside ChildLevel4 is independent — no unnecessary global rerenders.

// You can now even memo the children easily if you want even more performance boost.
