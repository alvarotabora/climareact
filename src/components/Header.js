import React from 'react';

function Header({ titulo })
{
    return (
        <nav className="nav-whapper light-blue darken-2">
            <a haref="#!" className="brand-logo">{titulo}</a>
        </nav>
    )
}
 
export default Header;