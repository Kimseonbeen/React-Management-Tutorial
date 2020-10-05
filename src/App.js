import React from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
  {
  'id' : 1,
  'image' : 'http://placeimg.com/64/64/1',
  'name' : '나동빈',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '대학생'
},
{
  'id' : 2,
  'image' : 'http://placeimg.com/64/64/2',
  'name' : '홍길동',
  'birthday' : '960355',
  'gender' : '남자',
  'job' : '군인'
},
{
  'id' : 3,
  'image' : 'http://placeimg.com/64/64/3',
  'name' : '이순신',
  'birthday' : '920312',
  'gender' : '여자',
  'job' : '디자이너'
}
]

//실질적으로 웹 화면을 담당하는 부분
function App() {
  return (
    <div>
      {
        customers.map(c => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
              />
          );
        })
      }
    </div>

  );
}

export default App;
