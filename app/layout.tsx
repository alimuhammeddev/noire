import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/store-context";
import { Header, SiteFooter } from "@/components/site";

export const metadata: Metadata = {
  title: {
    default: "NOIRÉ | Contemporary Fashion",
    template: "%s | NOIRÉ",
  },
  description:
    "Discover NOIRÉ, a contemporary fashion label exploring refined essentials, thoughtful design, and modern everyday style.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "NOIRÉ | Contemporary Fashion",
    description: "Considered essentials. Refined silhouettes. A quieter expression of modern style.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="site-top">
            <Header />
          </div>
          <main>{children}</main>
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
