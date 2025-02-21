

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
const serverCreatorURL = process.env.NEXT_PUBLIC_CREATOR_URL;

  export async function getNonce  (publicAddress,chainId)  {
    const data = {
      walletAddress: publicAddress,
      chainId: chainId
    }
    const config = {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    };
    try {
    const url = `https://81e2-124-253-165-205.ngrok-free.app/api/v1/creators/get-nounce`;
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      let result = await response.json();
      console.log("getNonce result", result);
      return {
        data: result.data,
        message: result.message
      };
    } catch (err) {
      console.log(err, "error");
      return { success: false, message: err.message };
    }
  };
  export async function verifyUser  (publicAddress,chainId,signature) {
    const data = {
      walletAddress: publicAddress,
      chainId: chainId,
      signature: signature
    }
    const config = {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    };
    try {
      const url = `${serverCreatorURL}/api/v1/auth/verifyUser`;
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      let result = await response.json();
      console.log("verifyUser result", result);
      return {
        data: result.data,
        message: result.message
      };
    } catch (err) {
      console.log(err, "error");
      return { success: false, message: err.message };
    }
  };

  
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
    } catch (err) {
      console.log(err, "error");
      return { success: false, message: err.message };
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
    } catch (err) {
      console.log(err, "error");
      return { success: false, message: err.message };
    }
  }


//dummy APIs
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
  
