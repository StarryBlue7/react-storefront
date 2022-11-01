import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type Row = {
  row: string;
  values: (string | number)[];
  spacer?: number;
};

type Data = {
  label: string;
  headers?: string[];
  entries: Row[];
  footers?: Row[];
};

type Props = {
  data: Data;
};

export default function DetailsTable({ data }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label={data.label}>
        {data?.headers && data?.headers.length && (
          <TableHead>
            <TableRow sx={{ bgcolor: "gainsboro" }}>
              {data?.headers.map((header, i) => (
                <TableCell align={i === 0 ? "left" : "right"} key={header}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.entries.map((entry) => (
            <TableRow
              key={entry.row}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {entry.row}
              </TableCell>
              {entry.values.map((value, i) => (
                <TableCell align="right" key={entry.row + i}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {data?.footers &&
            data?.footers.length &&
            data.footers.map((entry) => (
              <TableRow
                key={entry.row}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  bgcolor: "gainsboro",
                }}
              >
                <TableCell component="th" scope="row" colSpan={entry.spacer} />
                <TableCell component="th" scope="row" sx={{ py: 0 }}>
                  {entry.row}
                </TableCell>
                {entry.values.map((value, i) => (
                  <TableCell align="right" key={entry.row + i} sx={{ py: 0 }}>
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
