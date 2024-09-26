

const chart_making = [
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
    content: "charts/LineChartComponent",
  }, 
  {
    type: "code",
    lang: "text",
    content: `npm install react-chartjs-2 chart.js date-fns chartjs-adapter-date-fns hex-to-rgba --save`,
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
};

const setChartOptions = ( isDarkTheme = false) => {
  return {
    interaction: {
      intersect: false,
      mode: "index",
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    plugins: {
      tooltip: {
        enabled: false,
        position: "nearest",
        external: function (context: { chart: any; tooltip: any }) {
          const { chart, tooltip } = context;
          let tooltipEl = chart.canvas.parentNode.querySelector(
            "div.chartjs-tooltip"
          );
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.classList.add(
              "chartjs-tooltip",
              "label-small",
              "px-2",
              "py-1",
              "dark:bg-neutral-900",
              "bg-white",
              "rounded-[8px]",
              "opacity-100",
              "flex",
              "items-center",
              "justify-center",
              "border",
              "pointer-events-none",
              "absolute",
              "-translate-x-1/2",
              "transition-all",
              "duration-[0.05s]",
              "shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)]"
            );
            chart.canvas.parentNode.appendChild(tooltipEl);
          }

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;

            return;
          }

          if (tooltip.body) {
            const bodyLines = tooltip.body.map((b: { lines: string[] }) => {
              const strArr = b.lines[0].split(":");
              const data = {
                text: strArr[0].trim(),
                value: strArr[1].trim(),
              };

              return data;
            });

            tooltipEl.innerHTML = "";
            bodyLines.forEach((body: { value: string }, i: any) => {
              const text = document.createElement("div");
              text.appendChild(document.createTextNode(body.value));
              text.classList.add(
                "text-sm",
                "text-neutral-950",
                "dark:text-neutral-0",
                "font-medium"
              );
              text.style.fontSize = "14px";
              tooltipEl.appendChild(text);
            });
          }

          const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

          tooltipEl.style.opacity = 1;
          tooltipEl.style.left = positionX + tooltip.caretX + "px";
          tooltipEl.style.top = positionY + tooltip.caretY - 45 + "px";
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          tooltipFormat: "MM/dd/yyyy HH:mm",
        },
        offset: false,
        grid: {
          display: true,
          lineWidth: 1.2,
          color: isDarkTheme ? "#262626" : "#e5e5e5",
        },
        ticks: {
          color: isDarkTheme ? "#737373" : "#a3a3a3",
          padding: 2,
          autoSkip: false,
          maxRotation: 0,
          source: "auto",
        },
        border: {
          display: false,
          dash: [4, 2],
        },
      },
      y: {
        beginAtZero: true,
        display: false,
        min: 0,
      },
    },
  };
};

const setChartPlugins = (isDarkTheme = false) => {
  const hoverLine = {
    id: "hoverLine",
    afterDatasetsDraw: (chart: {
      ctx: any;
      tooltip: any;
      chartArea: {
        top: any;
        bottom: any;
        left: any;
        right: any;
        width: any;
        height: any;
      };
      scales: { x: any; y: any };
    }) => {
      const {
        ctx,
        tooltip,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
      } = chart;

      if (tooltip._active.length > 0) {
        const xCoor = x.getPixelForValue(tooltip.dataPoints[0].raw.x);
        const yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y);
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = tooltip.dataPoints[0].dataset.borderColor;
        ctx.setLineDash([4, 2]);
        ctx.moveTo(xCoor, yCoor);
        ctx.lineTo(xCoor, bottom + 8);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    },
  };

  return [hoverLine];
};

const color = "#2563eb";
const LineChart = () => {
  const [data, setData] = useState<any>();
  const [options, setOptions] = useState<Object>();
  const [plugins, setPlugins] = useState<any>();
 
  useEffect(() => {
    if (!color) return;
    const data = setChartData(color);
    const options = setChartOptions();
    const plugins = setChartPlugins();

    setData(data);
    setOptions(options);
    setPlugins(plugins);
  }, []);

  if(!data) return;
  return (
    {data && (
        <div className="w-full lg:w-96 overflow-auto mx-auto">
            <div className="min-w-[480px] lg:min-w-0 max-h-36 mx-auto">
            <Line
                className="w-full h-full"
                data={data}
                options={options}
                plugins={plugins}
            />
            </div>
        </div>
    )}
  );
};

export default LineChart;
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
    type: "component",
    content: 'charts/MultiLineChart',
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
export default chart_making;
