# 两周速刷前端面试 100 题

## 项目配置

### typescript

1. 依赖安装
   ```bash
   npm install typescript ts-node @types/node --save-dev
   ```
2. 配置文件（tsconfig.json）
   ```json
   {
     "compilerOptions": {
       "target": "ES6",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true
     },
     "include": ["src"],
     "exclude": ["node_modules", "**/*.test.ts"]
   }
   ```

### jest

1. 依赖安装
   ```bash
   npm install jest ts-jest @types/jest --save-dev
   ```
2. 配置文件（jest.config.js）
   ```js
   module.exports = {
     preset: "ts-jest",
     testEnvironment: "node",
     testMatch: ["<rootDir>/src/index.test.ts"],
   };
   ```

### npm scripts

```json
{
  "scripts": {
    "dev": "ts-node src/index.ts", // 执行 index.ts 文件
    "test": "jest src/index.test.ts" // 执行 index.test.ts 文件
  }
}
```