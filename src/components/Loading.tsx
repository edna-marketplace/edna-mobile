import { Center, Spinner } from "@gluestack-ui/themed";
import { useState, useEffect } from "react";

export function Loading() {
  const colors = ["$redDark", "$blueDark", "$orangeDark"];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1300); // 1.3 seconds

    return () => clearInterval(interval);
  }, [colors.length]);

  return (
    <Center flex={1} bg="$base700">
      <Spinner size="large" color={colors[currentColorIndex]} />
    </Center>
  );
}
