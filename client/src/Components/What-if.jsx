import { useState } from "react";

export default function Whatif() {

    let [currentSavings, setcurrentSavings] = useState(null);
    let [monthlyContribution, setmonthlyContribution] = useState(null);
    let [expectedReturn, setexpectedReturn] = useState(null);
    let [duration, setduration] = useState(null);

    // let [resultData, setResultData] = useState([]);
    const resultData = []


    const handleInvestment = () => {
        // setResult(currentSavings + monthlyContribution + expectedReturn + duration)


        let yearlyContribution = monthlyContribution * 12

        for (let i = 0; i < duration; i++) {
            let yearlyInterest = currentSavings * expectedReturn;
            currentSavings += yearlyInterest + yearlyContribution;
            resultData.push(({
              setyear: i + 1,
              yearlyInterest: yearlyInterest,
              savingsEndOfYear: currentSavings,
              yearlyContribution: yearlyContribution,
            }));
            console.log(({
              setyear: i + 1,
              yearlyInterest: yearlyInterest,
              savingsEndOfYear: currentSavings,
              yearlyContribution: yearlyContribution,
            }));

          }
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
            <table class="table">
            <thead>
                <tr>
                <th><abbr title="Year">Yr</abbr></th>
                <th><abbr title="Total">Total</abbr></th>
                <th><abbr title="Total Interest">Total Interest</abbr></th>
                <th><abbr title="YTD Interest">YTD Interest</abbr></th>
                <th><abbr title="Contribution">Contribution</abbr></th>

                <th>Qualification or relegation</th>
                </tr>
            </thead>
            </table>
            {resultData}
        </div>
    </div>
    ) 
}