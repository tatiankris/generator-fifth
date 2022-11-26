import React, {useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {UserType} from "./FakeDataGrid";

export type TablePropsType = {
    users: Array<UserType>
    nextUsers: Array<UserType>
    onScroll: () => void
}
const FakeUsersTable = (props: TablePropsType) => {

    console.log('NEXT', props.nextUsers)
    return (
        <TableContainer component={Paper} >
            <Table sx={{minWidth: 300}} aria-label="simple table">
                <TableHead style={{background: '#EFEFEF'}}>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="left">№</TableCell>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Full Name</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.users && props.users.map((row, index) => (
                        <TableRow
                            key={row.userId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="right">{row.userId}</TableCell>
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">{row.state}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                        </TableRow>
                    ))}
                    {props.nextUsers && props.nextUsers.map((row, index) => (
                        <TableRow
                            key={row.userId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index+21}
                            </TableCell>
                            <TableCell align="right">{row.userId}</TableCell>
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">{row.state}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default FakeUsersTable;