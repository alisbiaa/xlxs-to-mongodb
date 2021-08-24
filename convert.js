const xlsx = require("xlsx");
const workBook = xlsx.readFile("./uploads/db.xlsx");
const sheet_name_list = workBook.SheetNames;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to db.."));

// ____________ Converting part


console.log(sheet_name_list);
sheet_name_list.forEach(sh => {
    const worksheet = workBook.Sheets[sh];
    const headers = {};
    let data = [];

    for (const z in worksheet) {
        const col = z.substring(0, 1);
        const row = parseInt(z.substring(1));
        const value = worksheet[z].v;
        if (row === 1) {
            headers[col] = value;
            continue;
        }
        if (!data[row]) data[row] = {};
        data[row][headers[col]] = value;

    }
    data.shift();
    data.shift();
    console.log(data);
    const schema = new mongoose.Schema({ name: 'string', size: 'string' });
    const Tank = mongoose.model('Tank', schema);
    Tank.deleteMany().then(result => console.log(result)).catch(err => console.log(err));
    Tank.insertMany(data).then(result => console.log(result)).catch(err => console.log(err));
});

// ____________ Updating part


