import {v1} from "uuid";
import {AddShopListAC, shopListReducer} from "./shopListReducer";
import {NewShopListType} from "../App";

// let startState: NewShopListType[]
// beforeEach(()=>{
    const startState: NewShopListType[] = [
        {
            title: "What to buy",
            filter: "All",
            goods: [
                {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
                {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
                {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
                {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
            ]
        }
    ]
// })

test('ADD-SHOPLIST', ()=>{
    const endState = shopListReducer(startState, AddShopListAC("QQQ"))
    expect(startState.length).toBe(1)
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe("QQQ")
})