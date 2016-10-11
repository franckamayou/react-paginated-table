import * as React from "react";
import * as _ from "lodash";
export default class FastTable extends React.Component {
    constructor(props) {
        super(props);
        this.updateVisibleRange = () => {
            var visibleRange = [0, 0];
            if (this.container && this.props.rows) {
                var start = Math.floor(this.container.scrollTop * this.height);
                // start + number of rows in the view;
                var end = start + Math.ceil(this.height / this.numOfRows);
                visibleRange = [start, end];
            }
            this.setState({ visibleRange });
        };
        this.state = {
            visibleRange: [0, 0]
        };
    }
    componentDidMount() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.forceUpdate();
    }
    componentDidUpdate() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
    }
    get numOfRows() {
        if (this.props.rows)
            return this.props.rows.length;
        return this.props.numOfRows || 0;
    }
    renderColumnHeaders() {
        return (<tr>
				{this.props.columnHeader.map((header, index) => <th key={index}>{header}</th>)}
			</tr>);
    }
    renderVisibleRows() {
        var [start, end] = this.state.visibleRange;
        var visibleRows = [];
        for (var i = start; i < end; i++) {
            var row = this.props.rows ? this.props.rows[i] : this.props.rowGetter && this.props.rowGetter(i);
            visibleRows.push(<tr key={i} style={this.props.rowStyleGetter && this.props.rowStyleGetter(i)} className={this.props.rowClassNameGetter && this.props.rowClassNameGetter(i)} onMouseOver={(event) => this.props.onRowHover && this.props.onRowHover(i, event)} onClick={(event) => this.props.onRowSelect && this.props.onRowSelect(i, event)}>
					{row.map((cell, index) => <td key={index}>{cell}</td>)}
				</tr>);
        }
        return visibleRows;
    }
    renderColGroups() {
        return this.props.columnHeader.map((columnHeader, index) => {
            return (<col key={index} style={this.props.colStyleGetter && this.props.colStyleGetter(index)} className={this.props.colClassNameGetter && this.props.colClassNameGetter(index)}/>);
        });
    }
    render() {
        return (<div ref={(e) => this.container = e} style={{ width: this.props.width || "100%", height: this.props.height || "100%" }} onScroll={this.updateVisibleRange}>
				<table style={_.merge(this.props.style, { height: this.props.rowHeight * this.numOfRows })} className={this.props.className} ref={(t) => this.table = t}>
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
			</div>);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFzdFRhYmxlLmpzeCIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9GYXN0VGFibGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU87T0FDdkIsS0FBSyxDQUFDLE1BQU0sUUFBUTtBQXVEM0IsdUNBQXVDLEtBQUssQ0FBQyxTQUFTO0lBT3JELFlBQVksS0FBb0I7UUFDL0IsTUFBTSxLQUFLLENBQUMsQ0FBQztRQXVCZCx1QkFBa0IsR0FBQztZQUNsQixJQUFJLFlBQVksR0FBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0MsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvRCxzQ0FBc0M7Z0JBQ3RDLElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxRCxZQUFZLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxDQUFBO1FBQzlCLENBQUMsQ0FBQztRQS9CRCxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1osWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwQixDQUFBO0lBQ0YsQ0FBQztJQUVELGlCQUFpQjtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFB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QSxDQUFDLFFBQVEsQ0FDUjtNQUFBLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUN4QjtLQUFBLEVBQUUsUUFBUSxDQUNWO0tBQUEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUN6RTtNQUFBLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQzVCO0tBQUEsRUFBRSxLQUFLLENBQ1A7S0FBQSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQ3pFO01BQUEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FDMUI7S0FBQSxFQUFFLEtBQUssQ0FDUjtJQUFBLEVBQUUsS0FBSyxDQUNSO0dBQUEsRUFBRSxHQUFHLENBQUMsQ0FDTixDQUFDO0lBQ0gsQ0FBQztBQUNGLENBQUM7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFzdFRhYmxlUHJvcHMge1xuXHQvKipcblx0ICogYXJyYXkgb2YgY29sdW1uIGlkIHRvIHJvdyBlbGVtZW50c1xuXHQgKi9cblx0cm93czpSZWFjdC5SZWFjdENoaWxkW11bXTtcblx0Y29sdW1uSGVhZGVyOlJlYWN0LlJlYWN0Q2hpbGRbXTtcblxuXHQvKipcblx0ICogRnVuY3Rpb24gdG8gZ2V0IHJvd3MgaW5kaXZpZHVhbGx5LCB1c2VmdWwgaWYgeW91IHdhbnQgdG8gcmVuZGVyIGEgbGFyZ2UgbnVtYmVyIG9mIHJvd3MuXG5cdCAqIEBwYXJhbSBpbmRleCB0aGUgcm93IGluZGV4XG5cdCAqL1xuXHRyb3dHZXR0ZXI/OihpbmRleDpudW1iZXIpPT5SZWFjdC5SZWFjdENoaWxkW107XG5cblx0LyoqXG5cdCAqIFVzZSBpbiBjb29yZGluYXRpb24gd2l0aCB0aGUgcm93R2V0dGVyIHRvIGluZm9ybSB0aGUgbnVtYmVyIG9mIHJvd3Ncblx0ICogb3RoZXJ3aXNlIGl0IHdpbGwgYmUgZGVyaXZlZCBmcm9tIHJvd3MubGVuZ3RoXG5cdCAqL1xuXHRudW1PZlJvd3M/Om51bWJlcjtcblxuXHQvKipcblx0ICogaGVpZ2h0IG9mIGEgc2luZ2xlIHJvdy4gdGhpcyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQgYXQgdGhlIG1vbWVudFxuXHQgKi9cblx0cm93SGVpZ2h0Om51bWJlcjtcblxuXHQvKipcblx0ICogdGhlIHdpZHRoIG9mIHRoZSB0YWJsZSBjb250YWluZXIsIGRlZmF1bHRzIHRvIDEwMCUgb2YgaXRzIHBhcmVudFxuXHQgKi9cblx0d2lkdGg/Om51bWJlcjtcblxuXHQvKipcblx0ICogdGhlIGhlaWdodCBvZiB0aGUgdGFibGUgY29udGFpbmVyLCBkZWZhdWx0cyB0byAxMDAmIG9mIGl0cyBwYXJlbnRcblx0ICovXG5cdGhlaWdodD86bnVtYmVyO1xuXHRyb3dDbGFzc05hbWVHZXR0ZXI/OihpbmRleDpudW1iZXIpPT5zdHJpbmc7XG5cdHJvd1N0eWxlR2V0dGVyPzooaW5kZXg6bnVtYmVyKT0+UmVhY3QuQ1NTUHJvcGVydGllcztcblx0Y29sQ2xhc3NOYW1lR2V0dGVyPzooaW5kZXg6bnVtYmVyKT0+c3RyaW5nO1xuXHRjb2xTdHlsZUdldHRlcj86KGluZGV4Om51bWJlcik9PlJlYWN0LkNTU1Byb3BlcnRpZXM7XG5cdHRhYmxlSGVhZGVyQ2xhc3NOYW1lR2V0dGVyPzooaW5kZXg6bnVtYmVyKT0+c3RyaW5nO1xuXHR0YWJsZUhlYWRlclN0eWxlR2V0dGVyPzooaW5kZXg6bnVtYmVyKT0+UmVhY3QuQ1NTUHJvcGVydGllcztcblx0c3R5bGU/OlJlYWN0LkNTU1Byb3BlcnRpZXM7XG5cdHRoZWFkU3R5bGU/OlJlYWN0LkNTU1Byb3BlcnRpZXM7XG5cdHRib2R5U3R5bGU/OlJlYWN0LkNTU1Byb3BlcnRpZXM7XG5cdHRoZWFkQ2xhc3NOYW1lPzpzdHJpbmc7XG5cdHRib2R5Q2xhc3NOYW1lPzpzdHJpbmc7XG5cdGNsYXNzTmFtZT86c3RyaW5nO1xuXHRvblJvd1NlbGVjdD86KGluZGV4Om51bWJlciwgZXZlbnQ6UmVhY3QuTW91c2VFdmVudCk9PnZvaWQ7XG5cdG9uUm93SG92ZXI/OihpbmRleDpudW1iZXIsIGV2ZW50OlJlYWN0Lk1vdXNlRXZlbnQpPT52b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhc3RUYWJsZVN0YXRlIHtcblx0dmlzaWJsZVJhbmdlPzogW251bWJlciwgbnVtYmVyXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmFzdFRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PEZhc3RUYWJsZVByb3BzLCBGYXN0VGFibGVTdGF0ZT4ge1xuXG5cdHdpZHRoOm51bWJlcjtcblx0aGVpZ2h0Om51bWJlcjtcblx0Y29udGFpbmVyOkhUTUxEaXZFbGVtZW50O1xuXHR0YWJsZTpIVE1MVGFibGVFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzOkZhc3RUYWJsZVByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHR2aXNpYmxlUmFuZ2U6IFswLCAwXVxuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMud2lkdGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aDtcblx0XHR0aGlzLmhlaWdodCA9IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodDtcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKSB7XG5cdFx0dGhpcy53aWR0aCA9IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoO1xuXHRcdHRoaXMuaGVpZ2h0ID0gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0O1xuXHR9XG5cblx0cHJpdmF0ZSBnZXQgbnVtT2ZSb3dzKCkge1xuXHRcdGlmKHRoaXMucHJvcHMucm93cylcblx0XHRcdHJldHVybiB0aGlzLnByb3BzLnJvd3MubGVuZ3RoO1xuXHRcdHJldHVybiB0aGlzLnByb3BzLm51bU9mUm93cyB8fCAwO1xuXHR9XG5cblx0dXBkYXRlVmlzaWJsZVJhbmdlPSgpPT4ge1xuXHRcdHZhciB2aXNpYmxlUmFuZ2U6W251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcblx0XHRpZih0aGlzLmNvbnRhaW5lciAmJiB0aGlzLnByb3BzLnJvd3MpIHtcblx0XHRcdHZhciBzdGFydCA9IE1hdGguZmxvb3IodGhpcy5jb250YWluZXIuc2Nyb2xsVG9wICogdGhpcy5oZWlnaHQpO1xuXHRcdFx0Ly8gc3RhcnQgKyBudW1iZXIgb2Ygcm93cyBpbiB0aGUgdmlldztcblx0XHRcdHZhciBlbmQgPSBzdGFydCArIE1hdGguY2VpbCh0aGlzLmhlaWdodCAvIHRoaXMubnVtT2ZSb3dzKTtcblx0XHRcdHZpc2libGVSYW5nZSA9IFtzdGFydCwgZW5kXTtcblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7dmlzaWJsZVJhbmdlfSlcblx0fTtcblxuXHRyZW5kZXJDb2x1bW5IZWFkZXJzKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8dHI+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNvbHVtbkhlYWRlci5tYXAoKGhlYWRlciwgaW5kZXgpID0+IDx0aCBrZXk9e2luZGV4fT57aGVhZGVyfTwvdGg+KX1cblx0XHRcdDwvdHI+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlclZpc2libGVSb3dzKCkge1xuXHRcdHZhciBbc3RhcnQsIGVuZF0gPSB0aGlzLnN0YXRlLnZpc2libGVSYW5nZTtcblx0XHR2YXIgdmlzaWJsZVJvd3M6SlNYLkVsZW1lbnRbXSA9IFtdO1xuXG5cdFx0Zm9yKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0dmFyIHJvdyA9IHRoaXMucHJvcHMucm93cyA/IHRoaXMucHJvcHMucm93c1tpXSA6IHRoaXMucHJvcHMucm93R2V0dGVyICYmIHRoaXMucHJvcHMucm93R2V0dGVyKGkpO1xuXHRcdFx0dmlzaWJsZVJvd3MucHVzaChcblx0XHRcdFx0PHRyXG5cdFx0XHRcdFx0a2V5PXtpfVxuXHRcdFx0XHRcdHN0eWxlPXt0aGlzLnByb3BzLnJvd1N0eWxlR2V0dGVyICYmIHRoaXMucHJvcHMucm93U3R5bGVHZXR0ZXIoaSl9XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlciAmJiB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihpKX1cblx0XHRcdFx0XHRvbk1vdXNlT3Zlcj17KGV2ZW50OlJlYWN0Lk1vdXNlRXZlbnQpID0+IHRoaXMucHJvcHMub25Sb3dIb3ZlciAmJiB0aGlzLnByb3BzLm9uUm93SG92ZXIoaSwgZXZlbnQpfVxuXHRcdFx0XHRcdG9uQ2xpY2s9eyhldmVudDpSZWFjdC5Nb3VzZUV2ZW50KSA9PiB0aGlzLnByb3BzLm9uUm93U2VsZWN0ICYmIHRoaXMucHJvcHMub25Sb3dTZWxlY3QoaSwgZXZlbnQpfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0e3Jvdy5tYXAoKGNlbGwsIGluZGV4KSA9PiA8dGQga2V5PXtpbmRleH0+e2NlbGx9PC90ZD4pfVxuXHRcdFx0XHQ8L3RyPlxuXHRcdFx0KVxuXHRcdH1cblx0XHRyZXR1cm4gdmlzaWJsZVJvd3M7XG5cdH1cblxuXHRyZW5kZXJDb2xHcm91cHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY29sdW1uSGVhZGVyLm1hcCgoY29sdW1uSGVhZGVyLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8Y29sXG5cdFx0XHRcdFx0XHRcdGtleT17aW5kZXh9XG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt0aGlzLnByb3BzLmNvbFN0eWxlR2V0dGVyICYmIHRoaXMucHJvcHMuY29sU3R5bGVHZXR0ZXIoaW5kZXgpfVxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMucHJvcHMuY29sQ2xhc3NOYW1lR2V0dGVyICYmIHRoaXMucHJvcHMuY29sQ2xhc3NOYW1lR2V0dGVyKGluZGV4KX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgcmVmPXsoZTpIVE1MRGl2RWxlbWVudCkgPT4gdGhpcy5jb250YWluZXIgPSBlfSBzdHlsZT17e3dpZHRoOiB0aGlzLnByb3BzLndpZHRoIHx8IFwiMTAwJVwiLCBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IHx8IFwiMTAwJVwifX1cblx0XHRcdFx0IG9uU2Nyb2xsPXt0aGlzLnVwZGF0ZVZpc2libGVSYW5nZX1cblx0XHRcdD5cblx0XHRcdFx0PHRhYmxlIHN0eWxlPXtfLm1lcmdlKHRoaXMucHJvcHMuc3R5bGUsIHsgaGVpZ2h0OiB0aGlzLnByb3BzLnJvd0hlaWdodCp0aGlzLm51bU9mUm93cyB9KX0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRyZWY9eyh0OkhUTUxUYWJsZUVsZW1lbnQpPT4gdGhpcy50YWJsZSA9IHR9XG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8Y29sZ3JvdXA+XG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDb2xHcm91cHMoKX1cblx0XHRcdFx0XHQ8L2NvbGdyb3VwPlxuXHRcdFx0XHRcdDx0aGVhZCBzdHlsZT17dGhpcy5wcm9wcy50aGVhZFN0eWxlfSBjbGFzc05hbWU9e3RoaXMucHJvcHMudGhlYWRDbGFzc05hbWV9PlxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyQ29sdW1uSGVhZGVycygpfVxuXHRcdFx0XHRcdDwvdGhlYWQ+XG5cdFx0XHRcdFx0PHRib2R5IHN0eWxlPXt0aGlzLnByb3BzLnRib2R5U3R5bGV9IGNsYXNzTmFtZT17dGhpcy5wcm9wcy50Ym9keUNsYXNzTmFtZX0+XG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJWaXNpYmxlUm93cygpfVxuXHRcdFx0XHRcdDwvdGJvZHk+XG5cdFx0XHRcdDwvdGFibGU+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59Il19