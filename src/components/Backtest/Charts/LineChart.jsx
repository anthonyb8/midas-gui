import './LineChart.css';
import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';


export const LineChart = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
      handleScale: {
        axisPressedMouseMove: true
      },
      layout: {
        background: {
          color: 'transparent'
        },
        textColor: '#555',
      },
      grid: {
        vertLines: {
          color: '#555',
        },
        horzLines: {
          color: '#555',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,

      },
      // leftPriceScale: {
      //   visible: true,
      //   ticksVisible: true,
      //   textColor: 'rgba(197, 203, 206, 1)',
      //   borderColor: 'rgba(197, 203, 206, 1)',
      // },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        textColor: '#555',
        borderColor: '#555',
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        borderColor: '#555',
        textColor: '#555',
        timeVisible: true,
        secondVisible: false,
      }
    };

    // Create chart with options
    const chart = createChart(chartContainerRef.current, chartOptions);
    chart.timeScale().fitContent();

    // Create a line series
    const lineSeries = chart.addLineSeries({
      color: '#1F456E', // line color
      lineWidth: 2,
      priceFormat: {
        type: "number",
        minMove: 0.01,
        precision: 2,
      }
    });

    // Assuming `data` is an array of data points in the format { time: 'YYYY-MM-DD', value: price }
    if (data && data.length > 0) {
      lineSeries.setData(data);
    }

    // Resize observer to adjust chart size on container resize
    const resizeObserver = new ResizeObserver(entries => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };

  }, [data]);

  return (
    <React.Fragment>
      <div className="linechart-container" >
        <div className="linechart-border-top"></div>
        <div className="linechart" ref={chartContainerRef}> </div>
        <div className="chart-bottom-extension"></div>
      </div>
    </React.Fragment>
  );
};

export default LineChart;

