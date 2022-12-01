import {UserType} from "../components/FakeDataGrid";
let seedrandom = require('seedrandom');

const removeSymbol1 = (user: UserType, seed: number) => {
    const numbers = ['userId', 'username', 'state', 'phone']

    const i = Math.floor(seedrandom(seed)() * numbers.length);
    const position = numbers[i]

    const l = Math.floor(seedrandom(seed)() * user[position as keyof UserType].length)

    const str = user[position as keyof UserType]
    const newUser = {...user, [position as keyof UserType]: str.slice(0, l) + str.slice(l + 1)}

    return newUser
}

const addSymbol2 = (user: UserType, seed: number) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var symb = 0; symb < 1; symb++)
        text += possible.charAt(Math.floor(seedrandom(seed)() * possible.length));

    const numbers = ['userId', 'username', 'phone', 'state']
    const i = Math.floor(seedrandom(seed)() * numbers.length);
    const position = (numbers[i])

    const l = Math.floor(seedrandom(seed)() * user[position as keyof UserType].length)

    const str = user[position as keyof UserType]
    const newUser = {...user, [position as keyof UserType]: str.slice(0, -l) + text + str.slice(-l)}

    return newUser
}


const transpositionSymbols3 = (user: UserType, seed: number) => {

    const numbers = ['userId', 'username', 'phone', 'state']

    const i = Math.floor(seedrandom(seed)() * numbers.length);
    const position = numbers[i]

    const str = user[position as keyof UserType]
    const arr = str.split('')


    const l = Math.floor(seedrandom(seed)() * arr.length)

    const arr2 = [...arr]
    if (l + 1 < arr.length) {
        arr2[l] = arr[l + 1];
        arr2[l + 1] = arr[l]
    } else {
        arr2[l] = arr[l - 1];
        arr2[l - 1] = arr[l]
    }

    const str2 = arr2.join('')

    const newUser = {...user, [position as keyof UserType]: str2}

    return newUser

}


function weightedRandom(mistakesNumber: number) {


    let i = mistakesNumber

    function foo() {
        let random = Math.floor(seedrandom(i)() * 100) + 1; // 1..100
        i++
        switch (true) {
            case random < 100 / 3:
                return 1 // 33.3%
            case random < 100 / 1.5:
                return 2 // 33.3%
            default:
                return 3
        }
    }

    let mistakes = {
        1: 0,
        2: 0,
        3: 0,
    }

    for (let i = 0; i < mistakesNumber; i++) {
        mistakes[foo()]++
    }

    return mistakes
}


const howManyCallFoo = (foo: (user: UserType, seed: number) => UserType, count: number, element: UserType, seed: number) => {
    let cou = 0
    if (count === 0) {
        return element
    }

    let user = element as UserType

    if (typeof foo === 'function') {
        for (let i = 0; i < count; i++) {
            user = foo(user, seed + cou)
            cou++
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

    const probability = Math.floor(seedrandom(seed)() * 100)

    if (probability < probableError * 100) {
        e = 1
    }


    const callArr = weightedRandom(Math.floor(mistakesNumber) + e);

    const mistakesUsers = users.map(u => {

        let user1 = howManyCallFoo(removeSymbol1, callArr[1], u, seed)
        let user2 = howManyCallFoo(addSymbol2, callArr[2], user1, seed)
        let user3 = howManyCallFoo(transpositionSymbols3, callArr[3], user2, seed)
        return user3
    })

    return mistakesUsers;
}