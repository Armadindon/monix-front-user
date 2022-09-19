import { Slide } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentPage, Pages } from "../Model/ApplicationSlice";

export type PageNavigatorProps = {
  pages: { [pageIndex in Pages]: JSX.Element };
};

/** Utility component for making transitions */
const PageNavigator = ({ pages }: PageNavigatorProps) => {
  const currentPage = useSelector(getCurrentPage);
  const [inTransitionOut, setInTransitionOut] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(pages[currentPage]);

  // At the end of the out animation, we change the component
  const onExited = () => {
    if (!inTransitionOut) return;
    console.log("Animation Ended");
    setInTransitionOut(false);
    setCurrentComponent(pages[currentPage]);
  };

  useEffect(() => {
    if (currentComponent.type !== pages[currentPage].type) {
      setInTransitionOut(true);
    }
  }, [currentPage]);

  return (
    <Slide
      in={!inTransitionOut}
      appear={false}
      direction={
        inTransitionOut ? "right" : "left"
      }
      mountOnEnter
      onExit={() => console.log("exiting")}
      onExited={onExited}
    >
      {/** On met le children dans un fragment pour régler le problème de typage  */}
      <Box>{currentComponent}</Box>
    </Slide>
  );
};

export default PageNavigator;
