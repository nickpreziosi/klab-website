/**
 * REFERENCE ONLY — not imported. Previous progress driven by `document.readyState`,
 * `PerformanceNavigationTiming`, RAF creep toward 95%, and `window` load.
 *
 * To restore: reintroduce `targetProgress` state + `useSpring(progressMotion, …)` and
 * wire `progressMotion.set(targetProgress)` from this flow instead of `animate(progressMotion, 100, …)`.
 *
 * ```tsx
 * // --- deps: pathname, searchParams, progressMotion, skipAnimation, homeAnimation ---
 * useEffect(() => {
 *   if (skipAnimation) return;
 *
 *   setIsLoading(true);
 *   setTargetProgress(0);
 *   progressMotion.set(0);
 *   isCompleteRef.current = false;
 *
 *   let animationFrame: number;
 *   let lastProgress = 0;
 *
 *   const updateProgress = () => {
 *     if (isCompleteRef.current) return;
 *
 *     let newProgress = lastProgress;
 *
 *     if (newProgress === 0) {
 *       newProgress = 15;
 *     }
 *
 *     if (document.readyState === "loading") {
 *       newProgress = Math.max(newProgress, 25);
 *     } else if (document.readyState === "interactive") {
 *       newProgress = Math.max(newProgress, 50);
 *     } else if (document.readyState === "complete") {
 *       newProgress = 100;
 *       isCompleteRef.current = true;
 *       setTargetProgress(100);
 *       setTimeout(() => {
 *         setIsLoading(false);
 *         homeAnimation?.setHasAnimated();
 *       }, 600);
 *       return;
 *     }
 *
 *     const navigation = performance.getEntriesByType(
 *       "navigation"
 *     )[0] as PerformanceNavigationTiming;
 *
 *     if (navigation) {
 *       if (navigation.domContentLoadedEventEnd > 0) {
 *         newProgress = Math.max(newProgress, 70);
 *       }
 *
 *       if (navigation.domComplete > 0) {
 *         newProgress = Math.max(newProgress, 90);
 *       }
 *
 *       if (navigation.loadEventEnd > 0) {
 *         newProgress = 100;
 *         isCompleteRef.current = true;
 *         setTargetProgress(100);
 *         setTimeout(() => {
 *           setIsLoading(false);
 *           homeAnimation?.setHasAnimated();
 *         }, 600);
 *         return;
 *       }
 *     }
 *
 *     if (newProgress < 95 && newProgress === lastProgress) {
 *       newProgress = Math.min(95, lastProgress + 2);
 *     }
 *
 *     if (newProgress !== lastProgress) {
 *       lastProgress = newProgress;
 *       setTargetProgress(newProgress);
 *     }
 *
 *     animationFrame = requestAnimationFrame(updateProgress);
 *   };
 *
 *   updateProgress();
 *
 *   const handleLoad = () => {
 *     if (!isCompleteRef.current) {
 *       isCompleteRef.current = true;
 *       setTargetProgress(100);
 *       setTimeout(() => {
 *         setIsLoading(false);
 *         homeAnimation?.setHasAnimated();
 *       }, 600);
 *     }
 *   };
 *
 *   window.addEventListener("load", handleLoad);
 *
 *   if (document.readyState === "complete") {
 *     handleLoad();
 *   }
 *
 *   const safetyTimeout = setTimeout(() => {
 *     if (!isCompleteRef.current) {
 *       isCompleteRef.current = true;
 *       setTargetProgress(100);
 *       setTimeout(() => {
 *         setIsLoading(false);
 *         homeAnimation?.setHasAnimated();
 *       }, 600);
 *     }
 *   }, 5000);
 *
 *   return () => {
 *     cancelAnimationFrame(animationFrame);
 *     window.removeEventListener("load", handleLoad);
 *     clearTimeout(safetyTimeout);
 *   };
 * }, [pathname, searchParams, progressMotion, skipAnimation, homeAnimation]);
 * ```
 */

export {};
