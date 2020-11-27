"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var querystring = __importStar(require("querystring"));
// const readable = fs.createReadStream('./format2.txt');
console.log("hi");
var FileHandler = /** @class */ (function () {
    function FileHandler(filePath) {
        this.filePath = filePath;
        this.fileSize = fs.statSync(filePath).size;
        this.readData = fs.createReadStream(this.filePath);
        this.progress = 0;
        this.movies = '';
    }
    FileHandler.prototype.filterToJustMovies = function () {
        var _this = this;
        this.readData.on('data', function (chunk) {
            //  console.log(chunk.toString());
            _this.movies += querystring.unescape(filterToMoviesHelper(chunk.toString()));
            _this.readData.pause();
            // console.log(this.movies);
            setTimeout(function () {
                _this.readData.resume();
            }, 1000);
        });
        console.log(this.movies);
        return this;
    };
    FileHandler.prototype.getProgress = function () {
        var _this = this;
        this.readData.on("pause", function () {
            console.log("progress is ...., " + Math.floor((_this.readData.bytesRead / _this.fileSize) * 100) + " %");
            return _this;
        });
        // this.readData.on("end",()=>{
        //   console.log("progress is ....", this.currentProgressLocation / this.fileSize);
        // })
    };
    FileHandler.prototype.getMoviesList = function () {
        var _this = this;
        this.readData.on('pause', function () {
            //writing ..
            clearToJson(_this.movies);
        });
        return this;
    };
    return FileHandler;
}());
exports.default = FileHandler;
function filterToMoviesHelper(chunk) {
    var i = 0;
    var startReading = false;
    var movies = "";
    while (i < chunk.length) {
        // console.log(i);
        if (chunk[i] == "{" && chunk[i + 2] == "p") {
            startReading = true;
        }
        if (startReading) {
            movies += chunk[i];
        }
        if (chunk[i] == "}" && chunk[i - 1] == '"') {
            // console.log("done with: ", i, "-- \n", movie, "\n\n");
            movies += chunk[i];
            // + ","
            startReading = false;
        }
        i++;
    }
    return movies;
    console.log(movies);
}
function clearToJson(data) {
    var i = 0; //
    var startReading = false;
    var readProp = false;
    var formatted = '';
    while (i < data.length) {
        if (data[i] == "{") {
            formatted += data[i];
            startReading = true;
        }
        if (data[i] == "{" && data[i + 1] == '"') {
            startReading = false;
        }
        if (data[i - 1] == "=") {
            readProp = true;
            startReading = true;
        }
        if (data[i] == "}") {
            // formatted+=data[i];
            startReading = false;
        }
        if (data[i] == "}" && data[i + 1] == "}") {
            formatted += "},";
        }
        if (data[i + 1] == ">" && data[i] == '"') {
            formatted += data[i];
            startReading = false;
        }
        if (data[i] == ">" && data[i - 1] == '"') {
            formatted += ":";
        }
        //adding colon to help format data
        if (data[i + 1] == "(" && data[i + 2] == '<') {
            //case where copyright is present-ish
            formatted += '",';
            startReading = false;
        }
        if (data[i + 1] == "<" && data[i + 2] == '/') {
            if (data[i] != ")") {
                formatted += data[i] + '"';
            }
            startReading = false;
        }
        //placing quotes if we dont have them --first quote around name
        if (data[i - 1] == ">" && data[i - 2] == '"') {
            formatted += '"';
            startReading = true;
        }
        //add all of the rest of the data besides just name and year
        if (data[i] == ',' && data[i - 1] == '"' && data[i - 2] == ">") {
            startReading = true;
        }
        if (startReading) {
            console.log(data[i], data[i - 1]);
            formatted += data[i];
        }
        i++;
    }
    //todo remove last comma
    formatted.slice(0, -1);
    console.log(formatted);
}
