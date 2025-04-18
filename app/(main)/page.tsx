import View from "@/components/autres/view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "R-Shop",
  description: "Bienvenue sur la site web de R-Shop",
};

export default function Home() {
  return (
    <div>
      <View />
    </div>
  );
}