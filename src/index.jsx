import React from "react";
import Resume from './resume.mdx'
import Output from '../output.md';
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<Output />);