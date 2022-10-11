
// implement simulation modeling here
let customers  = [];
let cusTable = document.querySelectorAll(".cus-table");

const addCustomers = document.querySelector('#addCustomers');
addCustomers.addEventListener('click', (e) =>{
    e.preventDefault();
    const num = document.querySelector('#num').value;
    if(num == ''){
        alert('Please enter number of customers');
    }
    if(num !== ''){
        generateNum(num, customers);

        cusTable[0].style.display = 'block';
        cusTable[1].style.display = 'block';
    function generateNum(num, arr){

    for (let i = 0; i < num; i++) {
        arr.push(i);
    }
}
}else{
    customers = [];
}
const RDForIAT = randomDigit(1, 1000, customers.length, 0);
const IAT = generateIAT(RDForIAT);
const AT = ATCumulative(IAT);
const RDForST = randomDigit(1, 100, customers.length, 1);
const ST = generateST(RDForST);
const TSB = generateTSBAndTSE(AT, ST).TSB;
const TSE = generateTSBAndTSE(AT, ST).TSE;
const ITS = generateTSBAndTSE(AT, ST).ITS;
const WT = generateWT(TSE, AT);
const TSS = generateTSS(ST, WT);
const sumTotalObject = {
    customers: customers.length,
    RDForIAT: '',
    IAT: sumFun(IAT),
    AT: sumFun(AT),
    RDForST: '',
    ST: sumFun(ST),
    TSB: sumFun(TSB),
    WT: sumFun(WT),
    TSE: sumFun(TSE),
    TSS: sumFun(TSS),
    ITS: sumFun(ITS),
}
 const avgResultObject = {
    avgWT: averageWT(WT, customers.length),
    probabilityCustomerWT: probabilityWT(WT),
    probabilityOfIdleTime: probabilityIdleTime(ITS, TSE),
    avgServiceTime: avgServiceTime(ST),
    avgAT: avgAT(AT),
    avgWTWhoWait: avgWTWhoWait(WT),
    avgTSS: avgTSS(TSS),
}
const  resultObject = {
    customers,
    RDForIAT,
    IAT,
    AT,
    RDForST,
    ST,
    TSB,
    WT,
    TSE,
    TSS,
    ITS,

}
// print values on dom
const tableBody = document.querySelector('#table-body');
resultObject.customers.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${resultObject.RDForIAT[index]}</td>
    <td>${resultObject.IAT[index]}</td>
    <td>${resultObject.AT[index]}</td>
    <td>${resultObject.RDForST[index]}</td>
    <td>${resultObject.ST[index]}</td>
    <td>${resultObject.TSB[index]}</td>
    <td>${resultObject.WT[index]}</td>
    <td>${resultObject.TSE[index]}</td>
    <td>${resultObject.TSS[index]}</td>
    <td>${resultObject.ITS[index]}</td>
    `;
    tableBody.appendChild(tr);
});
const sumTotal = document.querySelector('#sum-total');
sumTotal.innerHTML = `
<td>Total = ${sumTotalObject.customers}</td>
<td>${sumTotalObject.RDForIAT}</td>
<td>${sumTotalObject.IAT}</td>
<td>${sumTotalObject.AT}</td>
<td>${sumTotalObject.RDForST}</td>
<td>${sumTotalObject.ST}</td>
<td>${sumTotalObject.TSB}</td>
<td>${sumTotalObject.WT}</td>
<td>${sumTotalObject.TSE}</td>
<td>${sumTotalObject.TSS}</td>
<td>${sumTotalObject.ITS}</td>
`;  
const allAvgResult = document.querySelector('#all-average');
allAvgResult.innerHTML = `
<p>Average Waiting Time = <b>  ${avgResultObject.avgWT.toFixed(2)} min</b></p>
<p>Probability of Waiting Time = <b> ${avgResultObject.probabilityCustomerWT.toFixed(2)}% </b></p>
<p>Probability of Idle Time = <b> ${avgResultObject.probabilityOfIdleTime.toFixed(2)}% </b></p>
<p>Average Service Time = <b> ${avgResultObject.avgServiceTime.toFixed(2)} mins</b> </p>
<p>Average Arrival Time = <b> ${avgResultObject.avgAT.toFixed(2)}  mins</b></p>
<p>Average Waiting Time Who Wait = <b> ${avgResultObject.avgWTWhoWait.toFixed(2)} mins</b></p>
<p>Average Time Spent in System = <b> ${avgResultObject.avgTSS.toFixed(2)} mins</b></p>
`; 
})

// all functions

function generateIAT(rd) {
    let result = [];
        result[0] = 0;
    for (let i = 1; i < rd.length; i++) {

        if(rd[i] < 125){
            result.push(1);
        }
        else if(rd[i] < 250){
            result.push(2);
        }
        else if(rd[i] < 375){
            result.push(3);
        }
        else if(rd[i] < 500){
            result.push(4);
        }
        else if(rd[i] < 625){
            result.push(5);
        }
        else if(rd[i] < 750){
            result.push(6);
        }
        else if(rd[i] < 875){
            result.push(7);
        }else if(rd[i] < 1000){
            result.push(8);
        }
    }

    return result;
}

function ATCumulative(iat){
    let result = [0];
    for (let i = 0; i < customers.length; i++) {
        
        result.push(result[i] + iat[i]);
    }
    result.shift();
    return result;

}


//  ST = Service Time
function generateST(rd) {
    let result = [];
    for (let i = 0; i < rd.length; i++) {
        if(rd[i] <= 20){
         result.push(1);
        } else if(rd[i] <= 30){
            result.push(2);
        }else if(rd[i] <= 55){
            result.push(3);
        }else if(rd[i] <= 85){
            result.push(4);
        }else if(rd[i] <= 95){
            result.push(5);
        } else if(rd[i] <= 100){
            result.push(6);
        }
    }
    return result;
}

// TSE & TSB
function generateTSBAndTSE(at, set){
    let TSB = []
    let TSE = []
    let ITS = []
    TSB[0] = 0;
    TSE[0] = set[0];
    ITS[0] = 0;
    for (let i = 1; i <= customers.length  ; i++) {
        
        TSB.push(Math.max(TSE[i -1], at[i]))  
        TSE.push(TSB[i] + set[i])
        ITS.push(TSB[i] - TSE[i -1])
        
    }
    TSB.pop();
    TSE.pop();
    ITS.pop();
     console.log({TSB, TSE, ITS});
    return {TSB, TSE, ITS}
}

function generateWT(tse, at){
    
    let result = []
   result[0] = 0;
    for (let i = 1; i <= customers.length + 2; i++) {
        if(tse[i -1] > at[i]){
            
            result.push(tse[i -1] - at[i]);
        }else{
            result.push(0);
        }
    }
    return result;
}
function generateTSS(st, wt) {
    let result = [];
    for (let i = 0; i < st.length; i++) {
        result.push(st[i] + wt[i]);
    }
    return result;
}
function randomDigit(min,max, length, initial) {
    var result = [];
    if(initial == 0) {       
        result.push(0);
    
    } 
    for (let i = 0; i < length; i++) {
    result.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    
    return result;
}

// all  average  functions

function averageWT(wt, length) {
    return sumFun(wt) / length ;
}

function probabilityWT(wt){
    wt.pop();
    
    let result = 0;
    for(let i = 0; i < wt.length; i++){
        if(wt[i] > 0){
            result++;
        }      
    }
    
    return (result / wt.length) * 100;
}
function sumFun(arr){
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
function probabilityIdleTime(idle, tse){

    return sumFun(idle) / sumFun(tse) * 100;
}
function avgServiceTime(st){
    return sumFun(st) / st.length;
}
function avgAT(at){
    return sumFun(at) / at.length;
}
function avgWTWhoWait(wt){
    wt.pop();

    let count = 0;
    for(let i = 0; i < wt.length; i++){
        if(wt[i] > 0){
            count++;
        }
    }
    return sumFun(wt) / count;
}
function avgTSS(tss){
    return sumFun(tss) / tss.length;
}
// import rules from json file
const rulesDiv = document.querySelector('#rules');
fetch('rules.json')
.then(response => response.json())
.then(data => {
    data.forEach(rule => {
        const div = document.createElement('details');
        div.innerHTML = `
        <summary>${rule.name}</summary>
        <p>${rule.description}</p>
        <p><b>${rule.rule}</b></p>
        `;
        rulesDiv.appendChild(div);
    })
})



