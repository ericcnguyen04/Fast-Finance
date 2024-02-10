import '../CSS/Form.css'

export default function Login () {
    return (
        <div>
            <div className='login'>
            <div class="container">
                <div class="card">
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <h1 className='swag'>Log In</h1>
                        <input class="input" type="email" placeholder="Email"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                    <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="password" placeholder="Password"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control">
                        <button class="button is-success">
                        Login
                        </button>
                    </p>
                    </div>
                    <a href='/register'>Create an account?</a>
                </div>
            </div>
            </div>
        </div>
    )
}