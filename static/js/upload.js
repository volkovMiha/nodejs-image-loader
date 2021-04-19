window.onload = ()=>{
    document.querySelector('#image').src = 'images/' + localStorage.getItem('img');
}

let input = document.querySelector('#upload')

input.addEventListener('change',(e)=>{
    localStorage.setItem('img',`${e.target.files[0].name}`);
});