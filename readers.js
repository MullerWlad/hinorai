import { json } from 'express'
import fs from 'fs'
import {User} from './user.js'

var getData = () => {
    var data = null
    return data
}
var setData = (user) => {}

//func
export var signUp = (login, password, key) => {
    var data = getData('./data/users.json')
    if(data[login] === undefined && data.hinorai.key == key) {
        setData(new User(login, password, "default", "default", "none", {}))
        return true
    }
    else{
        return false
    }
}
export var signIn = (login, password) => {
    var data = getData()
    if(data[login] == login && data[login].password == password) {
        return true
    }
    else {
        return false
    }
}