import {
    Button,
    Canvas,
    DropDownContainer,
    DropDownHeader,
    DropDownHeaderText,
    DropDownList,
    Input,
    ListItem,
    SearchContainer,
    SearchInput,
    SearchTitleText
} from "./style"
import { Column, Item } from '../../types/storeType'
import { Search, SortDown, SortUp } from '../common/svgBank'
import { createItem, searchItems } from '../../action'

import PropsType from './type'
import React from 'react'
import StoreType from '../../types/storeType'
import { connect } from 'react-redux'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

const ItemLeftForm: React.FC<PropsType> = ({
    searchItems,
    createItem,
    columns,
    screenWidth
}): React.ReactElement => {
    const CHOOSE_COLUMN = "CHOOSE COLUMN"
    const [item, setItem] = React.useState("");

    const [isOpen, setIsOpen] = React.useState(false);
    const [column, setColumn] = React.useState({ id: "", description: CHOOSE_COLUMN, createdAt: "" });
    const [isSubmit, setIsSubmit] = React.useState(false);
    let handleItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem(e.target.value)
    }
    let handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchItems(e.target.value)
    }
    let handleColumn = (col: Column) => {
        setColumn(col)
        setIsOpen(false)
    }
    let handleSubmit = () => {
        setIsOpen(false)
        setIsSubmit(true)
        onAdd(column, item)
    }
    const toggling = () => setIsOpen(!isOpen);
    let onAdd = (column: Column, description: string) => {
        const data: Item = {
            id: uuidv4(),
            description: description,
            column: column,
            createdAt: moment().format()
        }
        createItem(data)
    }

    return (
        <Canvas>
            <Input placeholder="ENTER ITEM" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItem(e)} />
            {isSubmit && item.length === 0 && <p>Please Enter an item.</p>}
            <DropDownContainer>
                <DropDownHeader onClick={toggling} isOpen={isOpen}>
                    <DropDownHeaderText>{column.description}</DropDownHeaderText>
                    {isOpen ?
                        <SortUp
                            width={screenWidth > 823 ? "42" : "28"}
                            height={screenWidth > 823 ? "24" : "16"}
                            style={{ marginTop: screenWidth > 823 ? "15px" : "9px" }}
                            fill="#ffffff"
                            className=""
                        />
                        :
                        <SortDown
                            width={screenWidth > 823 ? "42" : "28"}
                            height={screenWidth > 823 ? "24" : "16"}
                            style={{ marginBottom: screenWidth > 823 ? "10px" : "6px" }}
                            fill="#ffffff"
                            className=""
                        />
                    }
                </DropDownHeader>
                {isOpen && (
                    <DropDownList>
                        {columns !== undefined && columns.map((col, index_col) => {
                            return <ListItem key={index_col} onClick={() => handleColumn(col)}>{col.description}</ListItem>
                        })}
                    </DropDownList>
                )}
            </DropDownContainer>
            {isSubmit && column.description === CHOOSE_COLUMN && <p>Please select a column.</p>}
            <Button type="submit" disabled={item.length === 0 || column.description === CHOOSE_COLUMN} onClick={() => handleSubmit()} >ADD ITEM</Button>
            <SearchContainer>
                <SearchTitleText>SEARCH AN ITEM</SearchTitleText>
                <SearchInput placeholder="SEARCH" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)} />
                <Search
                    width={screenWidth > 823 ? "25" : "18"}
                    height={screenWidth > 823 ? "50" : "30"}
                    fill="#ffffff"
                    style={{
                        zIndex: "1",
                        position: "absolute",
                        right: screenWidth > 823 ? "25px" : "20px",
                        top: "5px"
                    }}
                    className=""
                />
            </SearchContainer>
        </Canvas>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        columns: state.columnState.columns,
        screenWidth: state.settingState.dimensions.width
    }
}
export default connect(mapStateToProps, {
    searchItems,
    createItem
})(ItemLeftForm)
