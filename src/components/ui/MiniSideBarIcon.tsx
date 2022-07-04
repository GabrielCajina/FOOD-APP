import { IconButton, MenuIcon } from "@chakra-ui/react";
import Icon from "components/Icon";
import { useRouter } from "next/router";
import React from "react";

interface MiniSideBarIconProps {
  icon: any;
  href: string;
  label?: string;
}

const MiniSideBarIcon: React.FC<MiniSideBarIconProps> = ({
  icon,
  href,
  label = "mini-sidebar-icon",
}) => {
  const router = useRouter();
  return (
    <IconButton
      aria-label={label}
      onClick={() => router.push(href)}
      color={router.pathname === href ? "yellow.500" : undefined}
    >
      <Icon icon={icon} />
    </IconButton>
  );
};

export default MiniSideBarIcon;
