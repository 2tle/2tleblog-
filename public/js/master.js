function login() {
    if(!document.getElementById('username').value || !document.getElementById('pwd').value) {
        alert("아이디 / 비번 확인해주세요.");
    }
    var xhr = new XMLHttpRequest();
    var data = {
        "username": document.getElementById('username').value,
        "password" : CryptoJS.SHA256(document.getElementById('pwd').value).toString(CryptoJS.enc.Hex)
    };
    xhr.open('POST','/logincheck',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onload = function() {
        var responseText = JSON.parse(xhr.responseText);
        if(responseText.result == true) {
            window.location.href = "/";
        } else {
            alert("아이디 / 비번 확인해주세요.");
        }
    };
    xhr.send(JSON.stringify(data));
    
}

function comment() {
    if(!document.getElementById('cauthor').value || !document.getElementById("comment-body").value) {
        alert("닉네임 / 댓글 내용 확인해주세요.");
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/blog/comment/write');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onload = function() {
        var responseText = JSON.parse(xhr.responseText);
        if(responseText.result == true) {
            location.reload(true);
        } else {
            alert("실패");
        }
        
    };
    xhr.send(JSON.stringify({
        "author":document.getElementById("cauthor").value,
        "contents":document.getElementById("comment-body").value
    }));
}


function write() {
    if(!document.getElementById('title').value || !document.getElementById("category").value || !document.getElementById("w-body").value) {
        alert("제목 / 카테고리 / 본문 확인해주세요.");
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/blog/board/write');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onload = function() {
        var responseText = JSON.parse(xhr.responseText);
        if(responseText.result == true) {
            alert("업로드 완료");
            location.href="/manage";
        } else {
            alert("실패");
        }
        
    };
    xhr.send(JSON.stringify({
        "title":document.getElementById("title").value,
        "category":document.getElementById("category").value,
        "contents-md":document.getElementById("w-body").value
    }));
}

function edit(id){
    if(!document.getElementById('title').value || !document.getElementById("category").value || !document.getElementById("w-body").value) {
        alert("제목 / 카테고리 / 본문 확인해주세요.");
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/blog/board/update/'+id);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onload = function() {
        var responseText = JSON.parse(xhr.responseText);
        if(responseText.result == true) {
            alert("업로드 완료");
            location.href="/blog/view/"+id;
        } else {
            alert("실패");
        }
        
    };
    xhr.send(JSON.stringify({
        "title":document.getElementById("title").value,
        "category":document.getElementById("category").value,
        "contents-md":document.getElementById("w-body").value
    }));
}

function del(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/blog/delete/'+id);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onload = function() {
        var responseText = JSON.parse(xhr.responseText);
        if(responseText.result == true) {
            alert("삭제 완료");
            location.href="/manage";
        } else {
            alert("실패");
        }
        
    };
    xhr.send();
}

