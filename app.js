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

    inquirer.prompt(firstQuestion).then(function(data) {
        console.log("the choice is " + data.addRoles);
        const employeeType = data.addRoles;
        console.log("Employee Type is " + employeeType);
        if (employeeType === "Manager") {
            console.log("part 1 succedded")
            managerQuestions();
        }
        else if (employeeType === "Engineer") {
            engineerQuestions();
        }
        else if (employeeType === "Intern") {
            internQuestions();
        }
        else {
            console.log("Attempting yeet");
        }
    })
};
// functions to return data for each type of employee
function managerQuestions () {
    console.log("Part 2 succedded")
    inquirer.prompt(mQuestions).then((mData) => {
        let newManager = new Manager(mData.name, mData.id, mData.email, mData.office);
        team.push(newManager);
        addEmployee();
    }
    );
    
};
function engineerQuestions() {
    console.log("add engineeer started!");
    inquirer.prompt(eQuestions).then((eData) => {
        let newEngineer = new Engineer(eData.eName, eData.eId, eData.eMail, eData.eGithub);
        team.push(newEngineer);
        addEmployee();
    }
    );
    
}
function internQuestions() {
    console.log("attempting intern question");
    inquirer.prompt(iQuestions).then((iData) => {
        let newIntern = new Intern(iData.name, iData.id, iData.email, iData.school);
        team.push(newIntern);
        addEmployee();
    }
    );
    
}
// Until the user decides to quit, this will continue to run

    console.log("begin");
    addEmployee();
    console.log("Finalizing YEET");
fs.writeFileSync(outputPath, render(team), function(err) {
    if (err){
        console.log(err)
    }
    else {
        console.log("Output complete.")
    }

});
console.log("Yeeted")

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
