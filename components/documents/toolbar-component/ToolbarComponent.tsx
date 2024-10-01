"use client";
import ComponentViewer from "@/components/ComponentViewer";
import React, { useRef } from "react";
import { Eye, Inbox, MessageCircle, ToggleLeft } from "lucide-react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarPortal,
  ToolbarSeparator,
} from "@/components/ui/toolbar";

const items = [
  {
    id: 0,
    type: "item",
    label: "Comments",
    icon: MessageCircle,
  },
  {
    id: 1,
    type: "item",
    label: "Comments",
    icon: Inbox,
  },
  {
    id: 2,
    type: "separator",
  },
  {
    id: 3,
    type: "item",
    label: "Comments",
    icon: ToggleLeft,
  },
  {
    id: 4,
    type: "item",
    label: "Comments",
    icon: Eye,
  },
  {
    id: 5,
    type: "separator",
  },
  {
    id: 6,
    type: "item",
    label: "Comments",
    icon: ToggleLeft,
  },
  {
    id: 7,
    type: "item",
    label: "Comments",
    icon: Eye,
  },
];
const ToolbarComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <ComponentViewer id="my-container" ref={containerRef} className="h-[480px]">
      <ToolbarPortal>
        <Toolbar>
          {items.map((item, index) =>
            item.type === "item" ? (
              <ToolbarButton key={item.id}>
                {item?.icon ? <item.icon size={18} /> : null}
              </ToolbarButton>
            ) : (
              <ToolbarSeparator key={item.id} />
            )
          )}
        </Toolbar>
      </ToolbarPortal>
    </ComponentViewer>
  );
};

export default ToolbarComponent;
