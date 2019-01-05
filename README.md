# git-promise

Add commands to run as branches merge down stream.

### `promise new <promise> <extension>`

```bash
promise new tables sql
```

### `promise add <promise> <command>`

```bash
mysql "ALTER TABLE table ADD some_column int"
promise add tables ALTER TABLE table ADD some_column int; # Note the semicolon
```

### `promise pull <promise>`

```bash
promise pull tables
mysql "source tables.sql"
```

### `promise resolve <promise>`

```bash
promise resolve tables
```

## Example

```bash
# Create promise for SQL
promise new tables sql
```

### Dev server 1

```bash
# Add a line to our promise
promise add tables ALTER TABLE table ADD some_column INT;
# Push changes
git add -A && git commit && git push
```

### Dev server 2

```bash
# Add a line to our promise
promise add tables ALTER TABLE table ADD some_column_other_column VARCHAR(32);
# Push changes
git add -A && git commit && git push
```

### Test / Master server

```bash
# Pull changes
git pull
promise pull tables
cat tables.sql
  # ALTER TABLE table ADD some_column INT;
  # ALTER TABLE table ADD some_column_other_column VARCHAR(32);

# Apply changes
mysql "source tables.sql"

# Resolve changes
promise resolve tables
cat tables.sql # Empty
```

Pull and resolve should always be used together, in one sitting.

```bash
promise pull
do_something
promise resolve
```

`promise add` will overwrite the cache and should be done after `promise pull`.
