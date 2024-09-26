"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { Chart, registerables } from "chart.js";
import ComponentViewer from "@/components/ComponentViewer";
import hexToRgba from "hex-to-rgba";
import { Slider } from "@/components/ui/slider";

Chart.register(...registerables);

const setChartData = (
  lineCount: number = 2,
  colors: string[] = ["#2563eb", "#9333ea", "#e11d48", "#f97316"],
  isDarkTheme = false
) => {
  const startDate = new Date(2023, 0, 1);
  const datasets: { x: Date; y: number }[][] = Array(lineCount)
    .fill(null)
    .map(() => []);

  Array(12)
    .fill(null)
    .forEach((_, i) => {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);

      datasets.forEach((dataset, datasetIndex) => {
        const randomNum =
          Math.floor(Math.random() * 200) + 200 * (lineCount - datasetIndex);
        dataset.push({ x: new Date(date), y: randomNum });
      });
    });

  const data = datasets.map((dt, i) => {
    const color =
      colors[i] ?? `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return {
      label: `Data Line ${i + 1}`,
      data: dt,
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
    };
  });

  return {
    labels: undefined,
    datasets: data,
  };
};

const setChartOptions = (isDarkTheme = false) => {
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
              "dark:bg-neutral-950",
              "bg-white",
              "rounded-[8px]",
              "overflow-hidden",
              "opacity-100",
              "border",
              "absolute",
              "transition-all",
              "duration-[0.05s]",
              "pointer-events-none",
              "shadow-[0px_16px_32px_-12px_rgba(88,92,95,0.10)]"
            );
            chart.canvas.parentNode.appendChild(tooltipEl);
          }

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }
          const datasetPointsX = tooltip.dataPoints.map(
            (dp: { element: { x: any } }) => dp.element.x
          );
          const avgX =
            datasetPointsX.reduce((a: any, b: any) => a + b, 0) /
            datasetPointsX.length;

          const datasetPointsY = tooltip.dataPoints.map(
            (dp: { element: { y: any } }) => dp.element.y
          );
          const avgY =
            datasetPointsY.reduce((a: any, b: any) => a + b, 0) /
            datasetPointsY.length;

          if (tooltip.body) {
            tooltipEl.innerHTML = "";
            const tooltipHeader = document.createElement("div");
            tooltipHeader.classList.add(
              "bg-neutral-50",
              "dark:bg-neutral-900",
              "px-2.5",
              "py-2",
              "border-b",
              "border-surface",
              "text-left",
              "!text-sm"
            );
            const date = new Date(tooltip.title[0]);
            const options: Intl.DateTimeFormatOptions = {
              year: "numeric",
              month: "long",
            };
            const formattedDate = date.toLocaleString("en-US", options);
            tooltipHeader.appendChild(document.createTextNode(formattedDate));
            tooltipEl.appendChild(tooltipHeader);
            const tooltipBody = document.createElement("div");
            tooltipBody.classList.add(
              "flex",
              "flex-col",
              "gap-2",
              "px-2.5",
              "py-2",
              "min-w-[11rem]"
            );
            tooltip.dataPoints.forEach(
              (
                body: {
                  dataset: { borderColor: string; label: string };
                  formattedValue: string;
                },
                i: any
              ) => {
                const row = document.createElement("div");
                row.classList.add("flex", "items-center", "gap-2", "w-full");
                const point = document.createElement("div");
                point.classList.add("w-2", "h-2", "rounded-full");
                point.style.backgroundColor = body.dataset.borderColor;
                row.appendChild(point);
                const label = document.createElement("span");
                label.appendChild(document.createTextNode(body.dataset.label));
                label.classList.add(
                  "!text-sm",
                  "text-neutral-950",
                  "dark:text-white",
                  "flex-1",
                  "text-left",
                  "capitalize"
                );
                row.appendChild(label);
                const value = document.createElement("span");
                value.appendChild(document.createTextNode(body.formattedValue));
                value.classList.add(
                  "!text-sm",
                  "font-medium",
                  "text-base",
                  "text-neutral-950",
                  "dark:text-white",
                  "text-right"
                );
                row.appendChild(value);
                tooltipBody.appendChild(row);
              }
            );
            tooltipEl.appendChild(tooltipBody);
          }

          const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

          tooltipEl.style.opacity = 1;
          tooltipEl.style.font = tooltip.options.bodyFont.string;
          tooltipEl.style.padding = 0;
          const chartWidth = chart.width;
          const tooltipWidth = tooltipEl.offsetWidth;
          const chartHeight = chart.height;
          const tooltipHeight = tooltipEl.offsetHeight;

          let tooltipX = positionX + avgX + 20;
          let tooltipY = positionY + avgY - tooltipHeight / 2;

          if (tooltipX + tooltipWidth > chartWidth) {
            tooltipX = positionX + avgX - tooltipWidth - 20;
          }

          if (tooltipY < 0) {
            tooltipY = 0;
          } else if (tooltipY + tooltipHeight > chartHeight) {
            tooltipY = chartHeight - tooltipHeight;
          }

          tooltipEl.style.left = tooltipX + "px";
          tooltipEl.style.top = tooltipY + "px";
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
        ctx.strokeStyle = "#737373";
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

const MultiLineChart = () => {
  const [lineCount, setLineCount] = useState<number[]>([3]);
  const [data, setData] = useState<any>();
  const [options, setOptions] = useState<Object>();
  const [plugins, setPlugins] = useState<any>();

  useEffect(() => {
    if (!lineCount[0]) return;
    const data = setChartData(lineCount[0], [
      "#2563eb",
      "#9333ea",
      "#e11d48",
      "#f97316",
      "#0a0a0a",
    ]);
    const options = setChartOptions();
    const plugins = setChartPlugins();

    setData(data);
    setOptions(options);
    setPlugins(plugins);
  }, [lineCount]);
  return (
    <ComponentViewer className="py-20 px-0 overflow-hidden">
      <Slider
        className="max-w-60 w-[90%] mb-10 mx-auto"
        min={2}
        max={5}
        value={lineCount}
        onValueChange={(val) => setLineCount(val)}
      />
      <div className="w-full lg:w-[75%] lg:max-w-[640px] overflow-auto mx-auto">
        <div className="min-w-[600px] lg:min-w-0 max-h-80 mx-auto">
          {data && (
            <Line
              className=" h-full w-full"
              data={data}
              options={options}
              plugins={plugins}
            />
          )}
        </div>
      </div>
    </ComponentViewer>
  );
};

export default MultiLineChart;
