import headerStyles from "../../styles/header.module.css";
import { ReactComponent as Logo } from "../../assets/qnAceLogo.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={headerStyles.appHeaderBar}>
      <Link to="/" className={headerStyles.appHeader}>
        <Logo />
        <h1 className={headerStyles.appName}>
          Q<span className={headerStyles.highlight}>n</span>Ace
        </h1>
      </Link>
    </header>
  );
}
