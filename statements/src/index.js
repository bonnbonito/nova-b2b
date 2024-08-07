import React from "react";
import ReactDOM from "react-dom/client";
import Example from "./scripts/Example";

if (document.querySelector("#hello")) {
	const root = ReactDOM.createRoot(document.querySelector("#hello"));
	root.render(<Example />);
}
