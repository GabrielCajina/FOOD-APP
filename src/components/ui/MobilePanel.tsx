import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { useMenu } from "../../store/useMenu";

const MobilePanel: React.FC<{ panel: JSX.Element }> = ({ panel }) => {
  const btnRef = React.useRef<any>(null);
  const [isLg] = useMediaQuery("(max-width: 1280px)");
  const { isOpen, setIsOpen } = useMenu();

  function handleClose() {
    setIsOpen(false);
  }

  if (!isLg) {
    return null;
  }
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={handleClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <br />
          {panel}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobilePanel;
