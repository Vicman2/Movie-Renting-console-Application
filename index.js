// Th inquirer module
const inquirer = require("inquirer");

//The users database module
const users = require('./users');


// The renters class which extends the siteUser class
const Renter  = require("./renter");

// The Movies database
const Movies = require("./movies");

//The Movies class
const Movie= require("./moviesClass");

// The db for rented movies withe names of the rentees
const rentedMovies = require("./rentedMovies");

//The admin class which also extends the site userClass
const Admin = require("./adminClass");

// The Admin database
const AdminDB = require("./adminDB")


//==============================================//
// Requiring the cli-table  npm                  //
//=============================================//
const Table = require('cli-table');


//==============================================//
//       requiring the color  npm      //
//=============================================//

const colors = require('colors');




var AdminInUse;
var appUser;
var  movieToRent ;

function createHeader(headTitle, anyMessage){

        console.clear();
    
        var table = new Table({
            chars: { 'top': '═', 'top-left': '╔', 'top-right': '╗', 'bottom': '═', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'right': '║' },
            head: [headTitle.toUpperCase()],
            colWidths: [72],
            colAligns: ['middle']
        });
        console.log(table.toString());


        if (anyMessage.length < 1) {
            console.log();
        } else {
            console.log();
            console.log( colors.red('=> '), colors.cyan(anyMessage), colors.red('<='))
            console.log();
            console.log();
        }
}






// This function will display the homepage and propt the user to either sign in or sign up
function home(msg){
    createHeader("Vicman movie renting services",msg);

    inquirer 
        .prompt([
            {
                type: "list",
                name : "deUser",
                message: " You must sign in before you can usse any of our services  ",
                choices:['Sign in', "Sign up"]
            },
        ])
        .then(answers => {
            if(answers.deUser == "Sign in"){
                signIn();
            }else{
                signUp("We want to know you");
            }
        });
}

// This functions handles the signIn
function signIn(){
    inquirer
        .prompt([
            {
                type: "list",
                name: "ifAdimin",
                message: "Choose an option------",
                choices: ["I am an admin", "I am just a renter"]
            }
        ])
        .then(answers =>{
            if (answers.ifAdimin == "I am an admin"){
                verifyAdmin("Verify that you are an Administrator");
            }else{
                verifyUser("show us that you have an account here");
            }
        })
}


//This function verifies the If the user is an admin
function verifyAdmin(msg){
    createHeader("Are you an admin ? ", msg);
    inquirer
        .prompt([
            {
                type: "input",
                name : "adminUsername",
                message : "Input you username"
            },
            {
                type: "input", 
                name: "adminpassword",
                message: "Input admin password"
            }
        ])
        .then(answers => {
            let found = AdminDB.find( admi => admi.username == answers.adminUsername && admi.password == answers.adminpassword)
            if(found){
                AdminInUse = new Admin(found.username, found.password, true, found.name, found["Phone Number"], found.email);
                adminMenu(AdminInUse);
            }else{
                verifyAdmin("You must verify that you are an Admin");
            }
        })
}


// This functions prompts the admin to what he/she wants to do

function adminMenu(deObject){
    createHeader("We have verifyied that you are an administrat", " Go ahead and make some changes, we hail you");
    inquirer
        .prompt([
            {
                type: "list",
                name: "adminDuty",
                message: "What do you want to do ? ",
                choices: ["Add Movie", "Delete Movie", "View Movies"]
            }
        ])
        .then( answers => {
            if(answers.adminDuty == "Add Movie"){
                deObject.addMovie();
            }else if(answers.adminDuty == "Delete Movie"){
                console.table(Movies)
                deObject.removeMovie()
            }else{
                deObject.showAllMovies();
            }
        })
}


// This function verifies the user
function verifyUser(msg){
    createHeader("You have to verify your account please", msg);
    inquirer
        .prompt([
            {
                name : "username",
                message: "Input your username",
            },
            {
                type: "password",
                name : "password",
                message: "Input your password",
                mask : true
            }
        ])
        .then(answers => {
            let found = users.find(deren => deren.username == answers.username)
            if(found && found.password == answers.password){
                appUser = new Renter(found.username, found.password, false, found.name, found.email, found.balance);
                homeWithVerification("you have been verified",appUser);
            }else{
                verifyUser("Invalid account, try again");
            }
        })
}


