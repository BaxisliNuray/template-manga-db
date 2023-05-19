const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;



const Employees = [
    {
        id: 1,
        name: 'Julian Jameson',
        img: 'https://www.abandonware-france.org//abw_images/personnalites/500_person-497_jameson.jpg'

    },
    {
        id: 2,
        name: '2 Julian Jameson',
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80'

    },
    {id: 3,
        name: '3 Julian Jameson',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfk6sJ65eQiP3NvB8xpR08_tEbPJTh9k_yI6DXgt1npZQFRyrQq-sTs6utlUGVNBwjUtI&usqp=CAU'

    },
    {
        id: 4,
        name: '4 Julian Jameson',
        img: 'https://img.resized.co/breaking-news/eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL2ltYWdlLmFzc2V0cy5wcmVzc2Fzc29jaWF0aW9uLmlvXFxcL3YyXFxcL2ltYWdlXFxcL3Byb2R1Y3Rpb25cXFwvNWI4MjEzODg4MmI4NjMxYmFiYTYyMGM4MzYyZmYwMzFZMjl1ZEdWdWRITmxZWEpqYUdGd2FTd3hOamMzT0RJeU1ESTFcXFwvMi43MDA3NjY1OC5qcGc_dz02NDBcIixcIndpZHRoXCI6XCI2NDBcIixcImhlaWdodFwiOlwiOTYwXCIsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3d3dy5icmVha2luZ25ld3MuaWVcXFwvaW1hZ2VzXFxcL25vLWltYWdlLnBuZ1wiLFwib3B0aW9uc1wiOntcIm91dHB1dFwiOlwid2VicFwifX0iLCJoYXNoIjoiNmExMWI0YjZhNmQ1MWE3MmNiYmY2NmNkZTQ1ZjE4YzQxY2M4MzA3NCJ9/will-smith-makes-first-in-person-awards-show-appearance-since-oscars-slap.jpg?w=640'

    }
]







// all employees
app.get('/employees', (req, res) => {
    res.send(Employees)
})

// employee by id
app.get("/employees/:id", (req, res) => {
    const id = req.params.id;
    const oneEmployee = Employees.find((data) => data.id == id);

    if (oneEmployee === undefined) {
        res.status(204).send("data not found");
        return;
    } else {
        res.status(200).send(oneEmployee);
        return;
    }
});
// delete employee

app.delete("/employees/:id", (req, res) => {
  const id = req.params.id;
  const data = Employees.find((data) => data.id === parseInt(id));
  if (data === undefined) {
    res.status(404).send("employee not found");
    return;
  } else {
    const idx = Employees.indexOf(data);
    Employees.splice(idx, 1);
    res.status(202).send("employee deleted ");
  }
});

// post employee
app.put("/employees/:id",(req,res)=>{
  const{id} = req.params;
  const{name,img} = req.body;
  let employee = Employees.find((x)=>x.id==id);
  if(!employee) return res.status(204).send();
  if(!name && !img ){
    return res.status(400).send({message:'name  required!'})
  }
  if (name) {
    employee.name = name;
  }
  if(img){
    employee.img=img
  }
    res.send(200).send("product updated successfully!");
  }
 )

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})