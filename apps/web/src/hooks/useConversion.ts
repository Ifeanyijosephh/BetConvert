import { useState } from "react";

export function useConversion() {
  const [isConverting, setIsConverting] = useState(false);
  return { isConverting, setIsConverting };
}
