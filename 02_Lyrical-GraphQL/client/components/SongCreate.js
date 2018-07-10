import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }
    render() {
        return (
            <div>
                <h3>Create a new Song </h3>
                <form>
                    <label>Song Title</label>
                    <input 
                        value={this.state.title} 
                        onChange={event => this.setState({ title: event.target.value })} 
                    />
                </form>
            </div>
        )
    }
}

export default (SongCreate);