"use client";
import React, { useState } from "react";
import {
  Bell,
  Bold,
  FolderOpen,
  Heart,
  Inbox,
  Italic,
  MessageCircle,
  Strikethrough,
} from "lucide-react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarButtonLink,
  ToolbarLink,
  ToolbarPortal,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "@/components/ui/toolbar";
import ComponentViewer from "@/components/ComponentViewer";
const ToolbarComponent = () => {
  const [selectedOrientation, setSelectedOrientation] = useState("horizontal");
  const [selectedPosition, setSelectedPosition] = useState("bottom");
  return (
    <ComponentViewer className="min-h-[360px] ">
      <div
        className="w-full flex flex-col gap-6 items-center justify-center"
        style={{ gap: "1.5rem" }}
      >
        <div
          className="flex items-center gap-1 border p-1 rounded-lg bg-white"
          style={{ flexWrap: "wrap" }}
        >
          {orientationData.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedOrientation(item.id)}
              className={`text-sm px-2 py-1 rounded-md  transition-all
              ${
                item.id === selectedOrientation
                  ? "bg-neutral-900 text-white"
                  : "hover:bg-neutral-200"
              }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          className="flex flex-wrap items-center gap-1 border p-1 rounded-lg bg-white"
          style={{ flexWrap: "wrap" }}
        >
          {positionData.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedPosition(item.id)}
              className={`text-sm px-2 py-1 rounded-md  transition-all whitespace-nowrap
              ${
                item.id === selectedPosition
                  ? "bg-neutral-900 text-white"
                  : "hover:bg-neutral-200"
              }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <ToolbarPortal>
        <Toolbar orientation={selectedOrientation} position={selectedPosition}>
          {items.map((item, index) =>
            item.type === "item" ? (
              <ToolbarButton key={item.id}>
                {item?.icon ? <item.icon size={16} /> : null}
              </ToolbarButton>
            ) : item.type === "link" ? (
              <ToolbarButtonLink href={""} key={item.id}>
                {item?.icon ? <item.icon size={16} /> : null}
              </ToolbarButtonLink>
            ) : (
              <ToolbarSeparator key={item.id} />
            )
          )}
          <ToolbarSeparator />
          <ToolbarButton size={"text"} label="Comments" variant={"destructive"}>
            <MessageCircle size={16} />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarToggleGroup type={"single"}>
            <ToolbarToggleItem value="bold">
              <Bold size={16} />
            </ToolbarToggleItem>
            <ToolbarToggleItem value="italic">
              <Italic size={16} />
            </ToolbarToggleItem>
            <ToolbarToggleItem value="strike">
              <Strikethrough size={16} />
            </ToolbarToggleItem>
          </ToolbarToggleGroup>
          <ToolbarSeparator />
          <ToolbarLink>Edited 2 hours ago</ToolbarLink>
        </Toolbar>
      </ToolbarPortal>
    </ComponentViewer>
  );
};

export default ToolbarComponent;

const items = [
  {
    id: 0,
    type: "link",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: 1,
    type: "item",
    label: "Inbox",
    icon: Inbox,
  },
  {
    id: 2,
    type: "separator",
  },
  {
    id: 3,
    type: "item",
    label: "Likes",
    icon: Heart,
  },
  {
    id: 4,
    type: "item",
    label: "Files",
    icon: FolderOpen,
  },
];

const orientationData = [
  {
    label: "Horizontal",
    id: "horizontal",
  },
  {
    label: "Vertical",
    id: "vertical",
  },
];

const positionData = [
  {
    label: "Center",
    id: "center",
  },
  {
    label: "Bottom",
    id: "bottom",
  },
  {
    label: "Top",
    id: "top",
  },
  {
    label: "Left",
    id: "left",
  },
  {
    label: "Right",
    id: "right",
  },
  {
    label: "Top Left",
    id: "topleft",
  },
  {
    label: "Top Right",
    id: "topright",
  },
  {
    label: "Bottom Left",
    id: "bottomleft",
  },
  {
    label: "Bottom Right",
    id: "bottomright",
  },
];
