"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
// const readable = fs.createReadStream('./format2.txt');
// const fileSize = fs.statSync("./format2.txt").size
// let trackPrgoressSize = 0; 
// //#region 
// console.log(fileSize);
// readable.on('data', (chunk) => {
//     trackPrgoressSize+=chunk.length;
// //tracking percent here
// // console.log(trackPrgoressSize/fileSize);
// console.log(`recieved ${chunk.length} bytes`);
// readable.pause();
// console.log('There will be no additional data for 1 second.');
// setTimeout(() => {
// //   console.log('Now data will start flowing again.');
//   readable.resume();
// }, 1000);
// console.log(chunkToString(chunk));
// });
// // readable.pause()
// readable.on('end', () => {
//   console.log('end');
// });
// function chunkToString(chunk){
//     return chunk.toString()
// }
// function reviewData(){
// }
var FileHandler = /** @class */ (function () {
    function FileHandler() {
    }
    return FileHandler;
}());
exports.FileHandler = FileHandler;
var t = new FileHandler();
