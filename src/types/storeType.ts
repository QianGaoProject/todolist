export type Item = {
    id: string
    description: string
    column: Column
    createdAt: string
}

export type Column = {
    id: string
    description: string
    createdAt: string
}
export type Dimensions ={
    width: number
    height: number
}
type IntemStateType = {
    items: Item[]
    search: string
}
type ColumnStateType ={
    columns: Column[]
}
type SettingStateType ={
    dimensions: Dimensions
}
interface StoreType {
    itemState: IntemStateType
    columnState: ColumnStateType
    settingState: SettingStateType
}


export default StoreType