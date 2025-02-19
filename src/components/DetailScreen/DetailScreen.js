import React from 'react'
import TradingViewChart from '../TradingView/TradingView';
import "../../styles/detailScreen.css"

const DetailScreen = () => {
  return (
<div className="ds-container">
    <div  style={{display:'flex', flexDirection:'column'}}>
    <div style={{display:'flex'}}>
      <div className="left-section">
        <div className="profile">
          <img
            src="https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_ccf503ff79.jpeg"
            alt="Profile"
            className="profile-img"
          />
          <div>
            <h2 className="profile-name">Lucius Kornelius</h2>
            <p className="profile-symbol">$LCKO</p>
          </div>
        </div>
   <TradingViewChart/>
      </div>

      <div className="right-section">
        <div className="swap-buttons">
          <button className="buy-button">Buy</button>
          <button className="sell-button">Sell</button>
        </div>
        
        <div className="input-section">
          <p className="balance-text">0 VIRTUAL</p>
          <input
            type="text"
            className="input-box"
            placeholder="VIRTUAL"
          />
        </div>
        
        <div className="amount-buttons">
          <button className="amount-button">10 🪙</button>
          <button className="amount-button">100 🪙</button>
          <button className="amount-button">1000 🪙</button>
        </div>
        
        <p className="trading-fee">Trading Fee</p>
        
        <button className="place-trade-button">
          Place Trade
        </button>
      </div>
      </div>
      
      <div className="extra-sections">
        {/* Ascension Progress Section */}
        <div className="ascension-progress">
          <h3>Ascension Progress <span className="progress-value">0.14%</span></h3>
          <p>An additional <strong>41,992.31 VIRTUAL</strong> is needed before the entire liquidity from the bonding curve is deposited into Meteora and burned. Progress increases as the price rises.</p>
          <div className="token-stats">
            <p><strong>MC</strong> $6.05k</p>
            <p><strong>Holders</strong> 0</p>
          </div>
        </div>

                {/* Developer Info Section */}
                <div className="developer-info">
          <h3>Developer</h3>
          <p className="developer-id">93HHd...k1o32d</p>
          <a href="#" className="view-profile">View Profile</a>
          <h4>Biography</h4>
          <p>None.</p>
        </div>
      </div>
      </div>
    </div>
  );
};


export default DetailScreen
