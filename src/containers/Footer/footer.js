import React from "react";
import "../../styles/footer.css";
import { getEllipsisTxt } from "../../utils/formatter";

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
            $GRYPHON <span className="crypto-address">{getEllipsisTxt("0x9CaD87d9741045eFCd101a443A9f6534Cc0A995F",5)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
