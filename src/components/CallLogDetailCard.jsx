import React from "react";
import moment from "moment";
import Grid from "@mui/material/Grid";
import PhoneIcon from "@mui/icons-material/Phone";
import { makeStyles } from "@material-ui/core/styles";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import { Avatar, Typography, Paper } from "@material-ui/core";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";

const useStyle = makeStyles((theme) => ({
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  avatar: {
    width: "3rem",
    height: "3rem",
  },
  calleeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2rem",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: ".5rem",
    textAlign: "center",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  },
  container: {
    borderRadius: "2rem",
    marginTop: "2.5rem",
  }
}));

function CallLogDetailCard({
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

  const date = moment(createdAt).format("MMMM DD, YYYY - hh:mm:ss a");

  let phoneIcon;

  if (callType === "missed") {
    phoneIcon = (<PhoneMissedIcon fontSize="large" style={{ color: "#f44336" }} />);
  } else if (callType === "answered") {
    phoneIcon = <PhoneIcon fontSize="large" style={{ color: "#4caf50" }} />;
  } else if (callType === "voicemail") {
    phoneIcon = <VoicemailIcon fontSize="large" style={{ color: "#2196f3" }} />;
  }

  return (
    <>
      <Paper elevation={5} className={classes.container}>
        <Grid item xs={12}>
          <div className={classes.iconContainer}>{phoneIcon}</div>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.avatarContainer}>
              <Avatar className={classes.avatar} >{from.charAt(0)}</Avatar>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.calleeContainer}>
              <Typography variant="body2">
                {callType ? callType.toUpperCase() : callType} CALL FROM:
              </Typography>
              <Typography variant="h6">{from}</Typography>
              <Typography variant="body1">
                Duration: {duration / 60} min
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.contentContainer}>
              <Typography variant="body1">Call To: {to}</Typography>
              <Typography variant="body1">Via: {via}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.contentContainer}>
              <Typography variant="body1">{date}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.contentContainer}>
              <Typography variant="body1">
                {archive ? "Archived" : null}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CallLogDetailCard;