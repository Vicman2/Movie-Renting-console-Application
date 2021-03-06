// The renter class that extends the siteUser
const siteUser = require("./siteUser");
const users = require("./users.js");
const rentedMovies = require("./rentedMovies");


module.exports = class Renter extends siteUser{
    constructor(username, userPassword, isLoggedIn, name,email, accountBalace){
        super(username, userPassword, isLoggedIn);
        this.name = name;
        this.email = email;
        this.accountBalace = accountBalace
    }

    profile(){
        let foundUser = users.find(userMe => userMe.name == this.name && userMe.password == this.userPassword)
        if(foundUser){
            return foundUser;
        }else{
            console.log("User not found");
        }
    }

    showRentedMovies(){
        let found = rentedMovies.find(me => me.name == this.name);
        if(found){
            console.table(found.rentaMovies);
        }else{
            console.log("===========================================");
            console.log();
            console.log("You have not rented any movie yet");
        }
    }

    upgradeAccount(amount1){
        amount1 = parseFloat(amount1);
        this.accountBalace += amount1
    }

    rentMovies(movieToRent){
        if(this.accountBalace > movieToRent.moviePrice){
            let found = rentedMovies.find(defound => defound.name == this.name);
            let foundInDb = users.find(defound => defound.name == this.name)
            if(found){
                this.accountBalace -= movieToRent.moviePrice;
                foundInDb.balance -= movieToRent.moviePrice;
                found.rentaMovies.push(movieToRent.movieName);
                console.log("=============================")
                console.log();
                console.log("Movie have been rented");
                console.log(movieToRent.movieName);
                console.log();
                console.log("Your balance is : " , this.accountBalace);
                console.log();
             }else{
                rentedMovies.push({
                    name: this.name,
                    rentaMovies: [movieToRent.movieName]
                })
                this.accountBalace -= movieToRent.moviePrice;
                foundInDb.balance -= movieToRent.moviePrice
                console.log("=============================")
                console.log();
                console.log("Movie have been rented");
                console.log(movieToRent.movieName);
                console.log();
                console.log("Your balance is : " , this.accountBalace);
                console.log();
            }
        }else{
            console.log("===================")
            console.log("Insufficient Account");
            console.log();
            console.log("=====================");
        }
    }



}