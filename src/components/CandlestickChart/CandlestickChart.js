import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const CandlestickChart = () => {
    const chartContainerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transformedData, setTransformedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://vp-api.virtuals.io/vp-api/klines?tokenAddress=0xFE86aBCD1ac5Bfcbf31c94d7437d548a529E4C76&granularity=60&start=1741176575000&end=1741781375000&limit=1000&chainID=0'
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Transform the API response
                const transformed = data.data.Klines.map((kline) => ({
                    time: kline.startInMilli / 1000, // Convert milliseconds to seconds
                    open: parseFloat(kline.open),
                    high: parseFloat(kline.high),
                    low: parseFloat(kline.low),
                    close: parseFloat(kline.close),
                })).sort((a, b) => a.time - b.time); // Sort by time in ascending order
                console.log("transformed", transformed)
                setTransformedData(transformed);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!chartContainerRef.current || transformedData.length === 0) return;

        // Initialize the chart
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 500,
            layout: {
                backgroundColor: '#ffffff',
                textColor: '#000000',
            },
            grid: {
                vertLines: { color: '#e0e0e0' },
                horzLines: { color: '#e0e0e0' },
            },
            priceScale: {
                borderColor: '#cccccc',
            },
            timeScale: {
                borderColor: '#cccccc',
            },
        });

        // Add a candlestick series
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        // Set the transformed data
        candlestickSeries.setData(transformedData);

        // Fit the time scale to the data
        chart.timeScale().fitContent();


        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
          };
      
          window.addEventListener("resize", handleResize);
      
        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [transformedData]);

    return <div ref={chartContainerRef}></div>;
};

export default CandlestickChart;