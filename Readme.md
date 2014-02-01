
# string-scanner

  scan through strings

## Installation

  Install with [component(1)](http://component.io):

    $ component install matthewmueller/string-scanner

## API

### `scanner(str, [offset])`

Initialize a `scanner` for `str` at the given `offset`. If no `offset` is given, default to `0`.

```js
var s = scanner('apples, peaches, kiwis', 12);
```

### `scanner.next(expr, [n])`

Scan for the next `expr`. `expr` can either be a string or a regex.
Return the `n`th match. `n` defaults to 1, or the first match.

```js
s.next(/apples?/) // apples
s.next('peaches') // peaches
```

### `scanner.prev(expr, [n])`, `scanner.previous(expr, [n])`

Scan for the previous `expr`. `expr` can either be a string or a regex.
Return the `n`th match. `n` defaults to 1, or the first match.

```js
s.last()
s.prev(/kiwis?/) // kiwis
s.prev('peaches') // peaches
```

### `scanner.match()`

Return the current match. Useful for regex captures.
If no match is found, this function returns `null`.

```js
s.next(/apples?/)
 .match()
```

### `scanner.peak(expr, [n])`

Peak forward or backwards `n` matches in search of `expr`.
Peaking does not change the offset.

```js
s.peak(/\w+/, 2) // peaches
s.next(/\w+/, 2) // peaches
```

### `scanner.cursor([i])`

Get or set the cursor within the string.

### `scanner.last()`

Move the cursor to the end of the string

### `scanner.first()`

Move the cursor to the beginning of the string

## Test

    npm install component-test
    make test

## License

  MIT
