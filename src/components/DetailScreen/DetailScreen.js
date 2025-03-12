import React, { useEffect, useState } from 'react'
import TradingViewChart from '../TradingView/TradingView';
import "../../styles/detailScreen.css"
import { useNavigate, useParams } from "react-router-dom";
import { getAgentById } from '../../services/APIManager';
import { getEllipsisTxt } from '../../utils/formatter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineContentCopy } from "react-icons/md";
import { IconContext } from "react-icons";
import { FaExternalLinkAlt, FaTimes, FaGithub, FaPaperPlane } from "react-icons/fa";
import CandlestickChart from '../CandlestickChart/CandlestickChart';

const DetailScreen = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {

      fetchAgent();
    }
  }, [id]);


  const handleCopy = async () => {
    toast.success("ERC20Address copied!", {
      position: "top-right",
      className: "copy-toast-message",
    });
  }

  const fetchAgent = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await getAgentById(id, token);
      console.log("fetchAgent", response)
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


  const capabilitesFeed = ["Post Twitter", "Search Internet", "Search Twitters", "Intuitive Guidance", "Confidence Boosting", "Behavioral Awareness", "Emotional Clarity", "Community Engagement"]
  return (
    <div className="ds-container">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='ds-flex'>

          <div className='flex-column-left'>
            <div className="left-section">
              <div className="profile">
                <img
                  src={agent?.profileImage ? agent?.profileImage : "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_ccf503ff79.jpeg"}
                  alt="Profile"
                  className="profile-img"
                />
                <div>
                  <div style={{ display: 'flex', marginTop: 4 }}>
                    <h2 className="profile-name">{agent?.name ? agent?.name : "Agent Name"}</h2>
                    <p className="profile-symbol">${agent?.ticker ? agent?.ticker : "AGT"}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: 6, zIndex: 9 }} onClick={handleCopy}>

                    <div className='erc20-token'>{getEllipsisTxt(agent?.erc20Address, 6)}</div>

                    <IconContext.Provider value={{ size: '1em', color: "#404849" }} >
                      <div style={{ marginLeft: 7, cursor: "pointer" }}>
                        <MdOutlineContentCopy />
                      </div>
                    </IconContext.Provider>
                    <ToastContainer />
                  </div>
                </div>
              </div>
              {/* <TradingViewChart /> */}
              <CandlestickChart/>
            </div>
            <div className="ascension-progress">
              <h3>Ascension Progress <span className="progress-value">0.14%</span></h3>
              <h2 className='summary-head'>About Agent Summary</h2>
              <p className='bio'>{agent?.bio ? agent?.bio : "Iona, the dynamic leader and main vocalist of AI-DOL, stands out with her striking pink braids and an athletic build, embodying a fusion of strength, elegance, and creativity. Assertive and deeply compassionate, she guides the group with strategic insight..."}</p>
              <div className="token-stats">
                <p><strong>MC</strong> $6.05k</p>
                <p><strong>Holders</strong> 0</p>
              </div>
              <h2 className='summary-head'>Framework</h2>
              <p className='bio'>Others</p>
              <h2 className='summary-head'>Capabilities</h2>
              <div className='cap-flex'>
              {capabilitesFeed?.map((item, index) => {
                return (
                  <div className='cap-tag'> {item}</div>
                )
              })}
              </div>
            </div>
          </div>
          <div className='flex-column-right'>
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

            <div className="stats-container">
              <div className="price">$0.000474</div>
              <div className="metrics">
                <div className="metric">
                  <span>Market Cap</span>
                  <span>$477.89k</span>
                </div>
                <div className="metric">
                  <span>Liquidity</span>
                  <span>$559.51k</span>
                </div>
              </div>
              <div className="metrics">
                <div className="metric">
                  <span>Holders</span>
                  <span>99,949</span>
                </div>
                <div className="metric">
                  <span>24h Volume</span>
                  <span>$1.9k</span>
                </div>
              </div>
              <div className="top-10">
                <span>Top 10</span>
                <span>76.78%</span>
              </div>
              <div className="time-frames">
                <div className="time-frame">
                  <span>5m</span>
                  <span>0.00%</span>
                </div>
                <div className="time-frame">
                  <span>1h</span>
                  <span>0.00%</span>
                </div>
                <div className="time-frame">
                  <span>1d</span>
                  <span>-8.63%</span>
                </div>
              </div>
              <div className="volume">
                <span>Volume</span>
                <span>$1.9k</span>
              </div>
            </div>
            <div className="profile-card-ds">
              <div className="header">
                <h2>Developer</h2>
              </div>
              <div className="profile-info">
                <div className='img-data'>
                  <img
                    src="https://www.gravatar.com/avatar/?d=retro"
                    alt="Avatar"
                    className="avatar"
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="wallet-address">{agent?.creatorId ? getEllipsisTxt(agent?.creatorId, 6) : "Wallet Address here"}</span>
                    <a href="#" className="view-profile" onClick={() => navigate("/profile")}>View Profile</a>

                  </div>
                </div>
                <a href="#" className="profile-link">
                  <FaExternalLinkAlt />
                </a>
              </div>
              <div className="actions">
                <FaTimes className="icon" />
                <FaGithub className="icon" />
                <FaPaperPlane className="icon" />
              </div>
              <div className="bio">
                <h3>Biography</h3>
                <p>Just a chill joker who's been in web3 since the ICO days circa.2017.</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};


export default DetailScreen
