import fs from "fs";
import { parse, stringify } from "csv";
import { UserCSVData } from "../interfaces/UserData";

export async function readCSVFile<T>(
  path: string,
  onData: (data: string[]) => T
) {
  const results: T[] = [];
  return new Promise<T[]>((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (data) => {
        const dataRow = onData(data);

        results.push(dataRow);
      })
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

export function writeCSVFile<T extends Object>(path: string, data: T[]) {
  const writableStream = fs.createWriteStream(path);

  const columns = [...Object.keys(data[0])];

  const stringifier = stringify({ header: true, columns: columns });

  data.forEach((row) => {
    stringifier.write(row);
  });

  stringifier.pipe(writableStream);
}
