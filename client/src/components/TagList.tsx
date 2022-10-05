import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Chip } from "@mui/material";
import { QUERY_TAGS } from "../utils/queries";

type Tag = {
  _id: string;
  name: string;
};

function TagList() {
  const { loading, data } = useQuery(QUERY_TAGS, {
    fetchPolicy: "no-cache",
  });

  const tags = data?.tags || [];

  return (
    <Box
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
        tags.map((tag: Tag) => (
          <Chip
            color="primary"
            label={tag.name}
            onClick={() => {}}
            key={tag._id}
            sx={{ mr: 0.5 }}
          />
        ))
      )}
    </Box>
  );
}

export default TagList;
