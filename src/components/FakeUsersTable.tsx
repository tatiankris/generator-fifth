import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {UserType} from "./FakeDataGrid";

export type TablePropsType = {
    users: Array<UserType>
}
const FakeUsersTable = (props: TablePropsType) => {

    return (
        <TableContainer component={Paper} sx={{minWidth: 800}}>
            <Table aria-label="simple table">
                <TableHead style={{background: '#EFEFEF'}}>
                    <TableRow>
                        <TableCell sx={{width: 50}} align="left">№</TableCell>
                        <TableCell sx={{width: 300}}  align="right">ID</TableCell>
                        <TableCell sx={{width: 300}}  align="right">Full Name</TableCell>
                        <TableCell sx={{width: 300}}  align="right">Address</TableCell>
                        <TableCell sx={{width: 300}}  align="right">Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.users.length > 0 && props.users.map((row, index) => (
                        <TableRow

                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0}}}
                            style={{maxHeight:200}}
                        >
                            <TableCell component="th" scope="row">
                                <div>{index+1}</div>
                            </TableCell>
                            <TableCell  align="right">
                                <div style={{whiteSpace: "pre-wrap"}}>{row.userId}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div style={{whiteSpace: "pre-wrap"}}>{row.username}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div style={{whiteSpace: "pre-wrap"}}>{row.state}</div>
                            </TableCell>
                            <TableCell  align="right">
                                <div style={{whiteSpace: "pre-wrap"}}>{row.phone}</div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default FakeUsersTable;