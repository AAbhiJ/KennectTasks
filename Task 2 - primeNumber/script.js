
const findPrime = (event)=>{
event.preventDefault();
const MAX_SIZE = 1000001;

var isPrime = Array.from({ length: MAX_SIZE }, (_, i) => true);
var prime = [];
var primeMS = [];
var SPF = Array.from({ length: MAX_SIZE });

let output = document.getElementById("output")

function manipulated_sieve(N) {

	isPrime[0] = isPrime[1] = true;
    primeMS[0] = primeMS[1] = 0;
    let startTime = (new Date).getTime();
    let OverallStart = (new Date).getTime();
    for (let i = 2; i < N; i++)
	{
    startTime = (new Date).getTime();
	if (isPrime[i])
	{
		prime.push(i);
        primeMS.push((new Date()).getTime()-startTime);
		SPF[i] = i;
	}


	for (
		let j = 0;
		j < prime.length && i * prime[j] < N && prime[j] <= SPF[i];
		j++
	) {
        startTime = (new Date).getTime();

		isPrime[i * prime[j]] = false;

		SPF[i * prime[j]] = prime[j];
        
        primeMS.push((new Date()).getTime()-startTime);
	}
    // console.log("isprime", isPrime)
    // console.log("prime", prime)
    // console.log("spf", SPF,primeMS)

    }
    let OverallEnd = (new Date).getTime();  
    
    output.innerHTML = `Total time : ${OverallEnd - OverallStart} <br/> Average : ${primeMS.reduce((sum, i)=>sum+i,0)}`;
}

// Driver Code
var N = 13; // Must be less than MAX_SIZE

let start = Number(document.getElementById("fromNumber").value);
let to = Number(document.getElementById("toNumber").value);
let nav2b = document.getElementById("nav-2b")
let nav2c = document.getElementById("nav-2c")

manipulated_sieve(to);

let str = `
<table class="table table-striped table-bordered">
    <thead>
        <tr>
            <th>Number</th>
            <th>Result</th>
            <th>Time (ms)</th>
        </tr>
    </thead>
    <tbody>
`;

let primeStr = `
<table class="table table-striped table-bordered">
    <thead>
        <tr>
            <th>Number</th>
            <th>Result</th>
            <th>Time (ms)</th>
        </tr>
    </thead>
    <tbody>
`;


// for (let i = 0; i < prime.length && prime[i] <= to; i++) {
//     if(prime[i]>=start){
//         str = str + `
//             <tr>
//                 <td>${prime[i]}</td>
//                 <td></td>
//             </tr>
//         `;
//     }
// }

let j=0;
for (j=start;j<to;j++){
    if(prime.includes(j)){
        primeStr = primeStr + `
        <tr>
            <td>${j}</td>
            <th>Prime</th>
            <td>${primeMS[j]}</td>
        </tr>
    `;
        str = str + `
        <tr>
            <td>${j}</td>
            <th>Prime</th>
            <td>${primeMS[j]}</td>
        </tr>
    `;
    
    }else{
        str = str + `
        <tr>
            <td>${j}</td>
            <td>Number</td>
            <td>${primeMS[j]}</td>
        </tr>
    `;    
    }
}

str += `
    </tbody>
</table>
`
primeStr += `
    </tbody>
</table>
`
nav2b.innerHTML = str;

nav2c.innerHTML = primeStr;
}