import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './makeColumns';
import { SheetJSFT } from './types';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class ExcelReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [],
            cols: [],
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.setState({ file: files[0] });
    };

    handleFile() {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);

            /* Update state */
            this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
                // console.log(JSON.stringify(this.state.data, null, 2));
            });


            const input = {
                users: data
            }
            this.props.ajouterUtilisateursFromFile(input)

        };

        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        };
    }

    render() {
        return (
            <>
                <input style={{ width: 400 }} type="file" accept={SheetJSFT} onChange={this.handleChange} />
                <CloudUploadIcon style={{cursor : "pointer" , width : "30px" , height : "30px" , color : "#B51B10"}} onClick={this.handleFile} />
            </>

        )
    }
}

export default ExcelReader;