import ComponentViewer from "@/components/ComponentViewer";
import React from "react";
import { Eye, Inbox, MessageCircle, ToggleLeft } from "lucide-react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from "@/components/ui/toolbar";
const items = [
  {
    type: "item",
    label: "Comments",
    icon: MessageCircle,
  },
  {
    type: "item",
    label: "Comments",
    icon: Inbox,
  },
  {
    type: "separator",
  },
  {
    type: "item",
    label: "Comments",
    icon: ToggleLeft,
  },
  {
    type: "item",
    label: "Comments",
    icon: Eye,
  },
  {
    type: "separator",
  },
  {
    type: "item",
    label: "Comments",
    icon: ToggleLeft,
  },
  {
    type: "item",
    label: "Comments",
    icon: Eye,
  },
];

const ToolbarComponent = () => {
  return (
    <ComponentViewer className="h-[480px] relative">
      <Toolbar>
        {items.map((item, index) =>
          item.type === "item" ? (
            <ToolbarButton key={index}>
              {item?.icon ? <item.icon size={18} /> : null}
            </ToolbarButton>
          ) : (
            <ToolbarSeparator key={index} />
          )
        )}
      </Toolbar>
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2  min-w-16 px-1.5 py-1.5 flex items-center rounded-full gap-1 dark shadow-shadow-popover dark:bg-neutral-800 border-black/50 bg-neutral-900 p-1 border-[0.5px] dark:shadow-[inset_0px_1px_0px_rgb(255_255_255_/_0.04),_inset_0px_0px_0px_1px_rgb(255_255_255_/_0.02),_0px_1px_2px_rgb(0_0_0_/_0.4),_0px_2px_4px_rgb(0_0_0_/_0.08),_0px_0px_0px_0.5px_rgb(0_0_0_/_0.24)]">
        {items.map((item, index) =>
          item.type === "item" ? (
            <button
              key={index}
              className="text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            >
              {item?.icon ? <item.icon size={18} /> : null}
            </button>
          ) : (
            <span key={index} className="h-5 w-px bg-white/20 mx-1" />
          )
        )}
      </div> */}
    </ComponentViewer>
  );
};

export default ToolbarComponent;
