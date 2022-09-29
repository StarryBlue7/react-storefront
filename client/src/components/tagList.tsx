import React from "react";
import { useQuery } from "@apollo/client";
import { Chip } from "@mui/material";
import { QUERY_TAGS } from "../utils/queries";

const styles = {
  tagContainer: {
    display: "flex",
    flexFlow: "wrap",
    gap: "5px",
  },
};

function TagList() {
  const { loading, data } = useQuery(QUERY_TAGS, {
    fetchPolicy: "no-cache",
  });

  const tags = data?.tags || [];

  return (
    <div style={styles.tagContainer}>
      {loading ? (
        <Chip label={"Loading tags..."} />
      ) : (
        <>
          {tags.map((tag: any, i: number) => (
            <Chip key={i} label={tag.name} onClick={() => {}} />
          ))}
        </>
      )}
    </div>
  );
}

export default TagList;
