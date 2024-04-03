'use client';

import "primereact/resources/themes/soho-light/theme.css";
import "./styles/globals.scss";
import {ReactNode} from "react";
import Providers from "@/providers";

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="ru">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