//This function is for the signing up of users i.e the people that do not have account
function signUp(msg){
    createHeader("Account Creation", msg);

    inquirer 
        .prompt([
            {
                name : "name",
                message: "What is your name ?",
                validate: function(name){
                    var valid = (/^\w+$/).test(name)
                    if(valid){
                        return true
                    }else{
                        return "Input a valid name"
                    }
                }
            },
            {
                name : "username",
                message: "Choose a username",
                validate: function(username){
                    var valid = (/^(\w+(\d)?)$/).test(username)
                    if(valid){
                        return true
                    }else{
                        return "Input a valid username"
                    }
                }

            },
            {
                name : "Phone Number",
                message: "Input your phone number",
                validate: function(input){
                    var valid = (/^\d{11}$/).test(input)
                    if(valid){
                        return true
                    }else{
                        return "Input a valid phone number";
                    }
                }
            },
            {
                name : "accountNo",
                message: "Input your account number ( 10 digits only) ",
                validate: function(accountNo){
                    var valid = (/^\d{10}$/).test(accountNo)
                    if(valid){
                        return true
                    }else{
                        return "Input a valid account No"
                    }
                }
            },
            {
                name : "email",
                message: "Input your email",
                validate: function(email){
                    var valid = (/^\w+@\w+\.\w{2,4}$/).test(email)
                    if(valid){
                        return true
                    }else{
                        return "Input a valid email address"
                    }
                }
            },
            {
                name : "balance",
                message: "Input the amount you want to use in this site",
                validate: function(balance){
                    var valid = (/^\d+$/).test(balance)
                    if(valid){
                        return true
                    }else{
                        return "Input a valid number"
                    }
                }
            },
            {
                type: "password",
                name : "password",
                message: "Choose a password",
                mask: true
            },
        ])
        .then( answers => {
            if(answers.name && answers.username && answers["Phone Number"] && answers.accountNo && answers.email && answers.balance && answers.password){
                appUser = new Renter(answers.username, answers.password, false, answers.name,answers.email, answers.balance);
                users.push(answers);
                homeWithVerification("you have been verified",appUser);
            }else{
               signUp("you have to input a valid detail about you");
            }
        });
}


// This prompt the user to the home page after been verified that he/she have an account 
function homeWithVerification(msg,appUser){
    createHeader("We are glad that we know you now",msg);
    inquirer
        .prompt([
            {
                type: "list",
                name: "theUserWants",
                message: "Please choose an option",
                choices: ["View Latest Movies", "View Profile", "Show Rented movies", "Upgrade Account"]
            },
        ])
        .then(answers => {
            if(answers.theUserWants == "View Latest Movies"){
                viewMovies();
            }else if(answers.theUserWants == "View Profile"){
                viewProfile(appUser);
            }else if(answers.theUserWants == "Show Rented movies"){
                showRentedMovie(appUser);
            }else{
                upgradeAccount(appUser);
            }
        })
}

// This function tops up the account 
function upgradeAccount(appUser){
    createHeader(" Account upgrade", appUser.name + " You can top up now")
    console.log("Presnt account balance : ",appUser.accountBalace);
    inquirer
        .prompt([
            {
                type: "input",
                name : "topUp",
                message: "Enter the amount that you want to top up",
                validate: function(input){
                    if(isNaN(input)){
                        return "Input a valid number";
                    }else{
                        return true;
                    }
                }
            }
        ])
        .then(answers => {
            appUser.upgradeAccount(answers.topUp)
            console.log("=========================");
            console.log("Your account balance have been");
            console.log("Account balance : ", appUser.accountBalace);
            askToGo("Succefull top Up", appUser);
        })
}

