
function makeActive(page) {

    document.querySelectorAll('li').forEach(li => {
        li.className = 'nav-item';
    });
   
    if(page === ""){
        document.querySelector('#footer').innerHTML = '<a href="https://devasenan134.pythonanywhere.com/"> About</a>'
    }
    document.querySelector(`#${page}`).className = 'nav-item active';
   
    //var h6 = document.createElement('h6');
   
    //h6.innerHTML = `${page}`;
   
    //document.body.append(h6);
}

document.addEventListener('DOMContentLoaded', function () {

    baseurl = document.baseURI;
 
    url = baseurl.split("/");
 
    page = url.slice(3, 4).toString();
 
    console.log('active page is:', page);
 
    makeActive(page)
}

);