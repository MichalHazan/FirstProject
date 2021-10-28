let editbtn = document.querySelector("#editbtn")
editbtn.style.display = "none"
/* האינפוטים שבהם מכניס המשתמש את פרטי המשימה
*/
const taskInfo = document.querySelector("#taskInfo")
const taskDate = document.querySelector("#taskDate")
const taskTime = document.querySelector("#taskTime")
//-----אובייקט המשימות-----
const tasks = []
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
    let tasksStorge = JSON.parse(localStorage.getItem("tasks"))
    for (let j = 0; j < tasksStorge.length; j++) {
        CreateNote(tasksStorge[j].infoTask, tasksStorge[j].dateTask, tasksStorge[j].timeTaks)
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
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        }
        //-----מחיקה מהתצוגה-----
        e.target.parentElement.parentElement.remove()
    })
    //-------------------------------------------
    const editNote = document.createElement("button")
    editNote.className = "editNote"
    editNote.innerHTML = "<i class='bi bi-pencil'></i>"
    //----------------edit note----------------------
    editNote.addEventListener('click', function (ev) {
        let taskCheckb = ev.target.parentElement.parentElement.querySelector(".info").textContent
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].infoTask == taskCheckb) {

                taskInfo.value = tasks[i].infoTask
                taskDate.value = convertDigitAgain(tasks[i].dateTask)
                taskTime.value = tasks[i].timeTaks
                savebtn.style.display = "none"
                editbtn.style.display = "block"
                editbtn.addEventListener('click', function () {
                    tasks[i].infoTask = taskInfo.value
                    tasks[i].dateTask = convertDigitIn(taskDate.value)
                    tasks[i].timeTaks = taskTime.value
                    savebtn.style.display = "block"
                    editbtn.style.display = "none"
                    ResetFunction()
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    ShowTasks()
                })

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



///----------------------------------------