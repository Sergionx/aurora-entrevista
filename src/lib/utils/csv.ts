import fs from "fs";
import csv from "csv-parser";

export async function readCSVFile<T>(path: string) {
  const results: T[] = [];
  return new Promise<T[]>((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => reject(error));
  });
}

