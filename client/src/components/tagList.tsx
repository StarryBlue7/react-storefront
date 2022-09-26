import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_TAGS } from "../utils/queries";

function TagList() {
  const { loading, data } = useQuery(QUERY_TAGS, {
    fetchPolicy: "no-cache",
  });

  const tags = data?.tags || [];

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {tags.map((tag: any, i: number) => (
            <li key={i}>{tag.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagList;
