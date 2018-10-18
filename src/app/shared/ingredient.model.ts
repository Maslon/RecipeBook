export class Ingredient {
    constructor(public name: string, public amount: number, public checked: boolean = false){
        this.name = name;
        this.amount = amount;
        this.checked = checked;
    }
}