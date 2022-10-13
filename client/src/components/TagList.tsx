import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Chip } from "@mui/material";
import { QUERY_TAGS } from "../utils/queries";

type Tag = {
  _id: string;
  name: string;
};

type TagStates = {
  selectedTags: Set<string>;
  toggleTag: Function;
};

type TagListProps = {
  label?: string;
  rows?: number;
  tagStates: TagStates;
};

function TagList({
  label = `Popular Tags: `,
  tagStates,
  rows = 1,
}: TagListProps) {
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
        WebkitLineClamp: rows,
        WebkitBoxOrient: "vertical",
      }}
    >
      {label}
      {loading ? (
        <Chip label={"Loading tags..."} />
      ) : (
        tags.map((tag: Tag) => {
          const selected: boolean = tagStates.selectedTags.has(tag._id);
          return (
            <Chip
              color={selected ? "primary" : undefined}
              label={tag.name}
              onClick={tagStates.toggleTag(tag._id)}
              key={tag._id}
              sx={{ mr: 0.5 }}
            />
          );
        })
      )}
    </Box>
  );
}

export default TagList;
