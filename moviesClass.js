 //The movie class
 module.exports = class Movie{
     constructor(id, movieName, movieGenre, yearOfProduction, productionComapany, movieDirector, runTime, rating, moviePrice){
        this.id = id;
        this.movieName = movieName;
        this.movieGenre = movieGenre;
        this.yearOfProduction = yearOfProduction;
        this.productionComapany = productionComapany;
        this.movieDirector = movieDirector;
        this.runTime = runTime;
        this.rating = rating;
        this.moviePrice = moviePrice
     }

     rentMovie(){
         //
     }

     viewMovieDetail(){
        //
     }
     payForMovie(){

         //

     }
 }