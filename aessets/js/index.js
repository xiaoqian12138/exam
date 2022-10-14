import ajax from "../../utils/ajax.js";

let data = [];
if (!localStorage.getItem('dataArr')) {
    ajax({ url: 'https://api.iynn.cn/mock?t=2' }).then(res => {
        if (res.code == 0) {
            data = res.data;
            localStorage.setItem('dataArr', JSON.stringify(data));
            render(data);
            // console.log(1);
        }
    })
} else {
    data = JSON.parse(localStorage.getItem('dataArr'));
    render(data);
    // console.log(2);
}
console.log(data);


let addbtn = document.querySelector('.addbtn');
let titleInp = document.querySelector('.titleInp');
let userInp = document.querySelector('.userInp');
let dateInp = document.querySelector('.dateInp');

function render(arr) {
    let str = '';
    arr.forEach(item => {
        str += `<tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.user}</td>
                <td>${item.date}</td>
                <td>
                    <button type="button" class="btn btn-danger delbtn">删除</button>
                    <button type="button" class="btn btn-primary editbtn">编辑</button>
                </td>
            </tr>`
    })
    document.querySelector('tbody').innerHTML = str;


    let delbtn = document.querySelectorAll('.delbtn');
    let editbtn = document.querySelectorAll('.editbtn');
    let titleMod = document.querySelector('.titleMod');
    let userMod = document.querySelector('.userMod');
    let dateMod = document.querySelector('.dateMod');
    let surebtn = document.querySelector('.surebtn');
    let cancelbtn = document.querySelector('.cancelbtn');

    delbtn.forEach((item, index) => {
        // console.log(item,index);
        item.onclick = () => {
            data.splice(index, 1);
            localStorage.setItem('dataArr', JSON.stringify(data));
            render(data);
        }
    })


    editbtn.forEach((item, index) => {
        // console.log(item, index);
        item.onclick = () => {
            $('#myModal').modal('show');
            titleMod.value = data[index].title;
            userMod.value = data[index].user;
            dateMod.value = data[index].date;
            surebtn.onclick = function () {
                data[index].title = titleMod.value;
                data[index].user = userMod.value;
                data[index].date = dateMod.value;

                localStorage.setItem('dataArr', JSON.stringify(data));
                render(data);
            }

        }
    })
}


addbtn.onclick = function () {
    data.push({
        'id': data[data.length - 1].id * 1 + 1,
        'title': titleInp.value,
        'user': userInp.value,
        'date': dateInp.value
    })
    localStorage.setItem('dataArr', JSON.stringify(data));
    render(data);
}