import { nanoid } from 'nanoid';

// import Atom from '../../fish/util/Atom';

function* NumberInput({numberAtom, min, max, label}){
    const id = `NumberInput_${nanoid()}`;

    yield `
        <span id="${id}">
            <label>${label}</label>
            <input value="${numberAtom.Value()}" type="number" />
        </span>
    `

    const container = document.getElementById(id);
    const input = container.querySelector('input');

    const unSub = numberAtom.Subscribe(newValue => {
        input.value = newValue;
    });

    input.addEventListener('input', (ev) => {
        const newValue = Number(ev.target.value);

        if(
            Number.isNaN(newValue) ||
            (typeof min === 'number' && newValue < min) || 
            (typeof max === 'number' && newValue > max)
        ) {
            input.value = numberAtom.Value();
            return;
        }

        numberAtom.Update(newValue);
    })

    yield;

    container.remove();
    unSub();
}

export default NumberInput;
