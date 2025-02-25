import React, { useEffect, useState } from 'react'
import "../../styles/userProfile.css"
import { getProfile } from '../../services/APIManager';
import { getEllipsisTxt } from '../../utils/formatter';
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineGithub } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IconContext } from "react-icons";


const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("agents-held");

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const token = localStorage.getItem("authToken");
            const result = await getProfile(token);
            console.log("--fetchProfile--", result)
            if (result.success) {
                setProfile(result.data);
            } else {
                throw new Error(result.message || "Failed to load profile");
            }
        } catch (err) {
            console.error("Profile Fetch Error:", err);
            return;
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className='prof-section'>
            <div className="profile-container">
                {/* Profile Section */}
                <div className="profile-card">
                    <div className="profile-header">
                        <img src="https://effigy.im/a/0x7B840480898Ee07E987572b38677c2B7E7C38c02.svg" alt="" className='profile-avatar' />
                        <div className="profile-wallets">
                            <p className="wallet-address">Base Account</p>
                            <p className="wallet-chain">{getEllipsisTxt(profile?.walletAddress, 6)}</p>
                        </div>
                    </div>

                    <div className="profile-bio">
                        <h3 className="profile-section-title">Biography</h3>
                        <p className="profile-text">None.</p>
                    </div>

                    <div className="profile-social">
                        <h3 className="profile-section-title">Social Links</h3>
                        <div className="social-icons">
                            <IconContext.Provider value={{ size:'1.2em',color: "#404849" }}>
                                <div className="social-icon-avatar">
                                    <FaXTwitter />
                                </div>
                            </IconContext.Provider>
                            <IconContext.Provider value={{ size:'1.2em',color: "#404849"}}>
                                <div className="social-icon-avatar">
                                    <AiOutlineGithub />
                                </div>
                            </IconContext.Provider>
                            <IconContext.Provider value={{size:'1.2em', color: "#404849" }}>
                                <div className="social-icon-avatar">
                                    <FaTelegramPlane />
                                </div>
                            </IconContext.Provider>
                        </div>
                    </div>

                    <button className="profile-edit-btn">Edit Profile</button>
                </div>

                {/* Content Section */}
                <div className="profile-content">
                    <div className="profile-tabs">
                        <button
                            className={`profile-tab-btn ${activeTab === "agents-held" ? "active" : ""
                                }`}
                            onClick={() => setActiveTab("agents-held")}
                        >
                            Agents Held
                        </button>
                        <button
                            className={`profile-tab-btn ${activeTab === "agents-created" ? "active" : ""
                                }`}
                            onClick={() => setActiveTab("agents-created")}
                        >
                            Agents Created
                        </button>
                    </div>

                    <div className="profile-content-box">
                        {activeTab === "agents-held" ? (
                            <p className="content-message">No agents found</p>
                        ) : (
                            <p className="content-message">No agents created</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile
