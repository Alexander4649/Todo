// id で指定した変数にアクセスできるように定義する  
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"))
;//JSON.parseを加えると文字の配列として認識される。ないと、文字列として認識されるそうだ


if (todos){   //もし、todosが空ではなかったらliタグを追加する
    todos.forEach(todo => {
        add(todo);
    })
}

// 指定のイベントが起きた時に動作を加える定義を記述していく
form.addEventListener("submit",function(event){
    event.preventDefault();
    add();
});

function add (todo) {
    let todoText = input.value;//入力された値をtodoTextとゆう変数に代入する

    if (todos) {
        todoText = todo.text;
    }

    if (todoText.length>0){ //入力された値が0以上であればtrueを返す===trueの時は以下のコードを実行するif (todoText)だけでも実行可能=>暗黙的型変換による為
    const li = document.createElement("li");// liを作ることができる定義
    li.innerText = todoText;//テキストに入力した値を取得する為に、input,valueの情報をinnerTextに代入
    li.classList.add("list-group-item");//liタグにデザインを取得する為
    if (todo && todo.completed){
        li.classList.add("text-decoration-line-through");
    }
    li.addEventListener("contextmenu",function(event){
        event.preventDefault();
        li.remove();
        saveData();
    })

    li.addEventListener("click",function(){
        li.classList.toggle("text-decoration-line-through")
        saveData();
    });
    ul.appendChild(li);//ulタグの子どもとして使用するので、定義
    input.value = "";//入力した値を空にする為の定義
    saveData();
    }
}

function saveData(){
    const lists = document.querySelectorAll("li");//liタグの情報を全て取得できる
    let todos = [];//空配列
    lists.forEach(list => {//入力された値を繰り返し格納する為の記述
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        }
        todos.push(todo);//入力される値をtodosにプッシュする記述
    });
    localStorage.setItem(":todos", JSON.stringify(todos));//todosの値をローカルストレージに保存、JSONは自分で調べよう
}