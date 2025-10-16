//@ts-ignore
import { atomDark, coy, github, oneDark, oneLight, tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const themes = {
    oneDark: { name: "One Dark", style: oneDark },
    oneLight: { name: "One Light", style: oneLight },
    atomDark: { name: "Atom Dark", style: atomDark },
    github: { name: "GitHub", style: github },
    tomorrow: { name: "Tomorrow", style: tomorrow },
    coy: { name: "Coy", style: coy },
};

export type ThemeKey = keyof typeof themes;
