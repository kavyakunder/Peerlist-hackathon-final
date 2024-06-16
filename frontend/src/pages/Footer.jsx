import footerStyles from "../styles/footer.module.css";

function Footer() {
  return (
    <div className={footerStyles.footer}>
      Crafted with <span style={{ color: "var(--color-teal)" }}>Jutsu</span> by
      Madhushree and Kavya 🐱‍👤
    </div>
  );
}

export default Footer;
