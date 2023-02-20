import { nanoid } from 'nanoid';

import NumberInput from './NumberInput';
import Atom from '../../fish/util/Atom';
import { Button } from './Button';
import DropDown from './DropDown';

import { INPUT_LIST } from '../../fish/util/Controller';

function* WindOrganGui(){
    const id = `WindOrganGui-${nanoid()}`;

    const attackAtom = new Atom(0);
    const releaseAtom = new Atom(0);
    const selectedInputAtom = new Atom(INPUT_LIST[1])

    const attackInputComponent = NumberInput({
        numberAtom: attackAtom,
        min: 0,
        label: "Attack (ms)"
    });

    const releaseInputComponent = NumberInput({
        numberAtom: releaseAtom,
        min: 0,
        label: "Release (ms)"
    })

    const panicButtonComponent = Button({
        label: 'Panic!',
        callback: () => {}
    });

    const inputDropDownComponent = DropDown({
        label: "Controll Input",
        list: INPUT_LIST,
        selectedAtom: selectedInputAtom
    })

    yield `
        <div id="${id}">
            <div>
                ${attackInputComponent.next().value}
                ${releaseInputComponent.next().value}
                ${panicButtonComponent.next().value}
                ${inputDropDownComponent.next().value}
            </div>
        </div>
    `;

    const container = document.getElementById(id);

    attackInputComponent.next();
    releaseInputComponent.next();
    panicButtonComponent.next();
    inputDropDownComponent.next();

    yield;

    attackInputComponent.next();
    releaseInputComponent.next();
    panicButtonComponent.next();
    inputDropDownComponent.next();

    container.remove();
}

export default WindOrganGui;
