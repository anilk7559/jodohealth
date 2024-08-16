import { CircularProgress, Box } from "@mui/material";
import React from "react";


export const Loader = () => {

  return (
    <>

        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
           
          }}
        >
          <CircularProgress />
        </Box>
 
    </>
  );
};
