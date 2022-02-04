import React, { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";

import CallLogDetailContainer from "../components/CallLogDetailContainer";

function ActivityDetail() {
  const params = useParams();

  const [detailData, setDetailData] = useState({});

  const callbackFetch = useCallback(() => {
    const fetchDataById = async () => {
      try {
        const response = await fetch(
          `https://aircall-job.herokuapp.com/activities/${params.activityId}`
        );

        if (!response.ok) {
          throw new Error("Can not fetch data");
        }

        const data = await response.json();

        setDetailData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataById();
  }, [params.activityId]);

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
    }
  };

  useEffect(() => {
    callbackFetch();
  }, [callbackFetch]);

  if (!detailData.id) {
    return <div style={{ textAlign: "center" }}> Page not found</div>;
    
  }

  return (
    <>
      <CallLogDetailContainer
        id={detailData.id}
        createdAt={detailData.created_at}
        direction={detailData.direction}
        from={detailData.from}
        to={detailData.to}
        via={detailData.via}
        duration={detailData.duration}
        archive={detailData.is_archived}
        callType={detailData.call_type}
        postArchive={postArchive}
        callbackFetch={callbackFetch}
      />
    </>
  );
}

export default ActivityDetail;