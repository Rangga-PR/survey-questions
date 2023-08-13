import "./globals.css";
import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";

export const metadata: Metadata = {
  title: "Survey Questions",
  description: "Survey Questions Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TopBar />
        <Container sx={{ padding: "3rem 1rem" }}>{children}</Container>
      </body>
    </html>
  );
}
