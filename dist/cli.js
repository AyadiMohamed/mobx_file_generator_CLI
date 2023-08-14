#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var path = tslib_1.__importStar(require("path"));
var prompts_1 = tslib_1.__importDefault(require("prompts")); // Import the prompts package
var mobx_file_generator_1 = tslib_1.__importDefault(require("mobx_file_generator"));
function generateComponents() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var userInput, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, prompts_1["default"])([
                            {
                                type: 'text',
                                name: 'projectPath',
                                message: 'Enter the path to the project:',
                                validate: function (input) {
                                    if (fs.existsSync(input) && fs.existsSync(path.join(input, 'package.json'))) {
                                        return true;
                                    }
                                    return 'Please provide a valid path to the project directory containing package.json.';
                                }
                            },
                            {
                                type: 'text',
                                name: 'swaggerUrl',
                                message: 'Enter the Swagger URL:'
                            },
                            {
                                type: 'text',
                                name: 'outputFolder',
                                message: 'Enter the output folder path:'
                            },
                            {
                                type: 'text',
                                name: 'templatePath',
                                message: 'Enter the optional template path (leave empty if none):'
                            },
                        ])];
                case 1:
                    userInput = _a.sent();
                    // Set the user-provided output folder in your library
                    mobx_file_generator_1["default"].setOutputFolder(path.join(userInput.projectPath, userInput.outputFolder));
                    // Check dependencies from the user's package.json
                    mobx_file_generator_1["default"].checkDependencies(path.join(userInput.projectPath, 'package.json'));
                    // Generate DTOs, services, and stores
                    return [4 /*yield*/, Promise.all([
                            mobx_file_generator_1["default"].generateDto(userInput.swaggerUrl, userInput.templatePath),
                            mobx_file_generator_1["default"].generateService(userInput.swaggerUrl, userInput.templatePath),
                            mobx_file_generator_1["default"].generateStore(userInput.swaggerUrl),
                        ])];
                case 2:
                    // Generate DTOs, services, and stores
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
generateComponents();
//# sourceMappingURL=cli.js.map