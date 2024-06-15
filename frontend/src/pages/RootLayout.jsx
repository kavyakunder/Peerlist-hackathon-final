import Header from "../components/ui/Header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "90px",
          backgroundColor: "var(--color-dark-blue)",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}