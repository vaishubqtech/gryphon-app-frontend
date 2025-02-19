
import { ethers } from "ethers";


const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function signupAgent({ name, goal, personality, niche }) {
    const serverUrl = `${serverURL}/api/v1/auth/agent/signup`;
  
    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, goal, personality, niche }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result  = await response.json();
      console.log(' signup Agent data:', result );

      return {
        data: result.data,
        message: result.message
      };
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, message: error.message };
    }
  }
  
  export async function signupCreator({ email, password, name, walletAddress, signin_using_email }) {
    if (!email || !password) {
      throw new Error("Email and password are required fields.");
    }
  
    if (signin_using_email) {
      const wallet = ethers.Wallet.createRandom();
      walletAddress = wallet.address;
    }
  
    if (!walletAddress) {
      throw new Error("Wallet address is required.");
    }
  
    const serverUrl = `${ process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/creator/signup`;
  
    const body = { email, password, name, walletAddress };
  
    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const result  = await response.json();
      console.log('signup creator data:', result );

      return {
        data: result.data,
        message: result.message
      };

    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, message: error.message };
    }
  }

  export async function loginCreator({ email, password,walletAddress }) {
    const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/creator/login`;
    let body = { email, password,walletAddress };
  
    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const result  = await response.json();
      console.log('login creator  data:', result );

      return {
        data: result.data,
        message: result.message
      };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: error.message };
    }
  }

  export async function getProfile() {
    try {
      const response = await fetch(`${serverURL}/api/v1/auth/creator/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result  = await response.json();
      console.log('profile data:', result );

      return {
        data: result.data,
        message: result.message
      };


    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  

  export async function getAllAgents() {
    try {
      const response = await fetch(`${serverURL}/api/v1/auth/agent/getAllAgents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result  = await response.json();
      console.log('All Agent data:', result );

      return {
        data: result.data,
        message: result.message
      };
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  export async function getAgentById(agentId) {
    try {
      const response = await fetch(`${serverURL}/api/v1/auth/agent/getAgent?id=${agentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result  = await response.json();
      console.log('Agent data:', result );

      return {
        data: result.data,
        message: result.message
      };
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }