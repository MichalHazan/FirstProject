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
    note.appendChild(info)
    note.appendChild(timeDiv)
    notesDiv.appendChild(note)

    //---איפוס האינפוטים---
    ResetFunction()

}



///----------------------------------------