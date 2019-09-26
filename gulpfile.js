var gulp = require('gulp'); //引入gulp
var htmlClean = require('gulp-htmlclean') //引入html压缩代码插件
var imageMin = require('gulp-imagemin') //引入图片压缩插件
var uglify = require('gulp-uglify') //引入js压缩插件
var debug = require('gulp-strip-debug') //去掉debugger 和 console 语句
var less = require('gulp-less') //将less转换成css
var cleanCss = require('gulp-clean-css') //将css代码压缩
var postCss = require('gulp-postcss') //自动添加css兼容性前缀
var autoprefixer = require('autoprefixer') //添加兼容性前缀的一个变量
var connect = require('gulp-connect') //打开服务器
var folder = {
    src: 'src/',
    dist: 'dist/'
}
var devMod = process.env.NODE_ENV == 'development';
//export NODE_ENV=development设置环境变量

gulp.task('html', function() {
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(htmlClean())

    }
    page.pipe(gulp.dest(folder.dist + 'html/'))
})
gulp.task('css', function() {
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
    if (!devMod) {
        page.pipe(cleanCss())
    }

    page.pipe(gulp.dest(folder.dist + 'css/'))
})
gulp.task('js', function() {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())

    if (!devMod) {
        page.pipe(debug())
            .pipe(uglify())
    }

    page.pipe(gulp.dest(folder.dist + 'js/'))
})
gulp.task('image', function() {
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'image/'))
})
gulp.task('server', function() {
    connect.server({
        port: '8888',
        livereload: true
    })
})
gulp.task('watch', function() {
    gulp.watch(folder.src + 'html/*', ["html"]);
    gulp.watch(folder.src + 'css/*', ["css"]);
    gulp.watch(folder.src + 'js/*', ["js"])

})
gulp.task('default', ["html", "css", "js", "image", "server", "watch"]);