import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <small>©{year} Cars Manager App.</small>
      <div className="footer-links">
        <a href="/" className="footer-link" target="_blank">
          About
        </a>
        <a href="https://github.com/MY-o-o" className="footer-link" target="_blank">
          My GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
