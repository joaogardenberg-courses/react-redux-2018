import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <Field
          name="title"
          label="Title"
          component={ this.renderField }
        />
        <Field
          name="categories"
          label="Categories"
          component={ this.renderField }
        />
        <Field
          name="content"
          label="Content"
          component={ this.renderField }
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }

  componentDidUpdate() {
    if (this.props.posts && this.props.posts.redirectToIndex) {
      this.props.history.push('/');
    }
  }

  renderField(field) {
    const { touched, error } = field.meta;

    return (
      <div className={ `form-group ${touched && error ? 'has-danger' : ''}` }>
        <label htmlFor={ field.input.name }>{`${field.label}:`}</label>
        <input
          id={ field.input.name }
          className="form-control"
          type="text"
          { ...field.input }
        />
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values);
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories";
  }

  if (!values.content) {
    errors.content = "Enter some content";
  }

  return errors;
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(mapStateToProps, { createPost })(PostsNew)
);