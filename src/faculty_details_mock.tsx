// read from the file 
import fs from 'fs';
import path from 'path';

const getFacultyDetails = () => { 
    const filePath = path.join(__dirname, "./src/faculty_details.json");
    const fileData = fs.readFileSync(filePath, 'utf8');
    const faculty = JSON.parse(fileData);
    return faculty;
}

export default getFacultyDetails;
