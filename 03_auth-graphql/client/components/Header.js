import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link } from 'react-router';

class Header extends Component {
    renderButtons() {
        let { loading, user } = this.props.data;
        if (loading) return null;

        if (user)
            return <div> Logout </div>;

        else return (
            <div>
                <li>
                    <Link to="/signup" > Signup </Link>
                </li>
                <li>
                    <Link to="/login" > Login </Link>
                </li>
            </div>
        );
    }

    render() {
        return (
            <nav>
                <div className="nav-wraper">
                    <Link to="/" className="brand-logo left"> Home </Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default graphql(query)(Header);