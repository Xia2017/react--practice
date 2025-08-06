// 环境变量测试脚本
// 运行: node test-env.js

require('dotenv').config({ path: '.env.local' });

console.log('=== 环境变量测试 ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_MONGO_URL:', process.env.NEXT_PUBLIC_MONGO_URL);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('MONGO_DB_NAME:', process.env.MONGO_DB_NAME);
console.log('MONGO_DB_USER:', process.env.MONGO_DB_USER);
console.log('MONGO_DB_PASSWORD:', process.env.MONGO_DB_PASSWORD ? '***隐藏***' : '未设置');

// 检查必要的环境变量
const requiredVars = [
    'NEXT_PUBLIC_MONGO_URL',
    'MONGODB_URI',
    'MONGO_DB_NAME',
    'MONGO_DB_USER',
    'MONGO_DB_PASSWORD'
];

console.log('\n=== 环境变量检查 ===');
let allPresent = true;
requiredVars.forEach(varName => {
    const isPresent = !!process.env[varName];
    console.log(`${varName}: ${isPresent ? '✅' : '❌'}`);
    if (!isPresent) allPresent = false;
});

console.log(`\n总体状态: ${allPresent ? '✅ 所有必要环境变量已设置' : '❌ 缺少必要环境变量'}`);
