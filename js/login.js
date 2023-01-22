const elForm = document.querySelector(".form");
const elEmail = document.querySelector(".email-input");
const elPassword = document.querySelector(".password-input");

setTimeout(function(){
    let token = localStorage.getItem("token")
    if(token){
        location.replace("index.html")
    }
}, 1000)

elForm.addEventListener("submit" , async function(e){
    e.preventDefault()

    let tokenData = {}

    await fetch("https://reqres.in/api/login" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: elEmail.value,
            password: elPassword.value
        })
    }).then(res => res.json()).then(data => tokenData = data)

    if(tokenData.token){
        localStorage.setItem("token", JSON.stringify(tokenData.token))
        location.replace("index.html")
    } else{
        alert("login parol xato")
    }

})


// LOGIN-PAROL eve.holt@reqres.in