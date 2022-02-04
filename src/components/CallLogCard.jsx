import React from "react";
import { useNavigate } from "react-router";
import moment from "moment";
import Grid from "@mui/material/Grid";
// import { Paper } from "@material-ui/core";
// import { IconButton } from "@material-ui/core";
import PhoneIcon from "@mui/icons-material/Phone";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VoicemailIcon from "@mui/icons-material/Voicemail";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { Typography, Paper, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #bdbdbd",
    borderRadius: "10px",
    padding: "1rem 0.5rem",
    marginBottom: "1rem",
    cursor: "pointer",
  },
  dateContainer: {
    display: "flex",
    fontSize: ".7rem",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    zIndex: 2000,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
  },
  timeContainer: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: ".66rem",
  },
  title: {
    fontWeight: 600,
  },
  callTo: {
    fontSize: ".8rem",
  },
}));

function CallLogCard({
  to,
  id,
  via,
  from,
  archive,
  duration,
  callType,
  createdAt,
  direction,
  postArchive,
}) {
  const classes = useStyles();

  const history = useNavigate();

  const date = moment(createdAt).format("MMMM DD");
  const time = moment(createdAt).format("hh:mm a");

  const detailPageHandler = () => {
    history(`/activity-detail/${id}`);
  };

  const archiveHandler = () => {
    postArchive(id, archive);
  };

  let phoneIcon;

  if (callType === "missed") {
    phoneIcon = (<PhoneMissedIcon fontSize="small" style={{ color: "#f44336" }} />);
  } else if (callType === "answered") {
    phoneIcon = <PhoneIcon fontSize="small" style={{ color: "#2AC420" }} />;
  } else if (callType === "voicemail") {
    phoneIcon = <VoicemailIcon fontSize="small" style={{ color: "#004ba0" }} />;
  }

  return (
    <>
      <div>
        <Paper elevation={2} className={classes.root} >
          <Grid container alignItems="center">
            <Grid item xs={10}>
              <Grid container alignItems="center" onClick={detailPageHandler}>
                <Grid item xs={2}>
                  <div className={classes.iconContainer}>{phoneIcon}<MoreVertIcon style={{ color: "#aeaeae" }} /></div>
                </Grid>
                <Grid item xs={8}>
                  <div className={classes.contentContainer}>
                    <Typography variant="body2" className={classes.title}>
                      {from ? from : "Unknown"}
                    </Typography>
                    <Typography variant="body2" className={classes.callTo}>
                      Tried to call: {to ? to : "Unknown"}
                    </Typography>
                  </div>
                  <Typography variant="body2" className={classes.dateContainer}>{date} at
                    <Typography variant="body2" className={classes.timeContainer}>: {time}</Typography>
                  </Typography>
                </Grid>
                {/* <Grid item xs={2}>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <div onClick={archiveHandler} className={classes.iconContainer}>
                <IconButton>
                  {archive ? <UnarchiveIcon /> : <DriveFileMoveIcon />}
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

export default CallLogCard;