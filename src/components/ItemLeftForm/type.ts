import {
    CreateItemActionCreator,
    SearchItemsActionCreator
} from '../../types/actionsType'

import { Column } from '../../types/storeType'

interface PropsType {
    columns: Column[]
    screenWidth: number
    createItem: CreateItemActionCreator
    searchItems: SearchItemsActionCreator
}

export interface DropDownHeaderType {
    isOpen: boolean
}

export default PropsType