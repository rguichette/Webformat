"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FileHandler_1 = __importDefault(require("./FileHandler"));
// console.log("hi..");
var t = new FileHandler_1.default("./files/pattern.txt");
console.log("running.-.size", t.fileSize);
t.filterToJustMovies().getMoviesList();
// t.getProgress()
