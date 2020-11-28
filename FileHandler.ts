import *  as fs from 'fs' 
import { Stream } from 'stream';
import * as querystring from "querystring"
// const readable = fs.createReadStream('./format2.txt');
console.log("hi");

export default class FileHandler{
    filePath:string;
    readonly fileSize: number;
    private readData:any; //change this type soon
    private progress:number;
    private movies : string; 
    
    constructor(filePath: string){

        this.filePath = filePath;  
        this.fileSize = fs.statSync(filePath).size
        this.readData = fs.createReadStream(this.filePath)
        this.progress = 0;
      this.movies = '';

    }


filterToJustMovies(){
  this.readData.on('data', (chunk:any) => {
  
  //  console.log(chunk.toString());
  this.movies +=querystring.unescape(filterToMoviesHelper(chunk.toString())) ;


    this.readData.pause();
// console.log(this.movies);

    setTimeout(() => {
      this.readData.resume();
    }, 1000);
  })


  // console.log(this.movies);
  

  return this
}


getProgress(){
  this.readData.on("pause", ()=>{
  // console.log(`progress is ...., ${Math.floor( (this.readData.bytesRead/this.fileSize ) * 100)} %`);
return this;
  })
  
  // this.readData.on("end",()=>{
  //   console.log("progress is ....", this.currentProgressLocation / this.fileSize);

  // })
  
}

getMoviesList(){
  this.readData.on('pause',()=>{
    //writing ..
     clearToJson(this.movies)
  })
  
  return this
}

  
}



function filterToMoviesHelper(chunk: string){
let i = 0 ;
let startReading = false ;
let movies = ""

while (i < chunk.length){
  // console.log(i);

  if(chunk[i] == "{" && chunk[i+2] == "p") {
    startReading = true;
    
}
if(startReading){
    movies += chunk[i]


    
}



if(chunk[i] == "}" && chunk[i-1] == '"'){
 // console.log("done with: ", i, "-- \n", movie, "\n\n");
 movies += chunk[i]
 // + ","
 startReading = false;
}

i++;
}

return movies; 
console.log(movies);

}


function clearToJson(data:string){
let i = 0 ; //
let startReading = false ;
let readProp = false;
let formatted = ''

while (i < data.length){

// add braces at begin of object starting from "name"



if(data[i] == "{" ){
  // formatted+=data[i]  
 
  startReading = true
} 

if(data[i] == "=" && data[i+1] == '"' && data[i+2] =="n"){
  formatted += "{"
}

if(data[i] == "{" && data[i+1] == '"'){

  startReading = false
}


if(data[i - 1]=="="){
  readProp = true; 
  startReading = true;
}



 if(data[i]=="}"){
  // formatted+=data[i];
  startReading = false
}
//todo: fix a bug here
if(data[i]=="}" && data[i +1 ]=="}" && data[i-1] =='"'
&& data[i+2]!=="}" && data[i+2]!=="(" 
){
  formatted+="},"

  // console.log(data[i-1]+data[i]+data[i+1]);

}


if(data[i+ 1]==">" && data[i]=='"'){
  formatted+=data[i]
  startReading = false;
}

if(data[i] == ">" && data[i -1 ]== '"'){
  formatted+=":"
}
//adding colon to help format data


if(data[i+ 1]=="(" && data[i +2]=='<'){
  //case where copyright is present-ish
  formatted+='",'
  startReading = false
}
if(data[i+ 1]=="<" && data[i +2]=='/'){

 
  if(data[i] !=")"){
     formatted+=data[i]+'"'
  }
  startReading = false
}

//placing quotes if we dont have them --first quote around name
if(data[i-1] == ">" && data[i -2 ]== '"'){
  formatted +='"'
startReading = true;
}


//add all of the rest of the data besides just name and year


if(data[i] == ',' && data[i-1] == '"' && data[i-2] == ">"){
  startReading = true;
}

//print out patterns after '}'


if(startReading){  
  formatted+=data[i]
}










  i++
}
//todo remove last comma in secon round of cleaning
let cleanedEnd = formatted.substring(0, formatted.length-1);

console.log(cleanedEnd);

}