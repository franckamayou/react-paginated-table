import * as React from "react";
import FastTable from "./FastTable";
import {FastTableProps} from "./FastTable";

export interface PaginatedTableProps extends FastTableProps{
	currentPage:number;
	rowsPerPage:number;
	getRowsForPageNumber?:(pageNumber:number)=>React.ReactChild[][];
	onPageChange?:(pageNumber:number)=>void;
}

export interface PaginatedTableState {
	rowsInPage?:React.ReactChild[][];
	currentPage:number;
}

export default class PaginatedTable extends React.Component<PaginatedTableProps, PaginatedTableState> {

	constructor(props:PaginatedTableProps) {
		super(props);
		this.state = {
			currentPage: Math.max(this.props.currentPage - 1, 0)
		}
	}

	componentWillReceiveProps(props:PaginatedTableProps) {
		this.setState({
			currentPage: Math.max(this.props.currentPage - 1, 0)
		})
	}

	selectNextPage = () => {
		this.setState({
			currentPage: Math.max(this.state.currentPage + 1, 0)
		});
	};

	selectPreviousPage = () => {
		this.setState({
			currentPage: Math.max(this.state.currentPage - 1, 0)
		});
	};

	render() {
		var rows:React.ReactChild[][] = [];
		var numOfRows = 0;
		if(this.props.rows)
		{
			var startIndex = this.state.currentPage * this.props.rowsPerPage;
			var endIndex = startIndex + this.props.rowsPerPage;
			rows = this.props.rows.slice(startIndex, endIndex);
		}
		else if(this.props.rowGetter && this.props.numOfRows)
			numOfRows = this.props.rowsPerPage;
		else if(this.props.getRowsForPageNumber)
			rows = this.props.getRowsForPageNumber(this.state.currentPage);

		return (
			<div>
				<FastTable {...this.props} rows={rows} numOfRows={numOfRows}/>
				<div>
					<span onClick={this.selectPreviousPage}>Prev Page</span>
					<span onClick={this.selectNextPage}>Next Page</span>
					<span>{this.state.currentPage + 1}</span>
				</div>
			</div>
		)
	}
}