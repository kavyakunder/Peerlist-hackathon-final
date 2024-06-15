import headerStyles from "../../styles/header.module.css";
import { ReactComponent as Logo } from "../../assets/qnAceLogo.svg";

export default function Header() {
  return (
    <header className={`${headerStyles.appHeader}`}>
      <Logo />
      <h1 className={`${headerStyles.appName}`}>Q&Ace</h1>
    </header>
  );
}
