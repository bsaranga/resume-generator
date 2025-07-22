import React from "react";
import Resume from './resume.mdx'

export function Header() {
    return (
        <div>HEADER</div>
    )
}

const components = {
    header: Header,
};

export default function App() {
    return (
        <Resume components={components}/>
    )
}