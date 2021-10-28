"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//use with modules for read files
var readline = require("readline");
var fs = require("fs");
/**
 * read string from terminal and write to constant
 * @param question  - question for user with ask to input any city
 * @returns string with answer
 */
var question = function (question) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(function (resolve) {
        rl.question(question, function (answer) {
            rl.close();
            return resolve(answer);
        });
    });
};
function sortAndSliceArray(startCitiesArray) {
    var indexArr = Object.keys(startCitiesArray).sort(function (a, b) {
        var first = startCitiesArray[Number(a)].population;
        var second = startCitiesArray[Number(b)].population;
        return first > second ? -1 : 1;
    });
    return indexArr
        .map(function (i) {
        return startCitiesArray[Number(i)];
    })
        .slice(0, 10);
}
/**
 * Task:
 * 1. User should input phrase which can contain city name.
 * 2. Need to check the CSV file and find city data (population, place in TOP-10) if it is
 * 3. Replace city name in the phrase on the data from CSV file and get a new phrase
 * 4. If the phrase doesn't have equal in CSV file output it as it.
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        /**
         * closure functions which get CSV file and return function witch replace start text ("phrase") by new phrase.
         * The new phrase should contain data from a CSV file if the start text has coincident parts.
         * If it isn't function should return the start text
         * @param csv - convert to string csv file
         * @returns - result: see decrpiption below
         */
        function csvMode(csv) {
            var startCitiesArray;
            var resultCitiesArray;
            //extract city and population data to array
            startCitiesArray = csv
                .split("\n")
                .filter(function (s) { return s.trim() != "" && !s.startsWith("#"); })
                .map(function (arr) {
                var s = arr.split(",");
                return {
                    city: s[2],
                    population: +s[3],
                };
            });
            //sort cities array by population and slice first 10 positions
            resultCitiesArray = sortAndSliceArray(startCitiesArray);
            /**
             * function - replace city in start text by phrase contains rating and population data
             */
            return function (startText) {
                var newText = startText;
                resultCitiesArray.map(function (item, index) {
                    if (newText.indexOf(item.city) !== -1) {
                        var searchRegExp = new RegExp(item.city, "g");
                        var replaceWith = item.city + ": " + (index + 1) + " \u043C\u0435\u0441\u0442\u043E \u0432 \u0422\u041E\u041F-10 \u0441\u0430\u043C\u044B\u0445 \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u0433\u043E\u0440\u043E\u0434\u043E\u0432 \u0423\u043A\u0440\u0430\u0438\u043D\u044B, \u043D\u0430\u0441\u0435\u043B\u0435\u043D\u0438\u0435: " + item.population;
                        newText = newText.replace(searchRegExp, replaceWith);
                    }
                    return newText;
                });
                return newText;
            };
        }
        var answer, phrase, file, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, question("Введите свою фразу: ")];
                case 1:
                    answer = _a.sent();
                    phrase = answer || "Київ";
                    file = fs.readFileSync("./tests/cities.csv", "utf8");
                    console.log(csvMode(file)(phrase)); //get result
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
