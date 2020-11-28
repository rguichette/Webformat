import FileHandler from './FileHandler'

// console.log("hi..");

let t = new FileHandler("./files/testFile.txt");
console.log("running.-.size", t.fileSize);
t.filterToJustMovies().getMoviesList()

// t.getProgress()