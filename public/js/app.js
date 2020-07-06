const wform = document.querySelector('form');
const inp = document.getElementById('inp');
const out = document.getElementById('output');
wform.addEventListener('submit',(e)=>{
    //console.log(inp.value)
    e.preventDefault()
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(inp.value)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            out.innerHTML =data.error;
        }else{
        out.innerHTML ='Here in '+ data.address+' It is currently '+data.temperature + ' degree out there. with ' + data.forecast + '  ';
        }
    })
})
})



