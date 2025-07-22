import React from "react";
import Header from "./components/header";
import Resume from './resume.mdx'
import { createRoot } from "react-dom/client";
import Layout from "./components/layout";
import './index.css';

const root = createRoot(document.getElementById("root"));
root.render(<Layout>
    <Header/>
    <Resume/>
</Layout>);