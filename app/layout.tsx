'use client';

import "primereact/resources/themes/soho-light/theme.css";
import "./styles/globals.scss";
import {ReactNode} from "react";
import Providers from "@/providers";
import {Rubik} from "next/font/google";

const rubik = Rubik({subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '900'], variable: '--font-rubik'}
);

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="ru">
        <body className={rubik.variable}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
