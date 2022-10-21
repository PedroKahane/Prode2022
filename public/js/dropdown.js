let dorpdown = document.querySelector(".dropdown")
let profile = document.querySelector("#a_img_log")
let bars = document.querySelector(".burger-menu")
let menu = document.querySelector("#menu_header")

window.addEventListener("load", function(){
  if(profile){
    dorpdown.classList.remove('none');
  }
  menu.classList.remove('none');
})


if(profile){
  profile.addEventListener("click", function(){
    if (dorpdown.classList.contains('hidden')) {
        dorpdown.classList.remove('hidden');
        dorpdown.classList.add('show')
      }else{
        dorpdown.classList.add('hidden');
        dorpdown.classList.remove("show")
      }
})
}

bars.addEventListener("click", function(){
    if (menu.classList.contains('hidden_burguer')) {
        menu.classList.remove('hidden_burguer');
        menu.classList.add('show_burguer')
      }else{
        menu.classList.add('hidden_burguer')
        menu.classList.remove('show_burguer')
      }
    })