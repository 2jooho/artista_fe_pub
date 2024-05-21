import React from "react";
import { useMediaQuery } from "react-responsive";

interface MediaQueries {
  isDesktopOrLaptop: boolean;
  isTabletOrMobile: boolean;
}

// export const useMediaQueries: MediaQueries = {
//   isDesktopOrLaptop: useMediaQuery({ query: "(min-width: 1024px)" }),
//   isTabletOrMobile: useMediaQuery({ query: "(max-width: 1023px)" }),
// };
