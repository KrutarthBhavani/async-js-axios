const axios = require("axios");
const { getPeople } = require("./people");

async function getCompany(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json')
    return data;
}

const listEmployees = async (companyName) => {
    const company_key = await getCompany();
    const people_key = await getPeople();
    var arr_company = []
    for(var i=0; i<company_key.length;i++){
        arr_company[i] = company_key[i];
    }
    var ans = [];
    for(var i=0;i<arr_company.length;i++){
        
        if((arr_company[i].name) == (companyName)){
            ans.push(company_key[i]);
        }
    }

    var temp_lastname = [];
    var temp_firstname = [];
    for(var i=0;i<people_key.length;i++){
        if(ans[0].id == people_key[i].company_id){
            temp_lastname.push(people_key[i].last_name);
            temp_firstname.push(people_key[i].first_name);
        }
    }
    var temp_fullname = []
    if(temp_firstname.length == temp_lastname.length){
        for(var i=0;i<temp_firstname.length;i++){
            temp_fullname[i] = `${temp_firstname[i]} ${temp_lastname[i]}`
        }
    }
  
    ans[0].employees = temp_fullname;

    if(ans.length == 0) throw "No company name with foobar"
    return ans;
};

const sameIndustry = async (industry) => {
    const key = await getCompany();
    if(industry===null || industry===undefined) throw "Industry not Found";
    if(!isNaN(industry)) throw "Parameter must be String";

    var arr = []
    for(var i=0; i<key.length;i++){
        arr[i] = key[i];
    }
    var ans = [];
    for(var i=0;i<arr.length;i++){
        if(arr[i].industry==industry){
            ans.push(arr[i])
        }
    }
    if(ans.length==0) throw "No companies in that industry"
    return ans;
};

const getCompanyById = async (id) => {
    const key = await getCompany();
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
        if(ans==null||ans==undefined) throw "Company not found"
        return ans;
};

module.exports = {getCompany,listEmployees,sameIndustry,getCompanyById};