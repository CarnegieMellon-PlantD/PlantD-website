# Formulas

The following are the available values for the `columns[].formula.name` and `columns[].formula.args` fields in Schema.

For example,

| Name | Description | Type | Args |
| --- | --- | --- | --- |
| `AddInt` | Sum up int | `int` | List of columns containing `int`.<br />For example,  `["schema1.col1", "schema2.col2", ...]` |
| `AddFloat` | Sum up float | `float` | List of columns containing `float`.<br />For example,  `["schema1.col1", "schema2.col2", ...]` |
| `AddString` | Concatenate string | `string` | List of columns containing `string`.<br />For example,  `["schema1.col1", "schema2.col2", ...]` |
| `And` | Apply `&&` Operator | `bool` | List of columns containing `bool`.<br />For example,  `["schema1.col1", "schema2.col2", ...]` |
| `Or` | Apply `\|\|` Operator | `bool` | List of columns containing `bool`.<br />For example,  `["schema1.col1", "schema2.col2", ...]` |
| `XOrInt` | Apply `\|` Operator | `int` | List of columns containing `int`.<br />For example,  `["schema1.col1", "schema2.col2", ...]` |
| `Copy` | Copy value from given column | `any` | One column.<br />For example, `["schema1.col1"]` |
| `CurrentTimeMs` | Current time in Unix milliseconds | `int64` | `[]` |
| `ToUnixMilli` | Convert date like `2006-01-02` to Unix milliseconds | `int64` | One column.<br />For example, `["schema1.col1"]` |
| `AddRandomTimeMs` | Copy value from given column, and add a random number between minimum and maximum to it  | `int64` | One column, a minimum integer in string, and a maximum integer in string.<br />For example, `["schema1.col1", "-100", "100"]` |
| `AddRandomNumber` | Copy value from given column, and add a random number between minimum and maximum to it | `int` | One column, a minimum integer in string, and a maximum integer in string.<br />For example, `["schema1.col1", "-100", "100"]` |
