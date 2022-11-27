import React, {useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {UserType} from "./FakeDataGrid";

export type TablePropsType = {
    users: Array<UserType>
    nextUsers: Array<UserType>
}
const FakeUsersTable = (props: TablePropsType) => {

    // console.log('NEXT', props.nextUsers)
    return (
        <TableContainer component={Paper} sx={{minWidth: 800}}>
            <Table aria-label="simple table"
                   // sx={{minWidth: "800px", maxWidth: "1500px"}}

            >
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
                    {props.nextUsers && props.nextUsers.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0}}}
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