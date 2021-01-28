### Flutter加载不同的环境变量获取不同的配置参数



包 flutter_dotenv https://pub.dev/packages/flutter_dotenv

#### 目录结构

├─lib
│  ├─main.dart
│  ├─main_production.dart
│─.env
│─.env.production



 #### env 文件

```
HTTP_BASE_API = 'dev'
```

 #### env.production 文件

```
HTTP_BASE_API = "production"
```



#### main.dart || main_production.dart

```dart
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;

void main() async{
  await DotEnv.load(fileName: ".env");
  // await DotEnv.load(fileName: ".env.production");
  runApp(MyApp());
}

```

通过 `flutter run  lib/main_production.dart` 可以加载不同入口

通过 `DotEnv.env['HTTP_BASE_API']`可以拿到环境变量



