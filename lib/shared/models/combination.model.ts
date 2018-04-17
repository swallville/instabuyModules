import { IBObject } from './object.model';

export class IBCombination extends IBObject {
    _id : string; //combination id
    id : string; //cart combination id
    description : string;
    image : string;
    name : string;
    min_price : number;
    price : number;
    bundles : Array<IBCombinationBundle>;
    
    comment : string;
    quantity : number = 1;

    temp : number;

    constructor (data:object) {
        super();
        this.setData(data);
    }

    setData (data:object) : void {
        if (data && Object.keys(data).length > 0) {
            super.setData(data);
            
            this.bundles = [];
            let length = data['bundles'].length;
            if (data['bundles'] && length > 0) {
                for (let i = 0; i < length; i++) {
                    this.bundles.push(new IBCombinationBundle(data['bundles'][i]));
                }
            }
        }
    }

    getPrice():number {
        let total = this.price;
        for(let bundle of this.bundles){
            for(let ingredient of bundle.ingredients){
                total = total + (ingredient.price * ingredient.quantity);
            }
                
        }
        return total;
    }

    getTotalPrice(): number {
        return this.getPrice() * this.quantity;
    }

    getBundlesForCartRequest() : Array<IBCombinationBundle> {
        let mArray = [];
        this.bundles.forEach(bundle => {
            let dict = {id: bundle.id};

            let mArrayIng = [];
            bundle.ingredients.forEach(ingredient => {
                if (ingredient.quantity > 0) {
                    mArrayIng.push({
                        id: ingredient.id,
                        quantity: ingredient.quantity
                    })
                }
            });

            dict['ingredients'] = mArrayIng;
            if(mArrayIng.length && mArrayIng.length != 0)
                mArray.push(dict);
        });
        return mArray;
    }

    getIngredientsText() : string {
        let mString = "";

        this.bundles.forEach(bundle => {
            mString = mString + bundle.textForIngredients();
        });

        return mString;
    }

    getFinishBuyJSON() : object {
        return {
            id : this.id,
            quantity : this.quantity,
            price : this.getPrice()
        }
    }

    getVisiblePriceString() : string {
        if (this.min_price == this.price) 
            return 'R$ ' + this.price.toFixed(2).replace('.', ',');
        else 
            return 'A partir de R$ ' + this.min_price.toFixed(2).replace('.', ',');
    }
}


export class IBCombinationBundle extends IBObject {
    id : string;
    name : string;
    max : number; //max qtd
    min : number; //min qtd
    ingredients : Array<IBCombinationBundleIngredient>;

    constructor (data:object) {
        super();
        this.setData(data);
    }

    hasIngredientSelected():boolean{
        for(let ing of this.ingredients){
            if(ing.quantity && ing.quantity > 0)
                return true;
        }
        return false;
    }

    setData(data:object):void {      
        if (data && Object.keys(data).length > 0) { 
            super.setData(data);
            
            this.ingredients = [];
            let length = data['ingredients'].length;
            if (data['ingredients'] && length > 0) {
                for (let i = 0; i < length; i++) {
                    this.ingredients.push(new IBCombinationBundleIngredient(data['ingredients'][i]));
                }
            }
        }
    }

    numberOfIngredients() : number {
        let count = 0;
        this.ingredients.forEach(ingr => {
            if (ingr.quantity > 0) {
                count++;
            }
        });
        return count;
    }

    numberOfItens() : number {
        let count = 0;
        this.ingredients.forEach(ingr => {
            if (ingr.quantity > 0) {
                count += ingr.quantity;
            }
        });
        return count;
    }

    textForIngredientAtPosition(index:number) : string {
        let count = 0;
        this.ingredients.forEach(ingredient => {
            if (ingredient.quantity > 0) {
                if (index == count && ingredient.quantity == 1)
                    return ingredient.name;
                else if (index == count && ingredient.quantity > 1)
                    return ingredient.quantity + ' ' + ingredient.name;
                else
                    count++;
            }
        });
        return "";
    }

    textForIngredients() : string {
        let mString = '';
        this.ingredients.forEach(ingredient => {
            if (ingredient.quantity > 0) {
                if (mString != '')
                    mString = mString + ', ';
                
                if (ingredient.quantity == 1)
                    mString = mString + ingredient.name;
                else 
                    return ingredient.quantity + ' ' + ingredient.name;
            }
        });

        if (mString != '')
            mString = mString + '. ';

        return mString;
    }

    setIngredientAtIndexSelected(index : number) {
        let length = this.ingredients.length;
        for (let i = 0; i < length; i++) {
            let ingredient = this.ingredients[i];
            if (i == index)
                ingredient.quantity = 1;
            else 
                ingredient.quantity = 0;
        }
    }

}

export class IBCombinationBundleIngredient extends IBObject {
    id : string;
    name : string;
    price : number;
    quantity: number = 0; //qtd selected

    constructor (data:object) {
        super();
        this.setData(data);
    }


    textForIngredient() : string{
        if (this.quantity == 1)
            return this.name;
        else if (this.quantity > 1)
            return this.quantity + 'x ' + this.name;
        else
            return "";
    }
}