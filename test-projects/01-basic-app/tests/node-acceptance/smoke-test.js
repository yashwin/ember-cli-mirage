import { module, test } from 'qunit';

module('Acceptance | Mirage in Node test', function(hooks) {
  test('it works with a static route handler defined in config.js', async function(assert) {
    let res = await fetch('/node-endpoint');
    let json = await res.json();

    assert.deepEqual(json, { message: 'hello-node' });
  });

  test('it follows Ember CLIs default behavior if it hits an unhandled endpoint', async function(assert) {
    let res = await fetch('/some-random-thing');

    assert.equal(res.statusText, 'Not Found');
  });

  test('when a route handler throws a MirageError I see a 500 with a meaningful json message', async function(assert) {
    let res = await fetch('/node-endpoint-with-mirage-error');
    let json = await res.json();

    assert.equal(res.status, 500);
    assert.equal(json.message, "Mirage: Model not registered: foo");
  });

  test('when a route handler throws a generic error object I see a 500 with a meaningful json message', async function(assert) {
    let res = await fetch('/node-endpoint-with-generic-error-object');
    let json = await res.json();

    assert.equal(res.status, 500);
    assert.equal(json.message, "Whoops!");
  });

  test('when a route handler throws a non-error object I see a 500 with a meaningful json message', async function(assert) {
    let res = await fetch('/node-endpoint-with-other-error');
    let json = await res.json();

    assert.equal(res.status, 500);
    assert.equal(json.message, "you goofed");
  });

  test('models work', async function(assert) {
    let res = await fetch('/node-endpoint-models');
    let json = await res.json();

    assert.deepEqual(json, {
      tickets: [
        { id: "1" },
        { id: "2" },
        { id: "3" }
      ]
    });
  });

  // test('factories work', async function(assert) {
  // });

  // test('factories work', async function(assert) {
  // });
});
