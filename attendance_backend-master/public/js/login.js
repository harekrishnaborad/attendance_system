let success = "no";
let form = document.querySelector("#container")
let user_name = document.querySelector("#Username")
let password = document.querySelector("#password")

form.addEventListener("submit", (event) => {
    formValidation();
    if (isFormValid()) {
        form.submit()
    }
    else{
        event.preventDefault();
    }
})

user_name.addEventListener("change", (event) => {
    username_validation()
    
})

password.addEventListener("change", (event) => {
    password_validation()
    
})

function isFormValid(){
    let input_box = document.querySelectorAll(".input_box")
    let result = true
    input_box.forEach((box) => {
        if (box.classList.contains("error")) {
            result = false
        }
    });
    return result
}

function formValidation(){
    get_data_form_db()
}

function setError(element, message){
    const parent = element.parentElement;
    if (parent.classList.contains("success")) {
        parent.classList.remove("success")
    }
    parent.classList.add("error")
    const para = parent.querySelector("p")
    para.textContent = message
}

function setSuccess(element, message) {
    const parent = element.parentElement;
    if (parent.classList.contains("error")) {
        parent.classList.remove("error")
    }
    parent.classList.add("success")
    const para = parent.querySelector("p")
    para.textContent = message
}


function get_data_form_db(){
    onValue(users_in_db, function(snapshort) {
        let users_array = Object.values(snapshort.val())
        console.log(users_array)
        let user_name_value = user_name.value
        let password_value = password.value

        for (let i = 0; i < users_array.length; i++) {
            let current_user = users_array[i]
            console.log(current_user)
            console.log(user_name_value, current_user.userName)
            console.log(password_value, current_user.password)
            if(success == "no"){
                if(user_name_value == current_user.userName && password_value == current_user.password){
                    setSuccess(user_name, "success")
                    setSuccess(password, "success")
                    // window.location.href = "http://127.0.0.1:5500/html/index.html";
                    success = "yes"
                }
                else{
                    setError(user_name, "invalid username or")
                    setError(password, "invalid password")
                }
            }
        }
    })
}