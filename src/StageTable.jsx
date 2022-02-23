import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

export default function StageTable({ stageHistory }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>stageName</TableCell>
            {Object.keys(stageHistory).map((stageName) => (
              <TableCell>{stageName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(stageHistory).map((colName) => {
            return (
              <TableRow>
                <TableCell align="left">{colName}</TableCell>
                {Object.keys(stageHistory).map((rowName) => {
                  const timeDiff = (
                    moment(stageHistory?.[rowName]?.startTime).diff(
                      moment(stageHistory?.[colName]?.endTime)
                    ) /
                    (1000*1)
                  ).toFixed(0);
                  if (timeDiff > 0 && colName !== rowName) {
                    return <TableCell align="left">{timeDiff}</TableCell>;
                  } else {
                    return <TableCell align="left">{0}</TableCell>;
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
