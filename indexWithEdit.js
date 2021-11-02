let editbtn = document.querySelector("#editbtn")
editbtn.style.display = "none"
let index = 0;

const colorfull = ["pic/Sticky_Note_Blue.png", "pic/notebg.png", "pic/green.png", "pic/bp.png"]
/* האינפוטים שבהם מכניס המשתמש את פרטי המשימה
*/
const taskInfo = document.querySelector("#taskInfo")
const taskDate = document.querySelector("#taskDate")
const taskTime = document.querySelector("#taskTime")
//-----אובייקט המשימות-----
let tasks = []
/*--- הדיב לכל הפתקים---- */
const notesDiv = document.querySelector(".notesDiv")
//----------------------------

// ----כפתור איפוס טופס--------------------
const Resetbtn = document.querySelector("#Resetbtn")
Resetbtn.addEventListener('click', ResetFunction)

function ResetFunction() {
    taskInfo.value = ""
    taskDate.value = ""
    taskTime.value = ""
}

// -------------------------
function ShowTasks() {
    notesDiv.innerHTML = ""
    
    if (localStorage.getItem("tasks") != null) {

        let tasksStorge = JSON.parse(localStorage.getItem("tasks"))
        for (let j = 0; j < tasksStorge.length; j++) {
            CreateNote(tasksStorge[j].infoTask, tasksStorge[j].dateTask, tasksStorge[j].timeTaks)
        }
    }
}
ShowTasks()
//----עיצוב תאריך----
function convertDigitIn(str) {
    return str.split('-').reverse().join('/');
}
//----  חזרה למקור עיצוב תאריך----
function convertDigitAgain(str) {
    return str.split('/').reverse().join('-');
}
//---הוספת משימה---------
let savebtn = document.querySelector("#savebtn")

savebtn.addEventListener('click', function () {
    //קודם נבדוק שמילאו שדות חובה
    if (!taskInfo.value || !taskDate.value || !taskTime.value) {
        alert("יש למלא את כל השדות")
    } else {
        //יצירת פתק
        CreateNote(taskInfo.value, convertDigitIn(taskDate.value), taskTime.value)
    }
})

//---------פוקנציה ליצירת פתק מקבלת את מידע המשימה, התאריך והזמן------------
function CreateNote(information, dateof, timeof) {
    //החלפת צבע פתק
    let x = parseInt(Math.random() * colorfull.length)

    //------יצירת האלמנטיים ועיצובם של הפתק-----------
    const note = document.createElement("div")
    note.className = "note"
    const info = document.createElement("div")
    info.className = "info"
    const timeDiv = document.createElement("timeDiv")
    timeDiv.className = "timeDiv"
    const Pdate = document.createElement("p")
    const Ptime = document.createElement("p")
    const delNote = document.createElement("button")
    delNote.className = "delNote"
    delNote.innerHTML = "<i class='bi bi-x del'></i>"
    //----------------delet note----------------------
    delNote.addEventListener('click', function (e) {
        //-------מחיקה מהמערך----
        let taskCheck = e.target.parentElement.parentElement.querySelector(".info").textContent
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].infoTask == taskCheck) {
                tasks.splice(i, 1)
                // ---שמירה בזיכרון----
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        //-----מחיקה מהתצוגה-----
        e.target.parentElement.parentElement.remove()
    })
    //-------------------------------------------
    const editNote = document.createElement("button")
    editNote.className = "editNote"
    editNote.innerHTML = "<i class='bi bi-pencil'></i>"
    //----------------edit note----------------------
    editNote.addEventListener("click", function (ev) {
        let taskCheckinfo = ev.target.parentElement.parentElement.querySelector(".info").textContent
        editbtn.style.display = "block"
        savebtn.style.display = "none"
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].infoTask == taskCheckinfo) {
                index = i;
                taskInfo.value = tasks[index].infoTask
                taskDate.value = convertDigitAgain(tasks[index].dateTask)
                taskTime.value = tasks[index].timeTaks
                console.log(index);

            }
        }
    })


    //-------------------------------------------

    info.textContent = information
    Pdate.textContent = dateof
    Ptime.textContent = timeof
    //------הכנסה למערך המשימות---
    
    tasks.push({ infoTask: information, dateTask: dateof, timeTaks: timeof })
    // ---שמירה בזיכרון----
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //------אימוץ אלמנטים לתצוגה------
    note.style.backgroundImage = "url(" + colorfull[x] + ")"
    timeDiv.appendChild(Pdate)
    timeDiv.appendChild(Ptime)
    note.appendChild(delNote)
    note.appendChild(editNote)
    note.appendChild(info)
    note.appendChild(timeDiv)
    notesDiv.appendChild(note)

    //---איפוס האינפוטים---
    ResetFunction()

}
// editbtn.addEventListener("click",EditNoteFunction(index))
function EditNoteFunction(index) {
    tasks[index].infoTask = taskInfo.value
    tasks[index].dateTask = convertDigitIn(taskDate.value)
    tasks[index].timeTaks = taskTime.value


    console.log(index);
    console.log(tasks[index]);
    console.log(tasks);
    ResetFunction()
    editbtn.style.display = "none"
    savebtn.style.display = "block"
    localStorage.setItem("tasks", JSON.stringify(tasks));
  
    tasks=[]
    ShowTasks()

}


///----------------------------------------