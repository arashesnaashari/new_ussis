// import isMobile from "ismobilejs";

import { useBreakpointValue } from "@chakra-ui/react";
import { useMatches } from "@remix-run/react";
import { useLayoutEffect } from "react";

export const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => {};

export const useIsMobile = <T = any,>(value?: T[]): T | undefined => {
  const isMobile = true;
  // @ts-ignore
  return useBreakpointValue(value ?? [true, true, false], {
    ssr: true,
    fallback: isMobile ? "sm" : "lg",
  });
};
