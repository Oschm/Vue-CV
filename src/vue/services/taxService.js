import axios from "axios";
const url = "https://incometaxbackend.onrender.com";



export async function calculateIncomeTax(grossIncome, isMarried = 'N', year = 2023, successCallback, errorCallback) {
    const response = await _post(url+`/calculateIncomeTax`, {grossIncome, isMarried, year});
    if (response.status === 200){
        response.data;
        successCallback(response.data);
    }
    else{
        errorCallback();
    }
}

async function _post(url, body) {
    try{
    const response = await axios.post(url, body);
    return response;
    }
    catch (error){
        return error.response;
    }

}
