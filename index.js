//const { Block } = require("blockly");

var toolbox = {
    "kind": "categoryToolbox",
    "contents": [{
            "kind": "category",
            "name": "Core",
            "contents": [{
                    "kind": "block",
                    "type": "controls_if"
                },
                {
                    "kind": "block",
                    "type": "logic_compare"
                },
                {
                    "kind": "block",
                    "type": "config"
                }
            ]
        },
        {
            "kind": "category",
            "name": "physics",
            "contents": [{
                    "kind": "block",
                    "type": "physics_default"
                },
                {
                    "kind": "block",
                    "type": "physics_arcade"
                },
                {
                    "kind": "block",
                    "type": "physics_gravity"
                },
                {
                    "kind": "block",
                    "type": "physics_y"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Variables",
            "custom": "VARIABLE"
        },
        {
            "kind": "category",
            "name": "Functions",
            "custom": "PROCEDURE"
        }

    ]
}

var workspace;

function init() {
    workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
    Blockly.defineBlocksWithJsonArray([{
        "type": "config",
        "message0": "%1 %2 %3 %4 %5 %6 physics %7",
        "args0": [{
                "type": "field_dropdown",
                "name": "PHASER",
                "options": [
                    [
                        "auto",
                        "AUTO"
                    ],
                    [
                        "option",
                        "OPTIONNAME"
                    ],
                    [
                        "option",
                        "OPTIONNAME"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "WIDTH",
                "value": 800,
                "min": 0,
                "precision": 1
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "HEIGHT",
                "value": 600,
                "min": 0,
                "precision": 1
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "NAME"
            }
        ],
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }]);
    Blockly.defineBlocksWithJsonArray([{
        "type": "physics_default",
        "message0": "default:  %1",
        "args0": [{
            "type": "field_input",
            "name": "NAME",
            "text": "arcade"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }]);
    Blockly.defineBlocksWithJsonArray([{
        "type": "physics_arcade",
        "message0": "arcade %1",
        "args0": [{
            "type": "input_statement",
            "name": "NAME"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }]);
    Blockly.defineBlocksWithJsonArray([{
        "type": "physics_gravity",
        "message0": "gravity %1",
        "args0": [{
            "type": "input_statement",
            "name": "NAME"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }]);
    Blockly.defineBlocksWithJsonArray([{
        "type": "physics_y",
        "message0": "y: %1",
        "args0": [{
            "type": "field_input",
            "name": "NAME",
            "text": "200"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }]);
    Blockly.JavaScript['config'] = function(block) {
        var dropdown_phaser = block.getFieldValue('PHASER');
        var number_width = block.getFieldValue('WIDTH');
        var number_height = block.getFieldValue('HEIGHT');
        var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
        // TODO: Assemble JavaScript into code variable.

        //console.log(statements_name);

        var code = '';
        code += 'var config={\n';
        code += "  type: Phaser." + dropdown_phaser + ",\n";
        code += "  width: " + number_width + ",\n";
        code += "  height: " + number_height + ",\n";
        code += "  physics: {\n";
        code += "  " + statements_name + "\n";
        code += "  },\n";
        code += "  scene: {\n";
        code += "    preload: preload,\n";
        code += "    create: create,\n";
        //code += "    update: update\n";
        code += "  }"
        code += "};\n\n";
        code += "var game = new Phaser.Game(config);";
        return code;
    };
    Blockly.JavaScript['physics_default'] = function(block) {
        var text_name = block.getFieldValue('NAME');
        // TODO: Assemble JavaScript into code variable.
        var code = 'default: \'' + text_name + '\';\n';
        return code;
    };
    Blockly.JavaScript['physics_arcade'] = function(block) {
        var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
        // TODO: Assemble JavaScript into code variable.
        var code = '  arcade: {\n';
        code += '  ' + statements_name + '\n';
        code += '  }';
        return code;
    };
    Blockly.JavaScript['physics_gravity'] = function(block) {
        var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
        // TODO: Assemble JavaScript into code variable.
        var code = '  gravity: {\n';
        code += '  ' + statements_name + "\n";
        code += '  }';
        return code;
    };
    Blockly.JavaScript['physics_y'] = function(block) {
        var text_name = block.getFieldValue('NAME');
        // TODO: Assemble JavaScript into code variable.
        var code = '  y: ' + text_name + ';\n';
        return code;
    };
    workspace.addChangeListener(myUpdateFunction);
}

function myUpdateFunction(event) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('textarea').value = code;
}