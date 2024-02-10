import 'bulma/css/bulma.min.css';

export default function Navbar () {

    const loggedIn = (
		<div className="navbar-item">
			<div className="buttons">
				<a className="button is-light" href='/newItem'>
					<strong>Share Item</strong>
				</a>

				<a className="button is-light" href='/'>
					<strong>Logout</strong>
				</a>
			</div>
		</div>
	);

    return (
        <div>
            <a href='/'>Fast Finance</a>
            <a href='/'></a>
            <a href='/'></a>
            <a href='/'>Profile</a>
        </div>
    )
}