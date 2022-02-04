import React from "react";
import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid";
import { Button } from "@material-ui/core";
import CallLogDetailCard from "./CallLogDetailCard";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyle = makeStyles((theme) => ({
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    margin: " 2rem 3rem",
  },
}));

function CallLogDetailContainer({
  id,
  to,
  via,
  from,
  archive,
  duration,
  callType,
  createdAt,
  direction,
}) {
  const classes = useStyle();

  const history = useNavigate();

  const backHandler = () => {
    history("/activity");
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <CallLogDetailCard
            id={id}
            to={to}
            via={via}
            from={from}
            archive={archive}
            duration={duration}
            callType={callType}
            createdAt={createdAt}
            direction={direction}
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.btnContainer}>
            <Button
              variant="outlined"
              disableElevation
              onClick={backHandler}
              className={classes.btn}
              startIcon={<ArrowBackIcon sx={{color: "#2AC420",}} />}
            >
              Back
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default CallLogDetailContainer;