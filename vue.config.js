const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const webpack = require('webpack');

module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/assets/style.scss";`,
            },
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                'public': path.resolve(__dirname, 'public')
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
                // Replace with true if detailed mismatch info is needed
                '__VUE_OPTIONS_API__': JSON.stringify(true),
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
            })
        ]
    }
});
