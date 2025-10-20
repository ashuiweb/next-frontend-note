import FullScreenSideDrawer from "@/components/FullScreenSideDrawer";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <FullScreenSideDrawer />
            <body>{children}</body>
        </html>
    );
}
