const forms = document.querySelectorAll(".form_equipo")
forms.forEach(form => {
    const inputs = Array.from(form.elements).filter(elemento => elemento.getAttribute("type") != undefined);
    console.log(inputs);
    inputs.forEach(input => {
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
    })
    form.onsubmit = (evento) =>{
        evento.preventDefault()
        const target = evento.target;
        const inputs = target.querySelectorAll("input.error")
        console.log(inputs);
        if(inputs.length >= 1){
            alert("El formato de la imagen es erroneo")
        } else{
            target.submit()
        }  
    }
})