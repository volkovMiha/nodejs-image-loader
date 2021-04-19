document.querySelector('#upload').addEventListener('change',uploadFile);

function uploadFile(e){
    console.log("inside uploadFile");
    let target = e.target || e.srcElement || e.currentTarget;
    let file = target.files[0];
    let xhr = new XMLHttpRequest();
    xhr.open('POST','/uploads/' + file.name,true);
    xhr.setRequestHeader('Content-Type','application/octate-stream');
    xhr.onreadystatechange = function (){
        e = null;
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('success');
            }
            else{
                console.log('error');
            }
        }
    }
    xhr.send(file);
    e.target.value = "";
}

