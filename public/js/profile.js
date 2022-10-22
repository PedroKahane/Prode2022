const update = document.forms.update
const password = document.forms.Forgotpassword
const imagen = document.forms.imagen_form

const inputs = Array.from(update.elements).filter(elemento => elemento.getAttribute("type") != undefined)
const passwordInputs = Array.from(password.elements).filter(elemento => elemento.getAttribute("type") != undefined)
const imagenInput = Array.from(imagen.elements).filter(elemento => elemento.getAttribute("type") != undefined)

console.log(imagenInput);

inputs.forEach(input => {
    input.onblur = (evento) => {
        const target = evento.target;
        const name = target.getAttribute("name");
        const value = target.value
        const field = target.parentElement
        const icon = field.querySelector("i")
        const parent = field.parentElement
        const error = parent.querySelector(".error")
        target.classList.remove("error_front")
        target.classList.add("success")
        icon.classList.add("none")
        error.innerHTML = null

        if(name == "firstName"){
            if(value.length < 5 ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle")
                error.innerHTML = "El nombre debe contener minimo 5 caracteres"
                icon.classList.remove("fa-check-circle")
            }
            else if(value.length > 30 ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle")
                icon.classList.remove("fa-check-circle")
                error.innerHTML = "El nombre no puede contener mas de 30 caracteres"
            } else{
                target.classList.add("success")
                target.classList.remove("error_front")
                icon.classList.remove("none")
                icon.classList.remove("fa-exclamation-circle")
                icon.classList.add("fa-check-circle")
                error.innerHTML = null
            }
        }
        if(name == "email"){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(String(value).toLowerCase()) ){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle")
                error.innerHTML = "El Correo electronico debe contener un formato valido"
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
passwordInputs.forEach(input => {
    input.onblur = (evento) => {
        const target = evento.target;
        const name = target.getAttribute("name");
        const value = target.value
        const field = target.parentElement
        const icon = field.querySelector("i")
        const parent = field.parentElement
        const error = parent.querySelector(".error")
        target.classList.remove("error_front")
        icon.classList.add("none")
        error.innerHTML = null

        if(name == "password"){
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            if(!regex.test(value)){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle")
                error.innerHTML = "La contraseña debe tener 1 mayuscula, 1 minuscula, 1 numero, un caracter especial y contener al menos 8 caracteres"
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
        if(name == "repeatPasword"){
            const password = document.querySelector("#password")
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            if(!regex.test(value)){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle")
                error.innerHTML = "La contraseña debe tener 1 mayuscula, 1 minuscula, 1 numero, un caracter especial y contener al menos 8 caracteres"
                icon.classList.remove("fa-check-circle")
            }
            else if(value != password.value){
                target.classList.add("error_front")
                target.classList.remove("success")
                icon.classList.remove("none")
                icon.classList.add("fa-exclamation-circle")
                error.innerHTML = "Ambas contraseñas deben coincidir"
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
imagenInput.forEach(input => {
    input.onchange = (evento) => {
        const target = evento.target;
        const name = target.getAttribute("name");
        const field = target.parentElement
        const error = field.querySelector("#error_image")
        error.innerHTML = null
        if(name == "image"){
            const files = target.files
            
            if(files.length > 0){
                if(files[0].type == "image/jpeg" || files[0].type == "image/jpg" || files[0].type == "image/png" || files[0].type == "image/gif"){
                    target.classList.add("success")
                    target.classList.remove("error")
                    error.innerHTML = null
                    const img = document.querySelector("#imagen_profile")
                    img.src = URL.createObjectURL(files[0])
                } else{
                    target.classList.add("error")
                    target.classList.remove("success")
                    error.innerHTML = "Debes Subir una imagen en formato jpg, png, jpeg o gif"
                }
            } else{
                target.classList.add("error")
                target.classList.remove("success")
                error.innerHTML = "Debes Subir una imagen"
            }
        }
    }
})



update.onsubmit = (evento) =>{
    evento.preventDefault()
    const target = evento.target;
    const inputs = target.querySelectorAll("input.error_front")
    console.log(inputs);
    if(inputs.length == 0){
        target.submit()
    } else{
        alert("Completa todos los campos")
    }
    

}

password.onsubmit = (evento) =>{
    evento.preventDefault()
    const target = evento.target;
    const inputs = target.querySelectorAll("input.success")
    console.log(inputs);
    if(inputs.length >= 2){
        var confirm = window.confirm("Estas seguro que queres cambiar la contraseña?")
        if(confirm){
            target.submit()
        } else{
            evento.preventDefault() 
        }
        
    } else{
        alert("Completa todos los campos")
    }
    

}
imagen.onsubmit = (evento) =>{
    evento.preventDefault()
    const target = evento.target;
    const inputs = target.querySelectorAll("input.success")
    console.log(inputs);
    if(inputs.length >= 1){ 
            target.submit()
    } else{
        alert("Debes subir una imagen para cambiarla")
    }
    

}

