import React, {useReducer, useState} from 'react';
import './App.css';
import {ShoppingList} from "./components/ShoppingList";
import {FilterValue, GoodType} from "./Typisation";
import AddItemForm from "./components/AddItemForm";
import {
    addGoodsAC,
    AddShopListAC, changeFilterValueAC, changeGoodStatusAC,
    deleteGoodsAC,
    deleteShopListAC,
    shopListReducer
} from "./reducer/shopListReducer";
import {v1} from "uuid";

export type NewShopListType = {
    title: string
    filter: FilterValue
    goods: GoodType[]
}
function App() {

    const [shoplist, dispatchShoplist] = useReducer(shopListReducer,[
        {
            title: "What to buy",
            filter: "All",
            goods: [
                {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
                {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
                {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
                {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
            ]
        },
        {
            title: "What to buy today",
            filter: "All",
            goods: [
                {id: v1(), title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
                {id: v1(), title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
                {id: v1(), title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
                {id: v1(), title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
            ]
        }
    ])

    const addGoods = (shoplistId: number, title: string) => {
        dispatchShoplist(addGoodsAC(shoplistId, title))
    }
    const deleteGoods = (shoplistId: number, id: string) => {
        dispatchShoplist(deleteGoodsAC(shoplistId, id))
    }
    const changeFilterValue = (shoplistId: number, filter: FilterValue) => {
        dispatchShoplist(changeFilterValueAC(shoplistId, filter))
    }
    const changeGoodsStatus = (shoplistId: number, goodsId: string, inChecked: boolean) => {
        dispatchShoplist(changeGoodStatusAC(shoplistId, goodsId, inChecked))
    }
    const deleteShopList = (shoplistId: number) => {
        dispatchShoplist(deleteShopListAC(shoplistId))
    }
    const AddShopList = (shoplistTitle: string) => {
        dispatchShoplist(AddShopListAC(shoplistTitle))
    }
    const updateGoodTitle = (shoplistId: number, goodsId: string, newTitle: string) => {
        // dispatchShoplist(updateGoodTitleAC(shoplistId, goodsId, newTitle))
    }
    const updateShoplistTitle = (shoplistId: number, newTitle: string) => {
        // dispatchShoplist(updateShoplistTitleAC(shoplistId, newTitle))
    }

    const mappedShoplists = shoplist.map((el, index) => {

        let filteredGoods: Array<GoodType> = []
        if (el.filter === 'All') {
            filteredGoods = el.goods
        }
        if (el.filter === 'Not to buy') {
            filteredGoods = el.goods.filter(el => el.inCart !== true)
        }
        if (el.filter === 'Bought') {
            filteredGoods = el.goods.filter(el => el.inCart === true)
        }

        return (
            <ShoppingList
                key={index}
                title={el.title}
                goods={filteredGoods}
                addGoods={addGoods}
                changeFilterValue={changeFilterValue}
                deleteGoods={deleteGoods}
                changeGoodsStatus={changeGoodsStatus}
                filter={el.filter}
                deleteTodoList={deleteShopList}
                shoplistId={index}
                updateGoodTitle={updateGoodTitle}
                updateShoplistTitle={updateShoplistTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm callback={AddShopList}/>
            {/*<span><input type="text" value={title} onChange={onChangeHadler}/><button onClick={AddShopList}>send new todo</button></span>*/}
            {mappedShoplists}
        </div>
    );
}

export default App;
