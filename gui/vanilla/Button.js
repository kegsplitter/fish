import { nanoid } from 'nanoid';
const dummyF = () => {};

export async function createBasicButton(text, f = dummyF, parent = document.body){
    const button = document.createElement('button');
    button.innerText = text;
    parent.appendChild(button);

    await new Promise(resolve => {
        button.addEventListener('click', () => {
            resolve();
        })
    });

    button.remove();
    f();
}


export function* Button({label, callback}){
    const id = `Button-${nanoid()}`;

    yield `<button id="${id}">${label}</button>`;

    const button = document.getElementById(id);
    button.addEventListener('click', () => {
        callback();
    });

    yield;
    button.remove();
}