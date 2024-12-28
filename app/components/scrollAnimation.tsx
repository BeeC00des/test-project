import { useEffect } from "react";

// IntersectionObserver callback signature
const useScrollAnimations = () => {
  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null, // uses the viewport as the root
      rootMargin: "0px", // no margin
      threshold: 0.1, // trigger when 10% of the element is visible
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the 'visible' class when the element comes into view
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // stop observing after it is visible
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe all elements with the class 'slide-top' and 'slide-bottom'
    const slideTopElements = document.querySelectorAll(".slide-top");
    const slideBottomElements = document.querySelectorAll(".slide-bottom");

    slideTopElements.forEach(el => observer.observe(el));
    slideBottomElements.forEach(el => observer.observe(el));

    return () => {
      // Clean up observer on unmount
      slideTopElements.forEach(el => observer.unobserve(el));
      slideBottomElements.forEach(el => observer.unobserve(el));
    };
  }, []);
};

export default useScrollAnimations;
