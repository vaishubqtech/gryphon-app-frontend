import React, { useEffect, useState } from 'react'
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
import GRYLogo from "../../assets/Images/gryphon-logo.png"
import { TiInfoOutline } from "react-icons/ti";
import { Tooltip } from 'antd';
import { amountOutValue, buyTrade } from '../../services/gryphon-web3';
import config from '../../config';
import Web3 from 'web3';


const DetailScreen = () => {
  const walletAddress = localStorage.getItem("publicAddress")
  const navigate = useNavigate()
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTradeTab, setActiveTradeTab] = useState("buy")
  const [amountToTrade, setAmountToTrade] = useState()
  const [estimatedAmount, setEstimatedAmount] = useState()

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

  useEffect(() => {
    estimatedAmountOut();
  }, [amountToTrade])

  const estimatedAmountOut = async () => {
    try {
      let GryphonAddrOrZerothAddr;
      if (activeTradeTab === "buy") {
        GryphonAddrOrZerothAddr = config.gryphon_token_address;
      } else {
        GryphonAddrOrZerothAddr = "0x0000000000000000000000000000000000000000";
      }
      const estimatedAmtResult = await amountOutValue("Agent erc20Address", GryphonAddrOrZerothAddr, Web3.utils.toWei(amountToTrade, "ether"), walletAddress)
      console.log("----estimatedAmtResult----", estimatedAmtResult);
      if (estimatedAmtResult) {
        // setEstimatedAmount("some value")
      }
    } catch (err) {
      console.log("error in estimatedAmountOut", err)
      return
    }
  }
  const buy_trade = async () => {
    try {

      const buyTradeResult = await buyTrade(Web3.utils.toWei(amountToTrade, "ether"), "Agent ERC20Address", walletAddress)
      console.log("----buyTradeResult----", buyTradeResult);
      if (buyTradeResult?.status) {
        toast.success("Buy trade successful!", {
          position: "top-right",
          className: "copy-toast-message",
        });
      } else {
        toast.error("Error in placing BUY Trade", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.log("error in buyTradeResult", err)
      return
    }
  }
  const sell_trade = async () => {
    try {

      const sellTradeResult = await buyTrade(Web3.utils.toWei(amountToTrade, "ether"), walletAddress)
      console.log("----sellTradeResult----", sellTradeResult);
      if (sellTradeResult?.status) {
        toast.success("Sell trade successful!", {
          position: "top-right",
          className: "copy-toast-message",
        });
      } else {
        toast.error("Error in placing SELL Trade", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.log("error in sellTradeResult", err)
      return
    }
  }



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
              <CandlestickChart />
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
                <button className={activeTradeTab === "buy" ? "active-button" : "tab-button"} onClick={() => setActiveTradeTab("buy")}>Buy</button>
                <button className={activeTradeTab === "sell" ? "active-button" : "tab-button"} onClick={() => setActiveTradeTab("sell")}>Sell</button>
              </div>

              <div className="input-section">
                <p className="balance-text">{activeTradeTab === "buy" ? "0 GRYPHON" : "0 TICKER"}</p>
                <input
                  type="text"
                  className="input-box"
                  placeholder={activeTradeTab === "buy" ? "Enter the amount of GRYPHON" : "Enter the amount of TICKER"}
                  onChange={(e) => setAmountToTrade(e.target.value)}
                />
              </div>
              {amountToTrade && <p className='est-amt'>You will receive<span> 0.09864 {activeTradeTab === "buy" ? "GRYPHON" : "TICKER"}</span>   </p>}
              {activeTradeTab === "buy" &&
                <div className="amount-buttons">
                  <button className="amount-button"><div>10</div><img src={GRYLogo} alt="" className='amt-logo' /> </button>
                  <button className="amount-button"><div>100</div><img src={GRYLogo} alt="" className='amt-logo' /> </button>
                  <button className="amount-button"><div>1000</div><img src={GRYLogo} alt="" className='amt-logo' /> </button>
                </div>
              }
              <div className="trading-fee"><p> Trading Fee</p>
                <IconContext.Provider value={{ size: '1.2em', color: "#707979" }} >
                  <div style={{ marginLeft: 4, cursor: "pointer", marginBottom: -4 }}>
                    <Tooltip placement="right" color='#666' title="Trade fee description here!">
                      <TiInfoOutline />
                    </Tooltip>
                  </div>
                </IconContext.Provider>
              </div>
              {activeTradeTab === "buy" ?
                <button className="place-trade-button" onClick={buy_trade}>
                  Place Trade
                </button> : <button className="place-trade-button" onClick={sell_trade}>
                  Place Trade
                </button>}
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
