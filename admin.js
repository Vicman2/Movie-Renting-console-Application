const siteUsers = require("./siteUser");

module.exports = class admin extends siteUsers{
    constructor(username, password, isLogedIn, adminName, adminMobileNumber, adminEmail){
        super(username, password, isLogedIn)
        this.adminName = adminName
        this.adminEmail = adminEmail;
        this.adminMobileNumber = adminMobileNumber
    }
    blockUser(){
        //This method will block the user
    }

    confirmPayment(){
        //This method will confifrm the payment from users
    }
}