<script lang="ts">
	import { diff_match_patch } from 'diff-match-patch';
	import Text from '../ui/Text.svelte';
	const dmp = new diff_match_patch();

	type Props = {
		oldText: string;
		newText: string;
	};

	const { oldText, newText }: Props = $props();

	const diffs = $derived.by(() => {
		const d = dmp.diff_main(oldText, newText);
		dmp.diff_cleanupSemantic(d);
		return d;
	});

	function getDiffClass(op: number): string {
		switch (op) {
			case -1:
				return 'deleted';
			case 1:
				return 'added';
			default:
				return '';
		}
	}
</script>

<div class="diff-container">
	<div class="diff-section old">
		<div class="diff-header">
			<Text variant="h5" color="secondary">Old Version</Text>
		</div>
		<div class="diff-content">
			{#each diffs as [op, text]}
				{#if op !== 1}
					<span class={getDiffClass(op)}>{text}</span>
				{/if}
			{/each}
		</div>
	</div>

	<div class="diff-section new">
		<div class="diff-header">
			<Text variant="h5" color="secondary">New Version</Text>
		</div>
		<div class="diff-content">
			{#each diffs as [op, text]}
				{#if op !== -1}
					<span class={getDiffClass(op)}>{text}</span>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.diff-container {
		font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
		white-space: pre-wrap;
		margin: 1.5em 0;
		overflow: hidden;
		display: flex;
		gap: 16px;
		align-items: stretch;
		justify-content: center;
	}

	.diff-section {
		flex: 1;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
		max-width: 50%;
	}

	.diff-section:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
	}

	.diff-header {
		padding: 12px 16px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.diff-content {
		padding: 16px;
		font-size: 14px;
		line-height: 1.6;
		overflow-x: auto;
		flex: 1;
	}

	.old {
		background-color: #fff8f8;
		border: 1px solid rgba(211, 47, 47, 0.2);
	}

	.old .diff-header {
		background-color: #fff0f0;
	}

	.new {
		background-color: #f8fff8;
		border: 1px solid rgba(46, 125, 50, 0.2);
	}

	.new .diff-header {
		background-color: #f0fff0;
	}

	.added {
		background-color: rgba(46, 125, 50, 0.1);
		color: #2e7d32;
		border-radius: 2px;
		padding: 0 2px;
		margin: 0 1px;
	}

	.deleted {
		background-color: rgba(211, 47, 47, 0.1);
		color: #d32f2f;
		text-decoration: line-through;
		border-radius: 2px;
		padding: 0 2px;
		margin: 0 1px;
	}
</style>
