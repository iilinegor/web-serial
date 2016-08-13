var ws = new WebSocket('ws://localhost:1010');

var msg = "";

ws.onopen = () => {
  ws.send('Hi, COM!');
};

ws.onmessage = (e) => {
  console.log(e.data);
  msg = e.data;
};

ws.onerror = (e) => {
  console.log(e.message);
};

ws.onclose = (e) => {
  console.log(e.code, e.reason);
};

var Term = React.createClass({

	getInitialState(){
		return {
			cash: []
		};
	},

	handleChange(data) {
		let { cash } = this.state;
		if (msg !== "") {
			cash.push(msg);
			msg = "";
		};
		console.log(data.target.value);
		this.setState({field : data.target.value, cash : cash});
	},

	handleMessage(data) {
		this.setState({cash : data.data});
	},

	handleSubmit() {
		let { cash, field } = this.state;
		ws.send(field);
		cash.push(field);
		this.setState({cash : cash});
		this._input.value = "";
	},

	_handleKeyPress: function(e) {
	    if (e.key === 'Enter') {
	      this.handleSubmit();
	 	}
	 },

	render() {
		let cashList = [];
		if (this.state.cash)
			for (let c of this.state.cash)
				cashList.push(<div className="cash-item">{c}</div>);
		return <div className="container">
					<div className="cash"> {cashList} </div>
					<input type="text" onChange={this.handleChange} onKeyPress={this._handleKeyPress} ref={(c) => this._input = c}/>
					<button onClick={this.handleSubmit}>Отправить</button>
				</div>
	}
});

ReactDOM.render(
  <Term />,
  document.getElementById('content')
);