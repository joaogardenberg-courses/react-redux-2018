import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">Back to index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={ this.onDeleteClick.bind(this) }
        >
          Delete post
        </button>
        <h3>{ post.title }</h3>
        <h6>{ post.categories }</h6>
        <p>{ post.content }</p>

      </div>
    );
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  componentDidUpdate() {
    if (this.props.redirectToIndex) {
      this.props.history.push('/');
    }
  }

  onDeleteClick() {
    const { id } = this.props.post;
    this.props.deletePost(id);
  }
}

function mapStateToProps({ posts }, ownProps) {
  const { id } = ownProps.match.params;
  return { post: posts[id], redirectToIndex: posts.redirectToIndex };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);