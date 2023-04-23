import {NewShopListType} from "../App";
import {v1} from "uuid";
import {FilterValue} from "../Typisation";


export const shopListReducer = (state: NewShopListType[], action: ActionType): NewShopListType[] => {
    switch (action.type) {
        case 'ADD-GOODS': {
            const getRandomNumberForExpectedPrice = Math.floor((Math.random() * 10) + 1)
            const getRandomNumberForRealPrice = Math.floor((Math.random() * 10) + 1)
            const addNewGoods = {
                id: v1(),
                title: action.payload.title,
                expectedPrice: `$${getRandomNumberForExpectedPrice}`,
                realPrice: '$' + getRandomNumberForRealPrice,
                inCart: false
            }
            return state.map((el, index) => index === action.payload.shoplistId ? {
                ...el,
                goods: [...el.goods, addNewGoods]
            } : el)
        }
        case 'DELETE-GOODS': {
            return state.map((el, index) => index === action.payload.shoplistId ? {
                ...el,
                goods: el.goods.filter(g => g.id !== action.payload.id)
            } : el)
        }
        case 'ADD-SHOPLIST': {
            const newShopList: NewShopListType = {title: action.payload.shoplistTitle, filter: "All", goods: []}
            return [...state, newShopList]
            // state.push(newShopList)
            // return state
        }
        case 'DELETE-SHOPLIST': {
            return state.filter((el, index) => index !== action.payload.shoplistId)
        }
        case 'CHANGE-FILTER': {
            let newState = [...state]
            newState[action.payload.shoplistId].filter = action.payload.filter
            return newState
        }
        case "CHANGE_GOODS_STATUS":
            return state.map((el, index) => index === action.payload.shoplistId
                ? {
                    ...el, goods: el.goods.map(g => g.id === action.payload.goodsId
                        ? {...g, inCart: action.payload.inChecked}
                        : g
                    )
                }
                : el
            )

        default:
            return state
    }
}
type ActionType = AddGoodsACType
    | DeleteGoodsACType
    | AddShopListACType
    | DeleteShopListACType
    | changeFilterValueACType
    | changeGoodStatusACType

type AddGoodsACType = ReturnType<typeof addGoodsAC>
type DeleteGoodsACType = ReturnType<typeof deleteGoodsAC>
type AddShopListACType = ReturnType<typeof AddShopListAC>
type DeleteShopListACType = ReturnType<typeof deleteShopListAC>
type changeFilterValueACType = ReturnType<typeof changeFilterValueAC>
type changeGoodStatusACType = ReturnType<typeof changeGoodStatusAC>

// type ChangeFilterValueAC = ReturnType<typeof changeFilterValueAC>
// type ChangeGoodsStatusACType = ReturnType<typeof changeGoodsStatusAC>
// type UpdateGoodTitleACType = ReturnType<typeof updateGoodTitleAC>
// type UpdateShoplistTitleACType = ReturnType<typeof updateShoplistTitleAC>

export const addGoodsAC = (shoplistId: number, title: string) => {
    return {
        type: 'ADD-GOODS',
        payload: {
            shoplistId,
            title
        }
    } as const
}
export const deleteGoodsAC = (shoplistId: number, id: string) => {
    return {
        type: 'DELETE-GOODS',
        payload: {
            shoplistId,
            id
        }
    } as const
}
export const AddShopListAC = (shoplistTitle: string) => {
    return {
        type: 'ADD-SHOPLIST',
        payload: {
            shoplistTitle
        }
    } as const
}
export const deleteShopListAC = (shoplistId: number) => {
    return {
        type: 'DELETE-SHOPLIST',
        payload: {
            shoplistId
        }
    } as const
}
export const changeFilterValueAC = (shoplistId: number, filter: FilterValue) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            shoplistId,
            filter
        }
    } as const
}

export const changeGoodStatusAC = (shoplistId: number, goodsId: string, inChecked: boolean) => {
    return {
        type: 'CHANGE_GOODS_STATUS',
        payload: {
            shoplistId,
            goodsId,
            inChecked
        }
    } as const
}