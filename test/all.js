include('ringo/unittest');

exports.testSomething = function () {
    assertTrue(true);
};

if (require.main == module.id) {
    require('ringo/unittest').run(exports);
}