//This function shows the user the movies that he/she have rented
function showRentedMovie(appUser){
    createHeader(appUser.name + ", these are your rented movies", "can watch them now");
    if(!appUser.showRentedMovies()){
        askToGo("Rent a movie in order to watch it", appUser);
    }else{
        console.log()
        console.log(appUser.showRentedMovies());
        console.log();
        inquirer
            .prompt([
                {
                    message: "Choose the index of the movie you want to watch ? ",
                    name : "movieToWatch",
                    validate : function (input){
                        let found = rentedMovies.find(me => me.name == appUser.name);
                        if(input >= 0 && input < found.rentaMovies.length){
                            return true;
                        }else{
                            return "input a valid movie index";3
                        }
                    }
                }
            ])
            .then( answers => {
                let found = rentedMovies.find(me => me.name == appUser.name);
                createHeader("Watching Movie.....", found.rentaMovies[answers.movieToWatch])
                console.log("====================");
                console.log();
                console.log();
                console.log("I hope you are enjoying the movie, hahahahahhahahahahahah");
                console.log();
                console.log();
                console.log(" You da watch movie for console....Lol......")
                console.log();
                console.log("====================");
                askToGo("Home", "Hope you enjoyed our movie");
            })
        }   
}

// This views the profile of the user
function viewProfile(dePerson){
    createHeader("Profile", "This is your profile");
    console.log()
    console.table(dePerson.profile());
    askToGo("Thanks alot", dePerson);

}

// This function views All the movies in the database 
function  viewMovies(){
    createHeader("Latest Movies", "Enjoy the latest movie today");
    console.table(Movies)

    inquirer
        .prompt([
            {
                name: "movieIndex",
                message: "Enter the movie id of the movie you want to rent: ",
                validate: function(id){
                    if(Number.isInteger(parseInt(id)) && id <= Movies.length && id > 0){
                        return true;
                    }else{
                        return "Input a valid id"
                    }
                }
            }
        ])
        .then(answers => {
            for(let i = 0; i< Movies.length; i++){
                if(answers.movieIndex == i+1 ){
                    movieToRent = new Movie(Movies[i].movieId, Movies[i].movieName, Movies[i].movieGenre, Movies[i].yearOfProduction, Movies[i].productionCompany, Movies[i].movieDirector, Movies[i].runTime, Movies[i].rating, Movies[i].price);
                    goToMovieMenu(movieToRent);
                }
            }
        })
}

function goToMovieMenu(movieToRent){
    createHeader("Movie specificatios", movieToRent.movieName);
    inquirer
        .prompt([
            {
                type: "list",
                name: "doWithMovie",
                message : "Choose an option",
                choices :["Rent movie", "View Spec"]
            }
        ])
        .then(answers => {
            if(answers.doWithMovie == "Rent movie"){
                rentMovie(appUser, movieToRent);
            }else{
                viewSpec(movieToRent);
            }
        })
}


// This function handles the renting of the movie
function rentMovie(appUser, movieToRent){
   createHeader("Have fun with the movie", movieToRent.movieName);
   appUser.rentMovies(movieToRent);
   askToGo("What else do you want to do ? ", appUser);
}

// This function views the specifications of the movie
function viewSpec(movieToRent){
    createHeader(movieToRent.movieName, " specification", "It is very interesting");
    console.log(movieToRent);
    askToGo("We have a whole lot of movies for you", appUser);
}


// This function asks if the user wants to cancel program
function askToGo(msg,appUser){
    inquirer
        .prompt([
            {
                name: "toPage",
                type: "confirm",
                message : "Do you want to go back to home "
            }
        ])
        .then(answers => {
            if(answers.toPage == true){
                homeWithVerification(msg,appUser);
            }else{
                createHeader("Thank you", "We apprecate you using our website");
            }

        })
}

module.exports.prompting = function(){
    inquirer
        .prompt([
            {
                type: "confirm",
                name: "toTerminate",
                message: " Do you want to perform another operation ? ",
            }
        ]).then( answers => {
            if (answers.toTerminate == true){
                 adminMenu(AdminInUse)
            }else {
                console.log()
                console.log("======================")
                console.log("                          ")
                console.log("We know you enjoyed your admin operations, Thanks");
                console.log()
                console.log("=======================================")
                console.log();
            }
            
        })
}



    

// This call to function starts my program
home("We are happy that you visited our app");
