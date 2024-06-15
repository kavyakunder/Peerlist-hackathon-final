import Header from "../components/ui/Header";
import { Outlet } from "react-router-dom";
import layoutStyles from "../styles/layout.module.css";

export default function RootLayout() {
  return (
    <>
      <Header />
      <div className={layoutStyles.pageLayout}>
        <Outlet />
      </div>
    </>
  );
}
