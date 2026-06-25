import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GlobalErrorHandler = () => {
	const isOopsDisabled = true;
	if (isOopsDisabled) {
		return null;
	}

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const goOops = () => {
			if (location.pathname !== "/oops") {
				navigate("/oops", { replace: true });
			}
		};

		const onError = () => goOops();
		const onRejection = () => goOops();
		const onAppOops = () => goOops();

		window.addEventListener("error", onError);
		window.addEventListener("unhandledrejection", onRejection);
		window.addEventListener("app:oops", onAppOops);

		return () => {
			window.removeEventListener("error", onError);
			window.removeEventListener("unhandledrejection", onRejection);
			window.removeEventListener("app:oops", onAppOops);
		};
	}, [navigate, location.pathname]);

	return null;
};

export default GlobalErrorHandler;
