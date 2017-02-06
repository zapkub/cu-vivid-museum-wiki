import XLSX from 'node-xlsx';
import path from 'path';
import { extractLocation } from '../common';

const gardenSheet = XLSX.parse(path.join(__dirname, '../../../seed/Garden.xls'));


console.log(extractLocation(gardenSheet, 0));