import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl, FormControlLabel, FormLabel,
    Grid,
    RadioGroup, Stack,
    Radio, Slider, TextField
} from "@mui/material";
import {faker} from '@faker-js/faker';
import FakeUsersTable from "./FakeUsersTable";
import {
    cutMistakesUsersAC,
    setLocaleAC,
    setMistakeAC,
    setMistakesUsersAC,
    setSeedAC,
} from "../state/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {applyMistakes} from "../functions/functions";

export type UserType = {
    userId: string
    username: string
    state: string
    phone: string
}

function createRandomUser(): UserType {
    return {
        "userId": faker.datatype.uuid(),
        "username": faker.name.fullName(),
        "state": [faker.address.state(), faker.address.city(), faker.address.street(), faker.address.buildingNumber()].join(','),
        "phone": faker.phone.phoneNumber()
    };
}

const FakeDataGrid = () => {

    const dispatch = useDispatch()
    const params = useSelector((state: AppRootStateType) => state.users.params)
    const mistakesUsers = useSelector((state: AppRootStateType) => state.users.mistakesUsers)
    const [seedField, setSeedField] = useState<any>(0)
    const [mistakeInput, setMistakeInput] = useState<any>(0)

    faker.locale = params.locale
    faker.seed(Number(params.seed))

    const [loadedUsers, setLoadedUsers] = useState(20)

    useEffect(() => {

        const fakeUsers = Array.from({length: loadedUsers}, (v) => createRandomUser()) as UserType[]
        let mistUsers = applyMistakes(params.mistake, fakeUsers, params.seed)
        dispatch(setMistakesUsersAC(mistUsers))

    }, [params, loadedUsers])

    const handleWheelEvent = (e: React.WheelEvent<HTMLDivElement>) => {
        if (e.deltaY > 0) {
            setLoadedUsers(loadedUsers + 10)
        } else {
            return
        }
    };

    return (
        <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>
            <FormControl style={{display: 'block', height: '220px', padding: '20px 20px 20px 20px'}}>
                <div id={'country'} style={{width: '300px'}}>
                    <FormLabel id="demo-row-radio-buttons-group-label">COUNTRY
                        <RadioGroup
                            onChange={(e) => {
                                dispatch(setLocaleAC(e.currentTarget.value));
                                setLoadedUsers(20);
                                dispatch(cutMistakesUsersAC());
                            }}
                            defaultValue="de"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                        >
                            <FormControlLabel value="de" control={<Radio/>} label="DE"/>
                            <FormControlLabel value="ru" control={<Radio/>} label="RU"/>
                            <FormControlLabel value="fr" control={<Radio/>} label="FR"/>
                        </RadioGroup>
                    </FormLabel>
                </div>
                <Stack direction="row" spacing={2} style={{marginTop: '30px'}}>
                    <div id={'mistake'} style={{display: 'block'}}>
                        <div style={{width: 300}}>
                            <FormLabel>MISTAKES
                                <Slider
                                    onChange={(e, val) => {
                                        setMistakeInput(val); // @ts-ignore
                                        dispatch(setMistakeAC(val))
                                    }}
                                    value={mistakeInput}
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    step={0.25}
                                    marks
                                    min={0}
                                    max={10}
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
            </FormControl>
            <div id={'table'} onWheel={handleWheelEvent}
                 style={{margin: '20px 20px 20px 20px', border: '2px solid black', borderRadius: '6px'}}>
                <FakeUsersTable users={mistakesUsers}/>
            </div>
        </Grid>
    )
}

export default FakeDataGrid;