/**
 * @file Babel config
 * @author LipengJia<jialipeng@baidu.com>
 */

'use strict';

const path = require('path');

module.exports = {
    presets: ['@babel/env'],
    env: {
        development: {
            plugins: [
                [
                    'module-resolver',
                    {
                        alias: {
                            '@utils': path.join(__dirname, 'src/common/utils')
                        }
                    }
                ],
                [
                    '@babel/plugin-transform-runtime',
                    {
                        regenerator: true
                    }
                ]
            ]
        }
    }
};
