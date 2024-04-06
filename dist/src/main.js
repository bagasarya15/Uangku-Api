"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dotenv_1 = require("dotenv");
async function bootstrap() {
    (0, dotenv_1.config)();
    const port = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(port, () => {
        console.log(`Server run on port ${port} || server berjalan di ${port} `);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map