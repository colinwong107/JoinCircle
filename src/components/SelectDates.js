import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
function SelectDates({ dates, setSelectedDates }) {
    const [categories, setCategories] = useState([]);
    const [checkedList, setCheckedList] = useState([]);
    const [itemsChecked, setItemsChecked] = useState(false);
    useEffect(() => {
        const datesArray = dates.split(",")
        const initialCategories = [];
        for (let i = 0; i < datesArray.length; i++) {
            initialCategories.push({ name: datesArray[i], id: i })
        }
        setCategories(initialCategories);
    }, []);
    const handleCheckboxClick = (e) => {
        const { value, checked } = e.target;
        console.log(value, checked)
        
        if (checked) {
            setSelectedDates((oldArray)=>[...oldArray,categories[value* 1].name   ])
            setCheckedList([...checkedList, value * 1]); //*1 해줘야 number로 들어가서 type 호환이 됨.
        } else {
            setSelectedDates((oldArray)=> oldArray.filter((item) => item != categories[value* 1].name))
            setCheckedList(checkedList.filter((item) => item != value));

        }
    };
    const selectItem = (e) => {
        const { checked } = e.target;
        const collection = [];
        const collection2 = [];
        if (checked) {
            for (const item of categories) {
                collection.push(item.id);
                collection2.push(item.name);
            }           
            setSelectedDates(collection2);
        }
        else{
            setSelectedDates([]);
        }
        setCheckedList(collection);
        setItemsChecked(checked);
    };
    
    return (
        <div>
            <Checkbox checked={itemsChecked} onClick={selectItem.bind(this)} />
            Select all
            {
                categories != null ? (categories.map((item) => {
                    return (
                        <div>
                            <Checkbox
                                item={item}
                                value={item.id}
                                checked={checkedList.includes(item.id)}
                                onChange={handleCheckboxClick}
                            />
                            {item.name}
                        </div>
                    )
                })) : (null)
            }
        </div>
    );
}
export default SelectDates