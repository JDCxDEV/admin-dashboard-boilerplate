import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Function to resolve Inertia page components
const resolveComponent = (name: string) => {
    const path = name === "Dashboard" ? "Dashboard/index.tsx" : `${name}.tsx`;
    return resolvePageComponent(
        `./Pages/${path}`,
        import.meta.glob("./Pages/**/*.tsx")
    );
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: resolveComponent,
    setup({ el, App, props }) {
        const root = createRoot(el as HTMLElement); // Ensure el is an HTMLElement
        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
