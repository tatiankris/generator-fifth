import React, {LegacyRef, useEffect, useState} from 'react';
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
    Radio, Slider, Box, TextField, Input
} from "@mui/material";
import { SliderUnstyled } from '@mui/base';
import MistakesSlider from "./MistakesSlider";
import { faker } from '@faker-js/faker';
import FakeUsersTable from "./FakeUsersTable";
let seedrandom = require('seedrandom');


export type UserType = {
    userId: string
    username: string
    state: string[]
    phone: string
}

function valuetext(value: number) {
    return `${value}°C`;
}

function createRandomUser(): UserType {
    return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        state: [faker.address.country(), faker.address.state(), faker.address.city(), faker.address.streetAddress()],
        phone: faker.phone.phoneNumber()
    };
}





const FakeDataGrid = () => {



    const [mistakeInput, setMistakeInput] = useState<any>(null)
    // const [mistakeSlider, setMistakeSlider] = useState<any>(0)

    const [seedField, setSeedField] = useState<any>(null)
    const [seed, setSeed] = useState<any>(Math.random())

    const handleSubmit = () => {
        console.log('CHANGE FORM')
    }

    //TABLE

    let SECOND_USERS = [];

    function generateNewFakeData() {
        //form data
        //-country: 'de','fr','uz'
        //-mistakes: 3,5
        //-seedCoefficient: 0.1435





    }

    const [locale, setLocale] = useState('de')
    faker.locale = locale
    faker.seed(Number(seed))

    let USERS = Array.from({ length: 20 }, (v) => createRandomUser()) as UserType[];
    let NEXT_USERS = [] as UserType[]
    const [nextUsers, setNextUsers] = useState<UserType[]>([])

    const onScroll = () => {
        Array.from({ length: 10 }).forEach(() => {
            NEXT_USERS.push(createRandomUser());
            });
        setNextUsers(nextUsers.concat(NEXT_USERS));
        // Array.from({ length: 10 }).forEach(() => {
        //     setNextUsers([...nextUsers, createRandomUser()]);
        // });
        console.log('NEXT-USERS', nextUsers.map(e => e.username))
    }


    // Array.from({ length: 20 }).forEach(() => {
    //     USERS.push(createRandomUser());
    // });

    useEffect(() => {
        // debugger

        // Array.from({ length: 20 }).forEach(() => {
        //     USERS.push(createRandomUser());
        // });


    })





    // @ts-ignore
    // @ts-ignore
    return (
        <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>


            <FormControl style={{display: 'block', marginBottom: '30px'}}>
                {/*<form onSubmit={handleSubmit}>*/}
                    <div id={'country'} style={{width: '300px'}}>
                        <FormLabel onChange={handleSubmit} id="demo-row-radio-buttons-group-label">COUNTRY
                        <RadioGroup
                            defaultValue="de"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="de" control={<Radio />} label="DE"/>
                            <FormControlLabel value="az" control={<Radio/>} label="AZ"/>
                            <FormControlLabel value="fr" control={<Radio/>} label="FR"/>
                        </RadioGroup>
                        </FormLabel>
                    </div>

                    <Stack direction="row" spacing={2} style={{marginTop: '30px'}}>
                        <div id={'mistake'} style={{display: 'block'}}>

                            <div style={{width: 300}}>
                                <FormLabel>MISTAKES
                                <Slider // @ts-ignore
                                    onChange={(e, val) => {setMistakeInput(val * 100);

                                        setTimeout(() => {
                                            handleSubmit()
                                        }, 2000)}}
                                    value={mistakeInput / 100}
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
                                </FormLabel>
                                <FormLabel onChange={handleSubmit}>
                                <TextField type={"number"}
                                           style={{width: '250px'}}
                                           id={"quantity"}
                                           name={"quantity"}
                                           inputProps={{step: 0.25, max: 1000, min: 0}}
                                           placeholder={'from 0 to 1000'}
                                           value={mistakeInput}
                                           onChange={(e) => { // @ts-ignore
                                               setMistakeInput(e.currentTarget.value)
                                           }}
                                />
                                </FormLabel>
                            </div>

                        </div>

                        <div style={{display: 'block'}} id={'seed'}>
                            <FormLabel>RANDOM
                            <div style={{marginTop: '34px'}}>
                                <TextField
                                    type={'number'}
                                    placeholder={'Enter seed'}
                                    value={seedField}
                                    onChange={(e) => {setSeedField(e.currentTarget.value)}}

                                />
                                <Button variant="contained" style={{height: '58px'}} onClick={() => {setSeed(seedField)}}>Random</Button>
                            </div>
                        </FormLabel>

                        </div>


                    </Stack>

                {/*</form>*/}
            </FormControl>
            <div onWheel={onScroll}>
                <FakeUsersTable users={USERS} onScroll={onScroll} nextUsers={nextUsers}/>
            </div>




        </Grid>
    )
}

export default FakeDataGrid;