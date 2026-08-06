import React, { useEffect, useState } from "react";

/**
 * Simple responsive component used for testing breakpoints.
 * It displays a label based on the current window width:
 *  - "mobile"  : width < 600px
 *  - "tablet"  : 600px <= width < 1024px
 *  - "desktop" : width >= 1024px
 *
 * The component updates its label on window resize events.
 */
export const ResponsiveLayout: React.FC = () => {
  const getLabel = (w: number) => {
    if (w < 600) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  };

  const [label, setLabel] = useState<string>(getLabel(window.innerWidth));

  useEffect(() => {
    let timeoutId: number | undefined;
    const handler = () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      // Debounce using a short timeout to batch rapid resize events
      timeoutId = window.setTimeout(() => {
        setLabel(getLabel(window.innerWidth));
        timeoutId = undefined;
      }, 0);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return <div data-testid="layout-label">{label}</div>;
};
