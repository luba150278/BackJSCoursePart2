//use with modules for read files
const readline = require("readline");
const fs = require("fs");
//set type to cities array
type Cities = {
  city: string;
  population: number;
};

/**
 * read string from terminal and write to constant
 * @param question  - question for user with ask to input any city
 * @returns string with answer
 */
const question = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) => {
    rl.question(question, (answer: string) => {
      rl.close();
      return resolve(answer);
    });
  });
};
function sortAndSliceArray(startCitiesArray: Cities[]): Cities[] {
  const indexArr = Object.keys(startCitiesArray).sort((a, b) => {
    const first = startCitiesArray[Number(a)].population;
    const second = startCitiesArray[Number(b)].population;
    return first > second ? -1 : 1;
  });

  return indexArr
    .map((i) => {
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
async function main() {
  /**
   * closure functions which get CSV file and return function witch replace start text ("phrase") by new phrase.
   * The new phrase should contain data from a CSV file if the start text has coincident parts.
   * If it isn't function should return the start text
   * @param csv - convert to string csv file
   * @returns - result: see decrpiption below
   */
  function csvMode(csv: string) {
    let startCitiesArray: Cities[];
    let resultCitiesArray: Cities[];

    //extract city and population data to array
    startCitiesArray = csv
      .split("\n")
      .filter((s) => s.trim() != "" && !s.startsWith("#"))
      .map((arr) => {
        let s = arr.split(",");

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
    return (startText: string) => {
      let newText = startText;

      resultCitiesArray.map((item, index) => {
        if (newText.indexOf(item.city) !== -1) {
          const searchRegExp = new RegExp(item.city, "g");
          const replaceWith = `${item.city}: ${
            index + 1
          } место в ТОП-10 самых крупных городов Украины, население: ${
            item.population
          }`;
          newText = newText.replace(searchRegExp, replaceWith);
        }
        return newText;
      });
      return newText;
    };
  }
  try {
    const answer = await question("Введите свою фразу: "); //ask for user
    const phrase = answer || "Київ"; //if  empty string enter Київ
    const file = fs.readFileSync("./tests/cities.csv", "utf8"); // read file
    console.log(csvMode(file)(phrase));//get result
  } catch (err) {
    console.error(err);
  }
}
main().catch(console.error);
