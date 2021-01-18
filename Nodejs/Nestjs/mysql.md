### 数据库（TypeORM）

```javascript
$ npm install --save @nestjs/typeorm typeorm mysql
```

安装过程完成后，我们可以将其`TypeOrmModule`导入到根目录中`ApplicationModule`

app.module.ts

JS

```javascript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
              type: 'mysql',
              host: 'localhost',
              port: 3306,
              username: 'root',
              password: 'root',
              database: 'test',
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: true,
        })
    ]
})

export class ApplicationModule {}
```

该`forRoot()`方法接受相同的配置对象作为`createConnection()`从TypeORM包。此外，`forRoot()`我们可以`ormconfig.json`在项目根目录中创建一个文件，而不是传递任何内容。

ormconfig.json

```javascript
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "test",
  "entities": ["src/**/**.entity{.ts,.js}"],
  "synchronize": true
}
```

然后，我们可以简单地将括号留空：

app.module.ts

JS

```javascript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot()],
})
export class ApplicationModule {}
```

随后，`Connection`并且`EntityManager`将可跨整个项目注入（没有导入任何其他地方的模块），例如，以这种方式：

app.module.ts

JS

```javascript
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), PhotoModule],
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
```

#### 