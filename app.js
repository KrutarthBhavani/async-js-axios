// Name : Krutarth Bhavani


const people = require("./people");
const company = require("./companies")

async function main(){
    try{
        const peopledata = await people.getPeople();
        console.log(peopledata)  
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440");
        console.log(peopledata)  
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameJobTitle("Help Desk Operator");
        console.log(peopledata)  
        
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPostalCodes("Salt Lake City", "Utah");
        console.log(peopledata)  
      
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameCityAndState("Salt Lake City", "Utah");
        console.log(peopledata)  
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await company.getCompany();
        console.log(peopledata)  
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await company.listEmployees("Yost, Harris and Cormier");
        console.log(peopledata)  
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await company.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf");
        console.log(peopledata)  
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await company.sameIndustry('Auto Parts:O.E.M.');
        console.log(peopledata)  
    }catch(e){
        console.log(e);
    }
}

main();