import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CallLogCard from "./CallLogCard";

const useStyles = makeStyles((theme) => ({
  noItem: {
    textAlign: "center",
    padding: "1rem 0",
    fontSize: "1rem",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    margin: " 2rem 3rem",
  },
}));

function CallLogContainer() {
  const classes = useStyles();

  useEffect(() => {
    fetchActivity();
  }, []);

  const [cardData, setCardData] = useState([]);
  // const [loading, setLoading] = React.useState(false);

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
        throw new Error("Fetching Data Error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      await fetchActivity();
    }
  };

  const filteredCardInfo = cardData.filter((item) => !item.is_archived);

  return (
    <>
      <div className={classes.root}>
        {filteredCardInfo.length > 0 ? (
          filteredCardInfo.map((item) => (
            <CallLogCard
              key={item.id}
              id={item.id}
              createdAt={item.created_at}
              direction={item.direction}
              from={item.from}
              to={item.to}
              via={item.via}
              duration={item.duration}
              archive={item.is_archived}
              callType={item.call_type}
              postArchive={postArchive}
            />
          ))
        ) : (
          <Typography variant="body2" className={classes.noItem}>
            Call Log Empty
          </Typography>
        )}
      </div>
    </>
  );
}

export default CallLogContainer;