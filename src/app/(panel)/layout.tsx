import { ReduxProvider } from "../reduxProvider";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
