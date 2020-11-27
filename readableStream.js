const fs = require('fs');
const querystring = require('querystring');



const readable = fs.createReadStream('./format2.txt');
const fileSize = fs.statSync("./format2.txt").size
let trackPrgoressSize = 0; 
//#region 
console.log(fileSize);



readable.on('data', (chunk) => {

    trackPrgoressSize+=chunk.length;

//tracking percent here
// console.log(trackPrgoressSize/fileSize);


console.log(`recieved ${chunk.length} bytes`);

readable.pause();
console.log('There will be no additional data for 1 second.');
setTimeout(() => {
//   console.log('Now data will start flowing again.');
  readable.resume();
}, 1000);
let foundMovies = decodeCompletely(findDataToParse(chunk.toString()))

// console.log(foundMovies);


});
// readable.pause()

readable.on('end', () => {
  console.log('end');
});




//#endregion

// function detectNewMovie(data){
//     //function  detect when we arr at a new movie;
//     //will only focus on the START of a new movie read
//     let i = 0; 
//     while (i < data.length){
//         if()
//     }
// }

function findDataToParse( data){
    // console.log("data....", data);
    
    let startReading = false;
    let movies = ""
    let i = 0;
    let numOfMovies= 0
    
    if(i >= data.length){
        return;
    }
    
    while (i < data.length){
       if(data[i] == "{" && data[i+2] == "p") {
           startReading = true;
           
       }
       if(startReading){
           movies += data[i]
    
    
           
       }
    
    
    
    if(data[i] == "}" && data[i-1] == '"'){
        // console.log("done with: ", i, "-- \n", movie, "\n\n");
        movies += data[i]
        // + ","
        startReading = false;
        numOfMovies++
    }
    
    i++
    } 
    // console.log("num of movies:" , numOfMovies);
    // console.log(movies);
    
    return movies
    // findDataToParse(i, data)
    
    
    
    
        }
function decodeCompletely(data){
//decode data; 
return querystring.unescape(data);

}



function seperateDataToObj(data){
// console.log(data);
let i = 0; 
let startReading = false; //trigger a read action or not

//needed to form new json

let jsonSnippit = "";

let cleanedData = ""

let newPropName = false;



while(i < data.length){
// console.log(i);

//start reading here for prop


if(data[i-1] == '=' || (data[i-1]==">" && data[i-2] =='"')){ 
    console.log("prop:",);
       
newPropName = true;
startReading = true;
}



if(startReading){
    jsonSnippit += data[i]
}

if(data[i+1] == '>' || (data[i+1]== "<" && data[i+2]== "/") || data[i+1]=="(" ){
    
    newPropName = false;
    startReading =false;
}
//last bit of the statement -- checking for last digit of year
if((data[i+1]== "<" && data[i+2]== "/" && Number.isInteger(parseInt(data[i])))){

    // console.log(parseInt(data[i]));
    // console.log(Number.isInteger(parseInt(data[i])));
    
    console.log("cleaned data",jsonSnippit);
    // console.log();

//    console.log(parseInt(data[i]));
   
    

}
// if(){
// startReading = true;
// }


// if(data[i])
     i++  
}




 
}


