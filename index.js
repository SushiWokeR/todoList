let input = document.querySelector('#input');
let addButton = document.querySelector('#btn');
let itemList = document.querySelector('.itemList');
let downloadButton = document.querySelector('.download');


addButton.onclick = () => {

    if (!input.value) return
    newItem(input.value);
    input.value = '';
}

const newItem = (text)=> {

    let textContentSpan = document.createElement('span');
    let newItem = document.createElement('li');
    let rmBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    let buttons = document.createElement('div');

    buttons.className = 'control-btns';
    textContentSpan.className = 'text';
    editBtn.className = 'edit';
    rmBtn.className = 'rm';

    textContentSpan.innerText = text;
    editBtn.innerText = 'Edit';
    rmBtn.innerText = 'Remove';

    itemList.prepend(newItem);
    newItem.append(textContentSpan);
    newItem.append(buttons);
    buttons.append(editBtn);
    buttons.append(rmBtn);


    rmBtn.onclick = function () {
        this.parentNode.parentNode.remove();
    }
    

    // TODO: Использовать material UI для создания стилей!!!
    editBtn.onclick = function () {

        let prevVal = textContentSpan.innerText;

        if (this.innerText == 'Edit') {

            this.innerText = 'Save';

            let undoBtn = document.createElement('button');
            undoBtn.className = 'undo-btn';
            undoBtn.innerText = 'Undo';

            textContentSpan.contentEditable = true; // TODO: добавить стиль для редактируемого значения (что то вроде рамки)

            buttons.append(undoBtn);

            undoBtn.onclick = () => textContentSpan.innerText = prevVal;
            
        } else {
            this.innerText = 'Edit';
            textContentSpan.contentEditable = false;
            document.querySelector('.undo-btn').remove();
        }
    }

    textContentSpan.onclick = function () {
        if (editBtn.innerText == 'Save') return;
        this.classList.toggle('overlined');
    }
}

downloadButton.onclick = async () => {

    const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const json = await response.json();

    for (let i = 0; i < json.length; i++) {
        newItem(json[i].title);
    }
}