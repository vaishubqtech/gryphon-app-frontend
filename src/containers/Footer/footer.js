import React from "react";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span>© 2021–2025 VIRTUALS.io | All Rights Reserved.</span>
          <a href="#" className="footer-link">Legal Disclaimer</a>
        </div>
        <div className="footer-center">
          <a href="#">Governance</a>
          <a href="#">Protocol</a>
          <a href="#">Writing</a>
          <a href="#">Research</a>
          <a href="#">About</a>
        </div>
        <div className="footer-right">
          <span>Crypto data by CoinGecko</span>
          <div className="crypto-badge">
            $GRYPHON <span className="crypto-address">0x0b3e...4E71b</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
