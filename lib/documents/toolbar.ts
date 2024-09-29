

const toolbar = [
    {
      type: "p",
      content: "",
    },
    {
      type: "title",
      content: "Line Chart",
    },
    {
      type: "component",
      content: "toolbar-component/ToolbarComponent",
    }, 
    {
      type: "code",
      content: `"use client";
  import React, { useEffect, useState } from "react";
  import { Line } from "react-chartjs-2";
  import "chartjs-adapter-date-fns";
  import { Chart, registerables } from "chart.js";
  import hexToRgba from "hex-to-rgba";
  
  Chart.register(...registerables);
  
  const setChartData = (color: string = "#2563eb", isDarkTheme = false) => {
    const startDate = new Date(2023, 0, 0);
    const chartData = Array(12)
      .fill(null)
      .map((_, i) => {
        const date = new Date(startDate);
        date.setMonth(startDate.getMonth() + i);
  
        return {
          x: date,
          y: Math.floor(Math.random() * 50) + 20,
        };
      });
    return {
      labels: undefined,
      datasets: [
        {
          label: "My Data",
          data: chartData,
          fill: true,
          borderColor: color,
          tension: 0.3,
          borderWidth: 1.2,
          pointBorderColor: "rgba(0, 0, 0, 0)",
          pointBackgroundColor: "rgba(0, 0, 0, 0)",
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: isDarkTheme
            ? "rgba(0,0,0,1)"
            : "rgba(255,255,255,1)",
          pointBorderWidth: 8,
          hideInLegendAndTooltip: false,
          pointStyle: "circle",
          pointRadius: 4,
          backgroundColor: (context: {
            chart: { chartArea: any; ctx?: any; data?: any };
          }) => {
            if (!context.chart.chartArea) {
              return;
            }
  
            const {
              ctx,
              data,
              chartArea: { top, bottom },
            } = context.chart;
  
            const rgbaColor = hexToRgba(color, "0.2");
            const bg = [rgbaColor, "transparent"];
  
            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
            const colorTranches = 1 / (bg.length - 1);
  
            for (let i = 0; i < bg.length; i++) {
              gradientBg.addColorStop(0 + i * colorTranches, bg[i]);
            }
  
            return gradientBg;
          },
        },
      ],
    };
  `,
    },
    {
      type: "p",
      content: "",
    },
    {
      type: "title",
      content: "Multi-Line Chart",
    },
    {
      type:'code',
      content:`const setChartData = ( 
    lineCount: number = 2, // [!code ++] 
    colors: string[] = ["#2563eb", "#9333ea", "#e11d48", "#f97316"],  // [!code ++] 
    isDarkTheme = false 
  ) => { 
    const startDate = new Date(2023, 0, 1);
    const datasets: { x: Date; y: number }[][] = Array(lineCount) // [!code ++] 
      .fill(null) // [!code ++] 
      .map(() => []); // [!code ++] 
  ... `
    },
    {
      type:'p',
      content:"Here’s a small trick to create multi-line charts, I'll share all the code with you soon. I’ll also be sharing other types of charts. <b>Follow me</b> on 𝕏 to stay updated → <a href=\"\https://x.com/tanerengiin\" target=\"\_blank\">tanerengiin</a>"
    }
  ];
  export default toolbar;
  