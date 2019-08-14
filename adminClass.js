const SiteUsers = require("./siteUser")
const inquirer = require("inquirer");
const Movies = require("./movies");
const prompting = require("./index");
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
                    message: "Please enter the name of the Movie ",
                    validate: function(input){
                        if(/^\w+\s?\w+/.test(input)) return true
                        else return "Enter a valid director name"
                    }
                },
                {
                    type: "list",
                    name: "movieGenre", 
                    message: "Please enter the  Genre of the Movie",
                    choices: ["Drama", "Triller", "Comedy", "Horror", "Action", "Romance", "Science Fiction", "Documentry", "Crime", "Adventure", "War", "Pornography"]
                },
                {
                    type: "input",
                    name: "yearOfProduction", 
                    message: "Please enter the year of production ",
                    validate: function(input){
                        if(/^\d{4}$/.test(input)) return true
                        else return "input a valid production year"
                    }
                },
                {
                    type: "input",
                    name: "productionCompany", 
                    message: "Please enter name of the  production company ",
                    validate: function(input){
                        if(/^\w+\s?\w+/.test(input)) return true
                        else return "Enter a valid director name"
                    }
                },
                {
                    type: "input",
                    name: "movieDirector", 
                    message: "Input the name of the director of the movie",
                    validate: function(input){
                        if(/^\w+\s?\w+/.test(input)) return true
                        else return " Please enter a valid director name"
                    }
                },
                {
                    type: "input",
                    name: "runTime", 
                    message: "Enter movie runtime",
                    validate: function(input){
                        if(/^\d+$/.test(input)) return true
                        else return " Input a valid run time (Digits) "
                    }
                },
                {
                    type: "input",
                    name: "movieRating", 
                    message: "Input the movie rating ",
                    validate: function(input){
                        if(/^[0-5]$/.test(input)) return true
                        else return " Input a valid movie rating (0-5) "
                    }
                },
                {
                    type: "input",
                    name: "moviePrice", 
                    message: "Please enter the price of the movie ",
                    validate: function(input){
                        if(/^\d+$/.test(input)) return true
                        else return " Input a valid run time (Digits) "
                    }
                }
            ])
            .then( answers => {
                let movieIdent = Movies.length +1

                 let movieObject = { movieId : movieIdent,
                                    movieName : answers.movieeName,
                                    movieGenre: answers.movieGenre,
                                    yearOfProduction :  parseFloat( answers.yearOfProduction), 
                                    productionCompany :answers.productionCompany,
                                    movieDirector:  answers.movieDirector,
                                    runTime : parseFloat(answers.runTime) ,
                                    rating:  parseFloat(answers.movieRating), 
                                    price:  parseFloat(answers.moviePrice)
                                  };
                Movies.push(movieObject);
                console.log("=========================");
                console.log();
                console.log("Movie added successfully")
                console.log();
                console.log("===========================");
                console.log();
                console.table(Movies);
                prompting.prompting()
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
                console.log();
                console.log("Movie have been removed");
                console.table(Movies);
                prompting.prompting("What else do you want to do")
            })


    }

    showAllMovies(){
        console.clear();
        console.log();
        console.log("==========================");
        console.log();
        console.log("These are the movies in the list");
        console.log();
        console.table(Movies);
        prompting.prompting();
    }
}