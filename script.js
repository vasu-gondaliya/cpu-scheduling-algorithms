let process = 1;
let radios = document.querySelectorAll("#algorithms input");
function checkPriorityCell() {
    radios.forEach(radio => {
        if (radio.checked == true) {
            let prioritycell = document.querySelectorAll(".priority");
            if (radio.id == "pnp" || radio.id == "pp") {
                prioritycell.forEach(element => {
                    element.classList.remove("hide");
                });
            }
            else {
                prioritycell.forEach(element => {
                    element.classList.add("hide");
                });
            }
        }
    });
}
radios.forEach(radio => radio.addEventListener("change", () => { // change algorithm to use
    let timequantum = document.querySelector("#time-quantum").classList;
    if (radio.id == "rr") {
        timequantum.remove("hide");
    }
    else {
        timequantum.add("hide");
    }
    checkPriorityCell();
}));
function gcd(x, y) {
    while (y) {
        let t = y;
        y = x % y;
        x = t;
    }
    return x;
}
function lcm(x, y) {
    return ((x * y) / gcd(x, y));
}
function lcmAll() {
    let result = 1;
    for (let i = 0; i < process; i++) {
        result = lcm(result, document.querySelector(".main-table").rows[2 * i + 2].cells.length);
    }
    return result;
}
function updateColspan() {
    let totalColumns = lcmAll();
    let processHeading = document.querySelector("thead .process-time");
    processHeading.setAttribute("colspan", totalColumns);
    let processTimes = [];
    let table = document.querySelector(".main-table");
    for (let i = 0; i < process; i++) {
        let row = table.rows[2 * i + 2].cells;
        processTimes.push(row.length);
    }
    for (let i = 0; i < process; i++) {
        let row1 = table.rows[2 * i + 1].cells;
        let row2 = table.rows[2 * i + 2].cells;
        for (let j = 0; j < processTimes[i]; j++) {
            row1[j + 3].setAttribute("colspan", totalColumns / processTimes[i]);
            row2[j].setAttribute("colspan", totalColumns / processTimes[i]);
        }
    }
}
function addremove() {
    let processTimes = [];
    let table = document.querySelector(".main-table");
    for (let i = 0; i < process; i++) {
        let row = table.rows[2 * i + 2].cells;
        processTimes.push(row.length);
    }
    let addbtns = document.querySelectorAll(".add-process-btn");
    for (let i = 0; i < process; i++) {
        addbtns[i].onclick = () => {
            let table = document.querySelector(".main-table");
            let row1 = table.rows[2 * i + 1];
            let row2 = table.rows[2 * i + 2];
            let newcell1 = row1.insertCell(processTimes[i] + 3);
            newcell1.innerHTML = "IO";
            newcell1.classList.add("process-time");
            newcell1.classList.add("io");
            newcell1.classList.add("process-heading");
            let newcell2 = row2.insertCell(processTimes[i]);
            newcell2.innerHTML = '<input type="number" min="1" step="1" value="1">';
            newcell2.classList.add("process-time");
            newcell2.classList.add("io");
            newcell2.classList.add("process-input");
            let newcell3 = row1.insertCell(processTimes[i] + 4);
            newcell3.innerHTML = "CPU";
            newcell3.classList.add("process-time");
            newcell3.classList.add("cpu");
            newcell3.classList.add("process-heading");
            let newcell4 = row2.insertCell(processTimes[i] + 1);
            newcell4.innerHTML = '<input type="number" min="1" step="1" value="1">';
            newcell4.classList.add("process-time");
            newcell4.classList.add("cpu");
            newcell4.classList.add("process-input");
            processTimes[i] += 2;
            updateColspan();
        }
    }
    let removebtns = document.querySelectorAll(".remove-process-btn");
    for (let i = 0; i < process; i++) {
        removebtns[i].onclick = () => {
            if (processTimes[i] > 1) {
                let table = document.querySelector(".main-table");
                processTimes[i]--;
                let row1 = table.rows[2 * i + 1];
                row1.deleteCell(processTimes[i] + 3)
                let row2 = table.rows[2 * i + 2];
                row2.deleteCell(processTimes[i]);
                processTimes[i]--;
                table = document.querySelector(".main-table");
                row1 = table.rows[2 * i + 1];
                row1.deleteCell(processTimes[i] + 3)
                row2 = table.rows[2 * i + 2];
                row2.deleteCell(processTimes[i]);
                updateColspan();
            }
        }
    }
}
addremove();
document.querySelector(".add-btn").onclick = () => {        //adds a row
    process++;
    let rowHTML1 = `
                        <td class="process-id" rowspan="2">P${process}</td>
                        <td class="priority hide" rowspan="2"><input type="number" min="1" step="1" value="1"></td>
                        <td class="arrival-time" rowspan="2"><input type="number" min="0" step="1" value="0"> </td>
                        <td class="process-time cpu process-heading" colspan="">CPU</td>
                        <td class="process-btn"><button type="button" class="add-process-btn">+</button></td>
                        <td class="process-btn"><button type="button" class="remove-process-btn">-</button></td>
                    `;
    let rowHTML2 = `
                         <td class="process-time cpu process-input"><input type="number" min="1" step="1" value="1"> </td>
                    `;
    let table = document.querySelector(".main-table tbody");
    table.insertRow(table.rows.length).innerHTML = rowHTML1;
    table.insertRow(table.rows.length).innerHTML = rowHTML2;
    checkPriorityCell();
    addremove();
    updateColspan();
};
document.querySelector(".remove-btn").onclick = () => {
    let table = document.querySelector(".main-table");
    if (process > 1) {
        table.deleteRow(table.rows.length - 1);
        table.deleteRow(table.rows.length - 1);
        process--;
    }
    updateColspan();
}
function mainInput() {
    let mainArray = [];
    for (let i = 1; i <= process; i++) {
        let pid = i - 1;
        let rowCells1 = document.querySelector(".main-table").rows[2 * i - 1].cells;
        let rowCells2 = document.querySelector(".main-table").rows[2 * i].cells;
        let p = Number(rowCells1[1].firstElementChild.value);
        let at = Number(rowCells1[2].firstElementChild.value);
        let ptn = Number(rowCells2.length);
        let pta = [];
        for (let j = 0; j < ptn; j++) {
            pta.push(Number(rowCells2[j].firstElementChild.value));
        }
        mainArray.push([pid, p, at, pta]);
    }
    mainArray.sort((a, b) => (a[2] - b[2]));    //sort according to arrival time
    return mainArray;
}
let processId = [];
let priorityArray = [];
let arrivalTime = [];
let processTimeArray = [];
let processTimeNumber = [];
let remainingProcessTimeArray = [];
let totalBurstTime = [];
let remainingBurstTime = [];
let currentProcessIndex = [];
let start = [];
let done = [];
let currentTime = 0;
let returnTime = [];
let completionTime = [];
let turnAroundTime = [];
let waitingTime = [];
let responseTime = [];
let schedule = [];
function resetVariables() {
    processId = [], priorityArray = [], arrivalTime = [], processTimeArray = [], processTimeNumber = [], remainingProcessTimeArray = [], totalBurstTime = [], remainingBurstTime = [], currentProcessIndex = [], start = [], done = [], currentTime = 0, returnTime = [], completionTime = [], turnAroundTime = [], waitingTime = [], responseTime = [], schedule = [];
}
document.querySelector(".calculate").onclick = () => {
    let algorithmChart = document.createElement("div");
    algorithmChart.id = "algorithm-chart";
    let chartData = [];
    chartData.push(["Algorithm", "Completion Time", "Turn Around Time", "Waiting Time", "Response Time"]);
    let algorithmArray = ["fcfs", "sjf", "srjf", "ljf", "lrjf", "hrrn", "rr", "pnp", "pp"];
    algorithmArray.forEach(function (element) {
        let mainArray = mainInput();
        totalBurstTime = new Array(process).fill(0);
        mainArray.forEach((e1, i) => {
            processId[i] = e1[0];
            priorityArray[i] = e1[1];
            arrivalTime[i] = e1[2];
            processTimeArray[i] = e1[3];
            processTimeNumber[i] = processTimeArray[i].length;
            processTimeArray[i].forEach((e2, j) => {
                if (j % 2 == 0) {
                    totalBurstTime[i] += e2;
                }
            });
        });
        remainingProcessTimeArray = processTimeArray.slice();
        remainingBurstTime = totalBurstTime.slice();
        currentProcessIndex = new Array(process).fill(0);
        start = new Array(process).fill(false);
        done = new Array(process).fill(false);
        returnTime = arrivalTime.slice();
        window[element]();
        processId.forEach(function (i) {
            turnAroundTime[i] = completionTime[i] - arrivalTime[i];
            waitingTime[i] = turnAroundTime[i] - totalBurstTime[i];
        })
        let avgct = 0;
        completionTime.forEach(element => {
            avgct += element;
        })
        avgct /= process;
        let avgtat = 0;
        turnAroundTime.forEach(element => {
            avgtat += element;
        })
        avgtat /= process;
        let avgwt = 0;
        waitingTime.forEach(element => {
            avgwt += element;
        });
        avgwt /= process;
        let avgrt = 0;
        responseTime.forEach(element => {
            avgrt += element;
        });
        avgrt /= process;
        chartData.push([element, avgct, avgtat, avgwt, avgrt]);
        resetVariables();
    });
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(chartData);
        var options = {
            chart: {
                title: 'Algorithms',
                subtitle: 'Average Completion Time,Turn Around Time, Waiting Time, Response Time',
            }
        };
        var chart = new google.charts.Bar(document.getElementById('algorithm-chart'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
    let mainArray = mainInput();
    totalBurstTime = new Array(process).fill(0);
    mainArray.forEach((e1, i) => {
        processId[i] = e1[0];
        priorityArray[i] = e1[1];
        arrivalTime[i] = e1[2];
        processTimeArray[i] = e1[3];
        processTimeNumber[i] = processTimeArray[i].length;
        processTimeArray[i].forEach((e2, j) => {
            if (j % 2 == 0) {
                totalBurstTime[i] += e2;
            }
        });
    });
    remainingProcessTimeArray = processTimeArray.slice();
    remainingBurstTime = totalBurstTime.slice();
    currentProcessIndex = new Array(process).fill(0);
    start = new Array(process).fill(false);
    done = new Array(process).fill(false);
    returnTime = arrivalTime.slice();
    document.querySelectorAll("#algorithms input").forEach(element => {
        if (element.checked == true) {
            window[element.id]();
        }
    });
    processId.forEach(function (i) {
        turnAroundTime[i] = completionTime[i] - arrivalTime[i];
        waitingTime[i] = turnAroundTime[i] - totalBurstTime[i];
    })
    function reduceSchedule() {
        let scheduleLength = schedule.length;
        let newSchedule = [];
        let currentScheduleElement = schedule[0][0];
        let currentScheduleLength = schedule[0][1];
        for (let i = 1; i < schedule.length; i++) {
            if (schedule[i][0] == currentScheduleElement) {
                currentScheduleLength += schedule[i][1];
            }
            else {
                newSchedule.push([currentScheduleElement, currentScheduleLength]);
                currentScheduleElement = schedule[i][0];
                currentScheduleLength = schedule[i][1];
            }
        }
        newSchedule.push([currentScheduleElement, currentScheduleLength]);
        return newSchedule;
    }
    schedule = reduceSchedule();
    function createTable(schedule) {
        let scheduleTableHeading = document.createElement("h3");
        scheduleTableHeading.innerHTML = "Schedule Table";
        document.body.appendChild(scheduleTableHeading);
        let endTime = 0;
        schedule.forEach(element => endTime += element[1]);
        let table1 = document.createElement("table");
        let table2 = document.createElement("table");
        table1.classList.add("schedule-table");
        table1.classList.add("schedule-table-process");
        table2.classList.add("schedule-table");
        table2.classList.add("schedule-table-time");
        let row1 = table1.insertRow(0);
        let row2 = table2.insertRow(0);
        let scheduleLength = 0;
        let cellWidth;
        for (let i = 0; i < schedule.length; i++) {
            let cell1 = row1.insertCell(i);
            if (schedule[i][0] == -1) {
                cell1.innerHTML = "-";
            }
            else {
                cell1.innerHTML = "P" + schedule[i][0];
            }
            cellWidth = 30 * schedule[i][1];
            cell1.style.width = cellWidth + "px";
            let cell2 = row2.insertCell(i);
            cell2.innerHTML = scheduleLength;
            scheduleLength += schedule[i][1];
            cell2.style.width = cellWidth + "px";
        }
        let cell = row2.insertCell(schedule.length);
        cell.innerHTML = endTime;
        cell.style.width = cellWidth + "px";
        document.body.appendChild(table1);
        document.body.appendChild(table2);
    }
    createTable(schedule);
    function createFinalTable() {
        let finalTableHeading = document.createElement("h3");
        finalTableHeading.innerHTML = "Final Table";
        document.body.appendChild(finalTableHeading);
        let table = document.createElement("table");
        table.classList.add("final-table");
        let thead = table.createTHead();
        let row = thead.insertRow(0);
        let headings = ["Process", "Arrival Time", "Total Burst Time", "Completion Time", "Turn Around Time", "Waiting Time", "Response Time"];
        headings.forEach((element, index) => {
            let cell = row.insertCell(index);
            cell.innerHTML = element;
        });
        for (let i = 0; i < process; i++) {
            let row = table.insertRow(i + 1);
            let cell = row.insertCell(0);
            cell.innerHTML = "P" + (i + 1);
            cell = row.insertCell(1);
            cell.innerHTML = arrivalTime[i];
            cell = row.insertCell(2);
            cell.innerHTML = totalBurstTime[i];
            cell = row.insertCell(3);
            cell.innerHTML = completionTime[i];
            cell = row.insertCell(4);
            cell.innerHTML = turnAroundTime[i];
            cell = row.insertCell(5);
            cell.innerHTML = waitingTime[i];
            cell = row.insertCell(6);
            cell.innerHTML = responseTime[i];
        }
        document.body.appendChild(table);
    }
    createFinalTable();
    function cputhroughput() {
        let tbt = 0;
        totalBurstTime.forEach(element => tbt += element);
        let lastct = 0;
        completionTime.forEach(element => lastct = Math.max(lastct, element));
        let cpu = document.createElement("p");
        cpu.innerHTML = "CPU Utilization : " + (tbt / lastct) * 100 + "%";
        document.body.appendChild(cpu);
        let tp = document.createElement("p");
        tp.innerHTML = "Throughput : " + (process / lastct);
        document.body.appendChild(tp);
    }
    cputhroughput();
    document.body.appendChild(algorithmChart);
    resetVariables();
};
function fcfs() {
    while (done.some(element => (element == false))) {
        let candidates = processId.filter(element => (done[element] == false && returnTime[element] <= currentTime));
        if (candidates.length == 0) {
            currentTime++;
            schedule.push([-1, 1]);
        }
        else {
            candidates.sort((a, b) => (returnTime[a] - returnTime[b]));
            let found = candidates[0];
            if (start[found] == false) {
                start[found] = true;
                responseTime[found] = currentTime - arrivalTime[found];
            }
            schedule.push([found + 1, processTimeArray[found][currentProcessIndex[found]]]);
            currentTime += processTimeArray[found][currentProcessIndex[found]];
            currentProcessIndex[found]++;
            if (currentProcessIndex[found] == processTimeNumber[found]) {
                done[found] = true;
                completionTime[found] = currentTime;
            }
            else {
                returnTime[found] = currentTime + processTimeArray[found][currentProcessIndex[found]];
                currentProcessIndex[found]++;
            }
        }
    }
}
function sjf() {
    while (done.some(element => (element == false))) {
        let candidates = processId.filter(element => (done[element] == false && returnTime[element] <= currentTime));
        if (candidates.length == 0) {
            currentTime++;
            schedule.push([-1, 1]);
        }
        else {
            candidates.sort((a, b) => (remainingBurstTime[a] - remainingBurstTime[b]));
            let found = candidates[0];
            if (start[found] == false) {
                start[found] = true;
                responseTime[found] = currentTime - arrivalTime[found];
            }
            schedule.push([found + 1, processTimeArray[found][currentProcessIndex[found]]]);
            currentTime += processTimeArray[found][currentProcessIndex[found]];
            remainingBurstTime[found] -= processTimeArray[found][currentProcessIndex[found]];
            currentProcessIndex[found]++;
            if (currentProcessIndex[found] == processTimeNumber[found]) {
                done[found] = true;
                completionTime[found] = currentTime;
            }
            else {
                returnTime[found] = currentTime + processTimeArray[found][currentProcessIndex[found]];
                currentProcessIndex[found]++;
            }
        }
    }
}
function ljf() {
    while (done.some(element => (element == false))) {
        let candidates = processId.filter(element => (done[element] == false && returnTime[element] <= currentTime));
        if (candidates.length == 0) {
            currentTime++;
            schedule.push([-1, 1]);
        }
        else {
            candidates.sort((a, b) => (remainingBurstTime[b] - remainingBurstTime[a]));
            let found = candidates[0];
            if (start[found] == false) {
                start[found] = true;
                responseTime[found] = currentTime - arrivalTime[found];
            }
            schedule.push([found + 1, processTimeArray[found][currentProcessIndex[found]]]);
            currentTime += processTimeArray[found][currentProcessIndex[found]];
            remainingBurstTime[found] -= processTimeArray[found][currentProcessIndex[found]];
            currentProcessIndex[found]++;
            if (currentProcessIndex[found] == processTimeNumber[found]) {
                done[found] = true;
                completionTime[found] = currentTime;
            }
            else {
                returnTime[found] = currentTime + processTimeArray[found][currentProcessIndex[found]];
                currentProcessIndex[found]++;
            }
        }
    }
}
function srjf() {
    while (done.some(element => (element == false))) {
        let candidates = processId.filter(element => (done[element] == false && returnTime[element] <= currentTime));
        if (candidates.length == 0) {
            currentTime++;
            schedule.push([-1, 1]);
        }
        else {
            candidates.sort((a, b) => (remainingBurstTime[a] - remainingBurstTime[b]));
            let found = candidates[0];
            if (start[found] == false) {
                start[found] = true;
                responseTime[found] = currentTime - arrivalTime[found];
            }
            schedule.push([found + 1, 1]);
            currentTime++;
            remainingBurstTime[found]--;
            remainingProcessTimeArray[found][currentProcessIndex[found]]--;
            if (remainingProcessTimeArray[found][currentProcessIndex[found]] == 0) {
                currentProcessIndex[found]++;
                if (currentProcessIndex[found] == processTimeNumber[found]) {
                    done[found] = true;
                    completionTime[found] = currentTime;
                }
                else {
                    returnTime[found] = currentTime + processTimeArray[found][currentProcessIndex[found]];
                    currentProcessIndex[found]++;
                }
            }
        }
    }
}
function lrjf() {
    while (done.some(element => (element == false))) {
        let candidates = processId.filter(element => (done[element] == false && returnTime[element] <= currentTime));
        if (candidates.length == 0) {
            currentTime++;
            schedule.push([-1, 1]);
        }
        else {
            candidates.sort((a, b) => (remainingBurstTime[b] - remainingBurstTime[a]));
            let found = candidates[0];
            if (start[found] == false) {
                start[found] = true;
                responseTime[found] = currentTime - arrivalTime[found];
            }
            schedule.push([found + 1, 1]);
            currentTime++;
            remainingBurstTime[found]--;
            remainingProcessTimeArray[found][currentProcessIndex[found]]--;
            if (remainingProcessTimeArray[found][currentProcessIndex[found]] == 0) {
                currentProcessIndex[found]++;
                if (currentProcessIndex[found] == processTimeNumber[found]) {
                    done[found] = true;
                    completionTime[found] = currentTime;
                }
                else {
                    returnTime[found] = currentTime + processTimeArray[found][currentProcessIndex[found]];
                    currentProcessIndex[found]++;
                }
            }
        }
    }
}
function rr() {
    let timeQuantum = document.querySelector("#tq").value;
    let processQueue = [];
    let inQueue = new Array(process).fill(false);
    currentTime--;
    while (processQueue.length == 0) {
        currentTime++;
        schedule.push([-1, 1]);
        processQueue = processId.filter(element => (returnTime[element] <= currentTime));
    }
    if (schedule.length > 0) {
        schedule.pop();
    }
    processQueue.forEach(function (element) {
        inQueue[element] = true;
    })
    while (done.some(element => (element == false))) {
        if (processQueue.length == 0) {
            currentTime++;
            schedule.push([-1, 1]);
            processId.forEach(function (element) {
                if (done[element] == false && inQueue[element] == false && returnTime[element] <= currentTime) {
                    processQueue.push(element)
                    inQueue[element] = true;
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        else {
            let found = processQueue.shift();
            if (start[found] == false) {
                start[found] = true;
                responseTime[found] = currentTime - arrivalTime[found];
            }
            let time = Math.min(remainingProcessTimeArray[found][currentProcessIndex[found]], timeQuantum);
            remainingProcessTimeArray[found][currentProcessIndex[found]] -= time;
            remainingBurstTime[found] -= time;
            currentTime += time;
            schedule.push([found + 1, time]);
            processId.forEach(function (element) {
                if (done[element] == false && inQueue[element] == false && returnTime[element] <= currentTime) {
                    processQueue.push(element)
                    inQueue[element] = true;
                    return true;
                }
                else {
                    return false;
                }
            });
            if (remainingProcessTimeArray[found][currentProcessIndex[found]] == 0) {
                currentProcessIndex[found]++;
                inQueue[found] = false;
                if (currentProcessIndex[found] == processTimeNumber[found]) {
                    done[found] = true;
                    completionTime[found] = currentTime;
                }
                else {
                    returnTime[found] = currentTime + processTimeArray[found][currentProcessIndex[found]];
                    currentProcessIndex[found]++;
                }
            }
            else {
                processQueue.push(found);
            }
        }
    }
}
function pnp() {
    while (done.some(element => (element == false))) {
        let candidates = processId.filter(element => (done[element] == false && returnTime[element] <= currentTime));
        if (candidates.length == 0) {
            currentTime++;
            schedule.push([-1, 1]);
        }
        else {
            candidates.sort((a, b) => (priorityArray[a] - priorityArray[b]));
            let found = candidates[0];
            if (start[found] == false) {
                start[found] = true;
                responseTime[found] = currentTime - arrivalTime[found];
            }
            schedule.push([found + 1, processTimeArray[found][currentProcessIndex[found]]]);
            currentTime += processTimeArray[found][currentProcessIndex[found]];
            remainingBurstTime[found] -= processTimeArray[found][currentProcessIndex[found]];
            currentProcessIndex[found]++;
            if (currentProcessIndex[found] == processTimeNumber[found]) {
                done[found] = true;
                completionTime[found] = currentTime;
            }
            else {
                returnTime[found] = currentTime + processTimeArray[found][currentProcessIndex[found]];
                currentProcessIndex[found]++;
            }
        }
    }
}
function pp() {
    while (done.some(element => (element == false))) {
        let candidates = processId.filter(element => (done[element] == false && returnTime[element] <= currentTime));
        if (candidates.length == 0) {
            currentTime++;
            schedule.push([-1, 1]);
        }
        else {
            candidates.sort((a, b) => (priorityArray[a] - priorityArray[b]));
            let found = candidates[0];
            if (start[found] == false) {
                start[found] = true;
                responseTime[found] = currentTime - arrivalTime[found];
            }
            schedule.push([found + 1, 1]);
            currentTime++;
            remainingBurstTime[found]--;
            remainingProcessTimeArray[found][currentProcessIndex[found]]--;
            if (remainingProcessTimeArray[found][currentProcessIndex[found]] == 0) {
                currentProcessIndex[found]++;
                if (currentProcessIndex[found] == processTimeNumber[found]) {
                    done[found] = true;
                    completionTime[found] = currentTime;
                }
                else {
                    returnTime[found] = currentTime + processTimeArray[found][currentProcessIndex[found]];
                    currentProcessIndex[found]++;
                }
            }
        }
    }
}
function hrrn() {
    function responseRatio(id) {
        let s = remainingBurstTime[id];
        let w = currentTime - arrivalTime[id] - s;
        return (1 + (w / s));
    }
    while (done.some(element => (element == false))) {
        let candidates = processId.filter(element => (done[element] == false && returnTime[element] <= currentTime));
        if (candidates.length == 0) {
            currentTime++;
            schedule.push([-1, 1]);
        }
        else {
            candidates.sort((a, b) => (responseRatio(b) - responseRatio(a)));
            let found = candidates[0];
            if (start[found] == false) {
                start[found] = true;
                responseTime[found] = currentTime - arrivalTime[found];
            }
            schedule.push([found + 1, processTimeArray[found][currentProcessIndex[found]]]);
            currentTime += processTimeArray[found][currentProcessIndex[found]];
            remainingBurstTime[found] -= processTimeArray[found][currentProcessIndex[found]];
            currentProcessIndex[found]++;
            if (currentProcessIndex[found] == processTimeNumber[found]) {
                done[found] = true;
                completionTime[found] = currentTime;
            }
            else {
                returnTime[found] = currentTime + processTimeArray[found][currentProcessIndex[found]];
                currentProcessIndex[found]++;
            }
        }
    }
}