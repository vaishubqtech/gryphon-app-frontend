import React, { useEffect, useRef } from "react";

const TradingViewChart = ({ 
  symbol = "NASDAQ:AAPL", 
  width = "100%", 
  height = "400" 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";  // Load TradingView Library
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          width: width,
          height: height,
          symbol: symbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_widget",
          datafeed: new CustomDataFeed(), // Using custom DataFeed
          library_path: "/tradingview/",
        });
      }
    };

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, width, height]);

  // 🔥 Custom DataFeed: Fetch your own API data
  class CustomDataFeed {
    onReady(callback) {
      setTimeout(() => callback({
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: true,
      }), 0);
    }

    resolveSymbol(symbolName, onSymbolResolvedCallback) {
      setTimeout(() => {
        onSymbolResolvedCallback({
          name: symbolName,
          ticker: symbolName,
          session: "24x7",
          timezone: "Etc/UTC",
          minmov: 1,
          pricescale: 100,
          has_intraday: true,
          has_no_volume: false,
          supported_resolutions: ["1", "5", "15", "30", "60", "D"],
          volume_precision: 2,
        });
      }, 0);
    }

    getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback) {
      console.log(`Fetching data from ${from} to ${to} with resolution ${resolution}`);

      // ✅ Replace with your API endpoint
      const apiUrl = `https://vp-api.virtuals.io/vp-api/klines?tokenAddress=0x331B9a47bd75F125a81DeEdF61C55Aa20E9DBd4B&granularity=${resolution * 60}&start=${from * 1000}&end=${to * 1000}&limit=1000&chainID=0`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (!data || data.length === 0) {
            onHistoryCallback([], { noData: true });
            return;
          }

          // 📌 Convert API response to TradingView's format
          const bars = data.map(item => ({
            time: item.timestamp,
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volume,
          }));

          onHistoryCallback(bars, { noData: false });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          onErrorCallback(error);
        });
    }

    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID) {
      console.log("Subscribed to real-time updates:", subscribeUID);
    }

    unsubscribeBars(subscribeUID) {
      console.log("Unsubscribed from real-time updates:", subscribeUID);
    }
  }

  return <div id="tradingview_widget" ref={containerRef}></div>;
};

export default TradingViewChart;
