const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
let addLoop = true;
const render = require("./lib/htmlRenderer");
const team =[];
//array of questions
const mQuestions = [
    {
        type: "input" ,
        name: "name",
        message: "What is the managers name?",
    },
    {
        type: "input" ,
        name: "office",
        message: "What is the manager's office number?",
    },
    {
        type: "input" ,
        name: "id",
        message: "What is the manager's ID?",
    },
    {
        type: "input" ,
        name: "email",
        message: "What is the manager's email address?",
    },
];
const eQuestions = [
    {
        type: "input" ,
        name: "name",
        message: "What is the engineer's name?",
    },
    {
        type: "input" ,
        name: "github",
        message: "What is the engineer's Github Username?",
    },
    {
        type: "input" ,
        name: "email",
        message: "What is the engineer's email address?",
    },
    {
        type: "input" ,
        name: "id",
        message: "What is the engineer's ID?",
    },
];
const iQuestions = [
    {
        type: "input" ,
        name: "name",
        message: "What is the intern's name?",
    },
    {
        type: "input" ,
        name: "school",
        message: "What is the interns's school name?",
    },
    {
        type: "input" ,
        name: "email",
        message: "What is the interns's email address?",
    },
    {
        type: "input" ,
        name: "id",
        message: "What is the intern's ID?",
    },
];
//function to add employee or quit
function addEmployee() {
    const firstQuestion = [
        {
            type: "list" ,
            name: "addRoles",
            message: "Who would you like to add?",
            choices:["Manager", "Engineer", "Intern", "Finish"]
        },
    ];
    // Depending on the character chosen, performs function to ask specific questions
    inquirer.prompt(firstQuestion).then(function(data) {
        const employeeType = data.addRoles;
        if (employeeType === "Manager") {
            managerQuestions();
        }
        else if (employeeType === "Engineer") {
            engineerQuestions();
        }
        else if (employeeType === "Intern") {
            internQuestions();
        }
        else {
            fs.writeFileSync(outputPath, render(team), function(err) {
                if (err){
                    console.log(err)
                }
                else console.log("complete");
            });
        }
    })
};
// functions to return data for each type of employee
function managerQuestions () {
    inquirer.prompt(mQuestions).then((mData) => {
        let newManager = new Manager(mData.name, mData.id, mData.email, mData.office);
        team.push(newManager);
        addEmployee();
    }
    );
};
//inquier prompt for engineer
function engineerQuestions() {
    inquirer.prompt(eQuestions).then((eData) => {
        let newEngineer = new Engineer(eData.name, eData.id, eData.email, eData.github);
        team.push(newEngineer);
        addEmployee();
    }
    );
}
// inquier prompt for intern
function internQuestions() {
    inquirer.prompt(iQuestions).then((iData) => {
        let newIntern = new Intern(iData.name, iData.id, iData.email, iData.school);
        team.push(newIntern);
        addEmployee();
    }
    );
}
    // Begins function to add employee
    addEmployee();



