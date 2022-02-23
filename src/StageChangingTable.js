import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function StageChangingTable(props) {
  const { stageHistory } = props;

  useEffect(() => {
    console.log({ stageHistory });
  });

  return (
    <div>
      {/* {JSON.stringify(stageHistory)} */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stage Changing Widget</TableCell>
              {stageHistory != null ? (
                Object.keys(stageHistory).map((key) => (
                  <TableCell component="th" scope="row">
                    {stageHistory?.[`${key}`]?.name}
                  </TableCell>
                ))
              ) : (
                <TableCell component="th" scope="row">
                  Some
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {stageHistory != null ? (
              Object.keys(stageHistory).map((key) => (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.keys(stageHistory?.[`${key}`]).map((id) => {
                    return (
                      <TableCell component="th" scope="row">
                        {stageHistory?.[`${key}`]?.[`${id}`]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableCell component="th" scope="row">
                Some
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StageChangingTable;
