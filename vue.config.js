module.exports = {
    configureWebpack: {
        devtool: 'eval-source-map',
        mode: "development"
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/lilo-todo-vue/'
        : '/'
};
