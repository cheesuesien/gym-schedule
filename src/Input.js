import React, { Component } from 'react';

class Input extends Component {
	render() {
		const {description, labels, active, change} = this.props;
		return (
			<div className="row justify-content-center m-4">
				<p className="mr-3">{description}</p>
				<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{active}
				</button>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
				{
					labels.map((label, i) => {
						return <a className="dropdown-item" href="#" key={i} onClick={(e)=>{change(e.target.innerHTML)}}>{label}</a>
					})
				}
				</div>
			</div>
		);
	}
}

export default Input;
