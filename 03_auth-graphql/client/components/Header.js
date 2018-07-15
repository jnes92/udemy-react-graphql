import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class Header extends Component {
    renderButtons() {
        let { loading, user } = this.props.data;
        console.log(this.props.data);
        if (loading) return null;

        if (user)
            return <div> Logout </div>;

        else
            return <div> You´re not signed in. </div>;
    }

    render() {
        return (
            <nav>
                <div className="nav-wraper">
                    {this.renderButtons()}
                </div>
            </nav>
        );
    }
}

export default graphql(query)(Header);