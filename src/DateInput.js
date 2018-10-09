import React, { Component } from 'react';

const $ = window.$;

class DateInput extends Component {
	render() {
		const {description, change} = this.props;
		
		$(document).ready(() => {
			$('.datepicker').datepicker({
				format: "dd/mm/yyyy",
				startDate: "-3d",
				endDate: "+14d",
				maxViewMode: 1,
				todayBtn: "linked",
				autoclose: true,
				todayHighlight: true
			})
			.off("changeDate") //to prevent multiple function calls
			.on("changeDate", (e) => {
				change(e.date);
				//change(e.date.getDate() + "/" + (e.date.getMonth()+1) + "/" + e.date.getFullYear());
			});
		});
		
		return (
			<div className="row justify-content-center m-4">
				<p className="mr-3">{description}</p>
				<input className="datepicker" />
			</div>
		);
	}
}

export default DateInput;
