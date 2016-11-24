/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {IDispatch} from '~react-redux~redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import MainSection from '../components/MainSection.tsx';
import {addTodo, deleteTodo, editTodo, completeTodo, completeAll, clearCompleted} from '../actions/index.tsx';

interface IAppProps {
  todos?: any[];
  actions?: any;
}

interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
  };

  render() {
    const {todos, actions} = this.props;
    return (
      <div>
        <Header
          addTodo={actions.addTodo}
          />
        <MainSection
          todos={todos}
          actions={actions}
          />
        <hr />
        <Footer
          completedCount={1}
          activeCount={2}
          filter={'ALL'}
          onClearCompleted={console.log}
          onShow={console.log}
          />
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch: IDispatch) {
  return {
    actions: bindActionCreators({
      addTodo,
      deleteTodo,
      editTodo,
      completeTodo,
      completeAll,
      clearCompleted
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
