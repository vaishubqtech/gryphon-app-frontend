import React, { useEffect, useState } from 'react'
import TradingViewChart from '../TradingView/TradingView';
import "../../styles/detailScreen.css"
import { useParams } from "react-router-dom";
import { getAgentById } from '../../services/APIManager';
import { getEllipsisTxt } from '../../utils/formatter';

const DetailScreen = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
   
       fetchAgent();
    }
  }, [id]);


  const fetchAgent = async () => {
    try {
    const token = localStorage.getItem("authToken");
      const response = await getAgentById(id,token);
      console.log("fetchAgent",response)
      if (response.success) {
        setAgent(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to fetch agent details");
      console.log("error in fetchAgent", err)
      return;
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="ds-container">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div className="left-section">
            <div className="profile">
              <img
                src={agent?.profileImage ? agent?.profileImage : "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_ccf503ff79.jpeg" }
                alt="Profile"
                className="profile-img"
              />
              <div>
              <div style={{display:'flex',marginTop:4}}>
                <h2 className="profile-name">{agent?.name}</h2>
                <p className="profile-symbol">${agent?.ticker}</p>
              </div>

              <div className='erc20-token'>{getEllipsisTxt(agent?.erc20Address,6)}</div>
              </div>
            </div>
            <TradingViewChart />
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
            <p>{agent?.bio}</p>
            <div className="token-stats">
              <p><strong>MC</strong> $6.05k</p>
              <p><strong>Holders</strong> 0</p>
            </div>
          </div>

          {/* Developer Info Section */}
          <div className="developer-info">
            <h3>Creator Id</h3>
            <p className="developer-id">{getEllipsisTxt(agent?.creatorId , 6)}</p>
            <a href="#" className="view-profile">View Profile</a>
            <h4>{agent?.agentType}</h4>
            <p>None.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DetailScreen
