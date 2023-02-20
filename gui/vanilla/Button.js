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
