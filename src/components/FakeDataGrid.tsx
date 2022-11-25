import React, {useState} from 'react';
import {
    Button,
    Container, FormControl, FormControlLabel, FormLabel,
    Grid,
    IconButton,
    Paper, RadioGroup, Stack,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Radio, Slider, Box, TextField
} from "@mui/material";
import { SliderUnstyled } from '@mui/base';
import MistakesSlider from "./MistakesSlider";
function valuetext(value: number) {
    return `${value}°C`;
}

const FakeDataGrid = () => {

    const [mistakeValue, setMistakeValue] = useState<number>(0)
    const [random, setRandom] = useState(0)

    return (
        <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>

            {/*<Stack spacing={2}>*/}


            <FormControl style={{display: 'block', marginBottom: '30px'}}>
                <FormLabel id="demo-row-radio-buttons-group-label">COUNTRY</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="de" control={<Radio/>} label="DE"/>
                    <FormControlLabel value="az" control={<Radio/>} label="AZ"/>
                    <FormControlLabel value="fr" control={<Radio/>} label="FR"/>
                </RadioGroup>
                {/*</FormControl>*/}


                <Stack direction="row" spacing={2} style={{marginTop: '30px'}}>
                    <div id={'mistake'} style={{display: 'block'}}>
                        <FormLabel>MISTAKES</FormLabel>
                        <div style={{width: 300}}>
                            <Slider
                                onChange={(event) => { // @ts-ignore
                                    setMistakeValue(9)}}
                                aria-label="Temperature"
                                defaultValue={0}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                step={0.25}
                                marks
                                min={0}
                                max={10}
                                // value={mistakeValue/100}
                                // onChange={(e) => {setMistakeValue(e.currentTarget.value ? e.currentTarget.value * 100 : 0)}}
                            />
                            <TextField value={mistakeValue}/>
                        </div>
                    </div>

                    <div style={{display: 'block'}} id={'seed'}>
                        <FormLabel>SEED</FormLabel>
                        <div style={{marginTop: '34px'}}>
                            <TextField value={random}/>
                            <Button variant="contained" style={{height: '58px'}} onClick={() => {
                                setRandom(2)
                            }}>Random</Button>
                        </div>

                    </div>


                </Stack>


            </FormControl>
            {/*</Stack>*/}

        <TableContainer component={Paper}>
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
            </Table>
        </TableContainer>
        </Grid>
    )
}

export default FakeDataGrid;