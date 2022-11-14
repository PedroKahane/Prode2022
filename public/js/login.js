const formElement = document.forms.form_login

const inputs = Array.from(formElement.elements).filter(elemento => elemento.getAttribute("type") != undefined);
console.log(inputs);
inputs.forEach(input => {

    input.onblur = (evento) =>{
        const target = evento.target;
        const name = target.getAttribute("name");
        const value = target.value
        const field = target.parentElement
        const parent = field.parentElement
        const icon = field.querySelector("i")
        const error = parent.querySelector(".error")
        target.classList.remove("error_front")
        icon.classList.add("none")
        error.innerHTML = null
        
        if(name == "userName"){
           
            if(value.length < 3 ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle")
                error.innerHTML = "Debe contener al menos 4 caracteres"
                icon.classList.remove("fa-check-circle")
            }
            else if(value.length > 30 ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle")
                error.innerHTML = "Debe contener al menos de 30 caracteres"
                icon.classList.remove("fa-check-circle")
            } else{
                target.classList.add("success")
                target.classList.remove("error_front")
                icon.classList.remove("none")
                icon.classList.remove("fa-exclamation-circle")
                icon.classList.add("fa-check-circle")
                error.innerHTML = null
            }
        }
        

        if(name == "password"){
            
            if(value.length < 6){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle")
                error.innerHTML = "Debe contener al menos 6 caracteres"
                icon.classList.remove("fa-check-circle")
            } else{
                target.classList.add("success")
                target.classList.remove("error_front")
                icon.classList.remove("none")
                icon.classList.remove("fa-exclamation-circle")
                icon.classList.add("fa-check-circle")
                error.innerHTML = null
            }
        }
    }
})

formElement.onsubmit = (evento) =>{
    evento.preventDefault()
    const target = evento.target;
    const inputs = target.querySelectorAll("input.success")
    console.log(inputs);
    if(inputs.length >= 2){
        target.submit()
    } else{
        alert("Completa todos los campos")
    }
}