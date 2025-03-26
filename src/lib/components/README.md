# Components Documentation

## Text Component

The `Text` component provides a unified way to display text throughout the application with consistent styling and typography.

### Usage

```svelte
<script>
  import Text from '$lib/components/Text.svelte';
</script>

<Text variant="h1" color="primary" align="center">Hello World</Text>
<Text variant="body">This is a paragraph of text.</Text>
<Text variant="caption" color="muted" italic={true}>This is a caption</Text>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body' \| 'caption' \| 'small'` | `'body'` | Determines the text style and HTML element used |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` | `'normal'` | Font weight |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'muted' \| 'error' \| 'success'` | `'default'` | Text color |
| `italic` | `boolean` | `false` | Whether the text should be italicized |
| `truncate` | `boolean` | `false` | Whether to truncate text with ellipsis if it overflows |
| `class` | `string` | `''` | Additional CSS classes to apply |

### Variants

- `h1` - `h6`: Heading levels, rendered as corresponding HTML heading elements
- `body`: Regular paragraph text, rendered as `<p>`
- `caption`: Smaller text for captions, rendered as `<p>`
- `small`: Smallest text, rendered as `<span>`

### Colors

- `default`: Standard text color (#333)
- `primary`: Primary brand color (#0088cc)
- `secondary`: Secondary text color (#666)
- `muted`: Muted/less important text (#999)
- `error`: Error text color (#d32f2f)
- `success`: Success text color (#2e7d32)

### Examples

#### Headings

```svelte
<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
```

#### Text Styles

```svelte
<Text weight="bold">Bold text</Text>
<Text italic={true}>Italic text</Text>
<Text weight="bold" italic={true}>Bold italic text</Text>
```

#### Text Colors

```svelte
<Text color="primary">Primary text</Text>
<Text color="secondary">Secondary text</Text>
<Text color="muted">Muted text</Text>
<Text color="error">Error text</Text>
<Text color="success">Success text</Text>
```

#### Alignment

```svelte
<Text align="left">Left aligned</Text>
<Text align="center">Center aligned</Text>
<Text align="right">Right aligned</Text>
```

#### Truncation

```svelte
<div style="width: 200px">
  <Text truncate={true}>This is a very long text that will be truncated with an ellipsis if it doesn't fit in the container</Text>
</div>
