/*


*/

function addUser(){
  var httpRequest = new XMLHttpRequest();
  if(!httpRequest){
    return false;
  }
  let u = document.getElementById('username').value;
  let p = document.getElementById('password').value;

  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {

        console.log(httpRequest.responseText);

      } else { alert('ERROR'); }
    }
  }
  newUser = { 'username': u, 'password': p, 'listings':[], 'purchases':[]}
  dataString = JSON.stringify(newUser);
  //console.log(dataString);

  let url = '/add/user/';
  httpRequest.open('POST',url);
  httpRequest.setRequestHeader('Content-type', 'application/json');
  httpRequest.send(dataString);
}


function addItem(){
  var httpRequest = new XMLHttpRequest();
  if(!httpRequest){
    return false;
  }
  // get info
  let t = document.getElementById('title').value;
  let d = document.getElementById('desc').value;
  let i = document.getElementById('image').value;
  let p = document.getElementById('price').value;
  let s = document.getElementById('status').value;
  let u = document.getElementById('username_item').value;

  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {

        console.log(httpRequest.responseText);

      } else { alert('ERROR'); }
    }
  }

  newItem = {'title':t,'description':d, 'image':i, 'price':p, 'status':s};
  dataString = JSON.stringify(newItem);

  let url = '/add/item/'+u;
  httpRequest.open('POST',url);
  httpRequest.setRequestHeader('Content-type', 'application/json');
  httpRequest.send(dataString);
}
