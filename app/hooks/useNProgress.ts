import { useNavigation, useFetchers } from "react-router";
import { useEffect, useRef } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export function useNProgress(delay = 300) {
  const navigation = useNavigation();
  const fetchers = useFetchers();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
    });
  }, []);

  useEffect(() => {
    const fetchersIdle = fetchers.every((f) => f.state === "idle");

    if (navigation.state === "idle" && fetchersIdle) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (startedRef.current) {
        NProgress.done();
        startedRef.current = false;
      }
    } else {
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          NProgress.start();
          startedRef.current = true;
        }, delay);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [navigation.state, fetchers, delay]);

  useEffect(() => {
    return () => {
      NProgress.done();
    };
  }, []);
}
