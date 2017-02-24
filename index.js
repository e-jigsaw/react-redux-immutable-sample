const {createElement} = require('react')
const {render} = require('react-dom')
const {Record} = require('immutable')
const {createStore, combineReducers} = require('redux')
const {Provider, connect} = require('react-redux')

class Foo extends Record({hoge: 1}) {
  updateHoge () {
    return this.set('hoge', this.get('hoge') + 1)
  }

  updateHoge1 () {
    return this.set('hoge', this.get('hoge') * 2)
  }
}

const App = ({foo, onClick, onClick1}) => createElement(
  'button', {
    onClick: foo.get('hoge') % 2 === 0 ? onClick : onClick1
  }, foo.get('hoge')
)

const AppContainer = connect(
  ({foo}) => ({foo}),
  dispatch => ({
    onClick: event => dispatch({type: 'inc'}),
    onClick1: event => dispatch({type: 'pow'})
  })
)(App)

const store = createStore(combineReducers({
  foo: (state = new Foo(), action) => {
    if (action.type === 'inc') {
      return state.updateHoge()
    }
    if (action.type === 'pow') {
      return state.updateHoge1()
    }
    return state
  }
}))

render(
  createElement(Provider, {store}, createElement(AppContainer)),
  document.getElementById('app')
)
