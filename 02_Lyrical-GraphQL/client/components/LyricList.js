import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
    onLike(lyricId, likes) {
        this.props.mutate({
            variables: { lyricId },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    __typename: 'LyricType',
                    id: lyricId,
                    likes: likes + 1 
                }
            }
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) =>
            <li key={id} className="collection-item">
                {content}
                <div className="vote-box">
                    <i
                        onClick={() => this.onLike(id, likes)}
                        className="material-icons">
                        thumb_up
                    </i>
                    {likes}
                </div>
            </li>);
    }


    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

const mutation = gql`
mutation likeLyric($lyricId: ID) {
    likeLyric(id: $lyricId) {
      id
      likes
    }
  }  
`

export default graphql(mutation)(LyricList);