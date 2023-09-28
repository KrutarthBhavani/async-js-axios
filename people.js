const axios = require("axios");

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json')
    return data;
}

const getPersonById = async (id) => {
    
    const key = await getPeople();
    
    if(id===null || id===undefined) throw "Id not Found";
    if(!isNaN(id)) throw "id must be String";

        var arr = []
        for(var i=0; i<key.length;i++){
            arr[i] = key[i].id;
        }
        var ans;
        for(var i=0;i<arr.length;i++){
            
            if(arr[i]==id){
                ans = key[i];
            }
        }
        if(ans==null||ans==undefined) throw "Person not found"
        return ans;
};

const sameJobTitle = async (jobTitle) => {
    const key = await getPeople();

    if(jobTitle===null || jobTitle===undefined) throw "job_title not Found";
    if(!isNaN(jobTitle)) throw "job_title must be String";
    if(Array.isArray(jobTitle)) throw "Job Title is not an array"

    var arr = []
    for(var i=0; i<key.length;i++){
        arr[i] = key[i].job_title;
    }
    var ans = [];
    for(var i=0;i<arr.length;i++){
        if((arr[i].toUpperCase()) == (jobTitle.toUpperCase())){
            ans.push(key[i]);
        }
    }
    if(ans===null || ans===undefined) throw "Person not found";
    if(ans.length < 2) throw "Job_Title should have at least 2 values"
    
    return ans;
};

const getPostalCodes = async (city, state) => {
    const key = await getPeople();

    if(city==null || city==undefined || state==null || state==undefined) throw "Invalid Parameter";
    if(!isNaN(city) || !isNaN(state)) throw "Parameter must be String";
    

    var arr = [];
    for(var i=0;i<key.length;i++){
        if((city.toUpperCase())== ((key[i].city).toUpperCase()) 
            && (state.toUpperCase()) == ((key[i].state).toUpperCase())){
            arr.push(+key[i].postal_code);
        }
    }
    var ans = [];
    ans = arr.sort();

    if(ans.length ==0) throw "There are no postal_codes for the given city and state combination"
    
    return ans;
};

const sameCityAndState = async (city, state) => {
    const key = await getPeople();

    if(city==null || city==undefined || state==null || state==undefined) throw "Invalid Parameter";
    if(!isNaN(city) || !isNaN(state)) throw "Parameter must be String";
    
    var arr = [];
    var arr2 = [];
    for(var i=0;i<key.length;i++){
        if((city.toUpperCase())== ((key[i].city).toUpperCase()) 
            && (state.toUpperCase()) == ((key[i].state).toUpperCase())){
            arr.push(key[i].first_name);
            arr2.push(key[i].last_name);
        }
    }
    var ans = []
    if(arr.length == arr2.length){
        for(var i=0;i<arr.length;i++){
            var temp;
            temp = `${arr[i]} ${arr2[i]}`;
            ans.push(temp)
        }
    }

    if(ans.length<2) throw "there are not two people who live in the same city and state"
    return ans;
};

module.exports = {getPeople,getPersonById,sameJobTitle,getPostalCodes, sameCityAndState};