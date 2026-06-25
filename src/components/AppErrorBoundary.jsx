import { Component } from "react";
import Oops from "@/pages/Oops";

class AppErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return <Oops />;
		}

		return this.props.children;
	}
}

export default AppErrorBoundary;
