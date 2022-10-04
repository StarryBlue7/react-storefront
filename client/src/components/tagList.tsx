import React from "react";
import { useQuery } from "@apollo/client";
import { Typography, Chip } from "@mui/material";
import { QUERY_TAGS } from "../utils/queries";

function TagList() {
  const { loading, data } = useQuery(QUERY_TAGS, {
    fetchPolicy: "no-cache",
  });

  const tags = data?.tags || [];

  return (
    <Typography
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "1",
        WebkitBoxOrient: "vertical",
      }}
    >
      {`Popular Tags: `}
      {loading ? (
        <Chip label={"Loading tags..."} />
      ) : (
        <>
          {tags.map((tag: any) => (
            <>
              <Chip
                color="primary"
                label={tag.name}
                onClick={() => {}}
                key={tag.name}
              />{" "}
            </>
          ))}
        </>
      )}
    </Typography>
  );
}

export default TagList;
