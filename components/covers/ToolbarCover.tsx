import React from "react";
import { Toolbar, ToolbarButton, ToolbarButtonLink, ToolbarLink, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from "../ui/toolbar";
import { Bell, Bold, FolderOpen, Heart, Inbox, Italic, MessageCircle, Strikethrough } from "lucide-react";

const ToolbarCover = () => {
  return (
    <div className="relative cover-container flex items-center justify-center">
        <Toolbar className="absolute sm:max-w-[calc(100-12rem)]" position={'center'}>
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
    </div>
  );
};

export default ToolbarCover;



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
];