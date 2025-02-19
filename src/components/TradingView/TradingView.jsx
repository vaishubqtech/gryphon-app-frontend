import React, { useEffect, useRef } from "react";

const TradingViewChart = ({ symbol = "NASDAQ:AAPL", width = "100%", height = "400" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          width: width,
          height: height,
          symbol: symbol, // Dynamic symbol
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_widget",
        });
      }
    };

    containerRef.current.appendChild(script);

    // Cleanup to prevent multiple instances
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, width, height]);

  return <div id="tradingview_widget" ref={containerRef}></div>;
};

export default TradingViewChart;
