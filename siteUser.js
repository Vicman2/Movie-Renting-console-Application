const user = require("./users");
module.exports = class{
    constructor(username, userPassword, isLoggedIn){
        this.username = username;
        this.userPassword = userPassword;
        this.isLoggedIn = isLoggedIn
    }

    verifyLoginStatus(){
        if(this.isLoggedIn == true){
            return true
        }else{
            return false;
        }
    }
}