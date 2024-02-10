import { useState } from "react";

export default function Whatif() {

    const [userInput, setUserInput] = useState(null);

    const handleInvestment = () => {
        console.log('yes')
    }

    return (
    <div class="columns">
        <div class="column box is-one-third">

        <div class="field">
            <label class="label is-medium">
                What if you set a budget for investments?
            </label>
            <div class="control has-icons-left has-icons-right">
            <h2>How much are you investing currently?</h2>
                <input class="input is-medium" type="initial" placeholder="Current Investment"/>
                <span class="icon is-small is-left">
                <i class="fas fa-envelope fa-xs"></i>
                </span>
                <span class="icon is-small is-right">
                <i class="fas fa-check fa-xs"></i>
                </span>
            </div>
            </div>

            <div class="field">
            <div class="control has-icons-left has-icons-right">
            <h2>How much will you invest monthly?</h2>
                <input class="input is-medium" type="monthly" placeholder="Monthly Investment"/>
                <span class="icon is-left">
                <i class="fas fa-envelope fa-sm"></i>
                </span>
                <span class="icon is-right">
                <i class="fas fa-check fa-sm"></i>
                </span>
            </div>
            </div>

            <div class="field">
            <div class="control has-icons-left has-icons-right">
            <h2>What will the annual rate be?</h2>
                <input class="input is-medium" type="email" placeholder="Annual rate"/>
                <span class="icon is-medium is-left">
                <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-medium is-right">
                <i class="fas fa-check"></i>
                </span>
            </div>
            </div>

            <div class="field">
            <div class="control has-icons-left has-icons-right">
            <h2>How many years will the money be growing?</h2>
                <input class="input is-medium" type="email" placeholder="Years "/>
                <span class="icon is-medium is-left">
                <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-medium is-right">
                <i class="fas fa-check"></i>
                </span>
            </div>
            </div>

            <button class="button is-primary" onClick={handleInvestment}>Primary</button>

        </div>
        <div class="column box is-two-third">
            {userInput}
        </div>
    </div>
    ) 
}