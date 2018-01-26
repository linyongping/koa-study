var timeStamp = +new Date();
var name = 'Cabbage';
var data = { loginUsername: name, loginTime: timeStamp };
var db = connect('firstMangoDB');
db.forTest.insert(data);

print('[demo]log success');
