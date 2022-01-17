//import { debounce } from "lodash";
import { useEffect, useState } from "react";

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
};
export function useMutationObservable(
  targetEl: Node,
  cb: any,
  options = DEFAULT_OPTIONS
) {
  const [observer, setObserver] = useState<MutationObserver>();

  useEffect(() => {
    const obs = new MutationObserver((mutations) => {
      cb(mutations);
    });
    setObserver(obs);
  }, [options, setObserver]);

  useEffect(() => {
    if (!observer || !targetEl) return;
    const { config } = options;
    observer.observe(targetEl, config);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, targetEl, options]);
}

export function useResizeListener(cb: () => void) {
  useEffect(() => {
    const resizeListener = () =>
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => cb())
      );
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
