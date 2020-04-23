if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod'); // 프로덕션 배포상태면 prod에서 관리
} else {
    module.exports = require('./dev'); // 로컬 개발상태면 dev에서 관리
}
