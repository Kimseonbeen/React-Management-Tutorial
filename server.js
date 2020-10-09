const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

//데이터베이스에 있는 유저 정보 읽기
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})


//쿼리를 날려 받아온정보는 rows로 처리가능
app.get('/api/customers', (req, res) => {
    connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows);
      }
    );
});

//사용자가 실제로 접근해서 프로필 이미지를 확인 //어떤 경로로 공유를 하냐는 image폴더에서
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = 'http://localhost:5000/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  console.log(name);
  console.log(image);
  console.log(birthday);
  console.log(gender);
  console.log(job);
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      })
});

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
})


app.listen(port, () => console.log(`Listening on port ${port}`));
