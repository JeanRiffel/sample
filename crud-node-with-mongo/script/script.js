const mainUrl = 'http://localhost:3000'
const urlSendData = mainUrl + '/sendData'
const urlGetData = mainUrl + '/getData'
const urlPutData = mainUrl + '/putData'
const urlDeletaData = mainUrl + '/delData'

let getFieldsFromForm = () =>{
    fields = {
        id      : document.getElementById('id').value,
        name    : document.getElementById('name').value,
        surname : document.getElementById('surname').value
    }
    return fields
}

let viewData = (data) => {
    try {        
        document.getElementById("viewData").innerHTML = ""  

        let ulElem = document.createElement('ul')
        
        data.forEach(element => {
            let user = element.id + ' ' + element.name + ' ' + element.surname
            let item = document.createElement('li')
            let value = document.createTextNode(user)
            item.appendChild(value)
            ulElem.appendChild(item)
        });
        document.getElementById("viewData").appendChild(ulElem)
    }catch(err){
        alert(err)
    }
}

/**
 * Send data from form to server
 */
let sendData = () =>{
    let data = getFieldsFromForm()    
    let oReq = new window.XMLHttpRequest()
    oReq.open('POST', urlSendData , true)
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    oReq.send(JSON.stringify(data))
}    

/**
 * Recover data from server
 */
let getData = () =>{
    
    var xhr = new XMLHttpRequest()

    xhr.open('GET', urlGetData, true)
    xhr.onload = function (){
        var users = JSON.parse(xhr.responseText)
        if (xhr.readyState == 4 && xhr.status == "200"){            
            viewData(users)  
        }else{
            console.error(users)
        }
    }
    xhr.send(null)
}

let putData = () =>{
    id = document.getElementById('id').value
    
    let data = getFieldsFromForm()
            
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", urlPutData+'/'+id, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    
    xhr.onload = function () {

        var users = JSON.parse(xhr.responseText);
        
        if (xhr.readyState == 4 && xhr.status == "200") {
            viewData(users)  
        } else {
            console.error(users);
        }
    }
    xhr.send(JSON.stringify(data));
}

let deleteData = () =>{
    
    let id = document.getElementById('id').value
    
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", urlDeletaData+'/'+id, true);
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            viewData(users)  
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
}

let cleanData = () =>{
    document.getElementById('id').value = ""
    document.getElementById('name').value = ""
    document.getElementById('surname').value = ""
    document.getElementById('id').focus()
}