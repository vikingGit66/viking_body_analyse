import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // 从环境变量读取配置
  const dbConfig = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: false // 明确禁用 SSL
  };

  try {
    // 创建连接
    const connection = await mysql.createConnection(dbConfig);
    
    // 执行测试查询
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
    
    // 关闭连接
    await connection.end();

    // 返回成功响应
    res.status(200).json({ 
      success: true, 
      message: `Database connection successful! Result: ${rows[0].solution}` 
    });
  } catch (error) {
    // 返回错误信息
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    });
  }
}