# Components Documentation

Reusable UI components are located in the `ui` folder:

## Text Component

The `Text` component provides a unified way to display text throughout the application with consistent styling and typography.

### Usage

```svelte
<script>
  import Text from '$lib/components/ui/Text.svelte';
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

## Modal Component

The `Modal` component provides a reusable modal dialog that can be used throughout the application.

### Usage

```svelte
<script>
  import Modal from '$lib/components/ui/Modal.svelte';
  let isOpen = false;
</script>

<button on:click={() => isOpen = true}>Open Modal</button>
<Modal isOpen={isOpen} onClose={() => isOpen = false}>
  <div>Modal content goes here</div>
</Modal>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Whether the modal is open |
| `onClose` | `() => void` | | Function to call when the modal is closed |
| `children` | `Snippet` | | Content to display inside the modal |