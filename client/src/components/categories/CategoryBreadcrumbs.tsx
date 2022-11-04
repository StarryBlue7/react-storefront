import * as React from "react";
import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Grid, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY } from "../../utils/queries";
import { urlString } from "../../utils/url";

type Props = {
  categoryId?: string;
};

type Category = {
  _id: string;
  name: string;
  parentCategory?: Category;
};

export default function CategoryBreadcrumbs({ categoryId }: Props) {
  const { loading, data } = useQuery(QUERY_CATEGORY, {
    variables: { categoryId },
    fetchPolicy: "cache-first",
  });

  const categoryChain = React.useMemo(() => {
    const category = data?.category || {};
    const chain: Category[] = [];
    // Recursively add parent categories to array
    function flattenParents(category: Category): any {
      chain.push({ _id: category._id, name: category.name });
      if (!category.parentCategory) {
        return;
      }
      return flattenParents(category.parentCategory);
    }

    flattenParents(category);

    return chain.reverse();
  }, [data]);

  return (
    <Grid container>
      {!loading && (
        <Breadcrumbs
          separator={<NavigateNext color="primary" fontSize="medium" />}
          aria-label="breadcrumb"
        >
          {categoryChain.map((category: Category, i: number) => {
            if (i === categoryChain.length - 1) {
              return (
                <Typography
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                  key={category.name}
                >
                  {category.name}
                </Typography>
              );
            }
            return (
              <Link
                to={`/category/${category._id}/${urlString(category.name)}`}
                key={category.name}
              >
                <Typography color="text.primary">{category.name}</Typography>
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
    </Grid>
  );
}
