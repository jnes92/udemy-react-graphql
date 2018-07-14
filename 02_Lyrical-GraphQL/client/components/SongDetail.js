import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';


class SongDetail extends Component {
    render(){
        return (
            <div>
                <h3> Song Detail </h3>
            </div>
        )
    }
}

export default graphql(fetchSong, {
    options: (props) => {
        return {
            variables : { songId : props.params.id }
        }
    }
})(SongDetail);