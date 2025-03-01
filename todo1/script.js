const btn = document.querySelector('.form');
const inputData = document.querySelector("#inputData")
const workList = document.querySelector('.workList')
btn.addEventListener('submit' , function(e){
    e.preventDefault()
    let data = inputData.value
    if(data){
        let item = JSON.parse(localStorage.getItem('workList')) || []
        let obj = {
            id : Math.random(),
            task: data,
            isLineThrough: false
        }
        item.push(obj)
        localStorage.setItem('workList', JSON.stringify(item))
        inputData.value=""
        display()

    }else{
        console.log("no data")
    }
})


const display=()=>{
    workList.innerHTML=""
    allData = JSON.parse(localStorage.getItem('workList'))
    if (allData.length === 0) {
        // Show default message if no tasks are found
        workList.innerHTML = "<p>No tasks assigned yet!</p>";
        return;
    }
    allData.forEach((item)=>{
        let para = document.createElement('p')
        para.innerHTML=`<div class="main">
            <div class="para1">${item.task}</div>
            <div><button onClick= del(${item.id}) class="del"> <i class="fa fa-trash"></i></button></div>
        </div>`
        if(item.isLineThrough){
            para.classList.add('lineThrough')
        }
        para.addEventListener('click' ,function(){
            item.isLineThrough = !item.isLineThrough
            para.classList.toggle('lineThrough')
            localStorage.setItem('workList' ,JSON.stringify(allData))
            
        })
        workList.append(para)
    })
}

const del=(id)=>{
    let allData = JSON.parse(localStorage.getItem('workList'))
    allData = allData.filter((item)=> item.id !== id)
    localStorage.setItem("workList", JSON.stringify(allData));
    display()
}
display()

