import {UserType} from "../components/FakeDataGrid";
let seedrandom = require('seedrandom');
var rng = seedrandom(0);
console.log("rng", seedrandom(0)())

const removeSymbol1 = (user: UserType, seed: number) => {
    const numbers = ['userId', 'username', 'state', 'phone']

    //вместо Math.random() - seedrandom(seed);
    const i = Math.floor(seedrandom(seed)() * numbers.length);
    const position = numbers[i]

    // console.log('user1', user)
    // console.log('position1', position, user[position as keyof UserType])

    const l = Math.floor(seedrandom(seed)() * user[position as keyof UserType].length)

    const str = user[position as keyof UserType]
    const newUser = {...user, [position as keyof UserType]:  str.slice(0, l) +  str.slice(l+1)}
    // console.log('USER1', user, 'NEWUSER1', newUser)

    return newUser
}
///test
//removeSymbol1(removeSymbol(removeSymbol({userId: '1234', username: 'Dana', phone: '1234', state:'Minsk'})))


const addSymbol2 = (user: UserType, seed: number) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var symb = 0; symb < 1; symb++)
        text += possible.charAt(Math.floor(seedrandom(seed)() * possible.length));

//вместо Math.random() - seedrandom(seed);
    const numbers = ['userId', 'username', 'phone', 'state']
    const i = Math.floor(seedrandom(seed)() * numbers.length);
    const position = (numbers[i])

    // console.log('user2', user)
    // console.log('position2', position, user[position as keyof UserType])

    const l = Math.floor(seedrandom(seed)() * user[position as keyof UserType].length)

    const str = user[position as keyof UserType]
    const newUser = {...user, [position as keyof UserType]:  str.slice(0, -l) + text + str.slice(-l)}
    // console.log('USER2', user, 'NEWUSER2', newUser)

    return newUser
}
// addSymbol2({userId: '1234', username: 'Dana', phone: '1234', state:'Minsk'})



const transpositionSymbols3 = (user: UserType, seed: number) => {

    const numbers = ['userId', 'username', 'phone', 'state']

    //вместо Math.random() - seedrandom(seed);
    const i = Math.floor(seedrandom(seed)() * numbers.length);
    const position = numbers[i]

    // console.log('user3', user)
    // console.log('position3', position, user[position as keyof UserType])

    const str = user[position as keyof UserType]
    const arr = str.split('')



    const l = Math.floor(seedrandom(seed)() * arr.length)

    const arr2 = [...arr]
    if (l+1 < arr.length) {
        arr2[l] = arr[l+1];  arr2[l+1] = arr[l]
    } else {
        arr2[l] = arr[l-1];  arr2[l-1] = arr[l]
    }

    const str2 = arr2.join('')


    const newUser = {...user, [position as keyof UserType]:  str2}
    // console.log('USER3', user, 'NEWUSER3', newUser)

    return newUser

}
// transpositionSymbols3({userId: '1234', username: 'Dana', phone: '1234', state:'Minsk'})

function weightedRandom (mistakesNumber: number) {


    const repeat = 12

    //вместо Math.random() использую seedrandom(x)
    function foo() {
        let random = Math.floor(seedrandom(mistakesNumber)() * 100) + 1; // 1..100
        switch (true) {
            case random < 100/3: return 1 // 33.3%
            case random < 100/1.5: return 2 // 33.3%
            default: return 3
        }
    }

    let mistakes = {
        1: 0,
        2: 0,
        3: 0,
    }

    for (let i=0; i<mistakesNumber; i++) {
        mistakes[foo()]++
    }

    // console.log(mistakes)
    return mistakes
}
//weightedRandom(43);


const howManyCallFoo = (foo: (user: UserType, seed: number) => UserType, count: number,  element: UserType, seed: number) => {
    let cou = 0
    if (count === 0) {
        return element
    }

    // console.log('us', element)

    let user = element as UserType


    if (typeof foo === 'function') {
        for (let i=0; i<count; i++ ) {
            user = foo(user, seed+cou)
            cou++
            // console.log('change', user)
        }
    }
    cou = 0
    return user

}

export const applyMistakes = (mistakesNumber: number, users: Array<UserType>, seed: number) => {

    if (mistakesNumber === 0) {
        return users
    }

    if (users.length === 0) {
        return users
    }

    let e = 0
    const probableError = mistakesNumber - Math.floor(mistakesNumber)
    //Math.random()
    const probability = Math.floor(seedrandom(seed)() * 100)

    if (probability < probableError * 100) {
        e = 1
    }


    const callArr = weightedRandom(Math.floor(mistakesNumber) + e);

    const mistakesUsers = users.map(u => {

        // console.log('THIS user', u)
        let user1 = howManyCallFoo(removeSymbol1, callArr[1], u, seed)
        // console.log('change1', user1)
        let user2 = howManyCallFoo(addSymbol2, callArr[2], user1, seed)
        // console.log('change2', user2)
        let user3 = howManyCallFoo(transpositionSymbols3, callArr[3], user2, seed)
        // console.log('change3', user3)
        return user3
    })

    // console.log('HOW many CALL', cou)

    return mistakesUsers;
}