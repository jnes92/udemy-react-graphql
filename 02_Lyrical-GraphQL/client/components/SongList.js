import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router'
import fetchSongs from '../queries/fetchSongs';

class SongList extends Component {
    renderSongs() {
        return this.props.data.songs.map(song =>
            <li key={song.id} className="collection-item">
                {song.title}
            </li>);
    }

    render() {
        if (this.props.data.loading) return <div>Loading...</div>

        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link className="btn-floating btn-large red right" to="songs/new" >
                    <i className="material-icons">add</i>
                </Link>
            </div>

        )
    }
}

const deleteSong = gql`
mutation deleteSong($id: ID) {
    deleteSong(id: $id) {
      id,
      title
    }
  }  
`

export default graphql(deleteSong)( 
    graphql(fetchSongs)(SongList)
);