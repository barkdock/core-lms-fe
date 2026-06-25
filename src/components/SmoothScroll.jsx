import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
	const { pathname } = useLocation();

	useEffect(() => {
		const isDashboardRoute =
			pathname.startsWith("/admin") || pathname.startsWith("/teacher") || pathname.startsWith("/student");

		const wrapper = document.getElementById("app-scroll-root");
		const content = document.getElementById("app-scroll-content");

		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			direction: "vertical",
			gestureDirection: "vertical",
			smooth: true,
			mouseMultiplier: 1,
			smoothTouch: false,
			touchMultiplier: 2,
			...(isDashboardRoute && wrapper && content ? { wrapper, content } : {}),
		});

		lenis.on("scroll", ScrollTrigger.update);

		const onTick = (time) => {
			lenis.raf(time * 1000);
		};

		gsap.ticker.add(onTick);

		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(onTick);
			lenis.destroy();
		};
	}, [pathname]);

	return <>{children}</>;
}
