import React,{useState} from "react";
import styles from "../../styles/HomeDash.module.css";
import { useNavigate } from "react-router-dom";

const agents = [
  {
    name: "G.A.M.E",
    symbol: "$GAME",
    image:'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/Gaming_Agent_1fe70d54ba.png',
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
    image:'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_34c4330acc.png',
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
  {
    name: "Luna",
    symbol: "$LUNA",
    image:'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/luna_0a1ba65b1f.png',
    address: "0x55CD...247EE4",
    category: "Entertainment",
    marketCap: "$36.05m",
    change: "+4.77%",
    tvl: "$6.97m",
    holders: "287,175",
    volume: "$477.69k",
    mindshare: "0.52%",
    impEng: "307.2k/5.4k",
  },
  {
    name: "Prefrontal Cortex",
    symbol: "$CONVO",
    image:'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/Convo_Agent_89ef084f87.png',
    address: "0xab...d9c0D",
    category: "Productivity",
    marketCap: "$6.6m",
    change: "+14.12%",
    tvl: "$3.1m",
    holders: "287,175",
    volume: "$477.69k",
    mindshare: "7.75%",
    impEng: "0/0",
  },
  {
    name: "VaderAI",
    symbol: "$VADER",
    image:'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/photo_2024_12_03_19_27_39_7c2f035dea.jpeg',
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
  {
    name: "Iona ",
    symbol: "$IONA",
    image:'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/iona_cdbbcdae41.png',
    address: "0x55CD...247EE4",
    category: "Entertainment",
    marketCap: "$36.05m",
    change: "+4.77%",
    tvl: "$6.97m",
    holders: "287,175",
    volume: "$477.69k",
    mindshare: "0.52%",
    impEng: "307.2k/5.4k",
  },
  {
    name: "TracyAI ",
    symbol: "$TRACY",
    image:'https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_ccf503ff79.jpeg',
    address: "0xab...d9c0D",
    category: "Productivity",
    marketCap: "$6.6m",
    change: "+14.12%",
    tvl: "$3.1m",
    holders: "287,175",
    volume: "$477.69k",
    mindshare: "7.75%",
    impEng: "0/0",
  },
];

const DashboardTable = () => {
  const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('TVL');
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
          className={activeTab === 'Market Cap' ? styles.active :styles.tabText}
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
            <th>24h Chg</th>
            <th>TVL</th>
            <th>Holders</th>
            <th>24h Vol</th>
            <th>Mindshare</th>
            <th>Imp/Eng</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id} onClick={()=>navigate("/detail-screen")}>
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
