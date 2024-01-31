import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library

const PieChart = ({ completed, pending, due, width, height }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // Use useRef to persist the chart instance

  useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy existing chart if it exists
      }
      const ctx = canvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'pie', // Specify chart type as 'pie'
        data: {
          labels: ['Completed Tasks', 'Pending Tasks', 'Due Tasks'],
          datasets: [
            {
              data: [completed, pending, due],
              backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
              hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
          ],
        },
        options: {
          responsive: false, // Make the chart responsive
        },
      });
    }
  }, [completed, pending, due]);

  // Set the width and height of the canvas element
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && width && height) {
      canvas.width = width;
      canvas.height = height;
    }
  }, [width, height]);

  return <canvas ref={canvasRef} />;
  
};

export default PieChart;
