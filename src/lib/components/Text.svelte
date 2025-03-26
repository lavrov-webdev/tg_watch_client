<script lang="ts">
	type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small';
	type TextAlign = 'left' | 'center' | 'right';
	type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
	type TextColor = 'default' | 'primary' | 'secondary' | 'muted' | 'error' | 'success';

	type Props = {
		variant?: TextVariant;
		align?: TextAlign;
		weight?: TextWeight;
		color?: TextColor;
		italic?: boolean;
		truncate?: boolean;
		class?: string;
	};

	const {
		variant = 'body',
		align = 'left',
		weight = 'normal',
		color = 'default',
		italic = false,
		truncate = false,
		class: className = ''
	}: Props = $props();

	// Map variants to HTML elements
	const elementMap: Record<TextVariant, string> = {
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		h4: 'h4',
		h5: 'h5',
		h6: 'h6',
		body: 'p',
		caption: 'p',
		small: 'span'
	};

	const element = elementMap[variant];

	// Compute classes based on props
	const classes = [
		'text',
		`text-${variant}`,
		`text-align-${align}`,
		`text-weight-${weight}`,
		`text-color-${color}`,
		italic ? 'text-italic' : '',
		truncate ? 'text-truncate' : '',
		className
	].filter(Boolean).join(' ');
</script>

<svelte:element this={element} class={classes}>
	<slot />
</svelte:element>

<style>
	/* Base text styles */
	.text {
		margin: 0;
		line-height: 1.5;
	}

	/* Variants */
	.text-h1 {
		font-size: 2.5rem;
		line-height: 1.2;
		margin-bottom: 1rem;
	}

	.text-h2 {
		font-size: 2rem;
		line-height: 1.25;
		margin-bottom: 0.875rem;
	}

	.text-h3 {
		font-size: 1.75rem;
		line-height: 1.3;
		margin-bottom: 0.75rem;
	}

	.text-h4 {
		font-size: 1.5rem;
		line-height: 1.35;
		margin-bottom: 0.625rem;
	}

	.text-h5 {
		font-size: 1.25rem;
		line-height: 1.4;
		margin-bottom: 0.5rem;
	}

	.text-h6 {
		font-size: 1.125rem;
		line-height: 1.45;
		margin-bottom: 0.375rem;
	}

	.text-body {
		font-size: 1rem;
	}

	.text-caption {
		font-size: 0.875rem;
	}

	.text-small {
		font-size: 0.75rem;
	}

	/* Alignment */
	.text-align-left {
		text-align: left;
	}

	.text-align-center {
		text-align: center;
	}

	.text-align-right {
		text-align: right;
	}

	/* Font weights */
	.text-weight-normal {
		font-weight: 400;
	}

	.text-weight-medium {
		font-weight: 500;
	}

	.text-weight-semibold {
		font-weight: 600;
	}

	.text-weight-bold {
		font-weight: 700;
	}

	/* Colors */
	.text-color-default {
		color: #333;
	}

	.text-color-primary {
		color: #0088cc;
	}

	.text-color-secondary {
		color: #666;
	}

	.text-color-muted {
		color: #999;
	}

	.text-color-error {
		color: #d32f2f;
	}

	.text-color-success {
		color: #2e7d32;
	}

	/* Modifiers */
	.text-italic {
		font-style: italic;
	}

	.text-truncate {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
