import React, { useEffect, useState } from "react";
import styles from "../../styles/HomeDash.module.css";
import { useNavigate } from "react-router-dom";
import { getAllAgents } from "../../services/APIManager";
import { getEllipsisTxt } from "../../utils/formatter";
import { MdOutlineContentCopy } from "react-icons/md";
import { IconContext } from "react-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const agentFeed = [
  {
    name: "G.A.M.E",
    symbol: "$GAME",
    image: 'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/Gaming_Agent_1fe70d54ba.png',
    address: "0x1C4C...F463A3",
    category: "Productivity",
    marketCap: "$74m",
    change: "+4%",
    tvl: "$12.99m",
    holders: "182,298",
    volume: "$1.17m",
    mindshare: "0.28%",
    impEng: "58.7k/1.2k",
  },
  {
    name: "aixbt",
    symbol: "$AIXBT",
    image: 'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_34c4330acc.png',
    address: "0x4F9F...D1A825",
    category: "Productivity",
    marketCap: "$403.44m",
    change: "+4.22%",
    tvl: "$6.98m",
    holders: "275,239",
    volume: "$1.13m",
    mindshare: "8.79%",
    impEng: "23.8m/154.2k",
  },

];

const DashboardTable = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('TVL');
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchAgents();
  }, []);


  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await getAllAgents(token);
      console.log("response", response)
      if (response.success) {
        setAgents(response.data);
      }
    } catch (err) {
      setError(err.message);
      console.log("error in get All agents", err)
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    toast.success("ERC20Address copied!", {
      position: "top-right"
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button
          className={activeTab === 'TVL' ? styles.active : styles.tabText}
          onClick={() => setActiveTab('TVL')}
        >
          Total Value Locked
        </button>
        <button
          className={activeTab === 'Market Cap' ? styles.active : styles.tabText}
          onClick={() => setActiveTab('Market Cap')}
        >
          Market Cap
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>AI Agents</th>
              <th>Market Cap</th>
              <th>Token Price</th>
              <th>24h Chg</th>
              <th>24h Vol</th>
              <th>Top 10</th>
              <th>Holders</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {
              agents?.map((agent) => {
                let timeStamp;
                const now = new Date();
                const past = new Date(agent?.createdAt);
                const diffInSeconds = Math.floor((now - past) / 1000);

                if (diffInSeconds < 60) {
                  timeStamp = `${diffInSeconds} seconds ago`;
                }

                const diffInMinutes = Math.floor(diffInSeconds / 60);
                if (diffInMinutes < 60) {
                  timeStamp = `${diffInMinutes} minutes ago`;
                }

                const diffInHours = Math.floor(diffInMinutes / 60);
                if (diffInHours < 24) {
                  timeStamp = `${diffInHours} hours ago`;
                }

                const diffInDays = Math.floor(diffInHours / 24);
                if (diffInDays < 30) {
                  timeStamp = `${diffInDays} days ago`;
                }

                const diffInMonths = Math.floor(diffInDays / 30);
                if (diffInMonths < 12) {
                  timeStamp = `${diffInMonths} months ago`;
                }



                return (

                  <tr key={agent._id} onClick={() => navigate(`/detail-screen/${agent._id}`)}>
                    <td>
                      <div className={styles.agentInfo}>
                        <div className={styles.profileContainer}>
                          <img src={agent.profileImage} alt={agent.name} className={styles.profileImg} />
                          <img src="https://cryptologos.cc/logos/bnb-bnb-logo.png" alt="Token" className={styles.tokenIcon} />
                        </div>
                        {/* <img src={agent.profileImage} alt={agent.name} className={styles.avatar} /> */}
                        <div>
                          <div className={styles.name}>{agent.name} <span className={styles.spanTicker}>${agent.ticker}</span></div>
                          <div style={{ display: 'flex', alignItems: 'center',marginTop: 6, }}>
                            <div style={{ display: 'flex', alignItems: 'center',  zIndex: 9 }} className={styles.ercAddr} onClick={handleCopy}>
                              <div className={styles.address}>  {getEllipsisTxt(agent.erc20Address, 6)} </div>
                              <IconContext.Provider value={{ size: '0.8em', color: "#404849" }} >
                                <div style={{ marginLeft: 7 }}>
                                  <MdOutlineContentCopy />
                                </div>
                              </IconContext.Provider>
                              <ToastContainer />
                            </div>
                            {agent?.agentType && <div className={styles.agentType}>  {agent?.agentType} </div>}

                          </div>
                        </div>
                      </div>
                    </td>
                    <td>${agent?.mcapInVirtual ? agent.mcapInVirtual : 0}</td>
                    {/* className={agent.change.includes('-') ? styles.negative : styles.positive} */}
                    {/* need token price */}
                    <td >
                      $0
                    </td>
                    {/* need 24h  */}
                    <td>0%</td>
                    {/* need 24vol */}
                    <td>$0</td>
                    {/*need top 10  */}
                    <td>0%</td>
                    {/* need holders */}
                    <td>0</td>
                    <td>{timeStamp ? timeStamp : '-'}</td>
                  </tr>
                )
              })
            }
            <tr>Sample data</tr>
            {agentFeed?.map((agent) => (
              <tr key={agent.id} onClick={() => navigate(`/detail-screen/${agent.id}`)}>
                <td>
                  <div className={styles.agentInfo}>
                    <img src={agent.image} alt={agent.name} className={styles.avatar} />
                    <div>
                      <div className={styles.name}>{agent.name} {agent.symbol}</div>
                      <div className={styles.address}>{agent.address}</div>

                    </div>
                  </div>
                </td>
                <td>{agent.marketCap}</td>
                <td className={agent.change.includes('-') ? styles.negative : styles.positive}>
                  {agent.change}
                </td>
                <td>{agent.tvl}</td>
                <td>{agent.holders}</td>
                <td>{agent.volume}</td>
                <td>{agent.mindshare}</td>
                <td>{agent.impEng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
