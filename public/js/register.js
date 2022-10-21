const formElement = document.forms.form_register

const inputs = Array.from(formElement.elements).filter(elemento => elemento.getAttribute("type") != undefined);
console.log(inputs);
console.log(formElement);
inputs.forEach(input => {
    if(input.getAttribute("type") != "file"){
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

        if(name == "email"){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log(target);
            if(!re.test(String(value).toLowerCase()) ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle-register")
                icon.classList.add("fa-exclamation-circle")
                error.innerHTML = "El Correo electrónico debe contener un formato válido"
                icon.classList.remove("fa-check-circle-register")
                icon.classList.remove("fa-check-circle")

            } else{
                target.classList.add("success")
                target.classList.remove("error_front")
                icon.classList.remove("none")
                icon.classList.remove("fa-exclamation-circle-register")
                icon.classList.remove("fa-exclamation-circle")
                icon.classList.add("fa-check-circle-register")
                icon.classList.add("fa-check-circle")
                error.innerHTML = null
            }
        }

        if(name == "password"){
            
            if(value.length < 6){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle-register")
                error.innerHTML = "Debe contener al menos 6 caracteres"
                icon.classList.remove("fa-check-circle-register")
                icon.classList.add("fa-exclamation-circle")
                icon.classList.remove("fa-check-circle")
            } else{
                target.classList.add("success")
                target.classList.remove("error_front")
                icon.classList.remove("none")
                icon.classList.remove("fa-exclamation-circle-register")
                icon.classList.remove("fa-exclamation-circle")
                icon.classList.add("fa-check-circle-register")
                icon.classList.add("fa-check-circle")
                error.innerHTML = null
            }
        }

        if(name == "firstName"){
            if(value.length < 3 ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle-register")
                error.innerHTML = "El nombre debe contener mínimo 3 caracteres"
                icon.classList.remove("fa-check-circle-register")
                icon.classList.add("fa-exclamation-circle")
                icon.classList.remove("fa-check-circle")
            
            }
            else if(value.length > 30 ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle-register")
                icon.classList.remove("fa-check-circle-register")
                error.innerHTML = "El nombre no puede contener más de 30 caracteres"
                icon.classList.add("fa-exclamation-circle")
                icon.classList.remove("fa-check-circle")
            } else{
                target.classList.add("success")
                target.classList.remove("error_front")
                icon.classList.remove("none")
                icon.classList.remove("fa-exclamation-circle-register")
                icon.classList.remove("fa-exclamation-circle")
                icon.classList.add("fa-check-circle-register")
                icon.classList.add("fa-check-circle")
                error.innerHTML = null
            }
        }
        if(name == "lastName"){
            if(value.length < 3 ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle-register")
                error.innerHTML = "El apellido debe contener mínimo 3 caracteres"
                icon.classList.remove("fa-check-circle-register")
                icon.classList.add("fa-exclamation-circle")
                icon.classList.remove("fa-check-circle")
            }
            else if(value.length > 30 ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle-register")
                icon.classList.remove("fa-check-circle-register")
                error.innerHTML = "El apellido no puede contener más de 30 caracteres"
                icon.classList.add("fa-exclamation-circle")
                icon.classList.remove("fa-check-circle")
            } else{
                target.classList.add("success")
                target.classList.remove("error_front")
                icon.classList.remove("none")
                icon.classList.remove("fa-exclamation-circle-register")
                icon.classList.remove("fa-exclamation-circle")
                icon.classList.add("fa-check-circle-register")
                icon.classList.add("fa-check-circle")
                error.innerHTML = null
            }
        }

        if(name == "userName"){
            if(value.length < 3 ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle-register")
                error.innerHTML = "El nombre de usuario debe contener mínimo 3 caracteres"
                icon.classList.remove("fa-check-circle-register")
                icon.classList.add("fa-exclamation-circle")
                icon.classList.remove("fa-check-circle")
            }
            else if(value.length > 30 ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle-register")
                icon.classList.remove("fa-check-circle-register")
                error.innerHTML = "El nombre de usuario no puede contener más de 30 caracteres"
                icon.classList.add("fa-exclamation-circle")
                icon.classList.remove("fa-check-circle")
            } else{
                target.classList.add("success")
                target.classList.remove("error_front")
                icon.classList.remove("none")
                icon.classList.remove("fa-exclamation-circle-register")
                icon.classList.remove("fa-exclamation-circle")
                icon.classList.add("fa-check-circle-register")
                icon.classList.add("fa-check-circle")
                error.innerHTML = null
            }
        }
    }
}else{
        input.onchange = (evento) => {
            const target = evento.target;
            const name = target.getAttribute("name");
            const field = target.parentElement
            const errorImage = field.querySelector(".error")
            errorImage.innerHTML = null
        
            if(name == "image"){
                const files = target.files
                console.log(files);
                target.classList.add("success")
                target.classList.remove("error")
                errorImage.innerHTML = null
                if(files.length > 0){

                    if(files[0].type == "image/jpeg" || files[0].type == "image/jpg" || files[0].type == "image/png" || files[0].type == "image/gif"){
                        target.classList.add("success")
                        target.classList.remove("error")
                        errorImage.innerHTML = null
                    } else{
                        target.classList.add("error")
                        target.classList.remove("success")
                        errorImage.innerHTML = "Debes Subir una imagen en formato jpg, png, jpeg o gif"
                    }
                } else{
                    target.classList.add("success")
                    target.classList.remove("error")
                    errorImage.innerHTML = null
                } 
            }
        }
    }
  
})


formElement.onsubmit = (evento) =>{
    evento.preventDefault()
    const target = evento.target;
    const inputs = target.querySelectorAll("input.success")
    console.log(inputs);
    if(inputs.length >= 6){
        target.submit()
    } else{
        alert("Completa todos los campos")
    }  
}