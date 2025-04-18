import NavbarOne from "@/components/headers/NavbarOne";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarOne />
      <div>
        {children}
      </div>
    </div>
  );
}
