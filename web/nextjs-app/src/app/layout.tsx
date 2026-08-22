import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: {
    template: "%s | Python / From Scratch",
    default: "Python / From Scratch",
  },
  description:
    "Learn Python from your first print() statement to production-ready applications. Free, open-source, project-based.",
  openGraph: {
    siteName: "Python / From Scratch",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
