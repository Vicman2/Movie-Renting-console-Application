const SiteUsers = require("./siteUser")
const inquirer = require("inquirer");
module.exports = class Admin extends SiteUsers{
    constructor(username, userPassword, isLoggedIn, name,email){
        super(username, userPassword, isLoggedIn);
        this.name = name ;
        this.email = email;
    }

    addMovie(){

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "movieToAdd", 
                }
            ])
        
    }

    removeMovie(movieId){

    }

    showAllMovies(){

    }
}