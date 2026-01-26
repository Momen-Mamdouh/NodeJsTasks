const fs = require("fs");
const fsPromise = require("fs/promises");
const studentData = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 20,
    course: "Computer Science",
    grades: {
      math: 90,
      programming: 95,
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 22,
    course: "Data Science",
    grades: {
      statistics: 88,
      machine_learning: 92,
    },
  },
  {
    id: 3,
    name: "Carol Williams",
    age: 21,
    course: "Web Development",
    grades: {
      html: 95,
      javascript: 89,
    },
  },
];

// ***========================Sync====================:
function writeSync(data) {
  const jsonData = JSON.stringify(data);
  try {
    fs.writeFileSync("students.json", jsonData, "utf8");
    console.log("Sync file 'students.json' has been written successfully.");
  } catch (err) {
    console.error("Error writing synchronous file:", err);
  }

  console.log("Completed synchronous write.");
}
function readSync(filePath) {
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const jsonObj = JSON.parse(fileData);
    console.log("Synchronous fileData:", jsonObj);
    console.log("Completed Synchronous read.");
    return jsonObj;
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
  }
}
function pushSync(newData, filePath) {
  try {
    const stdsString = fs.readFileSync(filePath, "utf8");
    const stdArr = JSON.parse(stdsString);
    stdArr.push(newData);
    const updatedStdsStr = JSON.stringify(stdArr);
    fs.writeFileSync(filePath, updatedStdsStr, "utf8");
    console.log("Data successfully pushed to file synchronously.");
  } catch (err) {
    console.error("Error handling JSON file synchronously:", err);
  }
}

function delSync(_id) {
  try {
    const stdsString = fs.readFileSync(filePath, "utf8");
    let stdArr = JSON.parse(stdsString);
    stdArr = stdArr.filter((item) => item.id !== _id);

    const updatedStdsStr = JSON.stringify(stdArr);
    fs.writeFileSync(filePath, updatedStdsStr, "utf8");
    console.log(`Object with id ${_id} has been removed and the file updated.`);
  } catch (err) {
    console.error("Error handling the JSON file:", err);
  }
}
// ***========================Sync====================:

// ***========================ASync====================:
function writeAsync(data) {
  const jsonData = JSON.stringify(data);

  fs.writeFile("students.json", jsonData, "utf8", (err) => {
    if (err) {
      console.error("Asynchronous Error file", err);
      return;
    }
    console.log(
      "Asynchronous file 'students.json' has been written successfully.",
    );
    console.log("Completed Asynchronous write.");
  });
}
async function readAsync(filePath) {
  try {
    const fileData = await fsPromise.readFile(filePath, "utf8");
    const jsonObj = JSON.parse(fileData);
    console.log("Asynchronous fileData:", jsonObj);
    console.log("Completed Asynchronous read.");
    return jsonObj;
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
  }
}
async function pushAsync(newData, filePath) {
  try {
    const stdsString = await fsPromise.readFile(filePath, "utf8");
    const stdArr = JSON.parse(stdsString);
    stdArr.push(newData);
    const updatedStdsStr = JSON.stringify(stdArr);
    fs.writeFile(filePath, updatedStdsStr, "utf8", (err) => {
      if (err) {
        console.error("Asynchronous Error file", err);
        return;
      }
      console.log(
        "Asynchronous file 'students.json' has been written successfully.",
      );
      console.log("Completed Asynchronous write.");
    });
  } catch (err) {
    console.error("Error handling JSON file synchronously:", err);
  }
}
async function delSync(_id) {
  try {
    const stdsString = await fsPromise.readFile(filePath, "utf8");
    let stdArr = JSON.parse(stdsString);
    stdArr = stdArr.filter((item) => item.id !== _id);

    const updatedStdsStr = JSON.stringify(stdArr);
    fs.writeFile(filePath, updatedStdsStr, "utf8", (err) => {
      if (err) {
        console.error("Asynchronous Error file", err);
        return;
      }
      console.log(
        "Asynchronous file 'students.json' has been written successfully.",
      );
      console.log("Completed Asynchronous write.");
    });
  } catch (err) {
    console.error("Error handling JSON file synchronously:", err);
  }
}
// ***========================ASync====================:

// ***========================Call====================:
writeSync(studentData);
readSync("./students.json");

writeAsync(studentData);
readAsync("./students.json");
// ***========================Call====================:

// ***========================Add New====================:

const newStds = [
  {
    id: 4,
    name: "David Chen",
    age: 23,
    course: "Cyber Security",
    grades: {
      networking: 85,
      cryptography: 91,
    },
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    age: 19,
    course: "Mobile Development",
    grades: {
      swift: 94,
      kotlin: 87,
    },
  },
  {
    id: 6,
    name: "Frank Miller",
    age: 24,
    course: "Cloud Computing",
    grades: {
      aws: 82,
      docker: 88,
    },
  },
];
writeSync(newStds);
readSync("./students.json");
// ***========================Add New====================:
