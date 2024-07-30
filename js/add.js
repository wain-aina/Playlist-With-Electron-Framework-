$(document).ready(()=>{
    $('.btn_hide').on('click',e=>{
        $('.container').fadeToggle(300).toggleClass("hide_it");
        e.preventDefault();
    });
});

