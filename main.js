let title =document.querySelector('.title')
let price =document.querySelector('.price')
let taxes =document.querySelector('.taxes')
let ads =document.querySelector('.ads')
let discount =document.querySelector('.discount')
let count =document.querySelector('.count')
let category =document.querySelector('.category')
let create =document.querySelector('.create')
let search =document.querySelector('.search')
let update =document.querySelector('.update')
let del =document.querySelector('.del')
let total =document.querySelector('small')
let tbody =document.querySelector('#tbody')
let delall = document.querySelector('#delall')
let sbt =document.querySelector('.searchtitle')
let sbc =document.querySelector('.searchcategory')
let nocreate =document.querySelector('.nocreate')


let mood = 'create';
let id;












function getTotal(){
    if(price.value !=''){
        let result = (+price.value+ +taxes.value+ +ads.value)- +discount.value
        total.innerHTML=result;
        total.style.backgroundColor='green';
    }
    else{
        total.innerHTML=''
        total.style.backgroundColor='rgb(232, 85, 85)'
    }
    if(price.value >= 999999999999){
        total.innerHTML=`THE PRICE IS UNCORRECT`
        total.style.backgroundColor='red';
    }
}

let products;

if(localStorage.productsdata != null){
    products = JSON.parse(localStorage.productsdata)
}else{
    products = [];
}

create.onclick =function (){
    let newproduct ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(title.value != ''
    && price.value != ''
    && newproduct.count < 100
    && category.value != ''){
        create.style.display='block';
        nocreate.style.display='none';
        if(mood === 'create' ){
            if(+count.value > 1){
                for(i=0 ; i< (+count.value-1);i++){
                    products.push(newproduct)
                }
            }if(+count.value <= 0){
                window.alert('No products yet')
            }else{
                products.push(newproduct)
            }
        }else{
            products[id]=newproduct;
            mood = 'create';
            count.style.display='block'
        }
        cleardata()
    }
    else{
        create.style.display='none';
        nocreate.style.display='block';
    }
    localStorage.productsdata=JSON.stringify(products)
    create.innerHTML=('Create')

    showdata()
}

function cleardata(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    count.value=''
    category.value=''
    total.innerHTML=''
    total.style.backgroundColor='rgb(232, 85, 85)'
}



function showdata(){
    let table = '';
    for(let i = 0; i<products.length ; i++){
        table +=`
        <tr>
            <td>${+i+ +1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button class="update" onclick="updateItem(${i})">update</button></td>
            <td><button onclick="deleteItem(${i})" class="delete">delete</button></td>
        </tr>
        `
    }
    tbody.innerHTML= table;
    if(products.length > 1){
        delall.innerHTML= `( ${products.length} )`
        delall.classList.remove('hide')
    }else{
        delall.classList.add('hide')
    }


    if(title.value != ''
    && price.value != ''
    && newproduct.count < 100
    && category.value != ''){
        create.style.display='block';
        nocreate.style.display='none';
    }
    else{
        create.style.display='none';
        nocreate.style.display='block';
    }
    countValue()
}
showdata()


function deleteItem(i){
    products.splice(i,1)
    localStorage.productsdata = JSON.stringify(products)
    showdata()
}

function updateItem(i){
    title.value=products[i].title
    price.value=products[i].price
    taxes.value=products[i].taxes
    ads.value=products[i].ads
    discount.value=products[i].discount
    total.innerHTML=products[i].total
    count.value='1';
    count.style.display='none';
    category.value=products[i].category
    create.innerHTML=('Update')
    mood = 'update';
    nocreate.style.display='none'
    create.style.display='block'
    id = i ;
    scroll({
        top:0,
        behavior:'smooth'
    })
    if(+total.innerHTML>0){
    total.style.backgroundColor='green'
    }else{total.style.backgroundColor='rgb(232, 85, 85)'}
}


function deleteAll(){
    localStorage.clear()
    products.splice(0)
    showdata()
}




// search //

let searchmood ='title'

function getSearchMood(id){
    if(id === 'searchtitle'){
        searchmood ='title'
        search.placeholder = 'Search by title'
    }
    else{
        searchmood = 'category'
        search.placeholder = 'Search by category'
    }
    search.focus()
}


function searchData(value){
    let table = '';
    if(searchmood === 'title'){
        for(i=0;i<products.length;i++){
            if(products[i].title.includes(value)){
                table +=`
        <tr>
            <td>${+i+ +1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button class="update" onclick="updateItem(${i})">update</button></td>
            <td><button onclick="deleteItem(${i})" class="delete">delete</button></td>
        </tr>
        `
    }
}
}
    else{
        for(i=0;i<products.length;i++){
        if(products[i].category.includes(value)){
            table +=`
    <tr>
        <td>${+i+ +1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button class="update" onclick="updateItem(${i})">update</button></td>
        <td><button onclick="deleteItem(${i})" class="delete">delete</button></td>
    </tr>
    `
}
}  
}
    tbody.innerHTML= table;
}


function countValue(){
    if(+count.value >= +101){
        alert("you can't put more than 100 product")
        nocreate.style.display='block'
        create.style.display='none'
    }
    if(title.value != ''
    && price.value != ''
    && +count.value < 100
    && category.value != ''){
        nocreate.style.display='none'
        create.style.display='block'
    }
}
