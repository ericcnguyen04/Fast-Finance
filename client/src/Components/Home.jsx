import 'bulma/css/bulma.min.css';

export default function Home () {
    return (
        <div>
            This text is within a <strong>block</strong>.
            <table class="table">
            <thead>
                <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th>Team</th>
                <th><abbr title="Played">Pld</abbr></th>
                <th><abbr title="Won">W</abbr></th>
                <th><abbr title="Drawn">D</abbr></th>
                <th><abbr title="Lost">L</abbr></th>
                <th><abbr title="Goals for">wack</abbr></th>
                <th><abbr title="Goals against">GA</abbr></th>
                <th><abbr title="Goal difference">GD</abbr></th>
                <th><abbr title="Points">Pts</abbr></th>
                <th>Qualification or relegation</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                <th>1</th>
                <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a> <strong>(C)</strong>
                </td>
                <td>38</td>
                <td>23</td>
                <td>12</td>
                <td>3</td>
                <td>68</td>
                <td>36</td>
                <td>+32</td>
                <td>81</td>
                <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
                </tr>
                <tr>
                <th>2</th>
                <td><a href="https://en.wikipedia.org/wiki/Arsenal_F.C." title="Arsenal F.C.">Arsenal</a></td>
                <td>38</td>
                <td>20</td>
                <td>11</td>
                <td>7</td>
                <td>65</td>
                <td>36</td>
                <td>+29</td>
                <td>71</td>
                <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
                </tr>
                <tr>
                <th>14</th>
                <td><a href="https://en.wikipedia.org/wiki/West_Bromwich_Albion_F.C." title="West Bromwich Albion F.C.">West Bromwich Albion</a></td>
                <td>38</td>
                <td>10</td>
                <td>13</td>
                <td>15</td>
                <td>34</td>
                <td>48</td>
                <td>−14</td>
                <td>43</td>
                <td></td>
                </tr>
                <tr>
                <th>15</th>
                <td><a href="https://en.wikipedia.org/wiki/Crystal_Palace_F.C." title="Crystal Palace F.C.">Crystal Palace</a></td>
                <td>38</td>
                <td>11</td>
                <td>9</td>
                <td>18</td>
                <td>39</td>
                <td>51</td>
                <td>−12</td>
                <td>42</td>
                <td></td>
                </tr>
                <tr>
                <th>16</th>
                <td><a href="https://en.wikipedia.org/wiki/A.F.C._Bournemouth" title="A.F.C. Bournemouth">AFC Bournemouth</a></td>
                <td>38</td>
                <td>11</td>
                <td>9</td>
                <td>18</td>
                <td>45</td>
                <td>67</td>
                <td>−22</td>
                <td>42</td>
                <td></td>
                </tr>
                <tr>
                <th>17</th>
                <td><a href="https://en.wikipedia.org/wiki/Sunderland_A.F.C." title="Sunderland A.F.C.">Sunderland</a></td>
                <td>38</td>
                <td>9</td>
                <td>12</td>
                <td>17</td>
                <td>48</td>
                <td>62</td>
                <td>−14</td>
                <td>39</td>
                <td></td>
                </tr>
                <tr>
                <th>18</th>
                <td><a href="https://en.wikipedia.org/wiki/Newcastle_United_F.C." title="Newcastle United F.C.">Newcastle United</a> <strong>(R)</strong>
                </td>
                <td>38</td>
                <td>9</td>
                <td>10</td>
                <td>19</td>
                <td>44</td>
                <td>65</td>
                <td>−21</td>
                <td>37</td>
                <td>Relegation to the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_Football_League_Championship" title="2016–17 Football League Championship">Football League Championship</a></td>
                </tr>
                <tr>
                <th>19</th>
                <td><a href="https://en.wikipedia.org/wiki/Norwich_City_F.C." title="Norwich City F.C.">Norwich City</a> <strong>(R)</strong>
                </td>
                <td>38</td>
                <td>9</td>
                <td>7</td>
                <td>22</td>
                <td>39</td>
                <td>67</td>
                <td>−28</td>
                <td>34</td>
                <td>Relegation to the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_Football_League_Championship" title="2016–17 Football League Championship">Football League Championship</a></td>    </tr>
                <tr>
                <th>20</th>
                <td><a href="https://en.wikipedia.org/wiki/Aston_Villa_F.C." title="Aston Villa F.C.">Aston Villa</a> <strong>(R)</strong>
                </td>
                <td>38</td>
                <td>3</td>
                <td>8</td>
                <td>27</td>
                <td>27</td>
                <td>76</td>
                <td>−49</td>
                <td>17</td>
                <td>Relegation to the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_Football_League_Championship" title="2016–17 Football League Championship">Football League Championship</a></td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}