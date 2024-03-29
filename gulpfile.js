const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const git = require('gulp-git');

// Task لنسخ المشروع إلى مستودع Git
gulp.task('git-add', () => {
  return gulp.src('.')
      .pipe(git.add());
});

// Task لعمل commit
gulp.task('git-commit', () => {
  return gulp.src('.')
      .pipe(git.commit('Auto-commit changes'));
});

// Task لرفع التغييرات إلى مستودع Git
gulp.task('git-push', (cb) => {
  git.push('origin', 'main', cb);
});


// Task لرفع المشروع إلى مستودع GitHub
gulp.task('git-upload-to-github', (cb) => {
  git.push('origin', 'main', { args: '--tags' }, cb);
});

// Task لربط مستودع GitHub بمشروعك
gulp.task('git-add-remote', () => {
  return git.addRemote('origin', 'https://github.com/abdelrahman-hefny/sass.git');
});
// Task لتنفيذ كل الخطوات (إضافة، commit، رفع) إلى مستودع GitHub
gulp.task('github', gulp.series('git-add', 'git-commit','git-push' ,'git-upload-to-github'));

//#########################################

// تحويل ملفات SASS إلى CSS
gulp.task('sass', function () {
  return gulp.src('src/*.scss') // يمكنك تعديل نمط الملفات حسب احتياجاتك
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});
// مهمة الرصد لتشغيل تحويل SASS تلقائياً عند التعديلات
gulp.task('watch', function () {
  gulp.watch('src/*.scss', gulp.series('sass'));
});

// مهمة افتراضية لتشغيل المهام
gulp.task('default', gulp.series('sass', 'watch'));
