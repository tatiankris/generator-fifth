import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {UserType} from "./FakeDataGrid";

export type TablePropsType = {
    users: Array<UserType>
}
const FakeUsersTable = (props: TablePropsType) => {

    return (
        <TableContainer component={Paper} sx={{minWidth: 1400, maxWidth: 1400}}>
            <Table aria-label="simple table">
                <TableHead style={{background: '#EFEFEF'}}>
                    <TableRow>
                        <TableCell sx={{minWidth: 40}} align="left">№</TableCell>
                        <TableCell sx={{minWidth: 200}}  align="right">ID</TableCell>
                        <TableCell sx={{minWidth: 200}}  align="right">Full Name</TableCell>
                        <TableCell sx={{minWidth: 200}}  align="right">Address</TableCell>
                        <TableCell sx={{minWidth: 200}}  align="right">Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.users.length > 0 && props.users.map((row, index) => (
                        <TableRow

                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0},  }}
                            style={{maxHeight:200}}
                        >
                            <TableCell sx={{whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 40}} component="th" scope="row">
                                <div>{index+1}</div>
                            </TableCell>
                            <TableCell sx={{whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 200}}
                                       align="right">
                                {/*<div style={{whiteSpace: "pre-wrap"}}>{row.userId}</div>*/}
                                {row.userId}
                            </TableCell>
                            <TableCell sx={{whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 200}}
                                       align="right">
                                {/*<div style={{whiteSpace: "pre-wrap"}}>{row.username}</div>*/}
                                {row.username}
                            </TableCell>
                            <TableCell sx={{whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 200}}
                                       align="right">
                                {/*<div style={{whiteSpace: "pre-wrap"}}>{row.state}</div>*/}
                                {row.state}
                            </TableCell>
                            <TableCell sx={{whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 200}}
                                       align="right">
                                {/*<div style={{whiteSpace: "pre-wrap"}}>{row.phone}</div>*/}
                                {row.phone}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default FakeUsersTable;