const fs = require('fs')

let data = fs.readFile('./testFile.txt', 'utf8' , (err, data) => {
  if (err) {
    // console.error(err)
    return
  }
  
//   console.log(data)
})



function readInit(filePath){
return new Promise((resolve, reject) => {

    fs.readFile(filePath, 'utf8' , (err, data) => {
        if (err) {
          // console.error(err)
        reject(err)
        //   return
        }
        
        resolve(data)
      //   console.log(data)
      }) 



})
}


let t = readInit("./pageFirst0-1000.txt").then(data =>{

findDataToParse(data)
    
})




function findDataToParse( data){
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



if(data[i] == "}"){
    // console.log("done with: ", i, "-- \n", movie, "\n\n");
    movies += data[i]+ ","
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

function cleanParsedData(){

}

// findDataToParse(0, "test")