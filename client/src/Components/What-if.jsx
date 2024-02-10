import { useState } from "react";

export default function Whatif() {

    const [currentSavings, setcurrentSavings] = useState(null);
    const [monthlyContribution, setmonthlyContribution] = useState(null);
    const [expectedReturn, setexpectedReturn] = useState(null);
    const [duration, setduration] = useState(null);
    const [result, setResult] = useState(null);

    const handleInvestment = () => {
        setResult(currentSavings + monthlyContribution + expectedReturn + duration)

        let yearlyContribution = monthlyContribution * 12

        // for (let i = 0; i < duration; i++) {
        //     let yearlyInterest = currentSavings * expectedReturn;
        //     currentSavings += yearlyInterest + yearlyContribution;
        //     console.log(({
        //       year: i + 1,
        //       yearlyInterest: yearlyInterest,
        //       savingsEndOfYear: currentSavings,
        //       yearlyContribution: yearlyContribution,
        //     }));

        //   }
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
                <input class="input is-medium" type="initial" placeholder="Current Investment"
                    onChange={e => setcurrentSavings(e.target.value)}
                />
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
                <input class="input is-medium" type="monthly" placeholder="Monthly Investment"
					onChange={e => setmonthlyContribution(e.target.value)}
                />
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
                <input class="input is-medium" type="email" placeholder="Annual rate"
					onChange={e => setexpectedReturn(e.target.value)}
                />
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
                <input class="input is-medium" type="email" placeholder="Years "
					onChange={e => setduration(e.target.value)}
                />
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
            {result}
        </div>
    </div>
    ) 
}