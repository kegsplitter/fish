import { nanoid } from 'nanoid';

function* DropDown({label, list, selectedAtom}){
    const id = `Dropdown-${nanoid()}`;
    yield `
        <label id="${id}">
            <span>${label ?? ""}</span>
            <select>
                ${
                    list.map(label => `<option value="${label}" ${isSelected(label, selectedAtom.Value())}>${label}</option>`).join(" ")
                }
            </select>
        </label>
    `
    const container = document.getElementById(id);
    const dropdown = container.querySelector("select");
    // dropdown.value = selectedAtom.Value();

    dropdown.addEventListener('input', (event) => {
        selectedAtom.Update(event.target.value)
    });

    const unSub = selectedAtom.Subscribe(newValue => {
        dropdown.value = newValue;
    })

    yield;

    container.remove();
    unSub();

}

function isSelected(label, initLabel){
    return label === initLabel ? "selected" : ""
}

export default DropDown;