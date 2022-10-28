let dorpdown = document.querySelector(".dropdown")
let profile = document.querySelector("#a_img_log")
let bars = document.querySelector(".menu_mobile_bt")
let menu = document.querySelector(".menu_over")
let main = document.querySelector("main")

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
        menu.classList.add('menu_over')
      }else{
        dorpdown.classList.add('hidden');
        dorpdown.classList.remove("show")
      }
})
}

bars.addEventListener("click", function(){
    if (menu.classList.contains('menu_over')) {
        menu.classList.remove('menu_over');
        dorpdown.classList.add('hidden');
        dorpdown.classList.remove("show")
      }else{
        menu.classList.add('menu_over')
        main.classList.remove("main")
      }
    })