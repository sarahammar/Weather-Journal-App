    /* Global Variables */


    
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// the url and the key from the weather site
let baseurl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ',us&appid=279b1c7483c5e0d6d665619516175aac&units=metric';
//add event to button
document.getElementById('generate').addEventListener('click',theuseraction);
// the event function
function theuseraction(e){
    //find out the user choice
    const zipcode = document.getElementById('zip').value;
    const userfeeling = document.getElementById('feelings').value;  
    getuserdata(baseurl, zipcode , apiKey)

    .then (function (data) {
            //add data
            postData('http://localhost:8000/addData', { date: newDate, temp: data.main.temp,content: userfeeling })
            
         .then(function () {
                 updateUI();

             });
        })
}


// get app data
 const getuserdata = async(baseurl, zipcode , apiKey ) =>{
const res = await fetch(baseurl+ zipcode + apiKey)
console.log (res);
try {
    const data = await res.json();
    console.log(data);
    return data;
}
catch{
    console.log('get app data error' , 'error');
}
 }

//  post app data
const postData = async(url='', data= {})=>{
    const response = await fetch(url,{
        method:'POST',
        Credentials: 'same-origin',
        headers:{
            'Content-type':'application/json',
            },
            body:JSON.stringify(data)
    });
        try{
            const newData = await response.json();
            console.log(newData);
            return newData;
        }
        catch(error){
            console.log("error",error);
        }

 }




//update user interface
const updateUI= async()=> {
    const request = await fetch('/all');
    try {

        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
        alert('update user interface error' + error);
    }
};
