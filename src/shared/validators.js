
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function emailValidator(text) {
    if(text.matches(emailRegex)){
        return null;
    } else {
        return "email not valid";
    }
}

export function required(text) {
    if (text !== "" && text !== null && text !== undefined){
        return null;
    } else {
        return "required";
    }
}