var userSqlMap = {
    add: 'insert into users(name, password) values(?, ?)',
    getById: 'select password from users where name = ?',
    changePasswordById: 'update users set password=?  where name = ?',
    getAll:'select * from users ',
    getdate:'select *  from detail where date=? and user=?',
    getSumByDate:' select sum(breakfast),sum(lunch),sum(dinner),sum(traffic),sum(sock),sum(clothes),sum(play),sum(others) from syy where date>? and date<? and user=?',
    getSumByWork:' select sum(breakfast),sum(lunch),sum(dinner),sum(traffic),sum(sock),sum(clothes),sum(play),sum(others) from syy where  work=? and user=? '
};
exports.userSqlMap= userSqlMap
