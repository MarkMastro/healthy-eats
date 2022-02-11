import { useState } from "react"
import { getDayName, getMonthName } from "../../../services/calendarService";
import FoodService from "../../../services/foodService";
import { OrderItem } from "./orderItem";

import './orderModal.scss';

export function OrderModal({ dayData, selectedDate, onClose, onSubmit }) {

    const breakfasts = (dayData?.detail || []).filter(it => it.meal === 'B');
    const lunches = (dayData?.detail || []).filter(it => it.meal === 'L');
    const diners = (dayData?.detail || []).filter(it => it.meal === 'D');


    const [breakfast, setBreakfast] = useState(breakfasts);
    const [lunch, setLunch] = useState(lunches);
    const [dinner, setDinner] = useState(diners);

    const title = `${getDayName(selectedDate)} ${getMonthName(selectedDate)} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;

    return <div className="orderModal">
        <div className="orderModal-content">
            <div className="orderModal-content-head">
                <span>{title}</span>
                <span onClick={() => onClose()} >Close</span>
            </div>
            <div className="orderModal-content-body">
                <MealContent
                    title="Your Breakfast"
                    selectedFoods={breakfast}
                    onSelect={(items) => { setBreakfast(items); }}
                    onDeselect={(items) => { setBreakfast(items); }}
                ></MealContent>
                <hr />

                <MealContent
                    title="Your Lunch"
                    selectedFoods={lunch}
                    onSelect={(items) => { setLunch(items); }}
                    onDeselect={(items) => { setLunch(items); }}
                ></MealContent>
                <hr />

                <MealContent
                    title="Your Dinner"
                    selectedFoods={dinner}
                    onSelect={(items) => { setDinner(items); }}
                    onDeselect={(items) => { setDinner(items); }}
                ></MealContent>
            </div>
            <div className="orderModal-content-head">
                <span></span>
                <span onClick={() => onSubmit({ breakfast, lunch, dinner })} >Submit</span>
            </div>
        </div>
    </div>
}


function MealContent({ onSelect, onDeselect, title, selectedFoods }) {
    selectedFoods = selectedFoods ?? [];

    const [available, setAvailable] = useState([]);
    return <div >
        <br />
        <div className="orderModal-content-body-row">
            <h5>What Would You Like To Eat Today For {title}?</h5>
        </div>
        <div className="orderModal-content-body-row">
            <input
                type="text"
                placeholder="Serch your food!"
                autoComplete=""
                onInput={(e) => {
                    var val = e.target.value;
                    if (val.length >= 3) {
                        FoodService.getRecipes(val).then((res) => {
                            setAvailable(res);
                        });
                    } else {
                        setAvailable([]);
                    }
                }} />
        </div>

        <div className="orderModal-content-body-row">
            <div className="orderModal-content-body-row-horizontalList">

                {available.map((orderData) => <OrderItem key={`orderItem-${orderData.foodId}`} orderData={orderData}
                    onClick={(item) => {
                        if (selectedFoods.find(x => x.foodId === item.foodId)) {
                            alert("You already have it")
                        } else {
                            onSelect([...selectedFoods, item]);
                        }
                    }}
                />)}

                {!available.length && <h6>Not a valid search</h6>}

            </div>

        </div>

        <div className="orderModal-content-body-row">
            <br />
            <label >{title}:</label>
        </div>
        <div className="orderModal-content-body-row">
            <div className="orderModal-content-body-row-horizontalList">

                {selectedFoods.map((orderData) => <OrderItem key={`orderItem-${orderData.foodId}`} orderData={orderData}
                    onClick={(item) => {
                        var newItems = selectedFoods.filter(it => it.foodId !== item.foodId)
                        onDeselect([...newItems]);
                    }}
                />)}

                {!selectedFoods.length && <h6>You Should Eat Something For {title}! Please serch and select</h6>}
            </div>
        </div>
    </div>
}