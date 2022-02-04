import React, { useState, useEffect } from "react";
import CallLogCard from "./CallLogCard";
import ReplayIcon from '@mui/icons-material/Replay';
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  noItem: {
    textAlign: "center",
    padding: "1rem 0",
    fontSize: "1rem",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
}));

function ArchiveContainer() {
  const classes = useStyles();

  useEffect(() => {
    fetchActivity();
  }, []);

  const [cardData, setCardData] = useState([]);

  const fetchActivity = async () => {
    try {
      const response = await fetch(
        "https://aircall-job.herokuapp.com/activities"
      );
      if (!response.ok) {
        throw new Error("Can not fetch data");
      }
      const data = await response.json();
      setCardData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const postArchive = async (id, archive) => {
    try {
      const response = await fetch(
        `https://aircall-job.herokuapp.com/activities/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_archived: !archive }),
        }
      );
      if (!response.ok) {
        throw new Error("Can not fetch data");
      }
    } catch (error) {
      console.error(error);
    } finally {
      await fetchActivity();
    }
  };

  const resetActivity = async () => {
    try {
      const response = await fetch("https://aircall-job.herokuapp.com/reset");
      if (!response.ok) {
        throw new Error("Can not fetch data");
      }
    } catch (error) {
      console.error(error);
    } finally {
      await fetchActivity();
    }
  };

  const resetHandler = () => {
    resetActivity();
  };

  const filteredCardInfo = cardData.filter((item) => item.is_archived);

  return (
    <>
      <div className={classes.root}>
        {filteredCardInfo.length > 0 ? (
          filteredCardInfo.map((item) => (
            <CallLogCard
              key={item.id}
              id={item.id}
              to={item.to}
              via={item.via}
              from={item.from}
              duration={item.duration}
              direction={item.direction}
              archive={item.is_archived}
              createdAt={item.created_at}
              callType={item.call_type}
              postArchive={postArchive}
            />
          ))
        ) : (
          <Typography variant="body2" className={classes.noItem}>
            No archived activity
          </Typography>
        )}

        {filteredCardInfo.length > 0 ? (
          <div className={classes.btnContainer}>
            <Button
              variant="outlined"
              disableElevation
              onClick={resetHandler}
              className={classes.btn}
              startIcon={<ReplayIcon sx={{ color: "#2AC420", }} />}
            >
              Return All to Call Log
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ArchiveContainer;