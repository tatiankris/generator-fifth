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
import {FormikErrors, useFormik} from "formik";
import {setLocaleAC, setMistakeAC, setMistakesUsersAC, setSeedAC, setUsersAC} from "../state/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {applyMistakes} from "../functions/functions";


export type UserType = {
    userId: string
    username: string
    state: string
    phone: string
}

function valuetext(value: number) {
    return `${value}°C`;
}

function createRandomUser(): UserType {
    return {
        "userId": faker.datatype.uuid(),
        "username": faker.name.fullName(),
        "state": [ faker.address.state(), faker.address.city(), faker.address.street(), faker.address.buildingNumber()].join(','),
        "phone": faker.phone.phoneNumber()
    };
}

console.log('window', document.documentElement.getBoundingClientRect())

// function populate() {
//     while(true) {
//         let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
//         if (windowRelativeBottom > document.documentElement.clientHeight + 100) break; {
//
//         }
//
//         Array.from({ length: 10 }).forEach(() => {
//             NEXT_USERS.push(createRandomUser());
//         });
//         setNextUsers(nextUsers.concat(NEXT_USERS));
//     }
// }

// window.addEventListener('scroll', populate);
//
// populate();

const FakeDataGrid = () => {

    const dispatch = useDispatch()
    const params = useSelector((state: AppRootStateType) => state.users.params)
    const users = useSelector((state: AppRootStateType) => state.users.users)
    const mistakesUsers = useSelector((state: AppRootStateType) => state.users.mistakesUsers)
    const [seedField, setSeedField] = useState<any>(0)
    const [mistakeInput, setMistakeInput] = useState<any>(0)

    // const [locale, setLocale] = useState('de')
    // const [mistakeSlider, setMistakeSlider] = useState<any>(0)


    // const [seed, setSeed] = useState<any>(Math.random())

    // const data = {
    //     locale,
    //     mistakeInput,
    //     seed
    // }

    // console.log('PARAMS', params)

    faker.locale = params.locale
    faker.seed(Number(params.seed))

    // useEffect(() => {
    //
    //     dispatch(setUsersAC(Array.from({ length: 20 }, (v) => createRandomUser()) as UserType[]));
    //     // console.log('users', users)
    //
    //
    //
    //
    //     // console.log(Array.from({ length: 20 }, (v) => createRandomUser()) as UserType[])
    //
    // }, [params])


    const [loadedUsers, setLoadedUsers] = useState(20)
    const onScroll = () => {

        setLoadedUsers(loadedUsers+10)
        // Array.from({ length: 10 }).forEach(() => {
        //     NEXT_USERS.push(createRandomUser());
        // });
        // setNextUsers(nextUsers.concat(NEXT_USERS));
        // console.log('NEXT-USERS', nextUsers.map(e => e.username))
    }

    useEffect(() => {

        const fakeUsers = Array.from({ length: loadedUsers }, (v) => createRandomUser()) as UserType[]

        let mistUsers = applyMistakes(params.mistake, fakeUsers, params.seed)
        dispatch(setMistakesUsersAC(mistUsers))

        // console.log('mistUsers', mistUsers)
        // console.log('mistUsers', mistUsers)
    },  [params, loadedUsers])



    let NEXT_USERS = [] as UserType[]
    const [nextUsers, setNextUsers] = useState<UserType[]>([])




    // console.log('users', users)
    // console.log('mistAKESUsers', mistakesUsers)
    // console.log(params)


    return (
        <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>


            <FormControl style={{display: 'block', height: '220px', padding: '20px 20px 20px 20px'}}>
                {/*<form onSubmit={handleSubmit}>*/}
                    <div id={'country'} style={{width: '300px'}}>
                        <FormLabel  id="demo-row-radio-buttons-group-label">COUNTRY
                        <RadioGroup
                            onChange={(e) => {dispatch(setLocaleAC(e.currentTarget.value))}}
                            defaultValue="de"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            // name="row-radio-buttons-group"

                        >
                            <FormControlLabel value="de" control={<Radio />} label="DE"/>
                            <FormControlLabel value="ru" control={<Radio/>} label="RU"/>
                            <FormControlLabel value="fr" control={<Radio/>} label="FR"/>
                        </RadioGroup>
                        </FormLabel>
                    </div>

                    <Stack direction="row" spacing={2} style={{marginTop: '30px'}}>
                        <div id={'mistake'} style={{display: 'block'}}>

                            <div style={{width: 300}}>
                                <FormLabel>MISTAKES
                                <Slider // @ts-ignore
                                    onChange={(e, val) => {setMistakeInput(val*100); dispatch(setMistakeAC(val*100))}
                                    }
                                    value={mistakeInput/100}


                                    aria-label="Temperature"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    step={0.25}
                                    marks
                                    min={0}
                                    max={10}
                                    // value={mistakeValue/100}
                                    // onChange={(e) => {setMistakeValue(e.currentTarget.value ? e.currentTarget.value * 100 : 0)}}
                                />
                                </FormLabel>
                                <FormLabel>
                                <TextField type={"number"}
                                           style={{width: '250px'}}
                                           id={"quantity"}
                                           name={"quantity"}
                                           inputProps={{step: 1, max: 1000, min: 0}}
                                           placeholder={'from 0 to 1000'}
                                           value={mistakeInput}
                                           onChange={(e) => { // @ts-ignore
                                               setMistakeInput(e.currentTarget.value)
                                               dispatch(setMistakeAC(Number(e.currentTarget.value)))

                                           }}
                                />
                                </FormLabel>
                            </div>

                        </div>

                        <div style={{display: 'block'}} id={'seed'}>
                            <FormLabel>SEED
                            <div style={{marginTop: '34px'}}>
                                <TextField
                                    type={'number'}
                                    placeholder={'Enter seed'}
                                    value={seedField}
                                    onChange={(e) => {
                                        setSeedField(e.currentTarget.value);
                                        dispatch(setSeedAC(Number(e.currentTarget.value)))
                                    }}

                                />
                                <Button variant="contained" style={{height: '58px'}} onClick={() => {

                                    const random = Math.floor(Math.random() * 1000)
                                    setSeedField(random)
                                    dispatch(setSeedAC(random))
                                }}>Random</Button>
                            </div>
                        </FormLabel>

                        </div>


                    </Stack>

                {/*</form>*/}
            </FormControl>
            <div id={'table'} onWheel={onScroll} style={{padding: '20px 20px 20px 20px'}}>
                <FakeUsersTable users={mistakesUsers} nextUsers={nextUsers}/>
            </div>




        </Grid>
    )
}

export default FakeDataGrid;