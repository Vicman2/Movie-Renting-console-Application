const SiteUsers = require("./siteUser")
const inquirer = require("inquirer");
const Movies = require("./movies");
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
                    name: "movieeName", 
                    message: "Please enter the name of the Movie "
                },
                {
                    type: "input",
                    name: "movieGenre", 
                    message: "Please enter the  Genre of the Movie "
                },
                {
                    type: "input",
                    name: "yearOfProduction", 
                    message: "Please enter the year of production "
                },
                {
                    type: "input",
                    name: "productionCompany", 
                    message: "Please enter the year of production "
                },
                {
                    type: "input",
                    name: "movieDirector", 
                    message: "Please enter the director  of the Movie"
                },
                {
                    type: "input",
                    name: "runTime", 
                    message: "Enter movie runtime"
                },
                {
                    type: "input",
                    name: "movieRating", 
                    message: "Please enter the name of the Movie "
                },
                {
                    type: "input",
                    name: "moviePrice", 
                    message: "Please enter the price of the movie "
                }
            ])
            .then( answers => {
                let movieIdent = Movies.length +1

                 let movieArray = [movieIdent, answers.movieeName, answers.movieGenre, answers.yearOfProduction, answers.productionCompany, answers.movieDirector, answers.runTime, answers.moviePrice];
                Movies.push(movieArray);
            })
        
    }

    removeMovie(){
        inquirer 
            .prompt([
                {
                    type : "input",
                    name: "movieId",
                    message: "Input the name of the movie you want to remove from the list ",
                    validate: function(id){
                        if(Number.isInteger(parseInt(id)) && id <= Movies.length && id > 0){
                            return true;
                        }else{
                            return "Input a valid id"
                        }
                    }
                }
            ])
            .then( answers => {
                let found = Movies.find(mee => answers.movieId == mee.movieId)
                Movies.pop(found);
            })


    }

    showAllMovies(){
        console.log(Movies);
    }
}