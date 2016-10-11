import * as React from "react";
import * as _ from "lodash";

export interface FastTableProps {
	/**
	 * array of column id to row elements
	 */
	rows:React.ReactChild[][];
	columnHeader:React.ReactChild[];

	/**
	 * Function to get rows individually, useful if you want to render a large number of rows.
	 * @param index the row index
	 */
	rowGetter?:(index:number)=>React.ReactChild[];

	/**
	 * Use in coordination with the rowGetter to inform the number of rows
	 * otherwise it will be derived from rows.length
	 */
	numOfRows?:number;

	/**
	 * height of a single row. this parameter is required at the moment
	 */
	rowHeight:number;

	/**
	 * the width of the table container, defaults to 100% of its parent
	 */
	width?:number;

	/**
	 * the height of the table container, defaults to 100& of its parent
	 */
	height?:number;
	rowClassNameGetter?:(index:number)=>string;
	rowStyleGetter?:(index:number)=>React.CSSProperties;
	colClassNameGetter?:(index:number)=>string;
	colStyleGetter?:(index:number)=>React.CSSProperties;
	tableHeaderClassNameGetter?:()=>string;
	tableHeaderStyleGetter?:()=>React.CSSProperties;
	style?:React.CSSProperties;
	theadStyle?:React.CSSProperties;
	tbodyStyle?:React.CSSProperties;
	theadClassName?:string;
	tbodyClassName?:string;
	className?:string;
	onRowSelect?:(index:number, event:React.MouseEvent)=>void;
	onRowHover?:(index:number, event:React.MouseEvent)=>void;
}

export interface FastTableState {
	visibleRange?: [number, number];
}

export default class FastTable extends React.Component<FastTableProps, FastTableState> {

	width:number;
	height:number;
	container:HTMLDivElement;

	constructor(props:FastTableProps) {
		super(props);
		this.state = {
			visibleRange: [0, 0]
		}
	}

	componentDidMount() {
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
		this.updateVisibleRange();
	}

	componentDidUpdate() {
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
	}

	private get numOfRows() {
		if(this.props.rows)
			return this.props.rows.length;
		return this.props.numOfRows || 0;
	}

	updateVisibleRange=()=> {
		var visibleRange:[number, number] = [0, 0];
		if(this.container) {
			var start = Math.floor(this.container.scrollTop/this.props.rowHeight);
			// start + number of rows in the view;
			var end = start + Math.ceil(this.height / this.props.rowHeight);
			visibleRange = [start, end];
		}
		this.setState({visibleRange})
	};

	renderColumnHeaders() {
		return (
			<tr
				style={_.merge(this.props.tableHeaderStyleGetter && this.props.tableHeaderStyleGetter(), {position: "absolute"})}
				className={this.props.tableHeaderClassNameGetter && this.props.tableHeaderClassNameGetter()}
			>
				{this.props.columnHeader.map((header, index) => <th key={index}>{header}</th>)}
			</tr>
		);
	}

	renderVisibleRows() {
		var [start, end] = this.state.visibleRange;
		var visibleRows:JSX.Element[] = [];

		for(var i = start; i < end; i++) {
			var row = this.props.rows ? this.props.rows[i] : this.props.rowGetter && this.props.rowGetter(i);
			visibleRows.push(
				<tr
					key={i}
					style={_.merge(this.props.rowStyleGetter && this.props.rowStyleGetter(i), {height: this.props.rowHeight})}
					className={this.props.rowClassNameGetter && this.props.rowClassNameGetter(i)}
					onMouseOver={(event:React.MouseEvent) => this.props.onRowHover && this.props.onRowHover(i, event)}
					onClick={(event:React.MouseEvent) => this.props.onRowSelect && this.props.onRowSelect(i, event)}
				>
					{row.map((cell, index) => <td key={index}>{cell}</td>)}
				</tr>
			)
		}
		return visibleRows;
	}

	renderColGroups() {
		return this.props.columnHeader.map((columnHeader, index) => {
			return (
				<col
					key={index}
					style={this.props.colStyleGetter && this.props.colStyleGetter(index)}
					className={this.props.colClassNameGetter && this.props.colClassNameGetter(index)}
				/>
			);
		});
	}

	render() {
		return (
			<div ref={(e:HTMLDivElement) => this.container = e} style={{width: this.props.width || "100%", height: this.props.height || "100%", overflow: "auto"}}
				 onScroll={this.updateVisibleRange}
			>
				<div style={{height: this.props.rowHeight*this.numOfRows, width: "100%"}}>
					<table style={_.merge(this.props.style, {position: "absolute", width: this.container && this.container.clientWidth})} className={this.props.className}>
						<colgroup>
							{this.renderColGroups()}
						</colgroup>
						<thead style={this.props.theadStyle} className={this.props.theadClassName}>
						{this.renderColumnHeaders()}
						</thead>
						<tbody style={this.props.tbodyStyle} className={this.props.tbodyClassName}>
						{this.renderVisibleRows()}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}