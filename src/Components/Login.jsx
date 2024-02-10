import '../CSS/Form.css'

export default function Login () {
    return (
        <div>
            <div className='login'>
            <div class="container">
                <div class="card">
                    <h1>Login</h1>
                    <div id='form'>
                        <input type="text" id="username" name="username" placeholder="Enter your name" required/>
                        <input type="password" id="password" name="password" placeholder="Enter your secret password" required/>
                        <button type="submit">Login</button>
                    </div>
                <a href='/register'>Create an account</a>
                </div>
            </div>
            </div>
        </div>
    )
}