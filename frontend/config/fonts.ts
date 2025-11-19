import { Fira_Code as FontMono, Inter as FontSans, Patrick_Hand as FontHand } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontHand = FontHand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwriting",
});
