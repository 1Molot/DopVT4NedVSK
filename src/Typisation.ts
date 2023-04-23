export type ShoppingListPropsType = {
    title: string
    goods: GoodType[]
    addGoods: (shoplistId: number, title: string) => void
    changeFilterValue: (shoplistId: number, filter: FilterValue) => void
    deleteGoods: (shoplistId: number, goodsId: string) => void
    changeGoodsStatus: (shoplistId: number, goodsId: string, inChecked: boolean) => void
    updateGoodTitle: (shoplistId: number, goodsId: string, newTitle: string) => void
    updateShoplistTitle: (shoplistId: number, newTitle: string) => void
    deleteTodoList: (shoplistId: number)=> void
    filter: FilterValue
    shoplistId: number
}
export type FilterValue = "All" | "Not to buy" | "Bought"

export type ShoplistsType = {
    id: string
    title: string
    filter: FilterValue
}

export type GoodsType = {
    [shoplistId: string]: GoodType[]
}

export type GoodType = {
    id: string
    title: string
    expectedPrice: string
    realPrice: string
    inCart: boolean
}